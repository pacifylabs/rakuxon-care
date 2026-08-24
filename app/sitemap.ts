import type { MetadataRoute } from "next";
import { CATALOGUE } from "@/lib/cms/catalogue";
import {
  AGENCY_EXTRA_PAGES,
  CARE_TRUST_PAGES,
  serviceHref,
} from "@/lib/clusters";
import { absoluteUrl } from "@/lib/seo";

const STATIC: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/care", changeFrequency: "weekly", priority: 0.9 },
  { path: "/agency", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.5 },
  { path: "/resources", changeFrequency: "weekly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
  { path: "/complaints", changeFrequency: "yearly", priority: 0.3 },
  { path: "/accessibility", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const catalogue = CATALOGUE.map((service) => ({
    url: absoluteUrl(serviceHref(service)),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const careTrust = CARE_TRUST_PAGES.map((page) => ({
    url: absoluteUrl(`/care/${page.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const agencyExtra = AGENCY_EXTRA_PAGES.map((page) => ({
    url: absoluteUrl(`/agency/${page.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const staticPages = STATIC.map((page) => ({
    url: absoluteUrl(page.path),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  return [...staticPages, ...catalogue, ...careTrust, ...agencyExtra];
}
