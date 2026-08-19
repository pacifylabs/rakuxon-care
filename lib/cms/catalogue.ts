import type { Service } from "./types";

/**
 * The full service/support catalogue from 04_SITE_ARCHITECTURE §3.
 *
 * Routing rule: a service renders at /{arm}/{slug}, except `who-we-support`
 * entries which nest at /care/who-we-support/{slug} via their `href`.
 *
 * COPY STATUS: page titles, routes, clusters and templates are taken from the
 * architecture doc and are authoritative. All body copy (summary, overview,
 * whoFor, features) is on-brand filler written here — no source document
 * supplies it. See TODO.md before publishing.
 */

type Draft = Omit<Service, "lane" | "arm"> & Partial<Pick<Service, "href">>;

const careService = (
  slug: string,
  title: string,
  summary: string,
  overview: string,
  whoFor: string[],
  features: string[],
): Draft => ({
  slug,
  title,
  cluster: "care-service",
  template: "care-service",
  summary,
  overview,
  whoFor,
  features,
});

const whoWeSupport = (
  slug: string,
  title: string,
  summary: string,
  overview: string,
  whoFor: string[],
  features: string[],
): Draft => ({
  slug,
  title,
  cluster: "who-we-support",
  template: "who-we-support",
  href: `/care/who-we-support/${slug}`,
  summary,
  overview,
  whoFor,
  features,
});

/* ---------------------------------------------------------------- B2C */

const CARE: Draft[] = [
  careService(
    "personal-care",
    "Personal care",
    "Hands-on support with washing, dressing and the parts of a day that have become difficult.",
    "Support with the things that make a day possible, delivered with dignity and without rushing. Every package starts with an assessment at home and a written plan you agree before anything begins.",
    [
      "People needing help with daily routines",
      "Families arranging support for a relative",
      "Councils and ICBs commissioning packages",
    ],
    [
      "Washing, dressing and personal hygiene",
      "Continence and mobility support",
      "Medication support and prompts",
      "Meal preparation and nutrition",
    ],
  ),
  careService(
    "home-care",
    "Domiciliary and home care",
    "Scheduled visits arranged around the household, from short daily calls upwards.",
    "Care that fits the shape of the week rather than the other way round. Visits are planned around the person's routine, with the same small team wherever the rota allows.",
    [
      "People who want to stay in their own home",
      "Families needing regular, reliable visits",
      "Direct-payment and personal-budget holders",
    ],
    [
      "Short calls through to multiple daily visits",
      "Help around the home and with errands",
      "Consistent carers wherever possible",
      "Care plans reviewed as needs change",
    ],
  ),
  careService(
    "live-in-care",
    "Live-in care",
    "A carer living in the home, as an alternative to moving into residential care.",
    "Round-the-clock support without leaving home. Live-in care suits people whose needs have outgrown visiting calls but who would rather not move.",
    [
      "People considering a residential move",
      "People needing overnight reassurance",
      "Couples who want to stay together at home",
    ],
    [
      "A carer living in the home",
      "Overnight and waking-night cover",
      "Household routines maintained",
      "Planned handovers and relief cover",
    ],
  ),
  careService(
    "respite-care",
    "Respite care",
    "Short-term cover so family carers can rest, recover or take a break.",
    "Family carers need time off, and arranging it should not be a fight. Respite can be booked as planned blocks or arranged at short notice when circumstances change.",
    [
      "Family carers needing a break",
      "Families covering a holiday or hospital stay",
      "People recovering after discharge",
    ],
    [
      "Planned and emergency respite",
      "Daytime, overnight or live-in cover",
      "Continuity with the existing care plan",
      "Short-notice arrangements where possible",
    ],
  ),
  careService(
    "companionship",
    "Companionship and wellbeing visits",
    "Regular company, conversation and support to stay connected.",
    "Isolation does measurable harm. Companionship visits exist to keep people connected to their routines, their interests and the people around them.",
    [
      "People living alone",
      "Families worried about isolation",
      "People whose confidence has dropped",
    ],
    [
      "Conversation and company",
      "Support to get out and about",
      "Help with appointments and errands",
      "Keeping hobbies and routines going",
    ],
  ),
  careService(
    "specialist-care",
    "Complex and specialist care",
    "Higher-dependency support delivered by carers trained for the specific condition.",
    "Some packages need more than general care training. Specialist packages are staffed by carers trained for the condition and supervised against a plan written with the clinical team.",
    [
      "People with complex or long-term conditions",
      "Packages funded through NHS Continuing Healthcare",
      "Families discharged home with high needs",
    ],
    [
      "Condition-specific carer training",
      "Clinical input into the care plan",
      "Close supervision and review",
      "Coordination with district and specialist nurses",
    ],
  ),
];

