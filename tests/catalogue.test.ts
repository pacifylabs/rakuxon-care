import { describe, expect, it } from "vitest";
import { CATALOGUE } from "@/lib/cms/catalogue";
import { ARMS } from "@/lib/cms/data";
import { SERVICE_COPY } from "@/lib/cms/service-copy";
import { relatedFromCatalogue } from "@/lib/cms/related";
import { serviceHref } from "@/lib/clusters";
import sitemap from "@/app/sitemap";

describe("catalogue page copy", () => {
  const slugs = CATALOGUE.map((s) => s.slug);

  it("has SERVICE_COPY for every catalogue slug, and no orphans", () => {
    expect(Object.keys(SERVICE_COPY).sort()).toEqual([...slugs].sort());
  });

  it("gives every service unique SEO titles and descriptions", () => {
    const titles = CATALOGUE.map((s) => s.seoTitle);
    const descriptions = CATALOGUE.map((s) => s.seoDescription);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("points related slugs at catalogue entries that exist", () => {
    const known = new Set(slugs);
    for (const service of CATALOGUE) {
      expect(service.related.length).toBeGreaterThan(0);
      for (const related of service.related) {
        expect(known.has(related), `${service.slug} → ${related}`).toBe(true);
        expect(related).not.toBe(service.slug);
      }
    }
  });

  it("resolves related pages to real hrefs", () => {
    for (const service of CATALOGUE) {
      const pages = relatedFromCatalogue(service);
      expect(pages).toHaveLength(service.related.length);
    }
  });

  it("gives every service body sections and its own FAQs", () => {
    for (const service of CATALOGUE) {
      expect(service.sections.length).toBeGreaterThan(0);
      expect(service.faqs.length).toBeGreaterThan(0);
      expect(service.seoTitle.length).toBeGreaterThan(10);
      expect(service.seoDescription.length).toBeGreaterThan(40);
    }
  });
});

describe("canonical arm hrefs", () => {
  it("uses the nested namespaces, not the redirected legacy paths", () => {
    expect(ARMS[0]?.href).toBe("/care");
    expect(ARMS[1]?.href).toBe("/agency");
  });
});

describe("sitemap", () => {
  it("includes every catalogue URL", () => {
    const urls = new Set(sitemap().map((entry) => entry.url));
    for (const service of CATALOGUE) {
      expect(urls.has(`https://www.rakuxoncare.co.uk${serviceHref(service)}`)).toBe(
        true,
      );
    }
  });

  it("does not list the styleguide", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.includes("/styleguide"))).toBe(false);
  });
});
