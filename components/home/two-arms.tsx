import Link from "next/link";
import { ArrowRight, Building2, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { PHOTOS } from "@/lib/images";
import { cn } from "@/lib/cn";
import type { Arm } from "@/lib/cms";

const ICONS = { care: HeartHandshake, agency: Building2 } as const;
const PHOTO = {
  care: PHOTOS.carerMobility,
  agency: PHOTOS.businessMeeting,
} as const;

/* PRD §1.3 / §5.1 — the dual-lane entry. The reference's hero is a single
   centred block, so lane selection lives here, immediately beneath it. */
export function TwoArms({ arms }: { arms: Arm[] }) {
  return (
    <section id="arms" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
            One brand, two sides
          </span>
          <h2 className="text-h2">Different disciplines, the same standard</h2>
          <p className="measure text-ink-500">
            From a first conversation at home to the systems behind a thriving
            care business, our expertise connects.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {arms.map((arm) => {
            const Icon = ICONS[arm.slug];
            const isCare = arm.slug === "care";
            return (
              <Link
                key={arm.slug}
                href={arm.href}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-lg border p-5 transition-colors sm:p-6",
                  isCare
                    ? "border-care-100 bg-care-50 hover:border-care-500/40"
                    : "border-navy-100 bg-navy-50 hover:border-navy-600/40",
                )}
              >
                <Photo
                  photo={PHOTO[arm.slug]}
                  ratio="16/9"
                  radius="md"
                  duotone={isCare ? "care" : "navy"}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <span className="mt-5 flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-md",
                      isCare
                        ? "bg-care-100 text-care-700"
                        : "bg-navy-100 text-navy-800",
                    )}
                  >
                    <Icon
                      className="size-5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block text-overline uppercase",
                        isCare ? "text-care-700" : "text-navy-800",
                      )}
                    >
                      {arm.name}
                    </span>
                    <span className="font-display block text-h4 text-ink-900">
                      {arm.laneLabel}
                    </span>
                  </span>
                </span>
                <p className="mt-4 text-ink-700">{arm.summary}</p>
                <span
                  className={cn(
                    "mt-auto inline-flex items-center gap-2 pt-5 text-small",
                    isCare ? "text-care-700" : "text-navy-800",
                  )}
                >
                  {isCare ? "Find care" : "For care businesses"}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