const WHO_WE_SUPPORT: Draft[] = [
  whoWeSupport(
    "older-people",
    "Older people",
    "Support that keeps independence intact for as long as possible.",
    "Most of our work. Packages are built around what someone can still do, not only what they cannot, and reviewed as that changes.",
    [
      "People living at home alone",
      "Couples supporting each other",
      "Families living at a distance",
    ],
    [
      "Help with daily routines",
      "Mobility and falls awareness",
      "Medication support",
      "Companionship and errands",
    ],
  ),
  whoWeSupport(
    "dementia",
    "Dementia care",
    "Familiar faces, familiar routines, and carers trained in dementia-informed support.",
    "Dementia care depends on consistency. We keep the same small team wherever the rota allows, because an unfamiliar carer can undo a good week.",
    [
      "People recently diagnosed",
      "Families managing changing behaviour",
      "People needing routine and reassurance",
    ],
    [
      "Dementia-informed carer training",
      "Consistent carers wherever possible",
      "Routines kept stable",
      "Support for the family too",
    ],
  ),
  whoWeSupport(
    "physical-disability",
    "Physical disability",
    "Practical support that works around the person's own way of doing things.",
    "Support led by the person, not the diagnosis. We fit around existing equipment, adaptations and routines rather than replacing them.",
    [
      "Adults living with a physical disability",
      "People using mobility equipment",
      "Direct-payment holders",
    ],
    [
      "Transfers and mobility support",
      "Personal care",
      "Help around the home",
      "Support to get out and about",
    ],
  ),
  whoWeSupport(
    "learning-disability",
    "Learning disability",
    "Support that builds independence rather than replacing it.",
    "The measure of a good package is what someone can do at the end of it. Support is planned with the person, in a format they can actually use.",
    [
      "Adults with a learning disability",
      "People moving toward independent living",
      "Families planning transitions",
    ],
    [
      "Support with daily living skills",
      "Help accessing work and activities",
      "Accessible plans and communication",
      "Consistent, trained carers",
    ],
  ),
  whoWeSupport(
    "mental-health",
    "Mental health support",
    "Reliable, non-judgemental support alongside clinical care.",
    "Support that complements the clinical team rather than duplicating it, with carers who understand that recovery is rarely a straight line.",
    [
      "Adults living with a mental health condition",
      "People recovering after a crisis",
      "People needing structure and routine",
    ],
    [
      "Support with routine and structure",
      "Prompts for medication and appointments",
      "Company and practical help",
      "Coordination with clinical teams",
    ],
  ),
  whoWeSupport(
    "sensory-impairment",
    "Sensory impairment",
    "Support for people living with sight or hearing loss.",
    "Small adjustments make the difference. Carers are briefed on how the person prefers to communicate and how their home is arranged.",
    [
      "People with sight loss",
      "People with hearing loss",
      "People with dual sensory loss",
    ],
    [
      "Communication in the person's preferred format",
      "Support to navigate safely at home",
      "Help with correspondence and appointments",
      "Carers briefed on individual needs",
    ],
  ),
];

/* ---------------------------------------------------------------- B2B */

const agency = (
  slug: string,
  title: string,
  cluster: Service["cluster"],
  summary: string,
  overview: string,
  whoFor: string[],
  features: string[],
): Draft => ({
  slug,
  title,
  cluster,
  template: "agency-service",
  summary,
  overview,
  whoFor,
  features,
});

