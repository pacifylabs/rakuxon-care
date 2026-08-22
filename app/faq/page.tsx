import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { getFaqs } from "@/lib/cms";
import { PHOTOS } from "@/lib/images";
import type { Faq } from "@/lib/cms";
import type { Photo as PhotoData } from "@/lib/images";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Frequently asked questions",
  description:
    "Answers for families arranging care at home, and for care businesses working towards CQC registration, tenders and recruitment.",
  path: "/faq",
});

/* Two sections, each with its accordion on the left and a photograph on the
   right. Below lg they stack, accordion first, so the questions are never
   pushed under an image on a phone. */
function FaqSection({
  id,
  eyebrow,
  title,
  subtitle,
  faqs,
  photo,
  lane,
  tint,
  cta,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  faqs: Faq[];
  photo: PhotoData;
  lane: "b2c" | "b2b";
  tint: boolean;
  cta: { label: string; href: string };
}) {
  const isCare = lane === "b2c";
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-14 md:py-20", tint && "bg-care-50")}
    >
      <Container>
        <div className="grid items-stretch gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          {/* Questions */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span
                className={cn(
                  "inline-flex w-fit items-center rounded-pill px-3 py-1 text-overline uppercase",
                  isCare
                    ? "bg-care-100 text-care-700"
                    : "bg-navy-100 text-navy-800",
                )}
              >
                {eyebrow}
              </span>
              <h2 className="text-h2">{title}</h2>
              <p className="measure text-ink-500">{subtitle}</p>
            </div>
            <FaqAccordion faqs={faqs} />
            <Link
              href={cta.href}
              className={buttonClasses({
                tone: isCare ? "care" : "navy",
                className: "w-fit",
              })}
            >
              {cta.label}
            </Link>
          </div>

          {/* Image, right on desktop */}
          {/* Fills the row so the image starts and ends level with the
              accordion beside it, at any number of questions. */}
          <Photo
            photo={photo}
            ratio="fill"
            duotone={isCare ? "care" : "navy"}
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="shadow-card"
          />
        </div>
      </Container>
    </section>
  );
}

export default async function FaqPage() {
  const [b2c, b2b] = await Promise.all([getFaqs("b2c"), getFaqs("b2b")]);

  return (
    <>
      {/* Centred intro */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
              FAQ
            </span>
            <h1 className="text-h1">Frequently asked questions</h1>
            <p className="measure text-body-lg text-ink-500">
              Split by audience, because families and care businesses almost
              never have the same question.
            </p>
          </div>
        </Container>
      </section>

      <FaqSection
        id="families"
        lane="b2c"
        tint
        eyebrow="Families and councils"
        title="Arranging care"
        subtitle="What families ask before care starts, and how funded packages work."
        faqs={b2c}
        photo={PHOTOS.coupleAtHome}
        cta={{ label: "Make a care enquiry", href: "/contact" }}
      />

      <FaqSection
        id="businesses"
        lane="b2b"
        tint={false}
        eyebrow="Care businesses"
        title="Registration and growth"
        subtitle="What providers ask about registration, tenders and the Launch Kit."
        faqs={b2b}
        photo={PHOTOS.businessMeeting}
        cta={{ label: "Make a business enquiry", href: "/contact" }}
      />
    </>
  );
}
