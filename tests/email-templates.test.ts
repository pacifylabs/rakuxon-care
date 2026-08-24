import { describe, expect, it } from "vitest";
import {
  adminNotification,
  escapeHtml,
  userConfirmation,
} from "@/lib/server/email-templates";
import type { EnquiryRow } from "@/lib/db/schema";

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
    sourcePath: "/care/refer",
    emailStatus: null,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  } as EnquiryRow;
}

describe("escapeHtml", () => {
  it.each([
    ["<script>", "&lt;script&gt;"],
    ["a & b", "a &amp; b"],
    ['say "hi"', "say &quot;hi&quot;"],
    ["it's", "it&#39;s"],
  ])("escapes %s", (input, expected) => {
    expect(escapeHtml(input)).toBe(expected);
  });

  it("leaves ordinary text untouched", () => {
    expect(escapeHtml("Perfectly ordinary text")).toBe(
      "Perfectly ordinary text",
    );
  });
});

describe("admin notification", () => {
  it("names the enquirer and the intent in the subject", () => {
    const { subject } = adminNotification(lead());
    expect(subject).toContain("Test Person");
    expect(subject).toContain("Care at home");
  });

  it("includes the message and a reply link to the enquirer", () => {
    const { html, text } = adminNotification(lead());
    expect(html).toContain("My mother needs help in the mornings.");
    expect(html).toContain("mailto:person@example.org");
    expect(text).toContain("My mother needs help in the mornings.");
  });

  it("labels enum values rather than printing raw slugs", () => {
    const { html } = adminNotification(lead({ careFor: "someone-else" }));
    expect(html).toContain("Someone else");
    expect(html).not.toContain("someone-else");
  });

  it("omits fields that are null rather than rendering blanks", () => {
    const { html } = adminNotification(lead({ phone: null, postcode: null }));
    expect(html).not.toContain("Phone");
    expect(html).not.toContain("Postcode");
  });

  it("includes branch fields for a business enquiry", () => {
    const { html } = adminNotification(
      lead({
        intent: "business",
        careFor: null,
        organisation: "Example Care Ltd",
        stage: "applying",
      }),
    );
    expect(html).toContain("Example Care Ltd");
    expect(html).toContain("Preparing or submitting a CQC application");
  });

  it("records when consent was given", () => {
    const { html, text } = adminNotification(lead());
    expect(html).toContain("2026-08-22T10:30:00.000Z");
    expect(text).toContain("2026-08-22T10:30:00.000Z");
  });
});

describe("user confirmation", () => {
  it("greets by first name only", () => {
    const { html } = userConfirmation(lead({ name: "Test Person" }));
    expect(html).toContain("Thank you, Test");
  });

  it("falls back gracefully to a single-word name", () => {
    const { html } = userConfirmation(lead({ name: "Cher" }));
    expect(html).toContain("Thank you, Cher");
  });

  it("quotes a short reference, not the full uuid", () => {
    const { html, text } = userConfirmation(lead());
    expect(html).toContain("3c6e811f");
    expect(html).not.toContain("3c6e811f-604a-4674-8712-9940d6d1bc50");
    expect(text).toContain("3c6e811f");
  });

  it("does not claim anything the site cannot honour", () => {
    const { html } = userConfirmation(lead());
    expect(html).not.toMatch(/24\s*hours/i);
    expect(html).toContain("one working day");
  });
});

describe("both templates — security and deliverability", () => {
  const hostile = lead({
    name: '<img src=x onerror="alert(1)">',
    message: "</div><script>alert('xss')</script>",
    organisation: "Evil & Co <b>",
  });

  it.each([
    ["admin", adminNotification],
    ["user", userConfirmation],
  ])("%s escapes hostile enquirer input", (_which, build) => {
    const { html } = build(hostile);
    expect(html).not.toContain("<script>alert");
    expect(html).not.toContain('onerror="alert(1)"');
    expect(html).toContain("&lt;script&gt;");
  });

  it.each([
    ["admin", adminNotification],
    ["user", userConfirmation],
  ])("%s ships a plain-text alternative", (_which, build) => {
    const { text } = build(lead());
    expect(text.length).toBeGreaterThan(40);
    expect(text).not.toContain("<table");
    expect(text).not.toContain("<div");
  });

  it.each([
    ["admin", adminNotification],
    ["user", userConfirmation],
  ])("%s uses no external stylesheet or web font", (_which, build) => {
    const { html } = build(lead());
    expect(html).not.toContain("<link");
    expect(html).not.toContain("@import");
    expect(html).not.toContain("fonts.googleapis");
  });

  it.each([
    ["admin", adminNotification],
    ["user", userConfirmation],
  ])("%s uses the brand palette and no purple", (_which, build) => {
    const html = build(lead()).html.toLowerCase();
    // The reference design's violets, explicitly ruled out by §0.1.
    for (const violet of [
      "purple",
      "#7c3aed",
      "#8b5cf6",
      "#6d28d9",
      "#a855f7",
    ]) {
      expect(html).not.toContain(violet);
    }
    // Navy and sky blue are present.
    expect(html).toContain("#10203d");
    expect(html).toContain("#0369a1");
  });
});
