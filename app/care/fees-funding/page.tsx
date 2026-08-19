import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";
import { PHOTOS } from "@/lib/images";

export const metadata: Metadata = {
  title: "Fees and funding",
  description:
    "What home care costs, and the funding routes available — council funding, NHS Continuing Healthcare, direct payments and private pay.",
};

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
    />
  );
}
