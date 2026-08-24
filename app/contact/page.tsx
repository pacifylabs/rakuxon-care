import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { EnquiryForm } from "@/components/marketing/enquiry-form";
import { getSiteSettings } from "@/lib/cms";
import { parseEnquiryIntent } from "@/lib/enquiry";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Rakuxon Care about arranging care at home, or about support for a care business.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string | string[] }>;
}) {
  const settings = await getSiteSettings();
  const initialIntent = parseEnquiryIntent((await searchParams).intent);

  return (
    <>
      <section className="bg-care-50 py-14 md:py-20">
        <Container>
          <div className="flex max-w-2xl flex-col items-start gap-5">
            <span className="inline-flex items-center rounded-pill bg-care-100 px-3 py-1 text-overline text-care-700 uppercase">
              Contact
            </span>
            <h1 className="text-h1">Get in touch</h1>
            <p className="measure text-body-lg text-ink-500">
              Tell us what is happening. We will come back to you with a person,
              not an autoresponder.
            </p>
            <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
              {settings.email ? (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="inline-flex min-h-11 items-center gap-2 text-navy-800 underline-offset-4 hover:underline"
                  >
                    <Mail
                      className="size-4 shrink-0 text-care-700"
                      aria-hidden="true"
                    />
                    <span className="break-all">{settings.email}</span>
                  </a>
                </li>
              ) : null}
              {settings.phone ? (
                <li>
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="inline-flex min-h-11 items-center gap-2 text-navy-800 underline-offset-4 hover:underline"
                  >
                    <Phone
                      className="size-4 shrink-0 text-care-700"
                      aria-hidden="true"
                    />
                    <span>
                      {settings.phone}
                      {settings.phoneNote ? (
                        <span className="text-ink-500">
                          {" "}
                          · {settings.phoneNote}
                        </span>
                      ) : null}
                    </span>
                  </a>
                </li>
              ) : null}
              {settings.regionsServed ? (
                <li className="inline-flex min-h-11 items-center gap-2 text-ink-700">
                  <MapPin
                    className="size-4 shrink-0 text-care-700"
                    aria-hidden="true"
                  />
                  {settings.regionsServed}
                </li>
              ) : null}
            </ul>
          </div>
        </Container>
      </section>

      <div className="py-14 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <EnquiryForm initialIntent={initialIntent} />
          </div>
        </Container>
      </div>
    </>
  );
}
