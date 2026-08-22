import type { Metadata } from "next";
import { AboutIntro } from "@/components/home/about-intro";
import { CtaBand } from "@/components/home/cta-band";
import { FaqSection } from "@/components/home/faq-section";
import { Hero } from "@/components/home/hero";
import { Personalized } from "@/components/home/personalized";
import { ServicesSplit } from "@/components/home/services-split";
import { StatBand } from "@/components/home/stat-band";
import { TrustStrip } from "@/components/home/trust-strip";
import { TwoArms } from "@/components/home/two-arms";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { WorkingProcess } from "@/components/home/working-process";
import {
  getArms,
  getDemandStats,
  getFaqs,
  getProcess,
  getServices,
} from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home",
  description:
    "Personal and domiciliary care at home, assessed with you and written into a plan before anyone starts.",
  path: "/",
  absoluteTitle: "Rakuxon Care | Personal care at home",
});

/**
 * Home is care-first. The care-business entry sits at the end, after the
 * family story, so organisations still have a route in from this page.
 */
export default async function HomePage() {
  const [arms, stats, careProcess, faqs, services] = await Promise.all([
    getArms(),
    getDemandStats(),
    getProcess("b2c"),
    getFaqs("b2c"),
    getServices("b2c"),
  ]);

  const careServices = services.filter((s) => s.cluster === "care-service");

  return (
    <>
      <Hero />
      <TrustStrip />
      <AboutIntro />
      <StatBand
        stats={stats}
        caption="Adult social care in England, latest published figures (March 2025)."
      />
      <ServicesSplit services={careServices} />
      <Personalized />
      <WorkingProcess steps={careProcess} />
      <WhyChooseUs />
      <CtaBand />
      <FaqSection faqs={faqs} />
      <TwoArms arms={arms} />
    </>
  );
}
