import { SERVICE_COPY } from "./service-copy";
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

type Draft = Omit<
  Service,
  | "lane"
  | "arm"
  | "seoTitle"
  | "seoDescription"
  | "sections"
  | "faqs"
  | "related"
> &
  Partial<Pick<Service, "href">>;

function attachCopy(
  draft: Draft,
  arm: Service["arm"],
  lane: Service["lane"],
): Service {
  const copy = SERVICE_COPY[draft.slug];
  if (!copy) {
    throw new Error(
      `SERVICE_COPY has no entry for "${draft.slug}". Every catalogue slug needs page copy.`,
    );
  }
  return {
    ...draft,
    arm,
    lane,
    seoTitle: copy.seoTitle,
    seoDescription: copy.seoDescription,
    sections: copy.sections,
    faqs: copy.faqs.map((faq) => ({ ...faq, lane })),
    related: copy.related,
  };
}

const careService = (
  slug: string,
  title: string,
  summary: string,
  overview: string,
  whoFor: Service["whoFor"],
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
  whoFor: Service["whoFor"],
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
      {
        title: "Someone finding daily routines harder",
        body: "Washing, dressing or getting up have become the difficult part of the day, and a family member is quietly filling the gap.",
      },
      {
        title: "Families arranging support for a relative",
        body: "You want the help to feel like help, not a rota of strangers arriving at different times.",
      },
      {
        title: "Councils and ICBs commissioning packages",
        body: "You need a provider that evidences its care properly and answers the phone when something changes.",
      },
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
      {
        title: "Someone who wants to stay at home",
        body: "Moving is not the answer, but the week has become harder to manage alone.",
      },
      {
        title: "Families needing reliable visits",
        body: "You need to know who is coming and when, and to hear about it when that changes.",
      },
      {
        title: "Direct-payment and personal-budget holders",
        body: "You are arranging your own care and want a provider that works to your schedule, not a fixed template.",
      },
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
      {
        title: "Someone considering a residential move",
        body: "The needs have outgrown visiting calls, but leaving home is not what anyone wants.",
      },
      {
        title: "People who need overnight reassurance",
        body: "Nights are the part that worries the family most, and a daytime rota does not cover it.",
      },
      {
        title: "Couples who want to stay together",
        body: "One of you needs more support than the other, and a care home would separate you.",
      },
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
      {
        title: "Family carers who need a break",
        body: "You have not had a week off in a long time, and arranging cover has felt harder than carrying on.",
      },
      {
        title: "Families covering a holiday or hospital stay",
        body: "Something is booked, or something has happened, and the care still has to continue.",
      },
      {
        title: "People recovering after discharge",
        body: "The hospital has sent you home and the first few weeks need more support than the months after.",
      },
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
      {
        title: "Someone living alone",
        body: "The days are quiet, and the isolation is doing more damage than any single practical need.",
      },
      {
        title: "Families worried about withdrawal",
        body: "Calls have got shorter, the hobbies have stopped, and you are not there often enough to tell why.",
      },
      {
        title: "People whose confidence has dropped",
        body: "A fall or a bereavement has made leaving the house feel like more effort than it is worth.",
      },
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
      {
        title: "People with complex or long-term conditions",
        body: "The package needs carers trained for the specific condition, not general care training and good intentions.",
      },
      {
        title: "Packages funded through NHS Continuing Healthcare",
        body: "The funding is agreed and the care now has to match what was assessed.",
      },
      {
        title: "Families discharged home with high needs",
        body: "You have been sent home with equipment, a schedule and very little explanation.",
      },
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
      {
        title: "Someone living at home alone",
        body: "Independence is still there, but parts of the week have started to slip.",
      },
      {
        title: "Couples supporting each other",
        body: "You have been managing between you, and one of you is now carrying more than is fair.",
      },
      {
        title: "Families living at a distance",
        body: "You cannot drop in, and phone calls are not telling you what you need to know.",
      },
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
      {
        title: "Someone recently diagnosed",
        body: "Nothing has changed overnight, but you want the right support in place before it does.",
      },
      {
        title: "Families managing changing behaviour",
        body: "The person you know is still there, and some days are much harder than others.",
      },
      {
        title: "People who need routine and familiarity",
        body: "An unfamiliar carer can undo a good week, so consistency matters more than anything else.",
      },
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
      {
        title: "Adults living with a physical disability",
        body: "You know exactly how you want things done, and you want carers who follow your lead.",
      },
      {
        title: "People using mobility equipment",
        body: "The adaptations and hoists are already there and working; the support needs to fit around them.",
      },
      {
        title: "Direct-payment holders",
        body: "You are managing your own budget and want a provider that treats you as the client, not the case.",
      },
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
      {
        title: "Adults with a learning disability",
        body: "Support should build on what you can already do rather than take it over.",
      },
      {
        title: "People moving toward independent living",
        body: "There is a goal in mind, and the support needs to be pointed at reaching it.",
      },
      {
        title: "Families planning a transition",
        body: "A change is coming \u2014 leaving education, a parent ageing \u2014 and the plan needs to be ready.",
      },
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
      {
        title: "Adults living with a mental health condition",
        body: "You want practical support alongside the clinical team, not another set of appointments.",
      },
      {
        title: "People recovering after a crisis",
        body: "Things are steadier now, and the routine is what keeps it that way.",
      },
      {
        title: "People who need structure to the week",
        body: "Medication, appointments and meals are the things that slip first when it gets difficult.",
      },
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
      {
        title: "People with sight loss",
        body: "The home is arranged exactly as it needs to be, and carers have to work with that, not around it.",
      },
      {
        title: "People with hearing loss",
        body: "Communication has to happen in your preferred format from the first visit, not the third.",
      },
      {
        title: "People with dual sensory loss",
        body: "Small adjustments make the difference between support that works and support that does not.",
      },
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
  whoFor: Service["whoFor"],
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
      {
        title: "Founders preparing a first registration",
        body: "You have a business plan and no clear idea what the regulator will actually ask for.",
      },
      {
        title: "Providers refused once already",
        body: "The application came back and the feedback did not explain what would have satisfied them.",
      },
      {
        title: "Providers adding a regulated activity",
        body: "You are registered, but the new service line needs its own application and evidence.",
      },
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
      {
        title: "New providers building a framework",
        body: "You need the full suite, and you need it to match how the service will really run.",
      },
      {
        title: "Providers preparing for inspection",
        body: "The pack exists, but nobody has checked whether practice still matches what it says.",
      },
      {
        title: "Providers whose paperwork has drifted",
        body: "The policies were written once, the service has changed, and the two no longer describe each other.",
      },
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
      {
        title: "Providers preparing an application",
        body: "This is the document the regulator reads first, and it sets what you will be held to.",
      },
      {
        title: "Providers changing regulated activity",
        body: "What you do has changed, and the statement on file no longer describes it.",
      },
      {
        title: "Providers asked to resubmit",
        body: "The regulator has come back with questions about scope, capacity or geography.",
      },
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
      {
        title: "Founders testing whether it works",
        body: "Before committing, you need to know the numbers hold at realistic pay and travel costs.",
      },
      {
        title: "Providers seeking finance",
        body: "A lender wants a plan that survives scrutiny, not a template with optimistic margins.",
      },
      {
        title: "Providers planning a second location",
        body: "The first service works; the question is whether the model repeats.",
      },
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
      {
        title: "Registered manager candidates",
        body: "The fit-person interview is where applications are lost, and rehearsing it changes the outcome.",
      },
      {
        title: "Nominated individuals",
        body: "You are accountable for the service and will be questioned on evidence you may not have assembled.",
      },
      {
        title: "Providers with an interview scheduled",
        body: "The date is set and you want to walk in knowing which evidence answers which question.",
      },
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
      {
        title: "Registered providers",
        body: "Inspections are rarely lost on the day; they are lost in the twelve months before it.",
      },
      {
        title: "Providers with an inspection due",
        body: "You know roughly when it is coming and want the evidence current, not reconstructed.",
      },
      {
        title: "Providers after a poor rating",
        body: "There is an action plan to deliver and a re-inspection to be ready for.",
      },
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
      {
        title: "Providers bidding for the first time",
        body: "The documents are long, procedural and unforgiving of a missing appendix.",
      },
      {
        title: "Providers who bid but rarely win",
        body: "You are completing the forms; the responses are not evidencing what the evaluator scores.",
      },
      {
        title: "Providers scaling into a new area",
        body: "A new authority means new frameworks, new portals and a different set of expectations.",
      },
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
      {
        title: "Providers applying to a framework or DPS",
        body: "Framework places are where sustainable volume comes from, and the applications are their own discipline.",
      },
      {
        title: "Providers entering a new authority",
        body: "Each council runs its own system, and being on one list does not put you on another.",
      },
      {
        title: "Providers renewing a place",
        body: "Renewal is not automatic, and the requirements will have moved since you last applied.",
      },
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
      {
        title: "Providers pricing a bid",
        body: "Winning below cost is worse than losing, and the rate has to survive the whole contract term.",
      },
      {
        title: "Providers whose margins are thin",
        body: "The work is coming in and the money is not, which usually means travel and cover were under-modelled.",
      },
      {
        title: "Providers reviewing existing contracts",
        body: "A rate agreed two years ago may no longer cover what it costs to deliver.",
      },
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
      {
        title: "New providers with nothing to find",
        body: "You are registered, or nearly, and a family searching your name finds no evidence you exist.",
      },
      {
        title: "Providers whose site does not convert",
        body: "The traffic arrives, reads one page and leaves without making an enquiry.",
      },
      {
        title: "Providers recruiting locally",
        body: "Carers check you online before they apply, and right now the site is costing you applicants.",
      },
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
    [
      {
        title: "New providers",
        body: "You need to look established before you are, because that is what a commissioner is judging.",
      },
      {
        title: "Providers rebranding",
        body: "The name or the ownership has changed and the materials have not caught up.",
      },
      {
        title: "Providers preparing for tender",
        body: "The bid will be read alongside your public presence, and inconsistency between them costs marks.",
      },
    ],
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
      {
        title: "Providers with no social presence",
        body: "There is nothing to find, which for a local service reads as nothing happening.",
      },
      {
        title: "Providers recruiting locally",
        body: "Care roles are filled locally and socially, and an empty page does not fill a rota.",
      },
      {
        title: "Providers building referral routes",
        body: "Social workers and hospital teams look you up before they refer, and an abandoned page is worse than none.",
      },
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
      {
        title: "Providers with gaps in the rota",
        body: "The calls are booked and you are short, and agency cover has to be safe as well as fast.",
      },
      {
        title: "Providers recruiting permanent staff",
        body: "You need people who stay, with files complete before the first shift.",
      },
      {
        title: "Providers searching for a registered manager",
        body: "The role is hard to fill and the service cannot operate without it.",
      },
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
      {
        title: "New employers",
        body: "You are about to take on staff and need contracts that fit a care employer's obligations.",
      },
      {
        title: "Providers with outdated contracts",
        body: "The templates came from somewhere else and were never written for this sector.",
      },
      {
        title: "Providers preparing for inspection",
        body: "Safe recruitment is evidenced through paperwork, and gaps in the file become findings.",
      },
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
      {
        title: "Founders testing viability",
        body: "You want an honest answer about whether this works before you spend more on it.",
      },
      {
        title: "Providers planning growth",
        body: "The service is stable and the next step needs a plan rather than momentum.",
      },
      {
        title: "Providers needing governance",
        body: "You are being asked for oversight structures you have not had to formalise before.",
      },
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
      {
        title: "Founders at a decision point",
        body: "The blocker is a decision, not a document, and you want to talk it through with someone who has made it.",
      },
      {
        title: "New registered managers",
        body: "You are accountable now and would rather ask the awkward questions somewhere safe.",
      },
      {
        title: "Providers wanting a second opinion",
        body: "You have a plan and want it tested by someone with no stake in flattering you.",
      },
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
      {
        title: "Founders starting from scratch",
        body: "You want one package with a known price rather than assembling six suppliers yourself.",
      },
      {
        title: "Providers who have stalled mid-application",
        body: "It started well, then went quiet, and you are not sure what is still outstanding.",
      },
      {
        title: "Buyers of an existing service",
        body: "You are taking on a registration and need to know what you have actually bought.",
      },
    ],
    [
      "Registration and policy suite",
      "Brand, website and collateral",
      "Business plan and financial model",
      "Launch support and handover",
    ],
  ),
];

/** Everything, with lane, arm and page copy attached rather than repeated. */
export const CATALOGUE: Service[] = [
  ...[...CARE, ...WHO_WE_SUPPORT].map((d) => attachCopy(d, "care", "b2c")),
  ...AGENCY.map((d) => attachCopy(d, "agency", "b2b")),
];
