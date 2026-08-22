import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionIntro } from "@/components/marketing/section";
import { SERVICE_ICONS } from "@/lib/service-icons";
import { cn } from "@/lib/cn";
import type { RelatedPage } from "@/lib/cms";
import type { Lane } from "@/lib/cms";

export function RelatedPages({
  heading,
  subtitle,
  pages,
  lane,
  tint = "paper",
}: {
  heading: string;
  subtitle?: string;
  pages: RelatedPage[];
  lane: Lane;
  tint?: "none" | "paper";
}) {
  if (pages.length === 0) return null;

  const isCare = lane === "b2c";

  return (
    <Section tint={tint}>
      <SectionIntro
        lane={lane}
        eyebrow="Continue"
        title={heading}
        subtitle={subtitle}
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => {
          const Icon = SERVICE_ICONS[page.slug];
          return (
            <li key={page.href}>
              <Link
                href={page.href}
                className="group flex h-full flex-col gap-3 rounded-lg bg-paper-100 p-6 shadow-card transition-colors hover:bg-paper-0"
              >
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-md",
                    isCare
                      ? "bg-care-100 text-care-700"
                      : "bg-navy-100 text-navy-800",
                  )}
                >
                  {Icon ? (
                    <Icon
                      className="size-5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowRight className="size-5" aria-hidden="true" />
                  )}
                </span>
                <span className="font-display text-h4 text-ink-900">
                  {page.title}
                </span>
                <span className="text-small text-ink-500">{page.summary}</span>
                <span
                  className={cn(
                    "mt-auto inline-flex items-center gap-2 pt-2 text-small",
                    isCare ? "text-care-700" : "text-navy-800",
                  )}
                >
                  Read more
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
