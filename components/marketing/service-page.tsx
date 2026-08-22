import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/photo";
import { CheckRow } from "@/components/marketing/cards";
import { Breadcrumbs, type Crumb } from "@/components/marketing/breadcrumbs";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/marketing/json-ld";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { RelatedPages } from "@/components/marketing/related-pages";
import { Section, SectionIntro } from "@/components/marketing/section";
import { relatedExtras, relatedFromCatalogue } from "@/lib/cms";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
} from "@/lib/schema";
import { SERVICE_ICONS } from "@/lib/service-icons";
import { PHOTOS, type Photo as PhotoData } from "@/lib/images";
import type { ProcessStep, Service } from "@/lib/cms";

const HERO_PHOTO: Record<string, PhotoData> = {
  "personal-care": PHOTOS.carerSupport,
  "home-care": PHOTOS.carerBedside,
  "live-in-care": PHOTOS.coupleAtHome,
  "respite-care": PHOTOS.carerMobility,
  companionship: PHOTOS.familySupport,
  "specialist-care": PHOTOS.carerSupport,
  "cqc-registration": PHOTOS.businessSigning,
  "tender-writing": PHOTOS.businessReview,
  "policies-procedures": PHOTOS.businessMeeting,
  "digital-services": PHOTOS.businessPlanning,
  consulting: PHOTOS.businessTeam,
  staffing: PHOTOS.businessTeam,
};

function crumbsFor(service: Service): Crumb[] {
  const home = { label: "Home", href: "/" };
  if (service.template === "who-we-support") {
    return [
      home,
      { label: "Care services", href: "/care" },
      { label: "Who we support", href: "/care#who-we-support" },
      { label: service.title },
    ];
  }
  if (service.arm === "care") {
    return [
      home,
      { label: "Care services", href: "/care" },
      { label: service.title },
    ];
  }
  return [
    home,
    { label: "Care businesses", href: "/agency" },
    { label: service.title },
  ];
}

/**
 * One template behind three routes — /care/{slug}, /care/who-we-support/{slug}
 * and /agency/{slug}. 04_SITE_ARCHITECTURE §5 lists them separately because
 * their content differs, but the page furniture is identical, so the shape is
 * shared and the copy comes from the catalogue.
 */
export function ServicePage({
  service,
  process,
  backHref,
  backLabel,
}: {
  service: Service;
  process: ProcessStep[];
  backHref: string;
  backLabel: string;
}) {
  const isCare = service.lane === "b2c";
  const tone = isCare ? ("care" as const) : ("navy" as const);
  const Icon = SERVICE_ICONS[service.slug];
  const crumbs = crumbsFor(service);
  const related = relatedFromCatalogue(service);
  const extras = relatedExtras(service);
  const faqSchema = faqJsonLd(service.faqs);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}

      <section
        className={
          isCare ? "bg-care-50 py-14 md:py-20" : "bg-navy-50 py-14 md:py-20"
        }
      >
        <Container>
          <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start gap-5">
              <Breadcrumbs items={crumbs} />
              <Link
                href={backHref}
                className="inline-flex min-h-11 items-center gap-2 text-small text-ink-700 underline-offset-4 hover:underline"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                {backLabel}
              </Link>
              <span
                className={
                  isCare
                    ? "inline-flex items-center gap-2 rounded-pill bg-care-100 px-3 py-1 text-overline text-care-700 uppercase"
                    : "inline-flex items-center gap-2 rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase"
                }
              >
                {Icon ? <Icon className="size-3.5" aria-hidden="true" /> : null}
                {isCare ? "Rakuxon Care" : "Rakuxon Care Agency"}
              </span>
              <h1 className="text-h1">{service.title}</h1>
              <p className="measure text-body-lg text-ink-700">
                {service.overview}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={isCare ? "/care/refer" : "/agency/book-a-call"}
                  className={buttonClasses({ tone })}
                >
                  {isCare ? "Request care" : "Book a free call"}
                </Link>
                <Link
                  href={isCare ? "/contact?intent=care" : "/contact?intent=business"}
                  className={buttonClasses({ variant: "secondary", tone })}
                >
                  Get in touch
                </Link>
              </div>
            </div>
            <Photo
              photo={
                HERO_PHOTO[service.slug] ??
                (isCare ? PHOTOS.familySupport : PHOTOS.businessMeeting)
              }
              ratio="fill"
              duotone="none"
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="shadow-card"
            />
          </div>
        </Container>
      </section>

      <Section>
        <SectionIntro
          lane={service.lane}
          eyebrow="Who it is for"
          title="Is this you?"
          subtitle={service.summary}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.whoFor.map((w, i) => (
            <div
              key={w.title}
              className="flex h-full flex-col gap-3 rounded-lg bg-paper-100 p-6 shadow-card"
            >
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-md text-small font-semibold",
                  isCare
                    ? "bg-care-100 text-care-700"
                    : "bg-navy-100 text-navy-800",
                )}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-h4 text-ink-900">{w.title}</p>
              <p className="text-small text-ink-500">{w.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tint="paper">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <span className="text-overline text-ink-500 uppercase">
              What is included
            </span>
            <h2 className="text-h2">What you get</h2>
            <ul className="flex flex-col gap-3">
              {service.features.map((f) => (
                <CheckRow key={f} lane={service.lane}>
                  {f}
                </CheckRow>
              ))}
            </ul>
          </div>
          <Photo
            photo={isCare ? PHOTOS.carerMobility : PHOTOS.businessTeam}
            ratio="fill"
            duotone={tone}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="shadow-card"
          />
        </div>
      </Section>

      {service.sections.map((block, index) => (
        <Section key={block.id} id={block.id} tint={index % 2 === 0 ? "none" : "paper"}>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-5">
              <SectionIntro
                lane={service.lane}
                align="start"
                title={block.title}
                subtitle={block.body}
              />
            </div>
            <ul className="flex flex-col gap-3">
              {block.items.map((item) => (
                <CheckRow key={item} lane={service.lane}>
                  {item}
                </CheckRow>
              ))}
            </ul>
          </div>
        </Section>
      ))}

      <Section tint="deep">
        <SectionIntro
          invert
          eyebrow="How it works"
          title={
            isCare ? "Four steps to care starting" : "Foundation to growth"
          }
        />
        <div className="mt-12">
          <ProcessTimeline
            steps={process}
            lane={isCare ? "b2c" : "b2b"}
            invert
          />
        </div>
      </Section>

      <Section>
        <SectionIntro
          lane={service.lane}
          eyebrow="Questions"
          title="Common questions"
        />
        <div className="mx-auto mt-12 w-full max-w-3xl">
          <FaqAccordion faqs={service.faqs} />
        </div>
        <p className="mt-8 text-center text-small text-ink-500">
          More answers on the{" "}
          <Link
            href={isCare ? "/faq#families" : "/faq#businesses"}
            className="text-navy-800 underline-offset-4 hover:underline"
          >
            FAQ page
          </Link>
          .
        </p>
      </Section>

      <RelatedPages
        lane={service.lane}
        heading="Related services"
        subtitle="Pages that usually sit next to this one — so you are not hunting the menu."
        pages={related}
      />
      <RelatedPages
        lane={service.lane}
        heading={isCare ? "Arranging care" : "Next steps for providers"}
        subtitle={
          isCare
            ? "Funding, coverage and how to start."
            : "Calls, audits and the pages that convert an enquiry."
        }
        pages={extras}
        tint="none"
      />
    </>
  );
}
