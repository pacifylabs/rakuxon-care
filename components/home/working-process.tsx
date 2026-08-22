import { Container } from "@/components/ui/container";
import type { ProcessStep } from "@/lib/cms";
import { cn } from "@/lib/cn";

/* Reference section 8.
   Two steps down each side of a centred label: 01/02 on the left, 03/04 on
   the right. DOM order stays 01→04 for reading order, with explicit grid
   placement producing the reference's visual arrangement. Below lg it
   collapses to one column in the same order, label first. */
export function WorkingProcess({ steps }: { steps: ProcessStep[] }) {
  const placement = [
    "lg:col-start-1 lg:row-start-1",
    "lg:col-start-1 lg:row-start-2",
    "lg:col-start-2 lg:row-start-1",
    "lg:col-start-2 lg:row-start-2",
  ];

  return (
    <section id="process" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <div className="relative">
          {/* Centred label: a normal heading on mobile, overlaid in the
              column gap on desktop. */}
          <h2 className="font-display mb-8 text-center text-h3 text-ink-900 lg:pointer-events-none lg:absolute lg:inset-0 lg:z-10 lg:mb-0 lg:grid lg:place-items-center">
            {/* Padded background breaks the connector line behind the
                label, as in the reference. */}
            <span className="lg:bg-paper-50 lg:px-6">Working process</span>
          </h2>

          {/* Faint connector, matching the reference's thin guide lines. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-8 left-1/2 hidden w-px -translate-x-1/2 bg-navy-100 lg:block"
          />

          <ol className="grid gap-6 lg:grid-cols-2 lg:gap-x-36 xl:gap-x-64">
            {steps.slice(0, 4).map((step, i) => {
              const isLeft = i < 2;
              return (
                <li
                  key={step.number}
                  className={cn(
                    "flex items-center gap-4",
                    placement[i],
                    !isLeft && "lg:flex-row-reverse",
                  )}
                >
                  <div className="min-w-0 flex-1 rounded-md border border-navy-100 bg-paper-100 px-5 py-4 shadow-card">
                    <h3 className="font-display text-body font-semibold text-ink-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-small text-ink-500">
                      {step.description}
                    </p>
                  </div>
                  {/* Faint, as in the reference, but no fainter than 3:1 on
                      paper-50 — these numerals carry the step order, so they
                      are text rather than decoration. navy-100 measured
                      1.19:1; navy-600 at 70% measures 3.29:1. */}
                  <span
                    aria-hidden="true"
                    className="font-display text-h2 leading-none font-bold text-ink-500/80"
                  >
                    {step.number}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
