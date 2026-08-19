import {
  AGENCY_CLUSTERS,
  AGENCY_EXTRA_PAGES,
  CARE_CLUSTERS,
  CARE_TRUST_PAGES,
  serviceHref,
} from "@/lib/clusters";
import { getArms, getServicesByArm } from "@/lib/cms";
import { SiteNav, type NavCluster, type NavLane } from "./site-nav";

/* Server wrapper: both mega-menus are built from the catalogue's cluster
   field, so nav, footer and hubs cannot drift apart. */
export async function SiteHeader() {
  const [armList, careServices, agencyServices] = await Promise.all([
    getArms(),
    getServicesByArm("care"),
    getServicesByArm("agency"),
  ]);
  const [armOne, armTwo] = armList;

  const careClusters: NavCluster[] = CARE_CLUSTERS.map((meta) => ({
    label: meta.label,
    links:
      meta.id === "care-trust"
        ? CARE_TRUST_PAGES.map((p) => ({
            label: p.title,
            href: `/care/${p.slug}`,
          }))
        : careServices
            .filter((s) => s.cluster === meta.id)
            .map((s) => ({ label: s.title, href: serviceHref(s) })),
  }));

  const agencyClusters: NavCluster[] = AGENCY_CLUSTERS.map((meta) => ({
    label: meta.label,
    links: [
      ...agencyServices
        .filter((s) => s.cluster === meta.id)
        .map((s) => ({ label: s.title, href: serviceHref(s) })),
      ...AGENCY_EXTRA_PAGES.filter((p) => p.cluster === meta.id).map((p) => ({
        label: p.title,
        href: `/agency/${p.slug}`,
      })),
    ],
  }));

  const lanes: { care: NavLane; agency: NavLane } = {
    care: {
      trigger: "For individuals & families",
      eyebrow: armOne.name,
      label: "Care at home",
      href: "/care",
      blurb: armOne.audience,
      clusters: careClusters,
    },
    agency: {
      trigger: "For care businesses",
      eyebrow: armTwo.name,
      label: "Build and grow a care business",
      href: "/agency",
      blurb: armTwo.audience,
      clusters: agencyClusters,
    },
  };

  return <SiteNav lanes={lanes} />;
}
