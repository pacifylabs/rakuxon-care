import { CATALOGUE } from "./catalogue";
import type {
  Arm,
  Faq,
  LaunchKitGroup,
  ProcessStep,
  Segment,
  Service,
  SiteSettings,
  Opportunity,
  Stat,
  TeamMember,
  Testimonial,
} from "./types";

/* ===========================================================================
   Content aligned to PRD v2.0 — two arms, one authority.

   The market figures in MARKET_STATS are REAL, taken from PRD §7 ("use
   these, not placeholders"). Anything not confirmed by a source — testimonials,
   team, registration numbers, phone and address — is absent rather than
   as such in the UI. See TODO.md.
   =========================================================================== */

/** PRD §1.3. Arm 1 delivers care; Arm 2 enables other providers. */
export const ARMS: Arm[] = [
  {
    slug: "care",
    number: 1,
    name: "Rakuxon Care",
    laneLabel: "Find care",
    lane: "b2c",
    audience: "Families, councils and ICBs",
    summary:
      "A CQC-registered provider of personal care and domiciliary care at home. Private-pay clients, and packages commissioned by councils, ICBs and NHS Continuing Healthcare.",
    href: "/find-care",
    services: ["home-care"],
  },
  {
    slug: "agency",
    number: 2,
    name: "Rakuxon Care Agency",
    laneLabel: "For care businesses",
    lane: "b2b",
    audience: "Other care providers",
    summary:
      "Enablement for care businesses: CQC registration, tenders and frameworks, policies, digital and branding, consulting, and Rakuxon Staffing.",
    href: "/care-businesses",
    services: [
      "cqc-registration",
      "tender-writing",
      "policies-procedures",
      "digital-branding",
      "consulting",
      "staffing",
    ],
  },
];

/* PRD §4.2 slugs. Arm 1 has a single `home-care` service covering personal
   and domiciliary care; Arm 2 has six service lines. */
/**
 * Superseded by the architecture-doc catalogue. Re-exported under the old
 * name so existing call sites keep working while routes migrate.
 */
export const SERVICES: Service[] = CATALOGUE;

/* PRD §7 — real market figures, not placeholders. Public source citations
   still need adding before launch; see TODO.md. */
export const MARKET_STATS: Stat[] = [
  {
    value: "£77.8bn",
    label:
      "Adult social care's contribution to the England economy, up 12.2% year on year",
  },
  {
    value: "15,232",
    label:
      "CQC-registered domiciliary care locations in England, up 81% since 2017",
  },
  {
    value: "1.71m",
    label: "Jobs across the adult social care workforce in England",
  },
  {
    value: "+11%",
    label: "Growth in home care locations this year, while residential shrank",
  },
];

/** A shorter set for tighter bands. */
export const MARKET_STATS_COMPACT: Stat[] = [
  { value: "£77.8bn", label: "Sector contribution to the England economy" },
  { value: "15,232", label: "Registered domiciliary care locations" },
  { value: "1.71m", label: "Adult social care jobs in England" },
  { value: "~10%", label: "Vacancy rate in home care roles" },
];

/** PRD §7 — demand-side figures for the Arm 1 lane. */
export const DEMAND_STATS: Stat[] = [
  { value: "683,000", label: "People receiving long-term council-funded care" },
  {
    value: "2.02m",
    label: "New requests for support logged by councils last year",
  },
  {
    value: "~10%",
    label: "Vacancy rate in home care roles, nearly double care homes",
  },
  { value: "+11%", label: "Growth in home care locations this year" },
];

/** PRD §5.3 — the three segments Arm 2 serves. */
export const SEGMENTS: Segment[] = [
  {
    title: "Pre-start-up founders",
    body: "You have decided to start a care business and need registration, policies and a route to first contracts.",
  },
  {
    title: "Existing minority-led providers",
    body: "You are registered but under-resourced, and the tender and compliance work keeps slipping.",
  },
  {
    title: "Growth-stage providers",
    body: "You are winning work and need staffing, systems and governance to scale without losing your rating.",
  },
];

/** PRD §5.4 — Launch Kit contents, grouped exactly as the deck defines. */
export const LAUNCH_KIT: LaunchKitGroup[] = [
  {
    title: "Governance and registration",
    items: [
      "Business plan",
      "Business intention letter",
      "Business registration",
      "Policies and procedures",
      "Terms and conditions",
    ],
  },
  {
    title: "People and HR documents",
    items: [
      "Job application form",
      "Interview forms (x3)",
      "Reference forms",
      "Staff handbook",
      "Casual worker agreement",
      "Temp-to-perm contract",
      "Staff profile",
      "Staff feedback form",
    ],
  },
  {
    title: "Operations documents",
    items: [
      "Timesheet",
      "Mileage form",
      "Invoice template",
      "Price list",
      "Accident and incident investigation report",
    ],
  },
  {
    title: "Presence and credibility",
    items: [
      "Virtual landline",
      "Listing on our website",
      "Listing on the national booking form",
      "Two-hour 1:1 coaching webinar",
    ],
  },
];

