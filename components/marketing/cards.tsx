import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { cn } from "@/lib/cn";
import type { Lane } from "@/lib/cms";
import type { Photo as PhotoData } from "@/lib/images";

/* Three deliberately different card compositions. Repeating one card shape
   down a whole page is the main thing that makes a layout read as
   generated; §4 wants variety within one visual system. */

const laneAccent = (lane: Lane) =>
  lane === "b2c"
    ? { chip: "bg-care-100 text-care-700", link: "text-care-700" }
    : { chip: "bg-navy-100 text-navy-800", link: "text-navy-800" };

/** Icon + text. Used for value props and "why us" grids. */
export function IconCard({
  icon: Icon,
  title,
  body,
  lane = "both",
  className,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  lane?: Lane;
  className?: string;
}) {
  const a = laneAccent(lane);
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-3 rounded-lg bg-paper-100 p-6 shadow-card",
        /* Lift on hover of the wrapping link. Motion is clamped to ~0ms by
           the prefers-reduced-motion block in globals.css. */
        "transition-[transform,box-shadow,background-color] duration-200 ease-out",
        "group-hover:-translate-y-1 group-hover:shadow-card-hover",
        "group-focus-visible:-translate-y-1 group-focus-visible:shadow-card-hover",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-md",
          "transition-transform duration-200 ease-out group-hover:scale-105",
          a.chip,
        )}
      >
        <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className="text-h4">{title}</h3>
      <p className="text-ink-500">{body}</p>
    </div>
  );
}

/** Image-topped card. Used for service grids where the subject is visual. */
export function ImageCard({
  photo,
  title,
  body,
  href,
  lane = "both",
  className,
}: {
  photo: PhotoData;
  title: string;
  body: string;
  href?: string;
  lane?: Lane;
  className?: string;
}) {
  const a = laneAccent(lane);
  const inner = (
    <>
      <Photo
        photo={photo}
        ratio="3/2"
        radius="md"
        duotone={lane === "b2c" ? "care" : "navy"}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <h3 className="mt-5 text-h4">{title}</h3>
      <p className="mt-2 text-ink-500">{body}</p>
      {href ? (
        <span
          className={cn(
            "mt-auto inline-flex items-center gap-2 pt-4 text-small",
            a.link,
          )}
        >
          Learn more
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      ) : null}
    </>
  );

  const base = cn(
    "group flex h-full flex-col overflow-hidden rounded-lg bg-paper-100 p-4 shadow-card transition-colors",
    className,
  );

  return href ? (
    <Link href={href} className={cn(base, "hover:bg-paper-0")}>
      {inner}
    </Link>
  ) : (
    <div className={base}>{inner}</div>
  );
}

/** Number-led card for the credibility band. */
export function StatCard({
  value,
  label,
  icon: Icon,
  className,
}: {
  value: string;
  label: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-lg bg-paper-100 p-6 shadow-card",
        className,
      )}
    >
      {Icon ? (
        <Icon
          className="mb-2 size-5 text-care-700"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      ) : null}
      <span className="font-display text-h2 text-ink-900">{value}</span>
      <span className="text-small text-ink-500">{label}</span>
    </div>
  );
}

/** Compact list row with a lane-tinted tick. Used beside feature imagery. */
export function CheckRow({
  children,
  lane = "both",
}: {
  children: React.ReactNode;
  lane?: Lane;
}) {
  return (
    <li className="flex items-start gap-3 rounded-md bg-paper-100 px-4 py-3 shadow-card">
      <span
        className={cn(
          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-pill",
          lane === "b2c" ? "bg-care-100" : "bg-navy-100",
        )}
      >
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={cn(
            "size-3 fill-current",
            lane === "b2c" ? "text-care-700" : "text-navy-800",
          )}
        >
          <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" />
        </svg>
      </span>
      <span className="text-ink-700">{children}</span>
    </li>
  );
}
