import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { PHOTOS } from "@/lib/images";

export function Hero() {
  return (
    <section className="pt-8 pb-12 md:pt-12 md:pb-20">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12">
          <div className="flex flex-col items-start gap-5 md:gap-6">
            <h1 className="text-h1 text-balance">
              Personal care at home, arranged around the person.
            </h1>
            <p className="measure text-body-lg text-ink-500">
              Support with personal care, meals, daily routines and the things
              that matter to you. We assess your needs and preferences, agree a
              person-centred care plan with you, and aim to provide continuity
              through a consistent care team.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/care/refer"
                className={buttonClasses({
                  tone: "care",
                  className: "w-full sm:w-auto",
                })}
              >
                Request care
              </Link>
              <Link
                href="/care"
                className={buttonClasses({
                  variant: "secondary",
                  tone: "care",
                  className: "w-full sm:w-auto",
                })}
              >
                See care services
              </Link>
            </div>
            <p className="inline-flex items-center gap-2 text-small text-ink-700">
              <HeartHandshake
                className="size-4 shrink-0 text-care-700"
                aria-hidden="true"
              />
              Private-pay care and commissioned packages, subject to eligibility
              and availability
            </p>
          </div>

          <Photo
            photo={PHOTOS.homeHero}
            ratio="16/9"
            duotone="none"
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="shadow-card lg:aspect-[3/2]"
          />
        </div>
      </Container>
    </section>
  );
}
