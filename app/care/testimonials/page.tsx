import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionIntro } from "@/components/marketing/section";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { getTestimonials } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Client and family testimonials",
  description:
    "What families say about the care Rakuxon Care delivers at home.",
};

export default async function CareTestimonialsPage() {
  const testimonials = await getTestimonials("b2c");
  return (
    <>
      <section className="bg-care-50 py-14 md:py-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center rounded-pill bg-care-100 px-3 py-1 text-overline text-care-700 uppercase">
              Testimonials
            </span>
            <h1 className="text-h1">What families say</h1>
            <p className="measure text-body-lg text-ink-500">
              Placeholder testimonials pending consented, attributable quotes.
            </p>
          </div>
        </Container>
      </section>
      <Section>
        <SectionIntro
          lane="b2c"
          eyebrow="In their words"
          title="Families and councils"
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
