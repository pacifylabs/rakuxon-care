import { describe, expect, it } from "vitest";
import { enquirySchema, INTENTS } from "@/lib/enquiry";

const base = {
  name: "Test Person",
  email: "person@example.org",
  message: "My mother needs help in the mornings, three days a week.",
  consent: true as const,
};

const family = {
  ...base,
  intent: "family" as const,
  careFor: "relative" as const,
};
const council = {
  ...base,
  intent: "council" as const,
  organisation: "Example Council",
};
const business = {
  ...base,
  intent: "business" as const,
  organisation: "Example Care Ltd",
  stage: "applying" as const,
};

function fieldErrors(input: unknown): Record<string, string> {
  const result = enquirySchema.safeParse(input);
  if (result.success) return {};
  const out: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}

describe("enquiry schema — happy paths", () => {
  it.each([
    ["family", family],
    ["council", council],
    ["business", business],
  ])("accepts a valid %s enquiry", (_label, input) => {
    expect(enquirySchema.safeParse(input).success).toBe(true);
  });

  it("exposes exactly the three intents the form renders", () => {
    expect(INTENTS.map((i) => i.value)).toEqual([
      "family",
      "council",
      "business",
    ]);
  });

  it("trims surrounding whitespace", () => {
    const parsed = enquirySchema.parse({ ...family, name: "  Test Person  " });
    expect(parsed.name).toBe("Test Person");
  });

  it("accepts an omitted optional phone", () => {
    expect(enquirySchema.safeParse({ ...family, phone: "" }).success).toBe(
      true,
    );
    const { phone: _drop, ...withoutPhone } = { ...family, phone: "" };
    expect(enquirySchema.safeParse(withoutPhone).success).toBe(true);
  });
});

describe("enquiry schema — branch enforcement", () => {
  it("rejects a business enquiry carrying council fields", () => {
    const errors = fieldErrors({
      ...base,
      intent: "business",
      packageType: "domiciliary",
    });
    expect(errors.organisation).toBeDefined();
    expect(errors.stage).toBeDefined();
  });

  it("rejects a family enquiry missing careFor", () => {
    const { careFor: _drop, ...withoutCareFor } = family;
    expect(fieldErrors(withoutCareFor).careFor).toBeDefined();
  });

  it("rejects a council enquiry missing organisation", () => {
    expect(fieldErrors({ ...base, intent: "council" }).organisation).toBe(
      "Please tell us which organisation you are with.",
    );
  });

  it("rejects an unknown intent", () => {
    expect(enquirySchema.safeParse({ ...base, intent: "spam" }).success).toBe(
      false,
    );
  });

  it("rejects an out-of-range enum value", () => {
    expect(
      enquirySchema.safeParse({ ...family, careFor: "the-dog" }).success,
    ).toBe(false);
  });
});

describe("enquiry schema — consent is affirmative", () => {
  it("rejects consent === false", () => {
    expect(fieldErrors({ ...family, consent: false }).consent).toBe(
      "We need your consent before we can store your enquiry.",
    );
  });

  it("rejects a missing consent field", () => {
    const { consent: _drop, ...withoutConsent } = family;
    expect(fieldErrors(withoutConsent).consent).toBeDefined();
  });

  it("rejects a truthy non-boolean consent", () => {
    expect(enquirySchema.safeParse({ ...family, consent: "yes" }).success).toBe(
      false,
    );
  });
});

describe("enquiry schema — messages are human-readable", () => {
  it("never leaks raw zod type text to a user", () => {
    const errors = fieldErrors({ intent: "business", consent: true });
    for (const message of Object.values(errors)) {
      expect(message).not.toMatch(/expected \w+, received/i);
    }
  });

  it("explains a short message rather than stating a bound", () => {
    expect(fieldErrors({ ...family, message: "hi" }).message).toBe(
      "A sentence or two helps us route this to the right person.",
    );
  });

  it("rejects an invalid email", () => {
    expect(fieldErrors({ ...family, email: "nope" }).email).toBe(
      "That does not look like an email address.",
    );
  });
});

describe("enquiry schema — honeypot", () => {
  it("ACCEPTS a filled honeypot so the bot is not told which field to clear", () => {
    // Deliberate: rejecting here would return a 400 naming the field.
    // The route accepts, answers 200 and stores nothing.
    const result = enquirySchema.safeParse({ ...family, honeypot: "gotcha" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.honeypot).toBe("gotcha");
  });

  it("accepts an absent honeypot", () => {
    expect(enquirySchema.safeParse(family).success).toBe(true);
  });
});

describe("enquiry schema — boundaries", () => {
  it("rejects a message beyond the 4000 character cap", () => {
    expect(
      enquirySchema.safeParse({ ...family, message: "x".repeat(4001) }).success,
    ).toBe(false);
  });

  it("accepts a message exactly at the cap", () => {
    expect(
      enquirySchema.safeParse({ ...family, message: "x".repeat(4000) }).success,
    ).toBe(true);
  });

  it("rejects a name of one character", () => {
    expect(fieldErrors({ ...family, name: "A" }).name).toBeDefined();
  });

  it("rejects null and undefined outright", () => {
    expect(enquirySchema.safeParse(null).success).toBe(false);
    expect(enquirySchema.safeParse(undefined).success).toBe(false);
  });
});
