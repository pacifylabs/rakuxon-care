import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Two prepared variants rather than a CSS filter.
 *
 * The supplied /logo.png is an opaque navy wordmark on a light background,
 * so `filter: invert()` would have produced a dark rectangle on the navy
 * footer. /logo-navy.png and /logo-white.png are transparent-background
 * variants generated from it — see TODO.md.
 */
/* Each variant carries its own intrinsic size. They are not the same
   aspect ratio (3.000 vs 2.809), so a single shared constant stretched
   whichever one it did not describe. */
const SRC = {
  navy: { src: "/logo-navy.png", width: 2172, height: 724 },
  white: { src: "/logo-white.png", width: 2101, height: 748 },
} as const;

/* Size with a height class (`h-6`, `h-7`); width follows the aspect ratio.
   In a `flex-col` parent, add `self-start` — otherwise align-items:stretch
   expands `width:auto` to the full column. */
export function Logo({
  variant = "navy",
  className,
  priority = false,
}: {
  variant?: keyof typeof SRC;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={SRC[variant].src}
      alt="Rakuxon Care"
      width={SRC[variant].width}
      height={SRC[variant].height}
      priority={priority}
      className={cn("w-auto", className)}
    />
  );
}
