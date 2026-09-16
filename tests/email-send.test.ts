import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { EnquiryRow } from "@/lib/db/schema";

/* The sender must NEVER throw. By the time it runs the lead is committed, so
   an exception here would fail the request and tell the enquirer their
   message was lost when it was not. */

const send = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: (...args: unknown[]) => send(...args) };
  },
}));

const ORIGINAL = { ...process.env };

function lead(overrides: Partial<EnquiryRow> = {}): EnquiryRow {
  const now = new Date("2026-08-22T10:30:00.000Z");
  return {
    id: "3c6e811f-604a-4674-8712-9940d6d1bc50",
    intent: "family",
    status: "new",
    name: "Test Person",
    email: "person@example.org",
    phone: null,
    message: "My mother needs help in the mornings.",
    organisation: null,
    careFor: "relative",
    postcode: null,
    packageType: null,
    stage: null,
    consentGivenAt: now,
    sourcePath: null,
    emailStatus: null,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  } as EnquiryRow;
}

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  Object.assign(process.env, {
    RESEND_API_KEY: "re_test",
    ENQUIRY_FROM_EMAIL: "no-reply@rakuxoncare.co.uk",
    ENQUIRY_NOTIFY_EMAIL: "info@rakuxoncare.co.uk",
  });
});

afterEach(() => {
  process.env = { ...ORIGINAL };
});

async function sender() {
  return (await import("@/lib/server/email")).sendEnquiryEmails;
}

describe("sendEnquiryEmails — happy path", () => {
  it("sends to the admin and the enquirer", async () => {
    send.mockResolvedValue({ data: { id: "x" }, error: null });
    const result = await (await sender())(lead());

    expect(result).toEqual({ admin: "sent", user: "sent" });
    expect(send).toHaveBeenCalledTimes(2);
  });

  it("sets reply-to so an admin reply reaches the enquirer", async () => {
    send.mockResolvedValue({ data: { id: "x" }, error: null });
    await (
      await sender()
    )(lead());

    const admin = send.mock.calls.find(
      ([m]) => (m as { to: string }).to === "info@rakuxoncare.co.uk",
    )?.[0] as { replyTo: string };
    expect(admin.replyTo).toBe("person@example.org");
  });

  it("sets reply-to on the confirmation so a reply reaches the team", async () => {
    send.mockResolvedValue({ data: { id: "x" }, error: null });
    await (
      await sender()
    )(lead());

    const user = send.mock.calls.find(
      ([m]) => (m as { to: string }).to === "person@example.org",
    )?.[0] as { replyTo: string };
    expect(user.replyTo).toBe("info@rakuxoncare.co.uk");
  });

  it("always includes a plain-text part", async () => {
    send.mockResolvedValue({ data: { id: "x" }, error: null });
    await (
      await sender()
    )(lead());
    for (const [message] of send.mock.calls) {
      expect((message as { text: string }).text.length).toBeGreaterThan(20);
    }
  });
});

describe("sendEnquiryEmails — degradation", () => {
  it("skips without throwing when the key is missing", async () => {
    delete process.env.RESEND_API_KEY;
    const result = await (await sender())(lead());
    expect(result).toEqual({ admin: "skipped", user: "skipped" });
    expect(send).not.toHaveBeenCalled();
  });

  it("reports failed when Resend returns an error object", async () => {
    send.mockResolvedValue({
      data: null,
      error: { message: "domain unverified" },
    });
    const result = await (await sender())(lead());
    expect(result).toEqual({ admin: "failed", user: "failed" });
  });

  it("reports failed when the SDK throws, without propagating", async () => {
    send.mockRejectedValue(new Error("network down"));
    await expect((await sender())(lead())).resolves.toEqual({
      admin: "failed",
      user: "failed",
    });
  });

  it("records one failure independently of the other", async () => {
    send
      .mockResolvedValueOnce({ data: null, error: { message: "bounced" } })
      .mockResolvedValueOnce({ data: { id: "x" }, error: null });
    const result = await (await sender())(lead());
    expect(result.admin).toBe("failed");
    expect(result.user).toBe("sent");
  });

  it("never rejects, whatever happens", async () => {
    send.mockImplementation(() => {
      throw new Error("synchronous explosion");
    });
    await expect((await sender())(lead())).resolves.toBeDefined();
  });
});
