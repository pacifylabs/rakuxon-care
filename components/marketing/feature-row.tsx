import { Photo } from "@/components/ui/photo";
import { CheckRow } from "@/components/marketing/cards";
import type { Photo as PhotoData } from "@/lib/images";
import { cn } from "@/lib/cn";
import type { Lane } from "@/lib/cms";

/* §4.19: rounded image panel one side, heading + checklist the other,
   alternating down the page. */
export function FeatureRow({
  eyebrow,
  title,
  body,
  features,
  photo,
  lane = "both",
  reverse = false,
  children,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  features?: string[];
  photo: PhotoData;
  lane?: Lane;
  reverse?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
      <Photo
        photo={photo}
        ratio="fill"
        duotone={lane === "b2c" ? "care" : "navy"}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={cn("shadow-card", reverse && "lg:order-2")}
      />
      <div className="flex flex-col gap-5">
        {eyebrow ? (
          <span className="text-overline text-ink-500 uppercase">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="text-h2">{title}</h2>
        {body ? (
          <p className="measure text-body-lg text-ink-500">{body}</p>
        ) : null}
        {features?.length ? (
          <ul className="flex flex-col gap-3">
            {features.map((f) => (
              <CheckRow key={f} lane={lane}>
                {f}
              </CheckRow>
            ))}
          </ul>
        ) : null}
        {children}
      </div>
    </div>
  );
}
