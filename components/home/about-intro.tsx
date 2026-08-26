import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { PHOTOS } from "@/lib/images";

const MOMENTS = [
  "Tea the way they take it",
  "Consistent care team wherever possible",
  "A week that still looks like theirs",
];

export function AboutIntro() {
  return (
    <section id="about" className="scroll-mt-24 bg-care-50 py-14 md:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <span className="inline-flex items-center rounded-pill bg-care-100 px-3 py-1 text-overline text-care-700 uppercase">
              About
            </span>
            <h2 className="text-h2">Care that feels like care</h2>
            <p className="measure text-body-lg text-ink-700">
              A visit can be on time and still feel cold. We start in the
              kitchen they already have, learn the routine, and send people who
              come back — so the week still belongs to the person living it.
            </p>
            <ul className="flex flex-col gap-3">
              {MOMENTS.map((moment) => (
                <li
                  key={moment}
                  className="font-display flex items-center gap-3 text-body font-semibold text-ink-900"
                >
                  <span
                    aria-hidden="true"
                    className="size-2.5 shrink-0 rounded-pill bg-brand-care"
                  />
                  {moment}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className={buttonClasses({
                tone: "care",
                variant: "secondary",
                className: "mt-1",
              })}
            >
              More about us
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Photo
              photo={PHOTOS.aboutWide}
              ratio="fill"
              duotone="none"
              sizes="(min-width: 640px) 40vw, 100vw"
              className="col-span-2 shadow-card sm:col-span-1 sm:row-span-2 sm:aspect-auto sm:h-full"
            />
            <Photo
              photo={PHOTOS.coupleAtHome}
              ratio="4/3"
              duotone="none"
              sizes="(min-width: 1024px) 24vw, 50vw"
              className="shadow-card"
            />
            <Photo
              photo={PHOTOS.familySupport}
              ratio="4/3"
              duotone="none"
              sizes="(min-width: 1024px) 24vw, 50vw"
              className="shadow-card"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
