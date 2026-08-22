import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { Breadcrumbs, type Crumb } from "@/components/marketing/breadcrumbs";
import { CheckRow } from "@/components/marketing/cards";
import { JsonLd } from "@/components/marketing/json-ld";
import { RelatedPages } from "@/components/marketing/related-pages";
import { Section, SectionIntro } from "@/components/marketing/section";
import { breadcrumbJsonLd } from "@/lib/schema";
import type { Lane, RelatedPage } from "@/lib/cms";
import type { Photo as PhotoData } from "@/lib/images";

/**
 * Conversion / utility template — 04_SITE_ARCHITECTURE §5. Covers Areas,
 * Fees, Refer, Digital Audit and Book-a-call: a lane-themed intro, a
 * supporting block, and a single clear next action.
 */
export function UtilityPage({
  lane,
  eyebrow,
  title,
  intro,
  photo,
  points,
  pointsTitle,
  cta,
  secondaryCta,
  notes,
  children,
  crumbs,
  related,
}: {
  lane: Lane;
  eyebrow: string;
  title: string;
  intro: string;
  photo: PhotoData;
  points: string[];
  pointsTitle: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /**
   * Longer explanatory blocks. Passed as data rather than as children so
   * they get the page's Section and Container treatment — raw children
   * rendered edge-to-edge with no container at all.
   */
  notes?: { title: string; body: string[] }[];
  children?: React.ReactNode;
  crumbs?: Crumb[];
  related?: RelatedPage[];
}) {
  const isCare = lane === "b2c";
  const tone = isCare ? ("care" as const) : ("navy" as const);

  return (
    <>
      {crumbs ? <JsonLd data={breadcrumbJsonLd(crumbs)} /> : null}
      <section
        className={
          isCare ? "bg-care-50 py-14 md:py-20" : "bg-navy-50 py-14 md:py-20"
        }
      >
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            {crumbs ? <Breadcrumbs items={crumbs} /> : null}
            <span
              className={
                isCare
                  ? "inline-flex items-center rounded-pill bg-care-100 px-3 py-1 text-overline text-care-700 uppercase"
                  : "inline-flex items-center rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase"
              }
            >
              {eyebrow}
            </span>
            <h1 className="text-h1">{title}</h1>
            <p className="measure text-body-lg text-ink-500">{intro}</p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
              <Link
                href={cta.href}
                className={buttonClasses({
                  tone,
                  className: "w-full sm:w-auto",
                })}
              >
                {cta.label}
              </Link>
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className={buttonClasses({
                    variant: "secondary",
                    tone,
                    className: "w-full sm:w-auto",
                  })}
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <Photo
            photo={photo}
            ratio="fill"
            duotone={tone}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="shadow-card"
          />
          <div className="flex flex-col gap-5">
            <h2 className="text-h2">{pointsTitle}</h2>
            <ul className="flex flex-col gap-3">
              {points.map((p) => (
                <CheckRow key={p} lane={lane}>
                  {p}
                </CheckRow>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {notes?.length ? (
        <Section tint="paper">
          <div className="grid gap-6 lg:grid-cols-2">
            {notes.map((n) => (
              <article
                key={n.title}
                className="flex h-full flex-col gap-4 rounded-lg bg-paper-100 p-6 shadow-card md:p-8"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={
                      isCare
                        ? "mt-1 h-8 w-1 shrink-0 rounded-pill bg-care-600"
                        : "mt-1 h-8 w-1 shrink-0 rounded-pill bg-navy-800"
                    }
                    aria-hidden="true"
                  />
                  <h2 className="text-h3">{n.title}</h2>
                </div>
                <div className="flex flex-col gap-3">
                  {n.body.map((para, i) => (
                    <p key={i} className="text-ink-700">
                      {para}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {children}

      {related?.length ? (
        <RelatedPages
          lane={lane}
          heading="Related"
          pages={related}
          tint="none"
        />
      ) : null}

      <Section tint="paper">
        <div className="flex flex-col items-start gap-5 rounded-lg bg-paper-100 p-8 shadow-card md:p-12">
          <h2 className="text-h3">Next step</h2>
          <p className="measure text-ink-700">
            Every enquiry reaches the same team and the same pipeline, whichever
            page it starts on.
          </p>
          <Link href={cta.href} className={buttonClasses({ tone })}>
            {cta.label}
          </Link>
        </div>
      </Section>
    </>
  );
}

export { SectionIntro };
