import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";
import { PHOTOS } from "@/lib/images";

export const metadata: Metadata = {
  title: "Refer or request care",
  description:
    "Start a care enquiry, or refer someone as a social worker, discharge team or family member.",
};

export default function ReferPage() {
  return (
    <UtilityPage
      lane="b2c"
      eyebrow="Request care"
      title="Refer or request care"
      intro="One form for families, social workers and discharge teams. It reaches the same pipeline as every other enquiry, tagged by where it started."
      photo={PHOTOS.coupleAtHome}
      pointsTitle="What happens next"
      points={[
        "We call back to understand the situation",
        "A free assessment at home, at no obligation",
        "A written care plan you agree before anything starts",
        "Care begins, with the plan reviewed as needs change",
      ]}
      cta={{ label: "Start an enquiry", href: "/contact?intent=care" }}
      secondaryCta={{ label: "Fees and funding", href: "/care/fees-funding" }}
    />
  );
}
