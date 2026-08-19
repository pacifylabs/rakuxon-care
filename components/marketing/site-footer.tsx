import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/marketing/logo";
import { getSiteSettings } from "@/lib/cms";

/* Reference section 14: navy panel — logo, blurb and social icons on the
   left; Quick Links and Contact Info columns on the right; legal row
   beneath. Social glyphs are drawn inline because Lucide 1.x ships no
   brand icons. */
const SOCIALS = [
  {
    label: "LinkedIn",
    path: (
      <>
        <path d="M4.5 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM3.2 8.2h2.6V16H3.2V8.2Z" />
        <path d="M7.8 8.2h2.5v1.06h.04c.35-.63 1.2-1.3 2.47-1.3 2.64 0 3.13 1.66 3.13 3.83V16h-2.6v-3.65c0-.87-.02-1.99-1.25-1.99-1.25 0-1.44.94-1.44 1.92V16H7.8V8.2Z" />
      </>
    ),
  },
  {
    label: "Facebook",
    path: (
      <path d="M12.4 10.2h-1.9V16H8.1v-5.8H6.8V8.3h1.3V7.1c0-1.7.75-2.7 2.8-2.7h1.7v1.9h-1.06c-.8 0-.85.3-.85.85v1.15h1.92l-.22 1.9Z" />
    ),
  },
  {
    label: "X",
    path: (
      <path d="M14.2 4h2.1l-4.6 5.26L17.1 16h-4.2l-3.3-4.3L5.8 16H3.7l4.9-5.6L3.6 4h4.3l3 3.95L14.2 4Zm-.74 10.7h1.16L7.6 5.22H6.35l7.11 9.48Z" />
    ),
  },
];

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
      { label: "Create an account", href: "/login" },
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
                CQC-registered care at home for families and councils, and
                end-to-end support for the businesses that deliver it.
              </p>
              <ul className="flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={settings.socials[0]?.href ?? "#"}
                      aria-label={`Rakuxon Care on ${s.label}`}
                      className="grid size-11 place-items-center rounded-pill border border-navy-700 text-navy-100 transition-colors hover:bg-navy-800 hover:text-white"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="size-4 fill-current"
                      >
                        {s.path}
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
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
                <li className="flex items-start gap-3">
                  <MapPin
                    className="mt-3 size-4 shrink-0 text-care-500"
                    aria-hidden="true"
                  />
                  <span className="py-2">{settings.address.join(", ")}</span>
                </li>
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
              </ul>
            </div>
          </div>

          {/* Legal row. */}
          <div className="mt-10 flex flex-col gap-4 border-t border-navy-700 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-small">
              © {new Date().getFullYear()} {settings.legalName}. Company number{" "}
              {settings.companyNumber} · ICO {settings.icoRegistration} ·{" "}
              {settings.cqc.state === "registered"
                ? `CQC registered, rated ${settings.cqc.rating}`
                : "CQC registration in progress"}
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
