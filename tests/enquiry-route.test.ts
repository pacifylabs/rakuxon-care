import { beforeEach, describe, expect, it, vi } from "vitest";
import type { EnquiryRow } from "@/lib/db/schema";

/* The route is exercised with the database and mailer mocked. The point is
   the route's own decisions — validation, honeypot handling, rate limiting,
   and what happens when a dependency fails — not the drivers themselves. */

const storeLead = vi.fn();
const recordEmailStatus = vi.fn();
const sendEnquiryEmails = vi.fn();

vi.mock("@/lib/server/leads", () => ({
  storeLead: (...args: unknown[]) => storeLead(...args),
  recordEmailStatus: (...args: unknown[]) => recordEmailStatus(...args),
}));

vi.mock("@/lib/server/email", () => ({
  sendEnquiryEmails: (...args: unknown[]) => sendEnquiryEmails(...args),
}));

const verifyTurnstile = vi.fn();
vi.mock("@/lib/turnstile", () => ({
  verifyTurnstile: (...args: unknown[]) => verifyTurnstile(...args),
}));

function row(overrides: Partial<EnquiryRow> = {}): EnquiryRow {
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

const valid = {
  intent: "family",
  name: "Test Person",
  email: "person@example.org",
  message: "My mother needs help in the mornings, three days a week.",
  consent: true,
  careFor: "relative",
};

let ipCounter = 0;
function post(body: unknown, ip?: string) {
  return new Request("http://localhost/api/enquiry", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      // A fresh IP per call unless one is given, so the rate limiter does
      // not bleed between unrelated tests.
      "x-forwarded-for": ip ?? `10.0.0.${++ipCounter}`,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function route() {
  vi.resetModules();
  return (await import("@/app/api/enquiry/route")).POST;
}

beforeEach(() => {
  vi.clearAllMocks();
  storeLead.mockResolvedValue(row());
  sendEnquiryEmails.mockResolvedValue({ admin: "sent", user: "sent" });
  recordEmailStatus.mockResolvedValue(undefined);
  verifyTurnstile.mockResolvedValue(true);
});

describe("POST /api/enquiry — success", () => {
  it("stores the lead and returns a short reference", async () => {
    const POST = await route();
    const res = await POST(post(valid));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.reference).toBe("3c6e811f");
    expect(storeLead).toHaveBeenCalledOnce();
  });

  it("passes the source path through to storage", async () => {
    const POST = await route();
    await POST(post({ ...valid, sourcePath: "/care/refer" }));
    expect(storeLead).toHaveBeenCalledWith(
      expect.objectContaining({ intent: "family" }),
      { sourcePath: "/care/refer" },
    );
  });

  it("sends both emails and records the outcome", async () => {
    const POST = await route();
    await POST(post(valid));
    expect(sendEnquiryEmails).toHaveBeenCalledOnce();
    expect(recordEmailStatus).toHaveBeenCalledWith(
      "3c6e811f-604a-4674-8712-9940d6d1bc50",
      { admin: "sent", user: "sent" },
    );
  });
});

describe("POST /api/enquiry — validation", () => {
  it("returns field-keyed errors, not a blob", async () => {
    const POST = await route();
    const res = await POST(post({ intent: "family", consent: false }));
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.errors.name).toBeDefined();
    expect(body.errors.consent).toBeDefined();
    expect(storeLead).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON without throwing", async () => {
    const POST = await route();
    const res = await POST(post("{ not json"));
    expect(res.status).toBe(400);
    expect((await res.json()).formError).toBeDefined();
  });

  it("never stores a lead that failed validation", async () => {
    const POST = await route();
    await POST(post({ ...valid, email: "nope" }));
    expect(storeLead).not.toHaveBeenCalled();
  });
});

describe("POST /api/enquiry — honeypot", () => {
  it("answers 200 but stores nothing, so the bot learns nothing", async () => {
    const POST = await route();
    const res = await POST(post({ ...valid, honeypot: "gotcha" }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.id).toBeNull();
    expect(storeLead).not.toHaveBeenCalled();
    expect(sendEnquiryEmails).not.toHaveBeenCalled();
  });

  it("does not name the honeypot field in any response", async () => {
    const POST = await route();
    const res = await POST(post({ ...valid, honeypot: "gotcha" }));
    expect(JSON.stringify(await res.json())).not.toContain("honeypot");
  });
});

describe("POST /api/enquiry — failure handling", () => {
  it("fails loudly with 503 when the lead cannot be stored", async () => {
    storeLead.mockRejectedValue(new Error("connection refused"));
    const POST = await route();
    const res = await POST(post(valid));
    const body = await res.json();

    expect(res.status).toBe(503);
    expect(body.ok).toBe(false);
    // The enquirer is told where to send it instead.
    expect(body.formError).toContain("info@rakuxoncare.co.uk");
    expect(sendEnquiryEmails).not.toHaveBeenCalled();
  });

  it("still succeeds when email is unconfigured — the lead is saved", async () => {
    sendEnquiryEmails.mockResolvedValue({ admin: "skipped", user: "skipped" });
    const POST = await route();
    const res = await POST(post(valid));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.emailStatus).toEqual({ admin: "skipped", user: "skipped" });
  });

  it("still succeeds when a send fails, and records the failure", async () => {
    sendEnquiryEmails.mockResolvedValue({ admin: "failed", user: "sent" });
    const POST = await route();
    const res = await POST(post(valid));

    expect(res.status).toBe(200);
    expect(recordEmailStatus).toHaveBeenCalledWith(expect.any(String), {
      admin: "failed",
      user: "sent",
    });
  });
});

describe("POST /api/enquiry — Turnstile", () => {
  it("rejects a failed challenge before storing anything", async () => {
    verifyTurnstile.mockResolvedValue(false);
    const POST = await route();
    const res = await POST(post({ ...valid, turnstileToken: "bad" }));
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.formError).toMatch(/human/i);
    expect(storeLead).not.toHaveBeenCalled();
  });

  it("passes the token and IP to the verifier", async () => {
    const POST = await route();
    await POST(post({ ...valid, turnstileToken: "ok-token-12" }, "203.0.113.40"));
    expect(verifyTurnstile).toHaveBeenCalledWith("ok-token-12", "203.0.113.40");
  });
});

describe("POST /api/enquiry — rate limiting", () => {
  it("allows five in a window and rejects the sixth", async () => {
    const POST = await route();
    const ip = "203.0.113.9";
    const codes: number[] = [];
    for (let i = 0; i < 6; i++) {
      codes.push((await POST(post(valid, ip))).status);
    }
    expect(codes.slice(0, 5)).toEqual([200, 200, 200, 200, 200]);
    expect(codes[5]).toBe(429);
  });

  it("limits per IP, so one flooder cannot block everyone", async () => {
    const POST = await route();
    for (let i = 0; i < 6; i++) await POST(post(valid, "203.0.113.10"));
    const other = await POST(post(valid, "203.0.113.11"));
    expect(other.status).toBe(200);
  });

  it("does not store anything for a rate-limited request", async () => {
    const POST = await route();
    for (let i = 0; i < 6; i++) await POST(post(valid, "203.0.113.12"));
    expect(storeLead).toHaveBeenCalledTimes(5);
  });
});
