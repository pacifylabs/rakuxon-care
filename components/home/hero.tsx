import Link from "next/link";
import { HeartHandshake, ShieldCheck } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { PHOTOS } from "@/lib/images";
import type { CqcStatus } from "@/lib/cms";

export function Hero({ cqc }: { cqc: CqcStatus }) {
  const cqcLabel =
    cqc.state === "registered"
      ? `CQC registered · rated ${cqc.rating}`
      : "CQC registration in progress";

  return (
    <section className="pt-8 pb-14 md:pt-12 md:pb-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-pill bg-care-100 px-3 py-1 text-overline text-care-700 uppercase">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              {cqcLabel}
            </span>
            <h1 className="text-h1">
              Home care for families.
              <br />
              A partner for care businesses.
            </h1>
            <p className="measure text-body-lg text-ink-500">
              Support at home, assessed with you and written into a plan before
              anyone starts. And practical help for providers on registration,
              tenders, brand and staffing.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/care/refer"
                className={buttonClasses({ tone: "care", size: "lg" })}
              >
                Request care
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
            <p className="inline-flex items-center gap-2 text-small text-ink-700">
              <HeartHandshake
                className="size-4 shrink-0 text-care-600"
                aria-hidden="true"
              />
              Private-pay, council and ICB packages
            </p>
          </div>

          <Photo
            photo={PHOTOS.homeHero}
            ratio="3/2"
            duotone="none"
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="shadow-card"
          />
        </div>
      </Container>
    </section>
  );
}
