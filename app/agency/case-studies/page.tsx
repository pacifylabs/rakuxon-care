import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionIntro } from "@/components/marketing/section";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { getTestimonials } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Case studies and results",
  description:
    "Care businesses Rakuxon Care Agency has registered, staffed and grown.",
};

export default async function CaseStudiesPage() {
  const testimonials = await getTestimonials("b2b");
  return (
    <>
      <section className="bg-navy-50 py-14 md:py-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
              Case studies
            </span>
            <h1 className="text-h1">Case studies and results</h1>
            <p className="measure text-body-lg text-ink-500">
              Placeholder entries. Real case studies become a CMS collection in
              Phase 4 and need client consent before publication.
            </p>
          </div>
        </Container>
      </section>
      <Section>
        <SectionIntro
          lane="b2b"
          eyebrow="Results"
          title="Providers we have worked with"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </Section>
    </>
  );
}
