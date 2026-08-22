import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionIntro } from "@/components/marketing/section";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides and insights on arranging care at home, and on registering, staffing and growing a care business.",
};

/* No articles are published yet. The page states that plainly and routes the
   reader to a conversation instead of showing an empty grid. */
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
          eyebrow="In the meantime"
          title="Nothing published here yet"
          subtitle="Our guides are being written. If you have a question about arranging care or about registration, tenders and staffing, ask us directly — you will get a person, not a download."
        />
        <div className="mt-8 flex justify-center">
          <Link href="/contact" className={buttonClasses({ tone: "care" })}>
            Ask us a question
          </Link>
        </div>
      </Section>
    </>
  );
}
