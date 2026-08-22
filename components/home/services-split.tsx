import Link from "next/link";
import { Building2, HeartHandshake } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { PHOTOS } from "@/lib/images";

/* Reference section 6: a large image on one side; on the other a panel
   carrying eyebrow, heading, subtext and CTA, with two icon service cards
   nested beneath it. Both audiences are represented by the two cards. */
export function ServicesSplit() {
  return (
    <section id="services" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <Photo
            photo={PHOTOS.carerBedside}
            ratio="4/5"
            duotone="care"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="shadow-card"
          />

          <div className="flex flex-col gap-6 rounded-lg bg-paper-100 p-6 shadow-card sm:p-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="inline-flex items-center rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
                Services
              </span>
              <h2 className="text-h2">One group, four ways to help</h2>
              <p className="measure text-ink-500">
                Rakuxon Care provides personal and domiciliary care at home.
                Rakuxon Care Agency gives other providers the registration,
                tenders, systems and staffing to do the same.
              </p>
              <Link
                href="/care"
                className={buttonClasses({ tone: "care", className: "mt-1" })}
              >
                See care services
              </Link>
            </div>

            <div className="mt-auto grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: HeartHandshake,
                  title: "Rakuxon Care",
                  body: "Personal and domiciliary care at home, for families, councils and ICBs.",
                  href: "/care",
                },
                {
                  icon: Building2,
                  title: "Rakuxon Care Agency",
                  body: "Registration, tenders, policies, digital, consulting and staffing.",
                  href: "/agency",
                },
              ].map(({ icon: Icon, title, body, href }) => (
                <Link
                  key={title}
                  href={href}
                  className="flex flex-col gap-3 rounded-md border border-navy-100 bg-paper-50 p-5 transition-colors hover:bg-navy-50"
                >
                  <span className="grid size-11 place-items-center rounded-md bg-navy-100 text-navy-800">
                    <Icon
                      className="size-5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="text-h4">{title}</h3>
                  <p className="text-small text-ink-500">{body}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