/** PRD §5.5 — how Rakuxon Staffing operates safely. */
export const STAFFING_SAFEGUARDS: string[] = [
  "Enhanced DBS and right-to-work checks on every worker",
  "EAS-regulated under the Conduct of Employment Agencies and Employment Businesses Regulations 2003",
  "Reference checks before placement",
  "Mandatory training and Care Certificate tracking",
  "Full audit trail so clients can evidence safe recruitment to CQC",
];

export const CARE_PROCESS: ProcessStep[] = [
  {
    number: "01",
    title: "Enquiry",
    description: "Tell us what is happening. One conversation, no obligation.",
  },
  {
    number: "02",
    title: "Assessment",
    description:
      "We visit at home to understand the person, routine and risks.",
  },
  {
    number: "03",
    title: "Care plan",
    description:
      "A written plan you agree to, with named carers and a schedule.",
  },
  {
    number: "04",
    title: "Care starts",
    description: "Support begins, and the plan is reviewed as needs change.",
  },
];

export const BUSINESS_PROCESS: ProcessStep[] = [
  {
    number: "01",
    title: "Foundation",
    description: "Company, insurance, banking and the statement of purpose.",
  },
  {
    number: "02",
    title: "Registration",
    description: "Provider application, registered manager, interview prep.",
  },
  {
    number: "03",
    title: "Launch",
    description: "Policies live, staff onboarded, first packages evidenced.",
  },
  {
    number: "04",
    title: "Growth",
    description: "Frameworks, tenders and the brand that brings enquiries in.",
  },
];

/* No client testimonials are published on either source. Inventing quotes
   attributed to named people would be a fabrication, so the dataset is empty
   and every surface that renders it hides itself. See TODO.md. */
export const TESTIMONIALS: Testimonial[] = [];

export const FAQS: Faq[] = [
  {
    question: "What kind of home care do you provide?",
    answer:
      "We provide personal and domiciliary care shaped around the individual. That can include companionship, personal care, medication support and help at home — always discussed with you first.",
    lane: "b2c",
  },
  {
    question: "Do you work with councils and commissioners?",
    answer:
      "Yes. We work with local authorities, ICBs and NHS Continuing Healthcare, and with direct-payment and personal-budget clients.",
    lane: "b2c",
  },
  {
    question: "Are your carers DBS checked?",
    answer:
      "Every carer holds an enhanced DBS check with verified right-to-work documents before their first shift.",
    lane: "b2c",
  },
  {
    question: "Can you help an existing care business?",
    answer:
      "Yes. Whether you are preparing to register, responding to a tender or improving how your service is seen, our advice is grounded in care delivery — not theory.",
    lane: "b2b",
  },
  {
    question: "How long does CQC registration take?",
    answer:
      "Ten to sixteen weeks is typical once submitted, though the preparation beforehand is what usually decides the outcome.",
    lane: "b2b",
  },
  {
    question: "What is included in the Care Business Launch Kit?",
    answer:
      "A fixed-scope package covering governance and registration, HR documents, operations templates, and presence and credibility items. The full contents are listed on the Launch Kit page.",
    lane: "b2b",
  },
];

/* No team members are named on either source. Empty rather than invented.
   See TODO.md. */
export const TEAM: TeamMember[] = [];

/* PRD §10 Q2 keeps CQC pinned to in-progress: Arm 1 is pre-registration per
   the roadmap. Flip to `registered` with rating and profile URL when it is. */
export const SITE_SETTINGS: SiteSettings = {
  companyName: "Rakuxon Care",
  legalName: "Rakuxon Care Ltd",
  cqc: { state: "in-progress" },
  easNote:
    "Rakuxon Staffing operates under the Conduct of Employment Agencies and Employment Businesses Regulations 2003.",

  /* The only contact channel confirmed for the care brand. Taken from the
     Rakuxon Care source site. */
  email: "hello@rakuxoncare.co.uk",

  /* Deliberately absent — do not fill these with plausible values:
     - phone: the source lists 020 7946 0000, which sits in Ofcom's
       020 7946 0xxx range reserved for fiction. It is not a real number.
     - address: rakuxon.com's London address belongs to the education
       business (Rakuxon Ltd), not the care service.
     - companyNumber / icoRegistration: never published on either source.
     See TODO.md. */

  /* Verified group accounts, taken from rakuxon.com. These belong to
     Rakuxon Ltd rather than to the care brand specifically — noted in
     TODO.md so they can be swapped for care handles when those exist. */
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/rakuxon" },
    { label: "Facebook", href: "https://www.facebook.com/rakuxon" },
    { label: "X", href: "https://x.com/rakuxon" },
    { label: "TikTok", href: "https://www.tiktok.com/@rakuxonltd" },
    { label: "YouTube", href: "https://youtube.com/@rakuxon" },
    { label: "WhatsApp", href: "https://wa.me/2348167178847" },
  ],

  regionsServed: "Across the UK",
};

/**
 * Live tender opportunities. In production this is either a CMS collection
 * or an external feed (Contracts Finder / Find a Tender); the shape is kept
 * deliberately close to those so the swap is a data-source change.
 */
/* The live tender feed needs a real data source (a CMS collection or an
   external feed). Empty until one exists — see TODO.md. */
export const OPPORTUNITIES: Opportunity[] = [];
