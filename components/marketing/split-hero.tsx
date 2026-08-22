import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { cn } from "@/lib/cn";
import { PHOTOS } from "@/lib/images";
import type { CqcStatus } from "@/lib/cms";

interface LaneChoice {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}

/**
 * §4.3, the signature component.
 *
 * Depth comes from a layered composition — a tall photo with a floating
 * caption card and a stat chip breaking its edges, in the manner of the
 * Medicia reference. Those overlaps are `lg:` only: below that everything
 * returns to normal flow, because absolutely-positioned overlap is the
 * fastest way to cause horizontal scroll on a phone.
 */
export function SplitHero({
  b2c,
  b2b,
  cqc,
}: {
  b2c: LaneChoice;
  b2b: LaneChoice;
  cqc: CqcStatus;
}) {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Soft tinted wash behind the hero, clipped by the section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 hidden size-[38rem] rounded-pill bg-care-50 blur-3xl lg:block"
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* ---------- Copy ---------- */}
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Care, and the businesses behind it
            </span>

            <h1 className="text-h1">
              Expert care, and the expertise to build it
            </h1>

            <p className="measure text-body-lg text-ink-500">
              We arrange CQC-registered care at home for families and councils,
              and we help care businesses register, win contracts and staff up.
              Two things, done properly, under one roof.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/find-care"
                className={buttonClasses({ tone: "care", size: "lg" })}
              >
                Find care
              </Link>
              <Link
                href="/care-businesses"
                className={buttonClasses({ variant: "secondary", size: "lg" })}
              >
                For care businesses
              </Link>
            </div>

            {/* Trust row, not a badge floating alone. */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <span className="inline-flex items-center gap-2 text-small text-ink-700">
                <ShieldCheck
                  className="size-4 text-care-600"
                  aria-hidden="true"
                />
                {cqc.state === "registered"
                  ? `CQC registered · rated ${cqc.rating}`
                  : "CQC registration in progress"}
              </span>
              <span className="inline-flex items-center gap-2 text-small text-ink-700">
                <HeartHandshake
                  className="size-4 text-care-600"
                  aria-hidden="true"
                />
                Council-funded packages welcome
              </span>
            </div>
          </div>

          {/* ---------- Layered composition ---------- */}
          <div className="relative">
            <Photo
              photo={PHOTOS.homeHero}
              ratio="4/5"
              duotone="none"
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="shadow-card lg:ml-8"
            />

            {/* Floating caption card — in flow below lg, overlapping above. */}
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-paper-100 p-3 shadow-card lg:absolute lg:bottom-8 lg:-left-4 lg:mt-0 lg:w-64">
              <Photo
                photo={PHOTOS.heroCardCarer}
                ratio="1/1"
                radius="md"
                duotone="none"
                sizes="80px"
                className="w-16 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-small text-ink-900">Carer matched</p>
                <p className="text-small text-ink-500">
                  Same faces, every visit
                </p>
              </div>
            </div>

            {/* Stat chip. */}
            <div className="mt-3 inline-flex w-fit items-center gap-3 rounded-lg bg-brand-navy px-4 py-3 text-white shadow-card lg:absolute lg:-top-4 lg:right-0 lg:mt-0">
              <span className="font-display text-h4 text-white">94%</span>
              <span className="text-small text-navy-100">
                first-time CQC
                <br className="hidden lg:block" /> registrations
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Dual lane choice ---------- */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {[
            { lane: "b2c" as const, choice: b2c, photo: PHOTOS.coupleAtHome },
            {
              lane: "b2b" as const,
              choice: b2b,
              photo: PHOTOS.businessMeeting,
            },
          ].map(({ lane, choice, photo }) => (
            <Link
              key={choice.href}
              href={choice.href}
              className={cn(
                "group flex items-center gap-5 rounded-lg border p-5 transition-colors sm:p-6",
                lane === "b2c"
                  ? "border-care-100 bg-care-50 hover:border-care-500/40"
                  : "border-navy-100 bg-navy-50 hover:border-navy-600/40",
              )}
            >
              <Photo
                photo={photo}
                ratio="1/1"
                radius="md"
                duotone={lane === "b2c" ? "care" : "navy"}
                sizes="112px"
                className="hidden w-24 shrink-0 sm:block"
              />
              <span className="flex min-w-0 flex-col gap-1">
                <span
                  className={cn(
                    "text-overline uppercase",
                    lane === "b2c" ? "text-care-700" : "text-navy-800",
                  )}
                >
                  {choice.eyebrow}
                </span>
                <span className="font-display text-h4 text-ink-900">
                  {choice.title}
                </span>
                <span className="text-ink-500">{choice.body}</span>
                <span
                  className={cn(
                    "mt-1 inline-flex items-center gap-2 text-small",
                    lane === "b2c" ? "text-care-700" : "text-navy-800",
                  )}
                >
                  {choice.cta}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
