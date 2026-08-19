import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";
import { PHOTOS } from "@/lib/images";

export const metadata: Metadata = {
  title: "Areas we cover",
  description:
    "Where Rakuxon Care currently delivers personal and domiciliary care at home.",
};

export default function AreasWeCoverPage() {
  return (
    <UtilityPage
      lane="b2c"
      eyebrow="Coverage"
      title="Areas we cover"
      intro="Coverage is set by how far a carer can reliably travel between calls. Regions are pending confirmation — see the note below."
      photo={PHOTOS.carerMobility}
      pointsTitle="How we decide coverage"
      points={[
        "Travel time between calls, not straight-line distance",
        "Enough local carers to cover sickness and leave",
        "Continuity — the same small team wherever possible",
        "Council and ICB framework areas we hold places on",
      ]}
      cta={{ label: "Check your area", href: "/care/refer" }}
      secondaryCta={{ label: "Fees and funding", href: "/care/fees-funding" }}
    />
  );
}
