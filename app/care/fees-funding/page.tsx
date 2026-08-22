import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";
import { PHOTOS } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Fees and funding for home care",
  description:
    "What home care costs, and the funding routes available — council funding, NHS Continuing Healthcare, direct payments and private pay.",
  path: "/care/fees-funding",
});

export default function FeesFundingPage() {
  return (
    <UtilityPage
      lane="b2c"
      eyebrow="Fees and funding"
      title="What care costs, and who pays"
      intro="Rates depend on the package, not a headline figure. Funding routes are set out below; published pricing is a pending decision."
      photo={PHOTOS.familySupport}
      pointsTitle="Funding routes"
      points={[
        "Local authority funded packages",
        "NHS Continuing Healthcare",
        "Direct payments and personal budgets",
        "Private pay, invoiced monthly",
      ]}
      cta={{ label: "Ask about funding", href: "/care/refer" }}
      secondaryCta={{ label: "Areas we cover", href: "/care/areas-we-cover" }}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Care services", href: "/care" },
        { label: "Fees and funding" },
      ]}
      related={[
        {
          slug: "refer",
          href: "/care/refer",
          title: "Request care",
          summary: "Start an enquiry or refer someone.",
        },
        {
          slug: "personal-care",
          href: "/care/personal-care",
          title: "Personal care",
          summary: "Hands-on support with washing, dressing and medication.",
        },
        {
          slug: "home-care",
          href: "/care/home-care",
          title: "Home care",
          summary: "Scheduled visits arranged around the household.",
        },
      ]}
    />
  );
}
