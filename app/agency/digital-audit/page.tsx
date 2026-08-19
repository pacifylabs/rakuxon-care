import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";
import { PHOTOS } from "@/lib/images";

export const metadata: Metadata = {
  title: "Free digital audit",
  description:
    "A free review of how your care business looks to families, commissioners and candidates online.",
};

export default function DigitalAuditPage() {
  return (
    <UtilityPage
      lane="b2b"
      eyebrow="Free audit"
      title="Free digital audit"
      intro="A short written review of what a family, a commissioner and a candidate each find when they look you up."
      photo={PHOTOS.businessPlanning}
      pointsTitle="What the audit covers"
      points={[
        "How you rank for local care searches",
        "Whether your site converts an enquiry",
        "How your brand reads against competitors",
        "Whether recruitment traffic has anywhere to land",
      ]}
      cta={{ label: "Request the audit", href: "/contact?intent=audit" }}
      secondaryCta={{
        label: "Website and digital",
        href: "/agency/digital-services",
      }}
    />
  );
}
