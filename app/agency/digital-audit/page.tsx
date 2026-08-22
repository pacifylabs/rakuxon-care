import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";
import { PHOTOS } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Free digital audit for care providers",
  description:
    "A free review of how your care business looks to families, commissioners and candidates online.",
  path: "/agency/digital-audit",
});

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
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Care businesses", href: "/agency" },
        { label: "Digital audit" },
      ]}
      related={[
        {
          slug: "digital-services",
          href: "/agency/digital-services",
          title: "Website and digital",
          summary: "A website built for local search and enquiry capture.",
        },
        {
          slug: "branding-kits",
          href: "/agency/branding-kits",
          title: "Branding kits",
          summary: "Identity and collateral that make a new provider look established.",
        },
        {
          slug: "social-presence",
          href: "/agency/social-presence",
          title: "Social presence",
          summary: "Accounts set up properly, with a routine you can keep.",
        },
      ]}
    />
  );
}
