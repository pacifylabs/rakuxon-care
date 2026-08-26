import type { ServiceSection } from "./types";

/**
 * Page-level copy that sits on top of the catalogue index.
 *
 * The catalogue holds the card-sized fields (title, summary, features).
 * This file holds everything a service URL needs to be a real landing page:
 * a unique title and description, body sections, FAQs, and related slugs.
 * Merged in catalogue.ts so a missing slug fails at import, not in the SERP.
 */

export interface ServiceCopy {
  seoTitle: string;
  seoDescription: string;
  sections: ServiceSection[];
  faqs: { question: string; answer: string }[];
  related: string[];
}

function copy(
  seoTitle: string,
  seoDescription: string,
  related: string[],
  sections: ServiceSection[],
  faqs: { question: string; answer: string }[],
): ServiceCopy {
  return { seoTitle, seoDescription, related, sections, faqs };
}

function section(
  id: string,
  title: string,
  body: string,
  items: string[],
): ServiceSection {
  return { id, title, body, items };
}

export const SERVICE_COPY: Record<string, ServiceCopy> = {
  /* ---------------------------------------------------------------- CARE */

  "personal-care": copy(
    "Personal care at home in the UK",
    "Washing, dressing, continence and medication support in the person's own home. Assessed at home, written into a plan you agree before care starts.",
    ["home-care", "live-in-care", "older-people", "specialist-care"],
    [
      section(
        "how-it-runs",
        "How personal care visits actually run",
        "Personal care is the hands-on part of the day: getting up, washing, dressing, using the toilet, and taking medication. Visits are timed around the person's routine rather than a round that suits the office. The same small team is rostered wherever the rota allows, so the person is not meeting a stranger at 7am.",
        [
          "Morning and evening calls as standard; extra visits when the plan needs them",
          "Support written into the plan — not left to the carer's judgement on the doorstep",
          "Medication prompts and support, recorded at the visit",
          "A named coordinator you can reach when something changes",
        ],
      ),
      section(
        "starting",
        "What we need before the first visit",
        "Nothing starts on a handshake. We visit at home, write down what good looks like for this person, and you sign the plan. If a council or ICB is funding the package, we match the plan to what has been commissioned so the two do not drift apart in week one.",
        [
          "A free assessment in the home, at a time that suits you",
          "Risks, mobility and medication reviewed before anyone is sent",
          "Named carers introduced before they arrive for a first shift",
          "A written start date, not 'as soon as we can'",
        ],
      ),
    ],
    [
      {
        question: "Is personal care the same as home care?",
        answer:
          "Personal care is the regulated, hands-on support — washing, dressing, continence, medication. Home care (domiciliary care) is the wider visiting service that often includes personal care plus help around the house. Many packages combine both; we will tell you which applies after the assessment.",
      },
      {
        question: "Will it be the same carer every day?",
        answer:
          "Wherever the rota allows, yes — a small team, not a different person each visit. Holidays and sickness are covered from that same team so the person still recognises who is coming.",
      },
      {
        question: "Can you help with medication?",
        answer:
          "Yes. Medication support is written into the plan, from prompts through to assistance, and every administration is recorded. We do not improvise from a blister pack on the kitchen counter.",
      },
    ],
  ),

  "home-care": copy(
    "Domiciliary and home care visits",
    "Scheduled home care visits across the week — personal care, meals, housework and companionship — planned around the household, not a fixed round.",
    ["personal-care", "respite-care", "companionship", "older-people"],
    [
      section(
        "shape-of-week",
        "Care that fits the shape of the week",
        "Domiciliary care is visiting support in the person's own home. It can be a 30-minute morning call or several visits a day. The point is that the household keeps its own timetable: meals when they eat, baths when they bathe, appointments when they are booked — not when a round happens to pass the door.",
        [
          "Short daily calls through to multiple visits",
          "Help with meals, laundry, shopping and the house",
          "Personal care included where the plan says so",
          "Direct-payment and personal-budget packages welcome",
        ],
      ),
      section(
        "who-comes",
        "Who comes, and what they know",
        "Carers arrive having read the plan. They know the risks, the medication, the dog, and which mug is which. If the visit cannot happen as booked, you hear about it — not after you have sat waiting.",
        [
          "A small, consistent team rather than a pool of whoever is free",
          "Visit notes shared with the family when you want them",
          "Plan reviews when needs change, not only at a set interval",
          "Cover for holidays arranged from the same team",
        ],
      ),
    ],
    [
      {
        question: "How long is a typical visit?",
        answer:
          "Long enough to do what the plan says without rushing. Many visiting packages start at 30 or 45 minutes; complex personal care often needs longer. We will not bid a 15-minute call for a wash and dress that takes 40.",
      },
      {
        question: "Do you cover evenings and weekends?",
        answer:
          "Yes, where the package needs it. Weekend and evening visits are rostered as part of the plan, not treated as extras to be filled if someone is free.",
      },
      {
        question: "What if we only need help for a few weeks?",
        answer:
          "That is still home care — often after a hospital discharge or while a family carer is away. See also respite care if the need is cover for a family carer rather than an ongoing visiting package.",
      },
    ],
  ),

  "live-in-care": copy(
    "Live-in care at home",
    "A carer living in the home as an alternative to residential care. Overnight cover, household routines kept, planned handovers and relief.",
    ["personal-care", "specialist-care", "dementia", "respite-care"],
    [
      section(
        "when-it-fits",
        "When live-in care is the right next step",
        "Live-in care suits people whose needs have outgrown visiting calls but who would rather not move. A carer lives in the home, keeps the household running, and is there overnight. It is not 24-hour one-to-one care without a break — waking-night cover, rest periods and relief carers are planned in, because a tired carer is not safe care.",
        [
          "One carer living in, with relief cover rostered",
          "Overnight presence; waking nights where the plan needs them",
          "Meals, medication and daily routines kept as they are",
          "Couples can stay together when only one person needs the support",
        ],
      ),
      section(
        "practicalities",
        "What the household needs to provide",
        "The carer needs a private room and access to a bathroom. We agree food, expenses and time off before anyone moves in. The assessment is longer than a visiting package because the carer will be living in the house, not passing through it.",
        [
          "A dedicated room for the carer",
          "A written rota for rest periods and relief weeks",
          "Introduction visits before the live-in placement starts",
          "A plan for what happens if the carer is unwell",
        ],
      ),
    ],
    [
      {
        question: "Is live-in care cheaper than a care home?",
        answer:
          "It depends on the package. For one person with high needs it can be comparable; for a couple who would otherwise be separated it is often the option that lets them stay together. We will not quote a headline weekly rate that ignores relief cover and waking nights.",
      },
      {
        question: "Does the carer work all day and night?",
        answer:
          "No. Live-in is presence in the home with agreed rest. If someone needs waking-night support, that is rostered separately. A placement that pretends otherwise burns out the carer and fails the person.",
      },
      {
        question: "Can we try it before committing long term?",
        answer:
          "Yes. A planned respite live-in stay is often how families test whether this is the right shape of support. See respite care if the need is cover for a break rather than an ongoing placement.",
      },
    ],
  ),

  "respite-care": copy(
    "Respite care for family carers",
    "Short-term home care so family carers can rest, take a holiday or cover a hospital stay. Planned blocks or short-notice cover, keeping the existing routine.",
    ["home-care", "live-in-care", "companionship", "personal-care"],
    [
      section(
        "kinds",
        "Planned breaks and short-notice cover",
        "Family carers hold packages together for years and then cannot take a week off. Respite is visiting or live-in cover that keeps the existing routine in place so the person is not learning a new system while their usual carer is away. We prefer planned blocks — they are safer — and we will say honestly when short-notice cover is not possible.",
        [
          "Daytime visiting cover for a few hours or a few days",
          "Overnight or live-in respite where the need is round-the-clock",
          "Cover during a family holiday, a hospital stay or a funeral",
          "The existing care plan followed, not rewritten for our convenience",
        ],
      ),
      section(
        "handover",
        "Handover that does not lose the detail",
        "Respite fails when the covering carer does not know the person. We take a handover from the family or the usual team before the first visit: medication, risks, likes, the way the kettle is filled. That is the work. Showing up with a generic checklist is not.",
        [
          "A handover conversation before cover starts",
          "Medication and risk information in writing",
          "A named person the family can call during the break",
          "A note back at the end of the period so nothing is lost",
        ],
      ),
    ],
    [
      {
        question: "How much notice do you need?",
        answer:
          "Planned respite should be booked as early as you can. We will try to help at short notice after a hospital admission or a family emergency, but we will not promise cover we cannot staff safely.",
      },
      {
        question: "Can respite be funded by the council?",
        answer:
          "Often yes — many authorities commission respite as part of a carer's assessment or a support plan. Direct payments can also be used. See fees and funding, or ask us to help you check which route applies.",
      },
      {
        question: "Will the same carers come back next time?",
        answer:
          "That is the aim. A respite team that already knows the person is safer and kinder than starting again. We keep notes so a second booking is not a first visit.",
      },
    ],
  ),

  companionship: copy(
    "Companionship and wellbeing visits",
    "Regular company, conversation and support to stay connected — for people living alone, withdrawing after a fall, or needing help to get out.",
    ["home-care", "older-people", "mental-health", "personal-care"],
    [
      section(
        "why",
        "Company is not a luxury extra",
        "Isolation does measurable harm. Companionship visits exist so someone is not alone with the radio all week: conversation, a walk, a shop, a GP appointment, the hobby that stopped after a bereavement. They can sit alongside personal care or stand on their own when the practical need is small and the loneliness is not.",
        [
          "Regular, booked visits — not 'we'll drop in if we can'",
          "Support to get out, keep appointments and run errands",
          "Help restarting routines that have quietly stopped",
          "The same visitors wherever the rota allows",
        ],
      ),
      section(
        "not-personal-care",
        "Where companionship ends and personal care starts",
        "Companionship visitors do not provide regulated personal care unless the plan says they are there to do both. If washing, dressing or medication support is needed, that is a personal care or home care package — we will not blur the two to make a cheaper quote.",
        [
          "Clear boundaries written into the plan",
          "A step up to personal care if needs change",
          "Family updates when you want them",
          "No pretence that a chat replaces hands-on support",
        ],
      ),
    ],
    [
      {
        question: "Is companionship CQC-regulated?",
        answer:
          "Companionship on its own is not a regulated activity. The moment the visit includes personal care, it is. We will tell you which you are buying, and we will not sell an unregulated visit to cover a regulated need.",
      },
      {
        question: "Can visits include trips out?",
        answer:
          "Yes, where the plan and the risk assessment say so — shops, appointments, a walk, a community group. Transport and time are part of the booking, not an afterthought at the door.",
      },
      {
        question: "How often should someone come?",
        answer:
          "Often enough that the person looks forward to it and notices if it is missed. For many people that is two or three visits a week; for others it is daily. The assessment is what decides, not a package we already have on the shelf.",
      },
    ],
  ),

  "specialist-care": copy(
    "Complex and specialist home care",
    "Higher-dependency care at home from carers trained for the condition, with clinical input into the plan and coordination with district and specialist nurses.",
    ["personal-care", "live-in-care", "dementia", "physical-disability"],
    [
      section(
        "when",
        "When general care training is not enough",
        "Some packages need more than a kind carer and a generic plan: PEG feeding, complex medication, acquired brain injury, advanced dementia, end-of-life care at home, NHS Continuing Healthcare. Specialist packages are staffed by carers trained for that condition and supervised against a plan written with the clinical team.",
        [
          "Condition-specific training before the first visit",
          "Clinical input into the care plan",
          "Close supervision and documented reviews",
          "Coordination with district nurses, specialist nurses and therapists",
        ],
      ),
      section(
        "evidence",
        "What commissioners should expect to see",
        "A specialist package that cannot evidence training, competency and supervision will fail the person and the audit. We keep the file in a state you would be willing to hand to a reviewing nurse: who is trained, when they were signed off, what changed at the last review.",
        [
          "Competency records against the tasks in the plan",
          "Escalation routes that are actually used",
          "Reviews when the clinical picture changes, not only at 12 weeks",
          "A coordinator who answers the phone when the nurse calls",
        ],
      ),
    ],
    [
      {
        question: "Do you take NHS Continuing Healthcare packages?",
        answer:
          "Yes. CHC packages have to match what was assessed. We will not accept a package we cannot staff to that specification, and we will say so before anyone is waiting at home for a team that does not exist.",
      },
      {
        question: "Can this be visiting or live-in?",
        answer:
          "Either, depending on the nights and the intensity. Some specialist packages are several long visits a day; others need a live-in carer with clinical backup. The assessment decides.",
      },
      {
        question: "What happens if needs increase after we start?",
        answer:
          "The plan is reviewed. We will not keep delivering a package that no longer matches the risk. If we cannot safely extend, we will say so and help you look at the next option rather than stretch the rota until it snaps.",
      },
    ],
  ),

  /* ---------------------------------------------------------------- WHO */

  "older-people": copy(
    "Home care for older people",
    "Support that keeps independence intact for as long as possible — daily routines, mobility, medication and companionship, reviewed as needs change.",
    ["personal-care", "home-care", "companionship", "dementia"],
    [
      section(
        "independence",
        "Built around what someone can still do",
        "Most of our work is with older people living at home. Packages start from what is still going well — the garden, the crossword, the Tuesday hairdresser — and add support only where the week has started to slip. The aim is not to take over the house.",
        [
          "Help with daily routines without stripping out independence",
          "Falls awareness and mobility support",
          "Medication support and meal help",
          "Companionship and errands when isolation is the real risk",
        ],
      ),
      section(
        "families",
        "For families who cannot be there every day",
        "Adult children living in another city, or a spouse who is already doing too much, need a provider that reports back without turning the person into a case. We agree what you want to hear, and we call when something actually changes.",
        [
          "A named coordinator for the family",
          "Visit notes on request",
          "A plan that names what 'good' looks like for this person",
          "Reviews you can join by phone if you cannot be in the room",
        ],
      ),
    ],
    [
      {
        question: "Is this only for people who need personal care?",
        answer:
          "No. Many older people first need help with meals, the house and company. If personal care becomes necessary later, the package can step up without changing provider.",
      },
      {
        question: "Can you support someone after a hospital discharge?",
        answer:
          "Yes. Discharge packages often need more support in the first weeks than they will later. We will plan for that taper rather than locking in a heavy rota that nobody reviews.",
      },
      {
        question: "What if dementia is part of the picture?",
        answer:
          "Then the package should be built as dementia care, not as generic older people's support with a note in the margin. See our dementia care page — consistency and familiar routines matter more than the label.",
      },
    ],
  ),

  dementia: copy(
    "Dementia care at home",
    "Dementia-informed home care: familiar faces, stable routines, and support for the family as well as the person. Consistency is the intervention.",
    ["older-people", "live-in-care", "companionship", "specialist-care"],
    [
      section(
        "consistency",
        "Familiar faces are the care plan",
        "Dementia care depends on consistency. An unfamiliar carer can undo a good week. We keep the same small team wherever the rota allows, brief them on the person's history and triggers, and treat routine as something to protect rather than something to work around.",
        [
          "Dementia-informed training before the first visit",
          "A small, named team — not a rotating pool",
          "Routines kept stable: same order of the morning, same mug, same walk",
          "Support for the family, who are often exhausted before they call",
        ],
      ),
      section(
        "later",
        "As the condition changes",
        "Early on, the need may be prompts and company. Later it may be personal care, night-time disturbance, or a live-in placement so the person can stay at home. We review against what is happening now, not against the diagnosis letter from two years ago.",
        [
          "Plan reviews when behaviour or risk changes",
          "A route into live-in or specialist care without starting again",
          "Honest conversations when home is no longer safe",
          "Handover that a new carer can actually use",
        ],
      ),
    ],
    [
      {
        question: "Do carers have dementia-specific training?",
        answer:
          "Yes. Dementia-informed practice is a requirement on these packages, not an optional module. Training covers communication, distress, and how to work with the person's remaining abilities rather than against them.",
      },
      {
        question: "Can you help at night?",
        answer:
          "Visiting waking-night support or a live-in placement, depending on the pattern of disturbance. Night-time needs are a common reason families move from visiting care to live-in care.",
      },
      {
        question: "We have just had a diagnosis. Is it too early?",
        answer:
          "No. Putting a consistent team in place while things are still manageable is easier than doing it in a crisis. Even a light companionship package can establish the faces the person will trust later.",
      },
    ],
  ),

  "physical-disability": copy(
    "Home care for physical disability",
    "Practical support that follows the person's own way of doing things — transfers, personal care, equipment and getting out, including direct-payment packages.",
    ["personal-care", "specialist-care", "live-in-care", "home-care"],
    [
      section(
        "led-by-you",
        "You already know how you want things done",
        "Support for adults with a physical disability should follow the person, not a generic older-people's template. Equipment, adaptations and routines are already in the house. Carers work with those, learn the transfers as the person wants them, and do not rearrange a system that is working.",
        [
          "Transfers and mobility support against your method, not ours",
          "Personal care at the times and in the way you choose",
          "Help around the home that does not take over the home",
          "Support to get out, work, and keep the life you already have",
        ],
      ),
      section(
        "direct-payments",
        "Direct payments and personal budgets",
        "Many people in this group manage their own budget. We will work as a provider you contract with, not as a service that treats the council as the only client. Invoices, rotas and changes go through you.",
        [
          "Packages designed around your week, not a framework round",
          "Named carers you interview before they start",
          "Clear rates and what is and is not included",
          "A coordinator who answers to you",
        ],
      ),
    ],
    [
      {
        question: "Will carers use my hoist and equipment?",
        answer:
          "Yes, once they are competent on that equipment. We do not improvise a transfer because the usual method takes longer. Competency is signed off before the first unsupervised visit.",
      },
      {
        question: "Can I choose who comes?",
        answer:
          "You should meet the team before they start. If someone is not a fit, we replace them. Direct-payment clients in particular should not be asked to accept whoever is on the round.",
      },
      {
        question: "Do you cover live-in as well as visiting?",
        answer:
          "Yes, where the nights and the intensity need it. See live-in care for how rest periods and relief are planned — a live-in package that ignores those is not a safe offer.",
      },
    ],
  ),

  "learning-disability": copy(
    "Support for adults with a learning disability",
    "Home support that builds independence rather than replacing it — daily living skills, activities, accessible plans, and consistent trained carers.",
    ["companionship", "personal-care", "mental-health", "specialist-care"],
    [
      section(
        "build",
        "The measure is what someone can do at the end of it",
        "Support is planned with the person, in a format they can actually use. The point is not to complete tasks for them faster; it is to keep and grow the skills they have. Plans are written so the person can see them, not only so a file can hold them.",
        [
          "Daily living skills practised, not taken over",
          "Help accessing work, college and community activities",
          "Accessible plans and communication",
          "A consistent team who know the person, not a rotating rota",
        ],
      ),
      section(
        "transitions",
        "When the next stage is coming",
        "Leaving education, a parent ageing, a move toward more independent living — the support has to point at the goal. We will say if the current package is maintaining a situation rather than helping the person move through it.",
        [
          "Planning with the person and the family, not around them",
          "Coordination with social workers and existing teams",
          "Honest capacity: we take packages we can staff, not every referral",
          "Reviews that ask whether independence has actually increased",
        ],
      ),
    ],
    [
      {
        question:
          "Do you work with people who also have a physical disability?",
        answer:
          "Yes. Many packages sit across more than one of these pages. The plan is built around the person; the labels are for navigation.",
      },
      {
        question: "Can families stay involved?",
        answer:
          "Of course — to the extent the person wants. For adults, the person is the client. Families are partners, not the default decision-maker, unless that is what a legal arrangement says.",
      },
      {
        question: "Is this the same as supported living?",
        answer:
          "Not always. We deliver care and support in the person's home. Some people we support live in supported living; others live with family or in their own tenancy. The housing arrangement is separate from the care plan.",
      },
    ],
  ),

  "mental-health": copy(
    "Mental health support at home",
    "Reliable, non-judgemental home support alongside clinical care — routine, medication and appointment prompts, and practical help after a crisis.",
    ["companionship", "home-care", "learning-disability", "specialist-care"],
    [
      section(
        "alongside",
        "Practical support, not another clinical appointment",
        "This is not therapy and it does not replace the community mental health team. It is the reliable presence that keeps medication taken, meals eaten, and appointments attended when motivation has dropped. Recovery is rarely a straight line; the rota has to survive a bad week without the carer taking it personally or disappearing.",
        [
          "Support with routine and structure",
          "Prompts for medication and appointments",
          "Company and practical help around the home",
          "Coordination with clinical teams, with consent",
        ],
      ),
      section(
        "after-crisis",
        "After a crisis, the routine is the treatment",
        "People coming home after an admission often need more structure than they will in six months. We plan for that, and we plan to step down. A package that stays heavy because nobody reviewed it is not good support.",
        [
          "A written plan the person has actually agreed",
          "Clear boundaries: what carers do and do not do",
          "Escalation routes that match the clinical team's",
          "Reviews that ask whether the person wants less, not only more",
        ],
      ),
    ],
    [
      {
        question: "Are your carers mental health trained?",
        answer:
          "Carers on these packages are briefed on the person's plan and on working with fluctuating motivation and distress. This is still social care, not a clinical service. Where the need is specialist, we will say so.",
      },
      {
        question: "What if someone does not want the visit that day?",
        answer:
          "The plan should say what happens then — a later call, a welfare check, contacting the coordinator — not a carer arguing on the doorstep. We will not force a visit, and we will not silently skip one that was the safety net.",
      },
      {
        question: "Can this sit alongside personal care?",
        answer:
          "Yes. Many people need both. The plan names both so the visit is not 'whichever the carer feels like today'.",
      },
    ],
  ),

  "sensory-impairment": copy(
    "Home care for sight and hearing loss",
    "Support for people living with sight loss, hearing loss or dual sensory impairment — communication in the preferred format, and carers briefed on how the home is arranged.",
    ["personal-care", "home-care", "companionship", "physical-disability"],
    [
      section(
        "small-adjustments",
        "Small adjustments are the whole job",
        "The home is often already arranged exactly as it needs to be. Carers who move the chair, stack the post in a new place, or shout from the hallway make the visit worse. We brief on how the person prefers to communicate and how the house works, and we treat that briefing as part of the plan, not a nice extra.",
        [
          "Communication in the person's preferred format from visit one",
          "Support to navigate safely at home without rearranging it",
          "Help with correspondence, bills and appointments",
          "Carers briefed on lighting, loop systems, guide dogs and routines",
        ],
      ),
      section(
        "getting-out",
        "Getting out without the visit becoming a performance",
        "Appointments, shops and social contact often drop first when sensory impairment increases. Visits can include accompaniment, with time and transport in the booking. The carer is there to make the trip possible, not to take it over.",
        [
          "Booked time for appointments, not a squeezed extra",
          "Consistency so the person is not re-explaining their needs",
          "Coordination with rehab workers and existing specialists",
          "A plan that names what the person wants to keep doing",
        ],
      ),
    ],
    [
      {
        question: "Do you work with dual sensory loss?",
        answer:
          "Yes. Dual sensory loss needs more than 'speak clearly and don't move the furniture'. The plan has to cover both communication and orientation, and the team has to be stable.",
      },
      {
        question: "Can carers use BSL or deafblind manual?",
        answer:
          "Where the person needs a specific communication method, we will say whether we can staff it before we accept the package. We will not accept a referral and hope a signer appears.",
      },
      {
        question: "Is a guide dog a problem?",
        answer:
          "No. The dog is part of the household. Carers are briefed on working around the dog, not on moving it out of the way.",
      },
    ],
  ),

  /* ---------------------------------------------------------------- AGENCY: registration */

  "cqc-registration": copy(
    "CQC registration support for care providers",
    "End-to-end CQC registration for new and existing care providers: application, statement of purpose, registered manager support and interview preparation.",
    [
      "statement-of-purpose",
      "policies-procedures",
      "interview-readiness",
      "launch-kit",
    ],
    [
      section(
        "before-submit",
        "Registration is decided before you submit",
        "The application is the last step, not the first. We build the evidence, the policies, the statement of purpose and the manager's readiness so that what you send matches what you can actually run. A polished form over an empty service is how applications are refused.",
        [
          "Provider application assembled against the current process",
          "Statement of purpose written to your real model, not a template",
          "Registered manager and nominated individual preparation",
          "Evidence mapped to what the assessor will actually ask",
        ],
      ),
      section(
        "after-submit",
        "Through the decision, not just to the portal",
        "Once submitted, the work is responding, preparing for interview, and not going quiet. We stay on the application until there is a decision, and we tell you what a 'not yet' means in practice rather than translating it into encouragement.",
        [
          "Interview preparation using your own evidence",
          "Responses to further information requests",
          "A clear view of what still has to be true on day one of trading",
          "A route into inspection readiness once you are registered",
        ],
      ),
    ],
    [
      {
        question: "How long does CQC registration take?",
        answer:
          "Ten to sixteen weeks after submission is typical. The preparation beforehand is what usually decides the outcome, and it is longer than people budget for. We will not quote a start date we do not control.",
      },
      {
        question: "Can you help if we have already been refused?",
        answer:
          "Yes. Refusal letters are often clearer than they feel on the day. We work from the feedback, rebuild the gaps, and do not resubmit the same application with the dates changed.",
      },
      {
        question: "Do you register our service, or advise while we do it?",
        answer:
          "We prepare and steer; you remain the applicant. The registered manager and nominated individual have to be able to answer for the service. Coaching them to do that is the point of the interview work.",
      },
    ],
  ),

  "policies-procedures": copy(
    "Care policies and procedures that survive inspection",
    "A policy suite mapped to CQC quality statements, plus the audit calendar that keeps practice matching the paperwork — the pack used in a real service, not a download.",
    [
      "cqc-registration",
      "inspection-readiness",
      "statement-of-purpose",
      "hr-documents",
    ],
    [
      section(
        "not-a-pack",
        "A pack does not pass an inspection",
        "Inspectors read policies to see whether practice matches them. We supply the suite we use, mapped to the quality statements, and the audit routine that keeps it true. If your service does something the policy forbids, the policy is wrong — we change the document, not the truth.",
        [
          "Policies mapped to the current assessment framework",
          "Audit calendar and templates you can actually run",
          "A mock inspection against the files, not the slogans",
          "An annual review so the pack does not freeze in the year you bought it",
        ],
      ),
      section(
        "make-it-yours",
        "Written for how you will really run",
        "Search-and-replace on another provider's pack is how findings are born. Names, geography, activities and on-call arrangements have to be yours. We write to the service, then train the people who have to follow it.",
        [
          "Tailored to your regulated activities and locations",
          "Staff-facing versions where the full policy is unreadable in a visit",
          "A single place the current version actually lives",
          "Handover so you are not dependent on us to find the safeguarding policy",
        ],
      ),
    ],
    [
      {
        question: "Is this just a folder of Word documents?",
        answer:
          "You get editable documents, but the value is the mapping, the audit cycle and the mock inspection. A zip file of policies with no audit trail is what most providers already have.",
      },
      {
        question: "Can you review a pack we already bought?",
        answer:
          "Yes. Drift between paperwork and practice is the usual problem, not the absence of a folder. We read what you have, say what would fail, and fix that rather than replacing everything for the sake of it.",
      },
      {
        question: "Do policies need to match the statement of purpose?",
        answer:
          "Yes. If the statement says you do not do something and the policy describes how you do it, that is a finding waiting to happen. We write the two together — see statement of purpose preparation.",
      },
    ],
  ),

  "statement-of-purpose": copy(
    "CQC statement of purpose writing",
    "The document the regulator reads first, written against your real staffing, geography and capacity — not a template that promises what you cannot deliver.",
    [
      "cqc-registration",
      "policies-procedures",
      "interview-readiness",
      "business-plans",
    ],
    [
      section(
        "first-read",
        "This is the document they read first",
        "The statement of purpose sets what you will be held to: activities, people, geography, how you work. Promising a county you cannot staff, or an activity you are not ready for, is the fastest route to a refusal or a later breach. We write it against the operating model you actually have.",
        [
          "Drafted from your staffing, catchment and capacity",
          "Aligned to the application and the policy suite",
          "Reviewed before submission, including the awkward sentences",
          "Updated when the service changes, not left as the 2019 version",
        ],
      ),
      section(
        "changes",
        "When what you do has moved on",
        "Adding a regulated activity, changing the area you cover, or taking on a different client group all mean the statement on file is now wrong. We rewrite it so the next inspection is not spent explaining the gap.",
        [
          "Variation support when you add or drop an activity",
          "Geography and premises described as they are",
          "A version history you can show an inspector",
          "Consistency with the website and tender documents",
        ],
      ),
    ],
    [
      {
        question: "Can we copy another provider's statement?",
        answer:
          "You can, and the assessor will notice. It will describe a service that is not yours. We write from your model even when that makes the document shorter and less impressive.",
      },
      {
        question: "How long is a good statement of purpose?",
        answer:
          "Long enough to be true and specific. Padding with mission language does not help. The assessment is whether a stranger could understand what you do and who you do it for.",
      },
      {
        question: "Does this include the application itself?",
        answer:
          "It is a core part of registration, not a substitute for the rest of the application. See CQC registration support if you need the full process, not only this document.",
      },
    ],
  ),

  "business-plans": copy(
    "Care business plans and viability modelling",
    "Financial modelling for care providers — rotas, pay, travel and cash flow — built to stand up to the regulator and to a lender, from real cost assumptions.",
    ["cqc-registration", "launch-kit", "consulting", "tender-pricing"],
    [
      section(
        "both-audiences",
        "The regulator and the bank ask different questions",
        "CQC wants to know the service is viable enough to be safe. A lender wants to know the debt gets repaid. We build one plan that answers both, with costs modelled from real rota, pay, travel and cover assumptions — not a template with a 40% margin because the spreadsheet started that way.",
        [
          "Cash flow and break-even from actual visit lengths and travel",
          "Staffing and rota assumptions you can defend in interview",
          "Viability testing against slower-than-hoped occupancy",
          "Board- or lender-ready documentation, not a slide with a hockey stick",
        ],
      ),
      section(
        "second-location",
        "Repeating a model that already works",
        "A second location is not a copy-paste of the first. Travel, management span and local pay all move. We test whether the model still holds before you sign a lease or a registration variation.",
        [
          "Location-level costing, not a group average",
          "Management time costed, not assumed to be free",
          "A view of when the second site starts to drain the first",
          "A document the nominated individual can actually talk through",
        ],
      ),
    ],
    [
      {
        question: "Do you write the plan, or review ours?",
        answer:
          "Either. Founders often need the plan written. Existing providers often need an independent view of a plan that already exists. We will say if the numbers only work on optimism.",
      },
      {
        question: "Will you inflate occupancy so the loan looks better?",
        answer:
          "No. A plan that only works at 95% occupancy in month three is not a plan. We would rather you did not borrow than that you borrowed on a fiction.",
      },
      {
        question: "Is this part of the Launch Kit?",
        answer:
          "A business plan and financial model are in the Launch Kit. This page is the standalone version for providers who already have everything else, or who need the modelling without the full package.",
      },
    ],
  ),

  "interview-readiness": copy(
    "Registered manager and nominated individual interview prep",
    "Fit-person interview preparation for registered managers and nominated individuals, rehearsed against the framework using evidence from your own service.",
    [
      "cqc-registration",
      "statement-of-purpose",
      "inspection-readiness",
      "coaching",
    ],
    [
      section(
        "where-lost",
        "Applications are lost in the interview",
        "The fit-person interview is where a well-prepared file still fails, because the person answering cannot connect the policy to last Tuesday's incident. We rehearse against the framework, with your evidence, until the answers are specific rather than fluent.",
        [
          "Mock interviews against the current assessment approach",
          "Evidence packs organised the way the questions actually come",
          "Written feedback and a short action list, not a vague 'you did well'",
          "Follow-up sessions after you have closed the gaps",
        ],
      ),
      section(
        "ni",
        "Nominated individuals get questions too",
        "If you are accountable for the service, you will be asked about quality, money and safeguarding even if you are not the registered manager. We prepare that conversation separately, so the NI is not hiding behind the RM.",
        [
          "A session aimed at oversight, not day-to-day delivery",
          "The questions that expose whether you actually see the data",
          "Practice saying 'I don't know yet' and then how you would find out",
          "Alignment with what the manager will say in their own interview",
        ],
      ),
    ],
    [
      {
        question: "How many sessions does this take?",
        answer:
          "Usually two or three, plus time you spend on the evidence in between. A single pep-talk the night before is not preparation. If the interview is already booked, we will tell you what can still be done.",
      },
      {
        question: "Do you sit in on the real interview?",
        answer:
          "No. You have to answer. Our job is that you can, using your own service, without sounding coached into someone else's story.",
      },
      {
        question: "What if the manager is new to social care?",
        answer:
          "Then the preparation is longer, and registration may not be the next step. We would rather delay an application than send someone into a fit-person interview they cannot pass.",
      },
    ],
  ),

  "inspection-readiness": copy(
    "CQC inspection preparation for care providers",
    "Ongoing readiness between inspections: rolling audits, mock inspections, an evidence library, and action plans that are actually re-checked.",
    ["policies-procedures", "cqc-registration", "consulting", "hr-documents"],
    [
      section(
        "twelve-months",
        "Inspections are lost in the twelve months before",
        "Providers rarely fail on the day. They fail because audits slipped, incidents were not reviewed, and the evidence library is a shared drive named 'CQC 2022'. This is the routine that keeps the file current so the announced or unannounced visit is a continuation, not a reconstruction.",
        [
          "A rolling audit programme you can run without us in the building",
          "Mock inspections against the quality statements",
          "An evidence library with owners and review dates",
          "Action plans that get re-checked, not filed",
        ],
      ),
      section(
        "after-rating",
        "After a rating you did not want",
        "Requires improvement and inadequate ratings come with an action plan and a re-inspection. We work the plan, not the press release: what would actually change the next judgement, in what order, with whose time.",
        [
          "A prioritised action plan tied to the findings",
          "Support through the follow-up inspection",
          "Governance that can show it has been watching",
          "Honest sequencing — not 40 actions all marked 'this month'",
        ],
      ),
    ],
    [
      {
        question: "Is this a one-off mock inspection?",
        answer:
          "It can be, but the useful version is a routine. A single mock six weeks before an expected visit mostly tells you what you already feared. The rolling version is what changes the next rating.",
      },
      {
        question: "Do you write the evidence for us?",
        answer:
          "We structure it and chase gaps. Fabricating evidence is not the service. If the audit did not happen, the honest move is to start doing it, not to backdate a form.",
      },
      {
        question: "Can this sit alongside a policy refresh?",
        answer:
          "It should. Policies without an audit cycle are decoration. See policies and procedures if the pack itself is the problem.",
      },
    ],
  ),

  /* ---------------------------------------------------------------- AGENCY: tenders */

  "tender-writing": copy(
    "Care tender and bid writing",
    "Tender and bid writing for care providers: scored responses, social value, evidence gathering and mobilisation once the contract is awarded.",
    ["frameworks", "tender-pricing", "consulting", "digital-services"],
    [
      section(
        "evidence-not-price",
        "Most bids are lost on evidence, not price",
        "Evaluators score what you can show, not what you intend. We write the responses, pull the evidence, and keep the submission in one place so an appendix does not go missing at 23:50 on deadline day. After award, we stay through mobilisation — winning and then failing to start is an expensive hobby.",
        [
          "Method statements written to the scoring criteria",
          "Social value responses tied to what you can actually deliver",
          "Evidence gathering and a submission checklist",
          "Post-award mobilisation support",
        ],
      ),
      section(
        "first-time",
        "If this is your first real tender",
        "The documents are long, procedural and unforgiving. We will tell you if you should not bid — wrong geography, no registered manager, a price that cannot work — rather than taking a fee to complete a form that will score zeros.",
        [
          "A go / no-go view before we start writing",
          "Portal and clarification-question discipline",
          "A realistic writing timetable, working back from the deadline",
          "Feedback review if you lose, so the next bid is not the same bid",
        ],
      ),
    ],
    [
      {
        question: "Do you guarantee we will win?",
        answer:
          "No. Anyone who does is selling something else. We will tell you if the bid is weak before you submit it, and we will not bid below cost to chase a logo on the website.",
      },
      {
        question: "Can you bid in an area we do not yet cover?",
        answer:
          "Only if the mobilisation plan is real — staff, CQC, TUPE, premises. Writing 'we will recruit locally' without a plan is how mobilisation fails. See also council and NHS framework applications.",
      },
      {
        question: "What is the difference between this and pricing support?",
        answer:
          "This page is the written response. Pricing and costing support is the rate that sits underneath it. A beautiful method statement on an unsustainable rate is still a bad contract. Use both on a live bid.",
      },
    ],
  ),

  frameworks: copy(
    "Council and NHS care framework applications",
    "Applications to council and NHS/ICB frameworks and dynamic purchasing systems — portal registration, compliance evidence and renewals.",
    [
      "tender-writing",
      "tender-pricing",
      "cqc-registration",
      "inspection-readiness",
    ],
    [
      section(
        "volume",
        "Framework places are where the volume is",
        "Spot purchases do not make a domiciliary business. Frameworks and DPS lists do. Each authority runs its own portal, its own insurance minima, its own policy checklist. Being on one list does not put you on the next. We treat each application as its own job.",
        [
          "Framework and DPS applications end to end",
          "Portal registration and the annual upkeep nobody calendars",
          "Insurance, CQC, policies and training evidence in the form they want",
          "Renewal management before you drop off a list you forgot about",
        ],
      ),
      section(
        "new-authority",
        "Entering a new council area",
        "A new authority means new documentation, often a new statement of purpose geography, and a price that works in that travel pattern. We sequence registration, framework and mobilisation so you are not on a list you cannot serve.",
        [
          "A checklist of what this authority actually requires",
          "Alignment with your CQC locations and statement of purpose",
          "Rates that include the travel this catchment implies",
          "A view of whether the list is worth being on",
        ],
      ),
    ],
    [
      {
        question: "Is a DPS the same as a framework?",
        answer:
          "Similar idea, different mechanics — often easier to join, easier to forget to keep live. We will use the authority's name for it and follow that process, not a generic 'framework' template.",
      },
      {
        question: "We are on the list and get no work.",
        answer:
          "That is common. Being appointed is not the same as being used. Call-offs, mini-competitions and relationships with brokerage all sit after the application. Tender writing and pricing support are usually the next conversation.",
      },
      {
        question: "Can you keep the portal logins for us?",
        answer:
          "We can run renewals with you; the accounts should remain in your name. A provider that cannot log into its own DPS is a mobilisation risk.",
      },
    ],
  ),

  "tender-pricing": copy(
    "Care tender pricing and costing",
    "Rates modelled from real pay, travel, cover and overhead so a won care contract is still worth delivering — break-even analysis and contract review.",
    ["tender-writing", "frameworks", "business-plans", "consulting"],
    [
      section(
        "below-cost",
        "Winning below cost is worse than losing",
        "The rate has to survive the whole contract term, including the mileage nobody put in the spreadsheet and the cover for sickness. We model from actual rota data where you have it, and from honest assumptions where you do not. If the authority's ceiling is below your break-even, the advice is not to bid.",
        [
          "Cost modelling from real visit lengths, pay and travel",
          "Rate cards and break-even by package type",
          "Margin testing against occupancy and missed visits",
          "Review of rates on contracts you already hold",
        ],
      ),
      section(
        "thin-margin",
        "When the work is coming in and the money is not",
        "Usually travel, unused rostered time, or training were under-modelled. We find which, and whether the contract can be renegotiated or should be exited rather than quietly bankrupting the round.",
        [
          "A diagnosis of where the margin went",
          "A view of which packages are carrying the rest",
          "Language for a rate review if the contract allows it",
          "A stop-loss recommendation if it does not",
        ],
      ),
    ],
    [
      {
        question: "Do you fill in the pricing schedule for us?",
        answer:
          "Yes, from the model. You still sign it. If a cell in the schedule would commit you to a rate we have not tested, we will not invent a number to make the form validate.",
      },
      {
        question: "Can you price a live-in contract the same way as visiting?",
        answer:
          "No. Live-in has different rest, relief and on-call economics. Mixing the two in one blended hourly rate is how people lose money for three years.",
      },
      {
        question: "Will this work for a first bid with no historic data?",
        answer:
          "We will use sector-typical assumptions and label them as such. A first bid priced on hope is still a first bid priced on hope; we just will not hide that.",
      },
    ],
  ),

  /* ---------------------------------------------------------------- AGENCY: brand */

  "digital-services": copy(
    "Websites for care providers",
    "Care-provider websites built for local search and for the families and commissioners who check you before they call — enquiry capture included.",
    ["branding-kits", "social-presence", "tender-writing", "cqc-registration"],
    [
      section(
        "looked-up-first",
        "Everyone looks you up first",
        "Families, social workers and commissioners search before they enquire. The site has to load, read clearly, name the areas you actually cover, and make it obvious how to get in touch. A brochure that does not rank in the postcodes you serve is a brochure.",
        [
          "Design and build aimed at care enquiries, not generic SMEs",
          "Local search: areas, services, and pages that can actually rank",
          "Enquiry forms that reach a person, with a paper trail",
          "Hosting and maintenance so the SSL certificate is not the next crisis",
        ],
      ),
      section(
        "recruit",
        "Carers check you too",
        "A site that only talks to families and ignores candidates is leaving shifts unfilled. Job pages, a clear DBS and training story, and a way to apply that is not a buried mailto: all belong on the same site.",
        [
          "Careers pages that say what the work actually is",
          "Consistency with your social and print, so you look like one organisation",
          "Analytics you will look at, not a dashboard nobody opens",
          "A free digital audit first if you are not sure the current site is the problem",
        ],
      ),
    ],
    [
      {
        question: "Will we rank number one for 'home care' plus our town?",
        answer:
          "Not because we said so in a proposal. Local search is competitive and slow. We will build pages that can rank and tell you what else (citations, CQC profile, Google Business) has to be true.",
      },
      {
        question: "Can you take over a site someone else built?",
        answer:
          "Often yes. Sometimes the honest advice is to rebuild. We will say which after looking at it — that is what the digital audit is for.",
      },
      {
        question: "Does this include branding?",
        answer:
          "A site needs an identity to work from. If you do not have one, see branding kits. If you do, we will use it rather than inventing a second logo.",
      },
    ],
  ),

  "branding-kits": copy(
    "Care provider branding and credibility kits",
    "Identity, print and digital collateral so a new care provider looks established to commissioners, families and candidates — plus reusable templates.",
    ["digital-services", "social-presence", "launch-kit", "tender-writing"],
    [
      section(
        "visual-first",
        "Credibility is visual before it is anything else",
        "A commissioner, a family and a candidate each see you for a few seconds first. The kit covers those first seconds: name, mark, colour, a tone of voice that does not sound like a template, and the documents you will actually send. It is not a 90-page brand book nobody opens.",
        [
          "Identity and logo you can use in print and on a van",
          "Print and digital collateral: letterhead, one-pagers, social avatars",
          "Tone and messaging you can reuse in tenders without rewriting your soul",
          "Templates for the next brochure so you are not back in Canva from scratch",
        ],
      ),
      section(
        "tender-ready",
        "The bid will be read next to your website",
        "Inconsistency between the tender, the site and the leaflet costs marks and trust. We align them. If you are mid-rebrand because ownership changed, we will treat the old name as a migration, not a secret.",
        [
          "A single story across site, social and submissions",
          "File formats that procurement portals will actually accept",
          "Handover so your admin team can produce a leaflet without calling us",
          "Optional website build if the public face is still a holding page",
        ],
      ),
    ],
    [
      {
        question: "We already have a logo. Do we need this?",
        answer:
          "Maybe not the mark — maybe the rest. Many providers have a logo and nothing that survives being printed, embroidered or put on a PDF. We will not charge you to replace a mark that works.",
      },
      {
        question: "Is this in the Launch Kit?",
        answer:
          "Brand, website and collateral are part of the Launch Kit. This page is the standalone identity piece for providers who are already trading and look like they started yesterday.",
      },
      {
        question: "Will you make us look like every other teal care brand?",
        answer:
          "Not on purpose. Care has visual clichés for a reason — they photograph well — but the job is to look established and specific, not fashionable.",
      },
    ],
  ),

  "social-presence": copy(
    "Social media setup for care providers",
    "Care-provider social accounts set up properly, with starter content and a posting routine you can keep — including recruitment-focused templates.",
    ["digital-services", "branding-kits", "staffing", "launch-kit"],
    [
      section(
        "alive",
        "An abandoned page is worse than no page",
        "Social workers, families and candidates all look. A last post from 2021 reads as a service that stopped. We set the accounts up, brand them consistently, give you starter content, and hand over a routine a busy registered manager can actually keep — not a 30-post-a-week calendar that dies in week two.",
        [
          "Account setup and branding across the channels you will really use",
          "Starter content so the grid is not empty on day one",
          "A posting routine measured in what you can sustain",
          "Recruitment templates that do not sound like a supermarket shift ad",
        ],
      ),
      section(
        "which-channels",
        "You do not need every platform",
        "A Facebook page families use, an Instagram that shows the work, a LinkedIn the nominated individual can live with — pick the ones you will staff. We will not open five accounts to fill a slide.",
        [
          "A channel recommendation based on who you need to reach",
          "Handover of logins and brand assets in your name",
          "Guidance on what not to post from a regulated service",
          "A link back to the website so social is not a dead end",
        ],
      ),
    ],
    [
      {
        question: "Will you run the accounts for us forever?",
        answer:
          "This offer is setup and a routine you own. Ongoing management is a different conversation. Most small providers are better running a light routine themselves than paying for posts that do not sound like them.",
      },
      {
        question: "What about CQC and photos of people we support?",
        answer:
          "Consent, dignity and 'could this identify someone' come first. We will not build a content plan that depends on photographing clients. Staff and premises, with consent, are usually enough.",
      },
      {
        question: "Does this help recruitment?",
        answer:
          "Local care roles are filled locally and socially. An empty page does not fill a rota. Templates for vacancies are part of the handover — see also recruitment and staffing if the gap is workers, not posts.",
      },
    ],
  ),

  /* ---------------------------------------------------------------- AGENCY: staffing */

  staffing: copy(
    "Care recruitment and temporary staffing",
    "Vetted carers and support workers for other providers — permanent, temporary and temp-to-perm — with files complete before the first shift.",
    ["hr-documents", "launch-kit", "consulting", "cqc-registration"],
    [
      section(
        "safe-and-fast",
        "Cover has to be safe as well as fast",
        "Gaps in the rota are how visits get missed. We supply permanent, temporary and temp-to-perm carers whose files are complete before they arrive: enhanced DBS, right to work, references, training. You should be able to show an inspector the same file we showed you.",
        [
          "Permanent recruitment for roles you want to keep",
          "Temporary and bank cover when the rota is short",
          "Temp-to-perm when you want to try before you employ",
          "Registered manager search — the role the service cannot run without",
        ],
      ),
      section(
        "eas",
        "How the staffing arm is regulated",
        "Rakuxon Staffing operates under the Conduct of Employment Agencies and Employment Businesses Regulations 2003. That is a different regime from CQC, and it matters for how we introduce workers and how you evidence safe recruitment.",
        [
          "Enhanced DBS and right-to-work checks on every worker",
          "Reference checks before placement",
          "Mandatory training and Care Certificate tracking",
          "An audit trail you can put in the inspection folder",
        ],
      ),
    ],
    [
      {
        question: "Are these your carers or ours once they start?",
        answer:
          "Permanent placements become your employees. Temporary workers remain ours for the assignment. Temp-to-perm is the bridge. We will put that in writing so TUPE and holiday pay are not a surprise.",
      },
      {
        question: "Can you fill a registered manager vacancy?",
        answer:
          "We search. It is a hard role to fill and we will not pretend otherwise. A service that cannot recruit an RM has a registration problem, not only a recruitment problem — see interview readiness and CQC registration.",
      },
      {
        question: "How quickly can temporary cover start?",
        answer:
          "As quickly as a complete file allows. Same-day cover with no DBS is not a product we sell. If you need that, you need a different conversation about your own bank.",
      },
    ],
  ),

  "hr-documents": copy(
    "HR documents for care employers",
    "Contracts, staff handbook, supervision and disciplinary procedures written for care employers — the paperwork inspection and employment law both ask for.",
    ["staffing", "policies-procedures", "inspection-readiness", "launch-kit"],
    [
      section(
        "this-sector",
        "Care employers carry obligations most templates ignore",
        "Off-the-shelf contracts do not mention the Care Certificate, on-call, mileage, or what happens when a shift is cancelled. The pack is written for this sector and kept current. Safe recruitment is evidenced through the file; gaps become findings.",
        [
          "Contracts of employment that fit visiting and live-in work",
          "A staff handbook people might actually read",
          "Supervision and appraisal templates you can run monthly",
          "Disciplinary and grievance procedures that match ACAS and your policies",
        ],
      ),
      section(
        "inspection",
        "The folder the inspector will ask for",
        "Who was recruited how, who has had supervision, who is overdue training. We line the HR pack up with the CQC policy suite so the two stories match. See policies and procedures if the quality pack is the other half of the gap.",
        [
          "Recruitment checklists aligned to safer recruitment",
          "Supervision records that show it happened",
          "A clear split between employed staff and agency workers",
          "Handover so your office can run the system without us",
        ],
      ),
    ],
    [
      {
        question: "Are these legally reviewed?",
        answer:
          "They are written for this sector against current employment practice. They are not a substitute for advice on a live dispute. If you are already in tribunal territory, you need a solicitor, not a handbook.",
      },
      {
        question: "Can you update contracts we already issued?",
        answer:
          "We can draft the new versions and a process for introducing them. Changing terms for existing staff is not a search-and-replace; we will say when you need to consult, not just reprint.",
      },
      {
        question: "Is this in the Launch Kit?",
        answer:
          "HR documents are part of launching as an employer. The Launch Kit includes them. This page is for providers who already trade and whose contracts have not kept up.",
      },
    ],
  ),

  /* ---------------------------------------------------------------- AGENCY: advisory */

  consulting: copy(
    "Consulting for care businesses",
    "Business planning, governance and growth advice from people running a regulated care service — viability, quality assurance and a retainer if you want an ongoing view.",
    ["coaching", "launch-kit", "cqc-registration", "business-plans"],
    [
      section(
        "operators",
        "Advice from the same side of the framework",
        "Consulting here means sitting with the same inspection, rotas and brokerage calls you have, not a strategy deck that could have been written for a gym chain. We will tell you if the next step is registration, a tender, a stop, or a conversation you are avoiding with your nominated individual.",
        [
          "Business planning and viability, including 'do not do this'",
          "Governance and quality assurance that would survive a visit",
          "Growth planning that costs management time honestly",
          "An advisory retainer when you want a regular external view",
        ],
      ),
      section(
        "when-not",
        "When you do not need a consultant",
        "If the blocker is a single document, buy that piece — policies, a statement of purpose, a bid. If the blocker is a decision, coaching may be cheaper. Consulting is for when the pieces have to fit together and nobody in the building can see the join.",
        [
          "A scoped engagement with an end, not an open tab",
          "Written recommendations you can show a board or a lender",
          "Introductions into the other service lines only where they are the next step",
          "No retainer sold to a founder who needed a one-off plan",
        ],
      ),
    ],
    [
      {
        question: "How is this different from coaching?",
        answer:
          "Coaching is a session with an agenda you set. Consulting is a piece of work with a deliverable — a plan, a governance structure, a growth options paper. Many clients use both.",
      },
      {
        question: "Will you join our board?",
        answer:
          "Not as a silent director for a logo. If you want ongoing oversight, that is a retainer with a defined role, not a title on Companies House we do not exercise.",
      },
      {
        question: "Do you only work with new providers?",
        answer:
          "No. Pre-start founders, existing providers, and people buying a service are all in scope. The first conversation is which of those you actually are — they need different work.",
      },
    ],
  ),

  coaching: copy(
    "Coaching for care founders and registered managers",
    "One-to-one sessions with someone who has done the thing you are about to do — booked by the session, agenda set by you, written follow-up.",
    ["consulting", "interview-readiness", "launch-kit", "cqc-registration"],
    [
      section(
        "decision",
        "When the blocker is a decision, not a document",
        "Sometimes you do not need a policy pack. You need to talk through whether to apply, whether to take a contract, whether to fire a manager, whether the numbers work. Coaching is booked by the session, with no package required. The agenda is yours.",
        [
          "One-to-one sessions, in person or on a call",
          "Booked individually or as a short block",
          "Agenda set by you in advance so the hour is not spent on context",
          "Written follow-up so the decisions do not evaporate",
        ],
      ),
      section(
        "new-rm",
        "New registered managers",
        "You are accountable now and the awkward questions have nowhere safe to go. A session is often worth more than another e-learning module. We will not pretend coaching replaces interview preparation if a fit-person date is already in the diary.",
        [
          "A confidential space that is not your nominated individual",
          "Practice for conversations you are dreading",
          "Signposting into interview prep or inspection readiness when that is the real need",
          "No upsell mid-session if you only wanted the hour",
        ],
      ),
    ],
    [
      {
        question: "Is this clinical or executive coaching?",
        answer:
          "Neither brand. It is operational: registration, people, money, inspection. If you need a therapist or an ICF-accredited coach, that is a different professional.",
      },
      {
        question: "Can a session turn into consulting?",
        answer:
          "Yes, if both sides agree and the scope is written down. The session itself stays a session. We will not quietly start a project you did not buy.",
      },
      {
        question: "Do I need to be a client of the other services first?",
        answer:
          "No. Coaching is available on its own. If it becomes obvious you need the Launch Kit or a bid writer, we will say so and stop.",
      },
    ],
  ),

  "launch-kit": copy(
    "Care business launch kit",
    "A fixed-scope package from nothing to a registered, trading care business: registration, policies, brand, website, financial model and launch support.",
    [
      "cqc-registration",
      "digital-services",
      "branding-kits",
      "staffing",
      "business-plans",
    ],
    [
      section(
        "one-package",
        "One package, a known price, the systems we actually run",
        "Assembling six suppliers while you are also trying to register is how launches stall. The Launch Kit is the productised route: governance and registration, HR and operations documents, presence and credibility, and handover. Built from the same systems behind our own service, not a franchise manual from another market.",
        [
          "Registration and policy suite, including statement of purpose",
          "Brand, website and the collateral a commissioner will see",
          "Business plan and financial model",
          "Launch support until you are actually taking packages",
        ],
      ),
      section(
        "stalled",
        "If you started and then went quiet",
        "Many founders have a half-written application and a logo in a WhatsApp chat. We will inventory what you already have, what is still outstanding, and whether buying the kit is cheaper than finishing the pieces separately. Buyers of an existing service use the same inventory to see what they have actually bought.",
        [
          "A gap analysis against a launch-ready file",
          "Credit for work already done, not a forced restart",
          "A sequence: what must be true before you submit, before you trade, before you tender",
          "Handover so you are not paying us to find your own policies in year two",
        ],
      ),
    ],
    [
      {
        question: "What is included, exactly?",
        answer:
          "Governance and registration, HR documents, operations templates, and presence and credibility items. The grouped list lives on this site with the Launch Kit contents — ask for the current pack list on the call so you are buying this year's version, not a screenshot from a deck.",
      },
      {
        question: "Does the kit guarantee CQC registration?",
        answer:
          "No. It puts you in a position to apply properly. The decision is the regulator's, and the fit-person interview is still yours to pass. See interview readiness if that is the weak point.",
      },
      {
        question: "Can I buy only the website, or only the policies?",
        answer:
          "Yes — those are standalone services. The kit exists for people who would otherwise project-manage six of them. If you only need one piece, buy that piece.",
      },
    ],
  ),
};
