import Link from "next/link";
import { HandHeart } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { PHOTOS } from "@/lib/images";
import { SERVICE_ICONS } from "@/lib/service-icons";
import { serviceHref } from "@/lib/clusters";
import type { Service } from "@/lib/cms";

const FEATURED = ["personal-care", "home-care"] as const;

export function ServicesSplit({ services }: { services: Service[] }) {
  const featured = FEATURED.flatMap((slug) => {
    const service = services.find((item) => item.slug === slug);
    return service ? [service] : [];
  });

  return (
    <section id="services" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <Photo
            photo={PHOTOS.carerBedside}
            ratio="16/9"
            duotone="care"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="shadow-card lg:aspect-[4/5]"
          />

          <div className="flex flex-col gap-6 rounded-lg bg-paper-100 p-5 shadow-card sm:p-8">
            <div className="flex flex-col items-start gap-4">
              <span className="inline-flex items-center rounded-pill bg-care-100 px-3 py-1 text-overline text-care-700 uppercase">
                Services
              </span>
              <h2 className="text-h2">Care at home, in the way that fits</h2>
              <p className="measure text-ink-500">
                Personal care, visiting calls, live-in support and short-term
                cover. Every package starts with an assessment at home and a
                plan you agree to.
              </p>
              <Link href="/care" className={buttonClasses({ tone: "care" })}>
                See care services
              </Link>
            </div>

            <div className="mt-auto grid gap-3 sm:grid-cols-2">
              {featured.map((service) => {
                const Icon = SERVICE_ICONS[service.slug] ?? HandHeart;
                return (
                  <Link
                    key={service.slug}
                    href={serviceHref(service)}
                    className="flex flex-col gap-3 rounded-md border border-navy-100 bg-paper-50 p-5 transition-colors hover:bg-care-50"
                  >
                    <span className="grid size-11 place-items-center rounded-md bg-care-100 text-care-700">
                      <Icon
                        className="size-5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="text-h4">{service.title}</h3>
                    <p className="text-small text-ink-500">{service.summary}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
