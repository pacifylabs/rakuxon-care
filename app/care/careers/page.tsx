import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";
import { PHOTOS } from "@/lib/images";

export const metadata: Metadata = {
  title: "Join as a carer",
  description:
    "Care roles at Rakuxon Care — personal care, domiciliary visits, live-in and specialist packages.",
};

export default function CareCareersPage() {
  return (
    <UtilityPage
      lane="b2c"
      eyebrow="Join us"
      title="Join as a carer"
      intro="Care roles across our own regulated service. Vetting runs through the same compliance hub that backs our staffing side."
      photo={PHOTOS.careTeamGroup}
      pointsTitle="What we check before your first shift"
      points={[
        "Enhanced DBS check",
        "Right to work in the UK",
        "Two references, verified",
        "Care Certificate progress tracked",
      ]}
      cta={{ label: "Register your interest", href: "/contact" }}
      secondaryCta={{ label: "All careers", href: "/careers" }}
    />
  );
}
