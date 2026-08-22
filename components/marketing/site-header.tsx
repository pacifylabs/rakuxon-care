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

  const agencyNavTitle: Record<string, string> = {
    "interview-readiness": "Manager and NI preparation",
    frameworks: "Council and NHS frameworks",
    consulting: "Consulting and advisory",
    coaching: "Coaching sessions",
    "hr-documents": "HR document pack",
    staffing: "Recruitment and staffing",
    "statement-of-purpose": "Statement of purpose",
  };

  const agencyClusters: NavCluster[] = AGENCY_CLUSTERS.map((meta) => ({
    label: meta.eyebrow,
    links: [
      ...agencyServices
        .filter((s) => s.cluster === meta.id)
        .map((s) => ({
          label: agencyNavTitle[s.slug] ?? s.title,
          href: serviceHref(s),
        })),
      ...AGENCY_EXTRA_PAGES.filter((p) => p.cluster === meta.id).map((p) => ({
        label: p.title,
        href: `/agency/${p.slug}`,
      })),
    ],
  }));

  const agencyColumns: NavCluster[][] = [
    agencyClusters.slice(0, 1),
    agencyClusters.slice(1, 3),
    agencyClusters.slice(3, 5),
  ];

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
      label: "Care business services",
      href: "/agency",
      blurb: "CQC, tenders, digital and staffing",
      clusters: agencyClusters,
      columns: agencyColumns,
    },
  };

  return <SiteNav lanes={lanes} />;
}