const AGENCY: Draft[] = [
  agency(
    "cqc-registration",
    "CQC registration support",
    "registration-compliance",
    "End-to-end registration, from provider application through to the decision.",
    "Registration is decided long before the application is submitted. We build the evidence, the policies and the manager's readiness first, then take the application through.",
    [
      "Founders preparing a first registration",
      "Providers refused once already",
      "Providers adding a regulated activity",
    ],
    [
      "Provider application and statement of purpose",
      "Registered manager support",
      "Evidence mapped to the assessment framework",
      "Interview preparation",
    ],
  ),
  agency(
    "policies-procedures",
    "Policies and procedures",
    "registration-compliance",
    "A policy suite that survives inspection, plus the audit routine that keeps it true.",
    "A policy pack does not pass an inspection; the evidence behind it does. We supply the suite we use in our own service, with the audit calendar that keeps it current.",
    [
      "New providers building a framework",
      "Providers preparing for inspection",
      "Providers whose paperwork has drifted",
    ],
    [
      "Policies mapped to the quality statements",
      "Audit calendar and templates",
      "Mock inspection and action plan",
      "Annual review",
    ],
  ),
  agency(
    "statement-of-purpose",
    "Statement of purpose preparation",
    "registration-compliance",
    "The document the regulator reads first, written to match what you actually do.",
    "A statement of purpose that promises what the service cannot deliver is the fastest route to a refusal. We write it against your real staffing, geography and capacity.",
    [
      "Providers preparing an application",
      "Providers changing regulated activity",
      "Providers asked to resubmit",
    ],
    [
      "Drafted against your real operating model",
      "Aligned to the application",
      "Reviewed before submission",
      "Updated as the service changes",
    ],
  ),
  agency(
    "business-plans",
    "Business plans and viability",
    "registration-compliance",
    "Financial modelling and planning that stands up to scrutiny.",
    "The regulator and the bank ask different questions of the same plan. We build one that answers both, with costs modelled from real rota and pay assumptions.",
    [
      "Founders testing whether the business works",
      "Providers seeking finance",
      "Providers planning a second location",
    ],
    [
      "Financial modelling and cash flow",
      "Staffing and rota assumptions",
      "Viability testing",
      "Board-ready documentation",
    ],
  ),
  agency(
    "interview-readiness",
    "Registered manager and nominated individual preparation",
    "registration-compliance",
    "Interview preparation for the people the regulator will actually question.",
    "The fit-person interview is where applications are lost. We rehearse it against the framework, using the evidence from your own service.",
    [
      "Registered manager candidates",
      "Nominated individuals",
      "Providers with an interview scheduled",
    ],
    [
      "Mock interviews against the framework",
      "Evidence preparation",
      "Written feedback and action plan",
      "Follow-up sessions",
    ],
  ),
  agency(
    "inspection-readiness",
    "Ongoing inspection readiness",
    "registration-compliance",
    "Staying inspection-ready between inspections, not scrambling before one.",
    "Providers rarely fail on the day; they fail on the twelve months before it. This is the routine that keeps evidence current.",
    [
      "Registered providers",
      "Providers with an inspection due",
      "Providers after a poor rating",
    ],
    [
      "Rolling audit programme",
      "Mock inspections",
      "Evidence library upkeep",
      "Action plans and re-checks",
    ],
  ),

  agency(
    "tender-writing",
    "Tender and bid writing",
    "tenders-frameworks",
    "Written responses that win work, not just complete the form.",
    "Most providers lose bids on evidence, not price. We write the responses and stay involved through mobilisation once the contract lands.",
    [
      "Providers bidding for the first time",
      "Providers who bid but rarely win",
      "Providers scaling into a new area",
    ],
    [
      "Bid writing and social value responses",
      "Evidence gathering",
      "Submission management",
      "Post-award mobilisation",
    ],
  ),
  agency(
    "frameworks",
    "Council and NHS/ICB framework applications",
    "tenders-frameworks",
    "Getting onto the frameworks and dynamic purchasing systems that carry the volume.",
    "Framework places are where sustainable volume comes from. Applications are long, procedural and unforgiving of gaps.",
    [
      "Providers applying to a framework or DPS",
      "Providers entering a new authority",
      "Providers renewing a place",
    ],
    [
      "Framework and DPS applications",
      "Portal registration and upkeep",
      "Compliance evidence",
      "Renewal management",
    ],
  ),
  agency(
    "tender-pricing",
    "Pricing and costing support",
    "tenders-frameworks",
    "Rates modelled from real costs, so a won contract is still worth having.",
    "Winning below cost is worse than losing. We model rates from actual pay, travel, cover and overhead before anything is submitted.",
    [
      "Providers pricing a bid",
      "Providers whose margins are thin",
      "Providers reviewing existing contracts",
    ],
    [
      "Cost modelling from real rota data",
      "Rate cards and break-even analysis",
      "Margin testing",
      "Contract review",
    ],
  ),

  agency(
    "digital-services",
    "Website and digital services",
    "brand-digital",
    "A website built for local search and for the people who check you before they call.",
    "Families and commissioners both look you up first. The site has to load, read clearly and be findable in the areas you actually cover.",
    [
      "New providers with no site",
      "Providers whose site does not convert",
      "Providers recruiting online",
    ],
    [
      "Website design and build",
      "Local search optimisation",
      "Enquiry capture",
      "Ongoing maintenance",
    ],
  ),
  agency(
    "branding-kits",
    "Branding and credibility kits",
    "brand-digital",
    "Identity and collateral that make a new provider look established.",
    "Credibility is visual before it is anything else. The kit covers what a commissioner, a family and a candidate each see first.",
    ["New providers", "Providers rebranding", "Providers preparing for tender"],
    [
      "Identity and logo",
      "Print and digital collateral",
      "Tone and messaging",
      "Templates you can reuse",
    ],
  ),
  agency(
    "social-presence",
    "Social media presence setup",
    "brand-digital",
    "Accounts set up properly, with enough content to look alive.",
    "An abandoned page is worse than no page. We set the accounts up and hand over a routine you can actually keep.",
    [
      "Providers with no social presence",
      "Providers recruiting locally",
      "Providers building referral routes",
    ],
    [
      "Account setup and branding",
      "Starter content",
      "Posting routine",
      "Recruitment-focused templates",
    ],
  ),

  agency(
    "staffing",
    "Recruitment and temporary staffing",
    "staffing-hr",
    "Vetted carers and support workers supplied to other providers.",
    "Permanent, temporary and temp-to-perm placements, with every worker's file in order before their first shift so you can evidence safe recruitment.",
    [
      "Providers with gaps in the rota",
      "Providers recruiting permanent staff",
      "Providers searching for a registered manager",
    ],
    [
      "Permanent recruitment",
      "Temporary and bank cover",
      "Temp-to-perm placements",
      "Registered manager search",
    ],
  ),
  agency(
    "hr-documents",
    "HR and employment document pack",
    "staffing-hr",
    "Contracts, handbooks and the employment paperwork a care employer needs.",
    "Care employers carry obligations most templates ignore. The pack is written for this sector and kept current.",
    [
      "New employers",
      "Providers with outdated contracts",
      "Providers preparing for inspection",
    ],
    [
      "Contracts of employment",
      "Staff handbook",
      "Supervision and appraisal templates",
      "Disciplinary and grievance procedures",
    ],
  ),

  agency(
    "consulting",
    "Consulting and organisational advisory",
    "advisory",
    "Business planning, governance and growth advice from people running a regulated service.",
    "Advice from operators rather than advisers. We sit on the same side of the framework you are judged against.",
    [
      "Founders testing viability",
      "Providers planning growth",
      "Providers needing governance",
    ],
    [
      "Business planning",
      "Governance and quality assurance",
      "Growth planning",
      "Advisory retainer",
    ],
  ),
  agency(
    "coaching",
    "Coaching and one-to-one sessions",
    "advisory",
    "Direct sessions with someone who has done the thing you are about to do.",
    "Sometimes the blocker is a decision, not a document. Coaching is booked by the session, with no package required.",
    [
      "Founders at a decision point",
      "New registered managers",
      "Providers wanting a second opinion",
    ],
    [
      "One-to-one sessions",
      "Booked individually or as a block",
      "Agenda set by you",
      "Written follow-up",
    ],
  ),
  agency(
    "launch-kit",
    "Care business launch kit",
    "advisory",
    "The productised route from nothing to a registered, trading care business.",
    "Everything needed to launch, in one package, priced up front. Built from the same systems we run our own service on.",
    [
      "Founders starting from scratch",
      "Providers who have stalled mid-application",
      "Buyers of an existing service",
    ],
    [
      "Registration and policy suite",
      "Brand, website and collateral",
      "Business plan and financial model",
      "Launch support and handover",
    ],
  ),
];

/** Everything, with lane and arm derived rather than repeated. */
export const CATALOGUE: Service[] = [
  ...[...CARE, ...WHO_WE_SUPPORT].map((d): Service => ({
    ...d,
    arm: "care",
    lane: "b2c",
  })),
  ...AGENCY.map((d): Service => ({ ...d, arm: "agency", lane: "b2b" })),
];
