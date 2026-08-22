import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { Breadcrumbs, type Crumb } from "@/components/marketing/breadcrumbs";
import { IconCard } from "@/components/marketing/cards";
import { JsonLd } from "@/components/marketing/json-ld";
import { Section, SectionIntro } from "@/components/marketing/section";
import { breadcrumbJsonLd } from "@/lib/schema";
import type { ClusterMeta } from "@/lib/clusters";
import type { Lane } from "@/lib/cms";
import type { Photo as PhotoData } from "@/lib/images";

export interface HubCard {
  key: string;
  title: string;
  body: string;
  href: string;
  icon?: LucideIcon;
}

export interface HubCluster {
  meta: ClusterMeta;
  cards: HubCard[];
}

/**
 * Shared layout for /care and /agency (04_SITE_ARCHITECTURE §5, "Hub page").
 * One component, two instances — the lane prop carries the theming split.
 */
export function Hub({
  lane,
  eyebrow,
  title,
  subtitle,
  photo,
  primaryCta,
  secondaryCta,
  clusters,
  fallbackIcon,
  crumbs,
  otherLane,
}: {
  lane: Lane;
  eyebrow: string;
  title: string;
  subtitle: string;
  photo: PhotoData;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  clusters: HubCluster[];
  fallbackIcon: LucideIcon;
  crumbs: Crumb[];
  otherLane: {
    title: string;
    body: string;
    href: string;
    cta: string;
  };
}) {
  const isCare = lane === "b2c";
  const tone = isCare ? ("care" as const) : ("navy" as const);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <section
        className={
          isCare ? "bg-care-50 py-14 md:py-20" : "bg-navy-50 py-14 md:py-20"
        }
      >
        <Container>
          <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start gap-5">
              <Breadcrumbs items={crumbs} />
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
              <p className="measure text-body-lg text-ink-700">{subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={primaryCta.href}
                  className={buttonClasses({ tone })}
                >
                  {primaryCta.label}
                </Link>
                <Link
                  href={secondaryCta.href}
                  className={buttonClasses({ variant: "secondary", tone })}
                >
                  {secondaryCta.label}
                </Link>
              </div>
            </div>
            <Photo
              photo={photo}
              ratio="fill"
              duotone="none"
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="shadow-card"
            />
          </div>
        </Container>
      </section>

      {clusters.map((cluster, i) => (
        <Section
          key={cluster.meta.id}
          id={cluster.meta.id}
          tint={i % 2 === 1 ? "paper" : "none"}
        >
          <SectionIntro
            lane={lane}
            eyebrow={cluster.meta.eyebrow}
            title={cluster.meta.label}
            subtitle={cluster.meta.blurb}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cluster.cards.map((card) => (
              <Link
                key={card.key}
                href={card.href}
                className="group rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800"
              >
                <IconCard
                  icon={card.icon ?? fallbackIcon}
                  title={card.title}
                  body={card.body}
                  lane={lane}
                  className="h-full transition-colors group-hover:bg-paper-0"
                />
              </Link>
            ))}
          </div>
        </Section>
      ))}

      <Section tint="paper">
        <div className="flex flex-col items-start gap-5 rounded-lg bg-paper-100 p-8 shadow-card md:p-12">
          <h2 className="text-h3">{otherLane.title}</h2>
          <p className="measure text-ink-700">{otherLane.body}</p>
          <Link href={otherLane.href} className={buttonClasses({ tone })}>
            {otherLane.cta}
          </Link>
        </div>
      </Section>
    </>
  );
}
