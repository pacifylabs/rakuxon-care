import { beforeEach, describe, expect, it, vi } from "vitest";
import type { EnquiryInput } from "@/lib/enquiry";

/* Which columns a branch writes is a decision this module makes, so it is
   worth testing. Drizzle itself is not — the query builder is mocked. */

const values = vi.fn();
const returning = vi.fn();
const set = vi.fn();
const where = vi.fn();

vi.mock("@/lib/db", () => ({
  db: () => ({
    insert: () => ({ values }),
    update: () => ({ set }),
  }),
  schema: {},
}));

vi.mock("@/lib/db/schema", () => ({
  enquiries: { id: "id" },
}));

const stored = { id: "abc", intent: "family", email: "person@example.org" };

beforeEach(() => {
  vi.clearAllMocks();
  returning.mockResolvedValue([stored]);
  values.mockReturnValue({ returning });
  where.mockResolvedValue(undefined);
  set.mockReturnValue({ where });
});

async function leads() {
  vi.resetModules();
  return import("@/lib/server/leads");
}

const base = {
  name: "Test Person",
  email: "person@example.org",
  message: "A message long enough to pass validation.",
  consent: true as const,
};

describe("storeLead — branch mapping", () => {
  it("writes careFor and postcode for a family enquiry", async () => {
    const { storeLead } = await leads();
    await storeLead({
      ...base,
      intent: "family",
      careFor: "relative",
      postcode: "SW1A 1AA",
    } as EnquiryInput);

    const row = values.mock.calls[0][0];
    expect(row.careFor).toBe("relative");
    expect(row.postcode).toBe("SW1A 1AA");
    expect(row.organisation).toBeUndefined();
    expect(row.stage).toBeUndefined();
  });

  it("writes organisation and packageType for a council enquiry", async () => {
    const { storeLead } = await leads();
    await storeLead({
      ...base,
      intent: "council",
      organisation: "Example Council",
      packageType: "domiciliary",
    } as EnquiryInput);

    const row = values.mock.calls[0][0];
    expect(row.organisation).toBe("Example Council");
    expect(row.packageType).toBe("domiciliary");
    expect(row.careFor).toBeUndefined();
  });

  it("writes organisation and stage for a business enquiry", async () => {
    const { storeLead } = await leads();
    await storeLead({
      ...base,
      intent: "business",
      organisation: "Example Care Ltd",
      stage: "applying",
    } as EnquiryInput);

    const row = values.mock.calls[0][0];
    expect(row.organisation).toBe("Example Care Ltd");
    expect(row.stage).toBe("applying");
    expect(row.packageType).toBeUndefined();
  });
});

describe("storeLead — what is deliberately NOT persisted", () => {
  it("never writes the honeypot", async () => {
    const { storeLead } = await leads();
    await storeLead({
      ...base,
      intent: "family",
      careFor: "myself",
      honeypot: "gotcha",
    } as EnquiryInput);
    expect(values.mock.calls[0][0]).not.toHaveProperty("honeypot");
  });

  it("never writes consent as a bare boolean", async () => {
    const { storeLead } = await leads();
    await storeLead({
      ...base,
      intent: "family",
      careFor: "myself",
    } as EnquiryInput);
    // consent_given_at carries the evidence instead, defaulted by the column.
    expect(values.mock.calls[0][0]).not.toHaveProperty("consent");
  });
});

describe("storeLead — empty strings become NULL", () => {
  it.each([
    ["phone", { phone: "" }],
    ["phone whitespace", { phone: "   " }],
    ["postcode", { postcode: "" }],
  ])("stores %s as null, not an empty string", async (_label, extra) => {
    const { storeLead } = await leads();
    await storeLead({
      ...base,
      intent: "family",
      careFor: "myself",
      ...extra,
    } as EnquiryInput);

    const row = values.mock.calls[0][0];
    for (const key of Object.keys(extra)) {
      expect(row[key as keyof typeof row]).toBeNull();
    }
  });

  it("keeps a real phone number", async () => {
    const { storeLead } = await leads();
    await storeLead({
      ...base,
      intent: "family",
      careFor: "myself",
      phone: " 07700 900000 ",
    } as EnquiryInput);
    expect(values.mock.calls[0][0].phone).toBe("07700 900000");
  });
});

describe("recordEmailStatus", () => {
  it("swallows a write failure rather than failing the request", async () => {
    where.mockRejectedValue(new Error("connection lost"));
    const { recordEmailStatus } = await leads();
    // The lead is already committed; bookkeeping must not undo that.
    await expect(
      recordEmailStatus("abc", { admin: "sent", user: "sent" }),
    ).resolves.toBeUndefined();
  });
});

describe("redact", () => {
  it.each([
    ["person@example.org", "pe***@example.org"],
    ["a@b.com", "a***@b.com"],
    ["not-an-email", "***"],
  ])("redacts %s", async (input, expected) => {
    const { redact } = await leads();
    expect(redact(input)).toBe(expected);
  });
});
