import Link from "next/link";
import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { AvatarStack } from "@/components/home/avatar-stack";
import { PHOTOS } from "@/lib/images";
import type { CqcStatus } from "@/lib/cms";

/* Reference section 2, carrying the PRD §1.1 authority story.
   The floating cards previously showed invented volume metrics ("4,000
   carers matched", "5k+ families"). The care service is pre-registration
   per PRD §10, so those claims were false and are replaced by the real
   market figures from §7 and an honest registration status. */
export function Hero({ cqc }: { cqc: CqcStatus }) {
  return (
    <section className="pt-6 pb-12 md:pt-8 md:pb-16">
      <Container>
        <div className="relative overflow-hidden rounded-lg bg-paper-0 px-5 py-14 sm:px-8 md:px-12 md:py-20">
          {/* Decorative corner accents. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-8 left-8 hidden text-navy-600/25 md:block"
          >
            <svg viewBox="0 0 16 16" className="size-4">
              <path
                d="M8 1v14M1 8h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-10 right-10 hidden size-2 rounded-pill bg-care-500/40 md:block"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-24 left-12 hidden size-2 rounded-pill bg-navy-600/25 lg:block"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-8 bottom-28 hidden text-care-600/30 lg:block"
          >
            <svg viewBox="0 0 16 16" className="size-4">
              <path
                d="M8 1v14M1 8h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 hidden size-64 rounded-lg border border-navy-600/10 lg:block"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -bottom-20 hidden size-72 rounded-lg border border-care-500/10 lg:block"
          />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              Care, with authority
            </span>
            <h1 className="mt-5 text-h1">
              Good care starts
              <br className="hidden sm:block" /> with being seen
            </h1>
            <p className="measure mt-5 text-body-lg text-ink-500">
              Dependable support at home, built around your person. And
              practical expertise for the people building better care services.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className={buttonClasses({ tone: "care", size: "lg" })}
              >
                Talk about care
              </Link>
              <Link
                href="/agency"
                className={buttonClasses({
                  variant: "secondary",
                  tone: "navy",
                  size: "lg",
                })}
              >
                For care organisations
              </Link>
            </div>
          </div>

          {/* Floating card row. */}
          <div className="relative mt-14 grid items-center gap-5 lg:grid-cols-3">
            <div className="flex flex-col gap-4 rounded-lg bg-paper-100 p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <p className="font-display text-h4 text-ink-900">
                  One group,
                  <br /> connected help
                </p>
                <ArrowUpRight
                  className="size-5 shrink-0 text-ink-500"
                  aria-hidden="true"
                />
              </div>
              <AvatarStack
                photos={[
                  PHOTOS.avatar3,
                  PHOTOS.avatar4,
                  PHOTOS.avatar7,
                  PHOTOS.avatar2,
                  PHOTOS.avatar6,
                ]}
              />
              <p className="text-small text-ink-500">
                Care, advisory, digital and people — one human-first view of
                care
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-lg bg-paper-100 p-5 shadow-card">
              <div className="flex min-w-0 flex-col gap-1">
                <p className="font-display text-h4 text-ink-900">15,232</p>
                <p className="text-small text-ink-500">
                  registered home care locations in England — a market that grew
                  81% since 2017
                </p>
              </div>
              <span className="grid size-14 shrink-0 place-items-center rounded-pill bg-care-600 text-small font-semibold text-white">
                +81%
              </span>
            </div>

            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <Photo
                  photo={PHOTOS.carerSupport}
                  ratio="1/1"
                  radius="lg"
                  duotone="none"
                  sizes="160px"
                  className="w-32 sm:w-40"
                />
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-pill bg-brand-navy px-3 py-1 text-small whitespace-nowrap text-white shadow-card">
                  {cqc.state === "registered"
                    ? `Rated ${cqc.rating}`
                    : "CQC in progress"}
                </span>
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                {/* Kept short: the reference uses a two-word label plus a
                    contact line, which is what lets the photo and text share
                    a third of the grid without collapsing between 1024px and
                    1200px. */}
                <p className="font-display text-h4 text-ink-900">
                  Care at
                  <br /> home
                </p>
                <a
                  href="mailto:hello@rakuxoncare.co.uk"
                  className="inline-flex min-h-11 items-center gap-2 text-small break-all text-ink-700 underline-offset-4 hover:underline"
                >
                  <Mail
                    className="size-4 shrink-0 text-care-600"
                    aria-hidden="true"
                  />
                  hello@rakuxoncare.co.uk
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
