import { describe, expect, it } from "vitest";
import { SITE_SETTINGS } from "@/lib/cms/data";
import { whatsappHref } from "@/lib/whatsapp";

describe("whatsappHref", () => {
  it("strips formatting so wa.me gets digits only", () => {
    expect(whatsappHref("+44 7412 862819")).toBe("https://wa.me/447412862819");
  });
});

describe("site WhatsApp number", () => {
  it("is the care-brand UK line", () => {
    expect(SITE_SETTINGS.whatsapp).toBe("+44 7412 862819");
    expect(
      SITE_SETTINGS.socials?.some(
        (social) => social.href === "https://wa.me/447412862819",
      ),
    ).toBe(true);
  });
});
