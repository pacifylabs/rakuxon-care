import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { Hub, type HubCluster } from "@/components/marketing/hub";
import {
  AGENCY_CLUSTERS,
  AGENCY_EXTRA_PAGES,
  serviceHref,
} from "@/lib/clusters";
import { SERVICE_ICONS } from "@/lib/service-icons";
import { getServicesByArm } from "@/lib/cms";
import { PHOTOS } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Care business services",
  description:
    "CQC registration, tenders and frameworks, branding and digital, staffing and advisory for care businesses.",
  path: "/agency",
});

/* 04_SITE_ARCHITECTURE §3.2 — the B2B hub for /agency/*. */
export default async function AgencyHubPage() {
  const services = await getServicesByArm("agency");

  const clusters: HubCluster[] = AGENCY_CLUSTERS.map((meta) => {
    const fromCatalogue = services
      .filter((s) => s.cluster === meta.id)
      .map((s) => ({
        key: s.slug,
        title: s.title,
        body: s.summary,
        href: serviceHref(s),
        icon: SERVICE_ICONS[s.slug],
      }));
    const extras = AGENCY_EXTRA_PAGES.filter((p) => p.cluster === meta.id).map(
      (p) => ({
        key: p.slug,
        title: p.title,
        body: p.summary,
        href: `/agency/${p.slug}`,
        icon: SERVICE_ICONS[p.slug],
      }),
    );
    return { meta, cards: [...fromCatalogue, ...extras] };
  });

  return (
    <Hub
      lane="b2b"
      eyebrow="Rakuxon Care Agency"
      title="We run the care service we help others build"
      subtitle="Registration, tenders, brand, staffing and advisory for care businesses — built from the systems we use in our own regulated service."
      photo={PHOTOS.businessMeeting}
      primaryCta={{ label: "Book a free call", href: "/agency/book-a-call" }}
      secondaryCta={{
        label: "Care Business Launch Kit",
        href: "/agency/launch-kit",
      }}
      clusters={clusters}
      fallbackIcon={Building2}
      crumbs={[{ label: "Home", href: "/" }, { label: "Care businesses" }]}
      otherLane={{
        title: "Looking for care at home?",
        body: "Personal care, visiting support, live-in and respite — assessed at home and written into a plan you agree.",
        href: "/care",
        cta: "Care at home",
      }}
    />
  );
}
