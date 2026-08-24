import {
  ARMS,
  BUSINESS_PROCESS,
  CARE_PROCESS,
  DEMAND_STATS,
  FAQS,
  LAUNCH_KIT,
  MARKET_STATS,
  MARKET_STATS_COMPACT,
  SEGMENTS,
  SERVICES,
  SITE_SETTINGS,
  STAFFING_SAFEGUARDS,
  TEAM,
  TESTIMONIALS,
} from "./data";
import type { Arm, Lane } from "./types";

export * from "./types";
export {
  relatedExtras,
  relatedFromCatalogue,
  type RelatedPage,
} from "./related";

/**
 * Accessors are async so Phase 4 can swap the stub dataset for real CMS
 * calls without touching a call site.
 */
const matchesLane = (lane: Lane, filter?: Lane) =>
  !filter || filter === "both" || lane === filter || lane === "both";

export async function getSiteSettings() {
  return SITE_SETTINGS;
}

export async function getArms() {
  return ARMS;
}

export async function getArm(slug: Arm["slug"]) {
  return ARMS.find((a) => a.slug === slug) ?? null;
}

export async function getServices(lane?: Lane) {
  return SERVICES.filter((s) => matchesLane(s.lane, lane));
}

export async function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug) ?? null;
}

export async function getServicesByArm(arm: Arm["slug"]) {
  return SERVICES.filter((s) => s.arm === arm);
}

/** PRD §7 market figures. `compact` trims the labels for tight bands. */
export async function getMarketStats(variant: "full" | "compact" = "compact") {
  return variant === "full" ? MARKET_STATS : MARKET_STATS_COMPACT;
}

export async function getDemandStats() {
  return DEMAND_STATS;
}

export async function getSegments() {
  return SEGMENTS;
}

export async function getLaunchKit() {
  return LAUNCH_KIT;
}

export async function getStaffingSafeguards() {
  return STAFFING_SAFEGUARDS;
}

export async function getProcess(lane: Extract<Lane, "b2c" | "b2b">) {
  return lane === "b2c" ? CARE_PROCESS : BUSINESS_PROCESS;
}

export async function getTestimonials(lane?: Lane) {
  return TESTIMONIALS.filter((t) => matchesLane(t.lane, lane));
}

export async function getFaqs(lane?: Lane) {
  return FAQS.filter((f) => matchesLane(f.lane, lane));
}

export async function getTeam() {
  return TEAM;
}

export async function getOpportunities() {
  const { OPPORTUNITIES } = await import("./data");
  return OPPORTUNITIES;
}
