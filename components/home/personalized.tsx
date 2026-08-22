import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { PHOTOS } from "@/lib/images";

const ITEMS = [
  {
    title: "Assessment at home",
    body: "We visit, meet the family, and understand the routine before anything is agreed.",
    tone: "care" as const,
  },
  {
    title: "A written care plan",
    body: "Named carers, a clear schedule, and goals you have agreed to in writing.",
    tone: "care" as const,
  },
  {
    title: "Consistent carers",
    body: "The same faces week to week, so nobody has to explain themselves twice.",
    tone: "navy" as const,
  },
  {
    title: "Reviewed as needs change",
    body: "Plans are revisited when circumstances shift, not once a year by default.",
    tone: "navy" as const,
  },
];

/* Reference section 7: centred intro, then a checklist column beside a
   rounded image. Each list item is a dot, a title and one line. */
export function Personalized() {
  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center rounded-pill bg-care-100 px-3 py-1 text-overline text-care-700 uppercase">
            Care plans
          </span>
          <h2 className="text-h2">Personalised care, tailored to the person</h2>
          <p className="measure text-ink-500">
            Everyone&rsquo;s situation is different. Our carers build plans
            around the person in front of them, at the pace that suits the
            family.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <ul className="flex flex-col gap-4">
            {ITEMS.map((item) => (
              <li
                key={item.title}
                className="rounded-md bg-paper-100 px-5 py-4 shadow-card"
              >
                <p className="font-display flex items-center gap-3 text-body font-semibold text-ink-900">
                  <span
                    aria-hidden="true"
                    className={`size-2.5 shrink-0 rounded-pill ${
                      item.tone === "care" ? "bg-brand-care" : "bg-brand-navy"
                    }`}
                  />
                  {item.title}
                </p>
                <p className="mt-1.5 pl-[1.375rem] text-small text-ink-500">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>

          <Photo
            photo={PHOTOS.familySupport}
            ratio="4/3"
            duotone="care"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="shadow-card"
          />
        </div>
      </Container>
    </section>
  );
}
