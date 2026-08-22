"use client";

import * as Accordion from "@radix-ui/react-accordion";
import type { Faq } from "@/lib/cms";

/* §4.14. Built on Radix rather than hand-rolled: the accessible accordion
   pattern (roving focus, aria-expanded/controls wiring, Home/End keys) is
   exactly the kind of hard a11y work worth taking off the shelf. Styling is
   entirely our own tokens. Service pages emit matching FAQPage JSON-LD. */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
      {faqs.map((faq, i) => (
        <Accordion.Item
          key={faq.question}
          value={`item-${i}`}
          className="overflow-hidden rounded-md border border-navy-100 bg-paper-100"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left text-body-lg text-ink-900 transition-colors hover:bg-navy-50">
              {faq.question}
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="size-5 shrink-0 fill-current text-ink-500 transition-transform group-data-[state=open]:rotate-45"
              >
                <path d="M9 3a1 1 0 1 1 2 0v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H3a1 1 0 1 1 0-2h6V3Z" />
              </svg>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
            <p className="measure px-5 pb-5 text-ink-700">{faq.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
