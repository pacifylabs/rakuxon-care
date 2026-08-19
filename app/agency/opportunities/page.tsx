import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionIntro } from "@/components/marketing/section";
import { getOpportunities } from "@/lib/cms";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Live tender opportunities",
  description:
    "Open tenders, frameworks and dynamic purchasing systems for care providers, updated as they publish.",
};

const STATUS: Record<string, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-care-100 text-care-700" },
  "closing-soon": { label: "Closing soon", className: "bg-warning text-white" },
  closed: { label: "Closed", className: "bg-navy-100 text-navy-800" },
};

/* 04_SITE_ARCHITECTURE §3.2 Cluster B — data-driven list, treated like Jobs. */
export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <>
      <section className="bg-navy-50 py-14 md:py-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <span className="inline-flex items-center rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
              Opportunities
            </span>
            <h1 className="text-h1">Live tender opportunities</h1>
            <p className="measure text-body-lg text-ink-500">
              Open tenders and framework rounds relevant to care providers. All
              entries below are placeholders until the feed is connected.
            </p>
            <Link
              href="/agency/tender-writing"
              className={buttonClasses({ tone: "navy" })}
            >
              Get help bidding
            </Link>
          </div>
        </Container>
      </section>

      <Section>
        <SectionIntro
          lane="b2b"
          eyebrow="Current round"
          title="What is open now"
          subtitle="Each entry links through to the buyer's own portal once the feed is live."
        />
        <ul className="mt-12 flex flex-col gap-4">
          {opportunities.map((o) => {
            const s = STATUS[o.status];
            return (
              <li
                key={o.id}
                className="flex flex-col gap-4 rounded-lg bg-paper-100 p-6 shadow-card sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-col gap-1">
                    <h3 className="text-h4">{o.title}</h3>
                    <p className="text-small text-ink-500">
                      {o.buyer} · {o.region}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center rounded-pill px-3 py-1 text-overline uppercase",
                      s.className,
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                <p className="measure text-ink-700">{o.summary}</p>
                <dl className="flex flex-wrap gap-x-8 gap-y-2 text-small">
                  <div className="flex gap-2">
                    <dt className="text-ink-500">Value</dt>
                    <dd className="text-ink-900">{o.value}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-ink-500">Closes</dt>
                    <dd className="text-ink-900">{o.closes}</dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
