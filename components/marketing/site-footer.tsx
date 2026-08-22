import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/marketing/logo";
import { getSiteSettings } from "@/lib/cms";

/* Reference section 14: navy panel — logo, blurb and social icons on the
   left; Quick Links and Contact Info columns on the right; legal row
   beneath. Social glyphs are drawn inline because Lucide 1.x ships no
   brand icons. */

/* PRD §3.2 — four columns keyed to the arms, company and getting started.
   Blog, case studies and careers arrive in Phases 4–5; those links are held
   back rather than shipped as 404s. Logged in TODO.md. */
/* 04_SITE_ARCHITECTURE §3 — footer mirrors the nested namespaces. */
const COLUMNS = [
  {
    heading: "Care at home",
    links: [
      { label: "Care services", href: "/care" },
      { label: "Personal care", href: "/care/personal-care" },
      { label: "Home care", href: "/care/home-care" },
      { label: "Live-in care", href: "/care/live-in-care" },
      { label: "Respite care", href: "/care/respite-care" },
      { label: "Who we support", href: "/care#who-we-support" },
      { label: "Areas we cover", href: "/care/areas-we-cover" },
      { label: "Fees and funding", href: "/care/fees-funding" },
    ],
  },
  {
    heading: "Care businesses",
    links: [
      { label: "Business services", href: "/agency" },
      { label: "CQC registration", href: "/agency/cqc-registration" },
      { label: "Tender and bid writing", href: "/agency/tender-writing" },
      { label: "Live tender opportunities", href: "/agency/opportunities" },
      { label: "Website and digital", href: "/agency/digital-services" },
      { label: "Recruitment and staffing", href: "/agency/staffing" },
      { label: "Consulting", href: "/agency/consulting" },
      { label: "Care Business Launch Kit", href: "/agency/launch-kit" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About & CQC", href: "/about" },
      { label: "Our CQC rating", href: "/care/cqc-rating" },
      { label: "Resources", href: "/resources" },
      { label: "Case studies", href: "/agency/case-studies" },
      { label: "Careers", href: "/careers" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Get started",
    links: [
      { label: "Request care", href: "/care/refer" },
      { label: "Book a free call", href: "/agency/book-a-call" },
      { label: "Free digital audit", href: "/agency/digital-audit" },
      { label: "Join as a carer", href: "/care/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export async function SiteFooter() {
  const settings = await getSiteSettings();

  return (
    <footer data-surface="navy" className="pb-6">
      <Container>
        <div className="rounded-lg bg-navy-900 px-6 py-12 text-navy-100 md:px-10 md:py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
            {/* Left: logo, blurb, socials. */}
            <div className="flex flex-col gap-5">
              <Logo variant="white" className="h-7 self-start" />
              <p className="measure text-navy-100">
                Dependable support at home, built around your person. And
                practical expertise for the people building better care
                services.
              </p>
            </div>

            {COLUMNS.slice(0, 3).map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <h2 className="font-display text-h4 text-white">
                  {col.heading}
                </h2>
                <ul className="flex flex-col">
                  {col.links.map((l) => (
                    <li key={`${col.heading}-${l.label}`}>
                      <Link
                        href={l.href}
                        className="flex min-h-11 items-center text-navy-100 underline-offset-4 transition-colors hover:text-white hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-10 border-t border-navy-700 pt-10 md:grid-cols-2">
            {/* Get started. */}
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-h4 text-white">
                {COLUMNS[3].heading}
              </h2>
              <ul className="flex flex-col">
                {COLUMNS[3].links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="flex min-h-11 items-center text-navy-100 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info. */}
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-h4 text-white">Contact info</h2>
              <ul className="flex flex-col gap-2">
                {/* Only confirmed channels are rendered. Address and phone
                    are absent by design — see SITE_SETTINGS and TODO.md. */}
                {settings.address ? (
                  <li className="flex items-start gap-3">
                    <MapPin
                      className="mt-3 size-4 shrink-0 text-care-500"
                      aria-hidden="true"
                    />
                    <span className="py-2">{settings.address.join(", ")}</span>
                  </li>
                ) : null}
                {settings.phone ? (
                  <li>
                    <a
                      href={`tel:${settings.phone.replace(/\s/g, "")}`}
                      className="flex min-h-11 items-center gap-3 underline-offset-4 hover:text-white hover:underline"
                    >
                      <Phone
                        className="size-4 shrink-0 text-care-500"
                        aria-hidden="true"
                      />
                      {settings.phone}
                    </a>
                  </li>
                ) : null}
                {settings.email ? (
                  <li>
                    <a
                      href={`mailto:${settings.email}`}
                      className="flex min-h-11 items-center gap-3 break-all underline-offset-4 hover:text-white hover:underline"
                    >
                      <Mail
                        className="size-4 shrink-0 text-care-500"
                        aria-hidden="true"
                      />
                      {settings.email}
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          {/* Legal row. */}
          <div className="mt-10 flex flex-col gap-4 border-t border-navy-700 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-small">
              © {new Date().getFullYear()} {settings.legalName}.
              {settings.companyNumber
                ? ` Company number ${settings.companyNumber}.`
                : ""}
              {settings.icoRegistration
                ? ` ICO ${settings.icoRegistration}.`
                : ""}{" "}
              {settings.cqc.state === "registered"
                ? `CQC registered, rated ${settings.cqc.rating}`
                : "CQC and regulated-care information available on request"}
            </p>
            <p className="text-small text-navy-100/85">{settings.easNote}</p>
            <ul className="flex flex-wrap items-center gap-x-5">
              {[
                { label: "Privacy", href: "/privacy" },
                { label: "Cookies", href: "/cookies" },
                { label: "Terms", href: "/terms" },
                { label: "Accessibility", href: "/accessibility" },
                { label: "Complaints", href: "/complaints" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex min-h-11 min-w-11 items-center justify-center text-small underline-offset-4 hover:text-white hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
