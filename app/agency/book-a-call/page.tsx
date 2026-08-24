import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";
import { PHOTOS } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a free care-business consultation",
  description:
    "Book a free consultation with people who advise care businesses on registration, tenders, brand and staffing.",
  path: "/agency/book-a-call",
});

export default function BookACallPage() {
  return (
    <UtilityPage
      lane="b2b"
      eyebrow="Book a call"
      title="Book a free consultation"
      intro="A call with someone who runs a regulated service, not a salesperson. Booking is handled by the shared calendar engine — see the note below."
      photo={PHOTOS.businessMeeting}
      pointsTitle="What to expect"
      points={[
        "Thirty minutes, no charge and no obligation",
        "A straight answer on whether we can help",
        "Rough timescales and what it would cost",
        "Written follow-up with the next step",
      ]}
      cta={{ label: "Request a call", href: "/contact?intent=call" }}
      secondaryCta={{
        label: "Care Business Launch Kit",
        href: "/agency/launch-kit",
      }}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Care businesses", href: "/agency" },
        { label: "Book a call" },
      ]}
      related={[
        {
          slug: "launch-kit",
          href: "/agency/launch-kit",
          title: "Care Business Launch Kit",
          summary:
            "The productised route from nothing to a trading care business.",
        },
        {
          slug: "cqc-registration",
          href: "/agency/cqc-registration",
          title: "CQC registration support",
          summary:
            "End-to-end registration, from application through to the decision.",
        },
        {
          slug: "consulting",
          href: "/agency/consulting",
          title: "Consulting",
          summary: "Planning, governance and growth advice.",
        },
      ]}
    />
  );
}
