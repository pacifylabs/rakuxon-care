import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { cn } from "@/lib/cn";
import type { Lane } from "@/lib/cms";

/* §4.21: centred eyebrow + H2 + one line of muted subtext — the standard
   lead-in for most sections. `align="start"` is used where a section needs
   to sit beside an image rather than lead a full-width block. */
export function SectionIntro({
  eyebrow,
  title,
  subtitle,
  lane = "both",
  align = "center",
  className,
  as: Heading = "h2",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  lane?: Lane;
  align?: "center" | "start";
  className?: string;
  as?: "h2" | "h3";
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        invert ? (
          <span className="inline-flex items-center rounded-pill bg-navy-700 px-3 py-1 text-overline text-white uppercase">
            {eyebrow}
          </span>
        ) : (
          <Eyebrow lane={lane}>{eyebrow}</Eyebrow>
        )
      ) : null}
      <Heading
        className={cn(
          Heading === "h2" ? "text-h2" : "text-h3",
          invert && "text-white",
        )}
      >
        {title}
      </Heading>
      {subtitle ? (
        <p
          className={cn(
            "measure text-body-lg",
            invert ? "text-on-navy" : "text-ink-500",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/* Vertical rhythm comes from §3's 64–128px steps. `tint` gives a section
   the lane-tinted background the design system calls for. */
export function Section({
  id,
  tint = "none",
  className,
  children,
}: {
  id?: string;
  tint?: "none" | "paper" | "navy" | "care" | "deep";
  className?: string;
  children: React.ReactNode;
}) {
  const tints = {
    none: "",
    paper: "bg-paper-0",
    navy: "bg-navy-50",
    care: "bg-care-50",
    /* Full-strength navy band. data-surface flips the focus ring to white
       so keyboard focus stays visible against it (§5). */
    deep: "bg-navy-900",
  } as const;

  return (
    <section
      id={id}
      data-surface={tint === "deep" ? "navy" : undefined}
      className={cn("scroll-mt-24 py-16 md:py-24", tints[tint], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
