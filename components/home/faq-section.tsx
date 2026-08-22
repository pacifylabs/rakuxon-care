import { Container } from "@/components/ui/container";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import type { Faq } from "@/lib/cms";

/* Reference section 13: centred intro then a full-width accordion list. */
export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section id="faq" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
            FAQ
          </span>
          <h2 className="text-h2">Frequently asked questions</h2>
          <p className="measure text-ink-500">
            The questions families ask us first. If yours is not here, a short
            call usually settles it.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </Container>
    </section>
  );
}
