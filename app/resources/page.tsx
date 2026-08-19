import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionIntro } from "@/components/marketing/section";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides and insights on arranging care at home, and on registering, staffing and growing a care business.",
};

/* Placeholder hub. The blog/guides collections arrive with the CMS in
   Phase 4; this exists so the global nav has a real destination. */
export default function ResourcesPage() {
  return (
    <>
      <section className="py-14 md:py-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
              Resources
            </span>
            <h1 className="text-h1">Guides and insights</h1>
            <p className="measure text-body-lg text-ink-500">
              Articles for families arranging care, and for providers working
              through registration, tenders and recruitment.
            </p>
          </div>
        </Container>
      </section>
      <Section tint="paper">
        <SectionIntro
          eyebrow="Coming with the CMS"
          title="Not yet populated"
          subtitle="Posts and guides become a CMS collection in Phase 4. This page exists so the navigation has a real destination rather than a dead link."
        />
      </Section>
    </>
  );
}
