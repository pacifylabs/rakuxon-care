import type { Metadata } from "next";
import { serviceHref } from "@/lib/clusters";
import type { Service } from "@/lib/cms/types";
import { siteUrl } from "@/lib/env";

const SITE_NAME = "Rakuxon Care";

export function origin(): string {
  return siteUrl().replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${origin()}${normalised === "/" ? "/" : normalised}`;
}

/**
 * Canonical, Open Graph and Twitter metadata for a public page.
 * Titles go through the root template (`%s · Rakuxon Care`) unless `absolute`
 * is set — use that for the homepage so the brand is not repeated.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const ogTitle = absoluteTitle ?? `${title} · ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      type: "website",
      locale: "en_GB",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

/** JSON-LD must not be able to break out of the script tag. */
export function serialiseJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function serviceMetadata(service: Service | undefined): Metadata {
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: serviceHref(service),
  });
}
