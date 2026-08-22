import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CqcBadge } from "@/components/marketing/cqc-badge";
import { getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Rakuxon Care about arranging care at home, commissioning packages, or registering and growing a care business.",
};

/* Phase 2 shell. The segmented enquiry form (PRD §7.1) is Phase 3 work and
   drops into the slot below. This page exists now because it is the target
   of the primary CTA in the nav, footer and every page — shipping Phase 2
   without it would leave the main conversion path pointing at a 404. */
export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
              Contact
            </span>
            <h1 className="text-h1">Get in touch</h1>
            <p className="measure text-body-lg text-ink-500">
              Tell us which side you are on and what is happening. We will come
              back to you with a person, not an autoresponder.
            </p>

            {/* <div className="rounded-lg border-2 border-dashed border-navy-600/40 bg-navy-50 p-8">
              <h2 className="text-h4">Enquiry form — Phase 3</h2>
              <p className="measure mt-2 text-ink-700">
                The segmented enquiry form goes here: an intent selector, then
                branching fields for families, councils and care businesses,
                with GDPR consent and accessible inline errors. It is built in
                Phase 3 alongside lead storage, confirmation emails and spam
                protection.
              </p>
              <p className="mt-3 text-small text-ink-500">
                Field-level requirements are owed by PRD §7.1.
              </p>
            </div> */}
          </div>

          <aside className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-lg bg-paper-100 p-6 shadow-card">
              <h2 className="text-h4">Direct contact</h2>
              <dl className="flex flex-col gap-3">
                {/* Email is the one confirmed channel for the care brand.
                    Phone and address are omitted rather than filled with
                    plausible values — see TODO.md. */}
                {settings.email ? (
                  <div>
                    <dt className="text-small text-ink-500">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${settings.email}`}
                        className="break-all text-navy-800 underline-offset-4 hover:underline"
                      >
                        {settings.email}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {settings.phone ? (
                  <div>
                    <dt className="text-small text-ink-500">Phone</dt>
                    <dd>
                      <a
                        href={`tel:${settings.phone.replace(/\s/g, "")}`}
                        className="text-navy-800 underline-offset-4 hover:underline"
                      >
                        {settings.phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {settings.address ? (
                  <div>
                    <dt className="text-small text-ink-500">Address</dt>
                    <dd className="text-ink-700">
                      {settings.address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </dd>
                  </div>
                ) : null}
                {settings.regionsServed ? (
                  <div>
                    <dt className="text-small text-ink-500">Coverage</dt>
                    <dd className="text-ink-700">{settings.regionsServed}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
            <CqcBadge />
          </aside>
        </div>
      </Container>
    </div>
  );
}
