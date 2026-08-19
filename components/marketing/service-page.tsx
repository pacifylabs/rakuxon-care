import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { CheckRow } from "@/components/marketing/cards";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { Section, SectionIntro } from "@/components/marketing/section";
import { SERVICE_ICONS } from "@/lib/service-icons";
import { PHOTOS, type Photo as PhotoData } from "@/lib/images";
import type { Faq, ProcessStep, Service } from "@/lib/cms";

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

/**
 * One template behind three routes — /care/{slug}, /care/who-we-support/{slug}
 * and /agency/{slug}. 04_SITE_ARCHITECTURE §5 lists them separately because
 * their content differs, but the page furniture is identical, so the shape is
 * shared and the copy comes from the catalogue.
 */
export function ServicePage({
  service,
  process,
  faqs,
  backHref,
  backLabel,
}: {
  service: Service;
  process: ProcessStep[];
  faqs: Faq[];
  backHref: string;
  backLabel: string;
}) {
  const isCare = service.lane === "b2c";
  const tone = isCare ? ("care" as const) : ("navy" as const);
  const Icon = SERVICE_ICONS[service.slug];

  return (
    <>
      <section
        className={
          isCare ? "bg-care-50 py-14 md:py-20" : "bg-navy-50 py-14 md:py-20"
        }
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start gap-5">
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
                  href="/contact"
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
              ratio="4/3"
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
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.whoFor.map((w) => (
            <div
              key={w}
              className="rounded-lg bg-paper-100 p-6 text-ink-700 shadow-card"
            >
              {w}
            </div>
          ))}
        </div>
      </Section>

      <Section tint="paper">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
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
            ratio="4/3"
            duotone={tone}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="shadow-card"
          />
        </div>
      </Section>

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
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>
    </>
  );
}
