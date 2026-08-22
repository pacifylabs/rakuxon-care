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
  getFaqs,
  getMarketStats,
  getProcess,
  getSiteSettings,
} from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home",
  description:
    "Dependable support at home, built around your person — and practical expertise for people building better care services.",
  path: "/",
  absoluteTitle: "Rakuxon Care | Home care and care-business support",
});

/**
 * Home — reference structure (14 sections), PRD v2.0 content.
 *
 *  1 navbar (layout)   8 working process
 *  2 hero              9 why choose us (authority moat)
 *  3 trust strip      10 CTA band
 *  4 about intro      11 specialists
 *  5 stat band        12 testimonials
 *  6 services split   13 FAQ
 *  7 two arms         14 footer (layout)
 *
 * Section 7 carries the dual-lane entry that PRD §5.1 requires: the
 * reference hero is a single centred block, so lane selection sits directly
 * beneath it rather than inside it.
 */
export default async function HomePage() {
  const [arms, stats, careProcess, faqs, settings] = await Promise.all([
    getArms(),
    getMarketStats("compact"),
    getProcess("b2c"),
    getFaqs(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Hero cqc={settings.cqc} />
      <TrustStrip />
      <AboutIntro />
      <StatBand
        stats={stats}
        caption="Adult social care in England, latest published figures (March 2025)."
      />
      <ServicesSplit />
      <TwoArms arms={arms} />
      <Personalized />
      <WorkingProcess steps={careProcess} />
      <WhyChooseUs />
      <CtaBand />
      <FaqSection faqs={faqs} />
    </>
  );
}
