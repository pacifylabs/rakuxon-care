import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionIntro } from "@/components/marketing/section";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Care roles at Rakuxon Care and agency roles across the wider business.",
};

export default function CareersPage() {
  return (
    <>
      <section className="py-14 md:py-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <span className="inline-flex items-center rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
              Careers
            </span>
            <h1 className="text-h1">Work with us</h1>
            <p className="measure text-body-lg text-ink-500">
              Care roles and agency roles in one place. Live vacancies arrive
              with the CMS in Phase 5.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/care/careers"
                className={buttonClasses({ tone: "care" })}
              >
                Join as a carer
              </Link>
              <Link
                href="/contact"
                className={buttonClasses({ variant: "secondary" })}
              >
                Get in touch
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <Section tint="paper">
        <SectionIntro
          eyebrow="Vacancies"
          title="No live vacancies listed yet"
          subtitle="The Job collection and application flow are Phase 5. Until then, enquiries route through the shared pipeline."
        />
      </Section>
    </>
  );
}
