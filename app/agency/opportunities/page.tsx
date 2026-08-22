import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";
import { PHOTOS } from "@/lib/images";

export const metadata: Metadata = {
  title: "Tender opportunities",
  description:
    "Where adult social care tenders and framework opportunities are published in the UK, how to find them, and how Rakuxon Care Agency helps providers respond.",
};

/*
 * The live feed in the architecture doc needs a real data source, which does
 * not exist yet. Rather than list invented tenders, this page points at the
 * genuine public portals where opportunities are actually published — all of
 * them real, named UK government services a provider can use today.
 */
export default function OpportunitiesPage() {
  return (
    <UtilityPage
      lane="b2b"
      eyebrow="Tenders and frameworks"
      title="Where opportunities are published"
      intro="Adult social care contracts are advertised in public. These are the places to watch, and what to have ready before one appears."
      photo={PHOTOS.businessPlanning}
      pointsTitle="Have these ready before you bid"
      points={[
        "CQC registration for the regulated activity being tendered",
        "Policies and procedures that match how you actually operate",
        "Insurance, accounts and safeguarding evidence, all in date",
        "Rates modelled from real pay, travel and cover costs",
        "Case evidence and social value responses you can adapt quickly",
      ]}
      cta={{ label: "Talk about a live bid", href: "/agency/book-a-call" }}
      secondaryCta={{
        label: "Tender and bid writing",
        href: "/agency/tender-writing",
      }}
      notes={[
        {
          title: "Find a Tender",
          body: [
            "The UK government service that publishes higher-value public contract notices, including adult social care. It replaced the UK's use of the EU journal, and it is the first place a large council or NHS opportunity appears.",
            "Worth watching even if the values look out of reach: framework notices published here often admit smaller providers as subcontractors or through later rounds.",
          ],
        },
        {
          title: "Contracts Finder",
          body: [
            "Carries lower-value contracts and opportunities from central government, councils and the wider public sector in England, including many smaller domiciliary care packages.",
            "This is where most first contracts for a newly registered provider will be found.",
          ],
        },
        {
          title: "Authority and ICB portals",
          body: [
            "Individual local authorities and integrated care boards run their own procurement portals and dynamic purchasing systems. Registering on the portals covering the areas you serve matters more than watching any single national site.",
            "A dynamic purchasing system can admit new providers between formal tender rounds, so a place on one is often the fastest route into an authority.",
          ],
        },
        {
          title: "Why there is no live feed here yet",
          body: [
            "A feed has to be accurate to be useful. Listing opportunities we have not verified, with closing dates we cannot guarantee, would cost a provider a bid rather than win one.",
            "Until it is connected to a real source, this page points at the portals themselves, which are free, public and updated continuously.",
          ],
        },
      ]}
    />
  );
}
