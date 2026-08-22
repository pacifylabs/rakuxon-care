import { BadgeCheck, HeartHandshake, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";

/*
 * Replaces the invented partner-logo row ("Boltshift", "Lightbox", …). Those
 * companies did not exist. This is the trust line and the three practice
 * badges as published on the Rakuxon Care source site.
 */
const BADGES = [
  { icon: BadgeCheck, label: "CQC-conscious practice" },
  { icon: HeartHandshake, label: "Person-centred by design" },
  { icon: MapPin, label: "UK care expertise" },
];

export function TrustStrip() {
  return (
    <section className="pb-12 md:pb-16">
      <Container>
        <div className="flex flex-col items-center gap-6">
          <p className="text-center text-small text-ink-500">
            Proudly serving families and care teams across the UK
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {BADGES.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className="inline-flex items-center gap-2 rounded-pill border border-navy-100 bg-paper-100 px-4 py-2 text-small text-ink-700">
                  <Icon
                    className="size-4 shrink-0 text-care-600"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
