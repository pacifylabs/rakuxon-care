import {
  BadgeCheck,
  FileCheck2,
  HeartHandshake,
  MonitorSmartphone,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { PHOTOS } from "@/lib/images";

/* PRD §1.1 — the authority moat. Every claim here is about how the two arms
   relate, not about volumes we have not delivered yet. */
const FEATURES = [
  {
    icon: BadgeCheck,
    title: "We are inspected\ntoo",
    body: "Our own service is judged against the framework you are judged against.",
  },
  {
    icon: FileCheck2,
    title: "Evidence, not\ntemplates",
    body: "Policies we supply are policies we run, with the audit trail behind them.",
  },
  {
    icon: MonitorSmartphone,
    title: "One team, both\nsides",
    body: "Registration, tenders, digital and staffing handled by people who talk to each other.",
  },
  {
    icon: HeartHandshake,
    title: "We will tell you\nno",
    body: "If an application is not ready we say so before you submit, not after.",
  },
];

/* Reference section 9: team image beside heading and subtext, with a row
   of four supporting feature columns beneath. */
export function WhyChooseUs() {
  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Photo
            photo={PHOTOS.careTeamGroup}
            ratio="4/3"
            duotone="navy"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="shadow-card"
          />
          <div className="flex flex-col items-start gap-4">
            <span className="inline-flex items-center rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
              The people behind the promise
            </span>
            <h2 className="text-h2">
              We know care
              <br className="hidden sm:block" /> because we do care
            </h2>
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
              <h3 className="font-display text-h4 whitespace-pre-line">
                {title}
              </h3>
              <p className="text-small text-ink-500">{body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
