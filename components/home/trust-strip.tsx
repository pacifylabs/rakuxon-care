import { BadgeCheck, HeartHandshake, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";

const BADGES = [
  {
    icon: BadgeCheck,
    title: "Designed around CQC requirements",
    body: "Person-centred care plans, risk management and clear records.",
  },
  {
    icon: HeartHandshake,
    title: "The person leads the plan",
    body: "Needs, preferences, choices and consent at the centre.",
  },
  {
    icon: MapPin,
    title: "Care stays in the home",
    body: "Where home care is appropriate, supporting independence at home.",
  },
];

export function TrustStrip() {
  return (
    <section className="pb-12 md:pb-16">
      <Container>
        <div className="flex flex-col gap-6">
          <p className="text-center text-small text-ink-500">
            Preparing to support people across England
          </p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {BADGES.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="flex items-start gap-3 rounded-md border border-navy-100 bg-paper-100 px-4 py-4"
              >
                <Icon
                  className="mt-0.5 size-5 shrink-0 text-care-700"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block font-display text-body font-semibold text-ink-900">
                    {title}
                  </span>
                  <span className="mt-1 block text-small text-ink-500">
                    {body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
