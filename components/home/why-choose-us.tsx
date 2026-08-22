import {
  BadgeCheck,
  FileCheck2,
  HeartHandshake,
  MonitorSmartphone,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { PHOTOS } from "@/lib/images";

const FEATURES = [
  {
    icon: HeartHandshake,
    title: "The person comes first",
    body: "Plans are built around the routine in front of us, not a standard visit length.",
  },
  {
    icon: BadgeCheck,
    title: "Faces you recognise",
    body: "The same small team wherever the rota allows, so nobody starts again each week.",
  },
  {
    icon: FileCheck2,
    title: "Funding we already work with",
    body: "Private-pay, council packages, ICBs and NHS Continuing Healthcare.",
  },
  {
    icon: MonitorSmartphone,
    title: "Clear from the start",
    body: "A written plan and named carers before support begins. If we are not the right fit, we say so.",
  },
];

/* Reference section 9: team image beside heading and subtext, with a row
   of four supporting feature columns beneath. */
export function WhyChooseUs() {
  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-start gap-4">
            <span className="inline-flex items-center rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
              The people behind the promise
            </span>
            <h2 className="text-h2">We know care because we do care</h2>
            <p className="measure text-ink-500">
              Rakuxon was shaped by people who have worked inside care — with
              families, with teams, and with the responsibilities that sit
              behind every visit. That lived perspective keeps our work
              practical, warm and accountable.
            </p>
            <blockquote className="measure border-l-2 border-care-600 pl-4 font-serif text-body-lg text-ink-700 italic">
              Respect is not an extra in care. It is the starting point.
            </blockquote>
          </div>
          <Photo
            photo={PHOTOS.careTeamGroup}
            ratio="fill"
            duotone="navy"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="shadow-card lg:order-first"
          />
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, body }, i) => (
            <li
              key={title}
              className={`flex flex-col gap-3 ${
                i > 0 ? "lg:border-l lg:border-navy-100 lg:pl-8" : ""
              }`}
            >
              <Icon
                className="size-6 text-care-600"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <h3 className="font-display text-h4">{title}</h3>
              <p className="text-small text-ink-500">{body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
