import { CATALOGUE } from "./catalogue";
import {
  AGENCY_EXTRA_PAGES,
  CARE_TRUST_PAGES,
  serviceHref,
} from "@/lib/clusters";
import type { Service } from "./types";

export interface RelatedPage {
  href: string;
  title: string;
  summary: string;
  /** Catalogue or extra-page slug — used to pick the icon. */
  slug: string;
}

function trustPage(slug: string): RelatedPage | undefined {
  const page = CARE_TRUST_PAGES.find((p) => p.slug === slug);
  return page
    ? {
        href: `/care/${page.slug}`,
        title: page.title,
        summary: page.summary,
        slug: page.slug,
      }
    : undefined;
}

function extraPage(slug: string): RelatedPage | undefined {
  const page = AGENCY_EXTRA_PAGES.find((p) => p.slug === slug);
  return page
    ? {
        href: `/agency/${page.slug}`,
        title: page.title,
        summary: page.summary,
        slug: page.slug,
      }
    : undefined;
}

function cataloguePage(slug: string): RelatedPage | undefined {
  const service = CATALOGUE.find((s) => s.slug === slug);
  return service
    ? {
        href: serviceHref(service),
        title: service.title,
        summary: service.summary,
        slug: service.slug,
      }
    : undefined;
}

/** Related catalogue entries named on the service, in the order listed. */
export function relatedFromCatalogue(service: Service): RelatedPage[] {
  return service.related
    .map(cataloguePage)
    .filter((page): page is RelatedPage => page !== undefined);
}

/**
 * Conversion and trust pages that every service in a lane should still
 * point at, so a reader is never stranded on a leaf URL.
 */
export function relatedExtras(service: Service): RelatedPage[] {
  if (service.arm === "care") {
    return [
      trustPage("fees-funding"),
      trustPage("areas-we-cover"),
      trustPage("refer"),
      trustPage("cqc-rating"),
    ].filter((page): page is RelatedPage => page !== undefined);
  }

  const extras: (RelatedPage | undefined)[] = [
    extraPage("book-a-call"),
    extraPage("case-studies"),
  ];
  if (service.cluster === "tenders-frameworks") {
    extras.unshift(extraPage("opportunities"));
  }
  if (service.cluster === "brand-digital") {
    extras.unshift(extraPage("digital-audit"));
  }
  return extras.filter((page): page is RelatedPage => page !== undefined);
}
