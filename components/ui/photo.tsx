import NextImage from "next/image";
import { cn } from "@/lib/cn";
import type { Photo as PhotoData } from "@/lib/images";

const RATIOS = {
  /*
   * Fills the height of its grid row instead of holding a ratio, so an
   * image and the text beside it start and end on the same line. Below lg
   * the columns stack, where there is no row to fill — so a ratio applies
   * there, plus a floor so a short text column cannot squash the image
   * into a letterbox.
   */
  fill: "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-80",
  // "fill" also takes the <img> out of flow (see below) so the container
  // contributes no intrinsic height and the TEXT column sets the row.
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
} as const;

const RADII = {
  md: "rounded-md",
  lg: "rounded-lg",
  none: "",
} as const;

/**
 * The single way photography enters the page.
 *
 * Wraps next/image with the design system's rules: images always carry a
 * radius (§0.1), always crop to a declared ratio so grids stay aligned, and
 * always take a subtle navy or teal duotone so a mixed-source photo set
 * reads as one (§3). `priority` is reserved for the LCP image.
 */
export function Photo({
  photo,
  ratio = "4/3",
  radius = "lg",
  duotone = "navy",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className,
  imgClassName,
}: {
  photo: PhotoData;
  ratio?: keyof typeof RATIOS;
  radius?: keyof typeof RADII;
  duotone?: "navy" | "care" | "none";
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-paper-0",
        RATIOS[ratio],
        RADII[radius],
        duotone === "navy" && "duotone-navy",
        duotone === "care" && "duotone-care",
        className,
      )}
    >
      <NextImage
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={cn(
          "h-full w-full object-cover",
          /* Out of flow for "fill": otherwise the image's own aspect ratio
             sets the row height and the text stretches to match it — the
             opposite of the intent. Absolute means the container height
             comes only from h-full, i.e. from the text column. */
          ratio === "fill" && "absolute inset-0",
          imgClassName,
        )}
      />
    </div>
  );
}
