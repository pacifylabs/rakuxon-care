import type { Metadata } from "next";
import { HeartHandshake } from "lucide-react";
import { Hub, type HubCluster } from "@/components/marketing/hub";
import { CARE_CLUSTERS, CARE_TRUST_PAGES, serviceHref } from "@/lib/clusters";
import { SERVICE_ICONS } from "@/lib/service-icons";
import { getServicesByArm } from "@/lib/cms";
import { PHOTOS } from "@/lib/images";

export const metadata: Metadata = {
  title: "Care services",
  description:
    "CQC-registered personal care, home care, live-in and respite support delivered in the person's own home. For families, councils, ICBs and NHS Continuing Healthcare.",
};

/* 04_SITE_ARCHITECTURE §3.1 — the B2C hub for /care/*. */
export default async function CareHubPage() {
  const services = await getServicesByArm("care");

  const clusters: HubCluster[] = CARE_CLUSTERS.map((meta) => {
    const cards =
      meta.id === "care-trust"
        ? CARE_TRUST_PAGES.map((p) => ({
            key: p.slug,
            title: p.title,
            body: p.summary,
            href: `/care/${p.slug}`,
            icon: SERVICE_ICONS[p.slug],
          }))
        : services
            .filter((s) => s.cluster === meta.id)
            .map((s) => ({
              key: s.slug,
              title: s.title,
              body: s.summary,
              href: serviceHref(s),
              icon: SERVICE_ICONS[s.slug],
            }));
    return { meta, cards };
  });

  return (
    <Hub
      lane="b2c"
      eyebrow="Rakuxon Care"
      title="Care at home, arranged properly"
      subtitle="A CQC-registered provider of personal and domiciliary care. We assess at home, write the plan with you, and start when you are ready."
      photo={PHOTOS.coupleAtHome}
      primaryCta={{ label: "Request care", href: "/care/refer" }}
      secondaryCta={{ label: "Fees and funding", href: "/care/fees-funding" }}
      clusters={clusters}
      fallbackIcon={HeartHandshake}
    />
  );
}
