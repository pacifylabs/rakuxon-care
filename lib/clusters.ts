import type { Cluster, Service } from "@/lib/cms";

/** Mega-menu and hub grouping — 04_SITE_ARCHITECTURE §3. */
export interface ClusterMeta {
  id: Cluster;
  /** Short category word for the eyebrow — must differ from `label`, which
      is the section heading, or the two read as a stutter. */
  eyebrow: string;
  label: string;
  blurb: string;
}

export const CARE_CLUSTERS: ClusterMeta[] = [
  {
    id: "care-service",
    eyebrow: "Services",
    label: "CQC-regulated services",
    blurb: "The care we deliver in people's own homes.",
  },
  {
    id: "who-we-support",
    eyebrow: "Who we help",
    label: "Who we support",
    blurb: "Support shaped around the person and their condition.",
  },
  {
    id: "care-trust",
    eyebrow: "Practicalities",
    label: "Trust, access and conversion",
    blurb: "Coverage, funding, ratings and how to start.",
  },
];

export const AGENCY_CLUSTERS: ClusterMeta[] = [
  {
    id: "registration-compliance",
    eyebrow: "Getting registered",
    label: "Registration and compliance",
    blurb: "Getting registered, and staying inspection-ready.",
  },
  {
    id: "tenders-frameworks",
    eyebrow: "Winning work",
    label: "Tenders, councils and frameworks",
    blurb: "Winning the contracts that make a provider viable.",
  },
  {
    id: "brand-digital",
    eyebrow: "Being found",
    label: "Brand and digital",
    blurb: "Looking established to families and commissioners.",
  },
  {
    id: "staffing-hr",
    eyebrow: "People",
    label: "People, staffing and HR",
    blurb: "Filling the rota and employing safely.",
  },
  {
    id: "advisory",
    eyebrow: "Advice and offers",
    label: "Advisory and offer",
    blurb: "Planning, coaching and the productised launch route.",
  },
];

/**
 * Canonical URL for a catalogue entry. Services render at /{arm}/{slug};
 * who-we-support entries carry an explicit href because they nest deeper.
 * Single source of truth so nav, footer and hubs cannot drift apart.
 */
export function serviceHref(s: Pick<Service, "slug" | "arm" | "href">) {
  return s.href ?? `/${s.arm}/${s.slug}`;
}

/** Pages that are their own templates rather than catalogue entries. */
export const CARE_TRUST_PAGES = [
  {
    slug: "areas-we-cover",
    title: "Areas we cover",
    summary: "Where we currently deliver care.",
  },
  {
    slug: "fees-funding",
    title: "Fees and funding",
    summary: "What care costs and who pays for it.",
  },
  {
    slug: "cqc-rating",
    title: "Our CQC rating and reports",
    summary: "Our registration status and inspection history.",
  },
  {
    slug: "testimonials",
    title: "References and proof",
    summary: "How to check us before you commit.",
  },
  {
    slug: "refer",
    title: "Refer or request care",
    summary: "Start a care enquiry or refer someone.",
  },
  {
    slug: "careers",
    title: "Join as a carer",
    summary: "Care roles at Rakuxon Care.",
  },
];

export const AGENCY_EXTRA_PAGES = [
  {
    slug: "digital-audit",
    title: "Free digital audit",
    cluster: "brand-digital" as Cluster,
    summary: "A review of how you look to families and commissioners.",
  },
  {
    slug: "opportunities",
    title: "Tender opportunities",
    cluster: "tenders-frameworks" as Cluster,
    summary: "Where care contracts are publicly advertised.",
  },
  {
    slug: "case-studies",
    title: "Results and evidence",
    cluster: "advisory" as Cluster,
    summary: "What each engagement produces, and how to check it.",
  },
  {
    slug: "book-a-call",
    title: "Book a free consultation",
    cluster: "advisory" as Cluster,
    summary: "A call with someone who runs a regulated service.",
  },
];
