/**
 * Content model for the stubbed CMS layer, aligned to PRD v2.0 (two-arm
 * model). Phase 4 swaps the accessors in ./index.ts for real CMS calls;
 * these shapes stay put.
 */

/** PRD §1.3. `both` is for shared chrome and cross-arm content. */
export type Lane = "b2c" | "b2b" | "both";

export interface Arm {
  slug: "care" | "agency";
  number: 1 | 2;
  /** Trading name, e.g. "Rakuxon Care" / "Rakuxon Care Agency". */
  name: string;
  laneLabel: string;
  lane: Lane;
  audience: string;
  summary: string;
  href: string;
  services: string[];
}

/** Drives the mega-menu grouping — 04_SITE_ARCHITECTURE §3. */
export type Cluster =
  | "care-service"
  | "who-we-support"
  | "care-trust"
  | "registration-compliance"
  | "tenders-frameworks"
  | "brand-digital"
  | "staffing-hr"
  | "advisory";

/** Selects the page layout — 04_SITE_ARCHITECTURE §5. */
export type Template =
  "care-service" | "who-we-support" | "agency-service" | "conversion" | "list";

export interface Service {
  slug: string;
  title: string;
  lane: Lane;
  arm: Arm["slug"];
  cluster: Cluster;
  template: Template;
  summary: string;
  features: string[];
  overview: string;
  /** "Who it's for" bullets — PRD §5.6. */
  whoFor: string[];
  /** Optional anchored sub-sections within a page. */
  sections?: { id: string; title: string; body: string; items: string[] }[];
  /**
   * Set only when the page lives outside its namespace's {slug} route
   * (e.g. who-we-support pages nest one level deeper).
   */
  href?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  lane: Lane;
}

export interface Faq {
  question: string;
  answer: string;
  lane: Lane;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

/** PRD §5.3 — the three B2B segments Arm 2 serves. */
export interface Segment {
  title: string;
  body: string;
}

/** PRD §5.4 — Launch Kit contents, grouped exactly as the deck defines. */
export interface LaunchKitGroup {
  title: string;
  items: string[];
}

export type CqcStatus =
  | { state: "registered"; rating: string; profileUrl: string }
  | { state: "in-progress" };

export interface SiteSettings {
  companyName: string;
  legalName: string;
  cqc: CqcStatus;
  /** PRD §3.2 — EAS note for Rakuxon Staffing. */
  easNote: string;
  /**
   * Everything below is optional on purpose. The rule for this site is that
   * an unverified contact detail is removed, never filled with a plausible
   * looking placeholder — so consumers must handle absence rather than
   * render an empty field. See TODO.md for what is currently missing.
   */
  email?: string;
  phone?: string;
  address?: string[];
  companyNumber?: string;
  icoRegistration?: string;
  regionsServed?: string;
  socials?: { label: string; href: string }[];
}

/** Live tender opportunities feed — 04_SITE_ARCHITECTURE §5. */
export interface Opportunity {
  id: string;
  title: string;
  buyer: string;
  region: string;
  value: string;
  closes: string;
  status: "open" | "closing-soon" | "closed";
  summary: string;
}
