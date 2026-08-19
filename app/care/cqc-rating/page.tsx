import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CqcBadge } from "@/components/marketing/cqc-badge";
import { Section, SectionIntro } from "@/components/marketing/section";
import { getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Our CQC rating and reports",
  description:
    "Rakuxon Care's Care Quality Commission registration status and inspection history.",
};

export default async function CqcRatingPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <section className="bg-care-50 py-14 md:py-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <span className="inline-flex items-center rounded-pill bg-care-100 px-3 py-1 text-overline text-care-700 uppercase">
              Regulation
            </span>
            <h1 className="text-h1">Our CQC rating and reports</h1>
            <p className="measure text-body-lg text-ink-500">
              We publish our regulatory position plainly, including when it is
              not yet a rating.
            </p>
            <CqcBadge />
          </div>
        </Container>
      </section>

      <Section>
        <SectionIntro
          lane="b2c"
          eyebrow="Current status"
          title="Where we stand"
          subtitle="Registration is in progress. There is no inspection rating to publish yet, and we will not imply otherwise."
        />
        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4 rounded-lg bg-paper-100 p-8 shadow-card">
          <p className="text-ink-700">
            Once registration completes, this page will carry the provider ID,
            the inspection report, and the rating for each key question.
          </p>
          <p className="text-ink-700">
            The agency side of the business is deliberately built on the same
            systems this service is inspected against.
          </p>
          <Link
            href="/contact"
            className={buttonClasses({ tone: "care", className: "w-fit" })}
          >
            Ask about our registration
          </Link>
          <p className="text-small text-ink-500">
            Company number {settings.companyNumber} · ICO{" "}
            {settings.icoRegistration}
          </p>
        </div>
      </Section>
    </>
  );
}
