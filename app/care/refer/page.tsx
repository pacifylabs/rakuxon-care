import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";
import { PHOTOS } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Refer or request home care",
  description:
    "Start a care enquiry, or refer someone as a social worker, discharge team or family member.",
  path: "/care/refer",
});

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
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Care services", href: "/care" },
        { label: "Request care" },
      ]}
      related={[
        {
          slug: "fees-funding",
          href: "/care/fees-funding",
          title: "Fees and funding",
          summary: "What care costs and who pays for it.",
        },
        {
          slug: "areas-we-cover",
          href: "/care/areas-we-cover",
          title: "Areas we cover",
          summary: "Where we currently deliver care.",
        },
        {
          slug: "cqc-rating",
          href: "/care/cqc-rating",
          title: "Our CQC rating",
          summary: "Registration status and inspection history.",
        },
      ]}
    />
  );
}
