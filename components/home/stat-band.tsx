import { Container } from "@/components/ui/container";
import type { Stat } from "@/lib/cms";

/* Reference section 5: four big numbers with captions, on the canvas
   rather than in cards. Figures are the real market data from PRD §7, so
   the band carries a source line — they are external claims, not ours. */
export function StatBand({
  stats,
  caption,
}: {
  stats: Stat[];
  caption?: string;
}) {
  return (
    <section className="pb-14 md:pb-20">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex min-w-0 flex-col gap-1">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-h2 text-ink-900">{s.value}</dd>
              <p aria-hidden="true" className="text-small text-ink-500">
                {s.label}
              </p>
            </div>
          ))}
        </dl>
        {caption ? (
          <p className="mt-6 text-small text-ink-500">{caption}</p>
        ) : null}
      </Container>
    </section>
  );
}
