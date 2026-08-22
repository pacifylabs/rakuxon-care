import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/marketing/logo";
import { getSiteSettings } from "@/lib/cms";

/* Icon paths keyed to SITE_SETTINGS.socials. Lucide 1.x ships no brand
   icons, so the glyphs are inline. Each href is a real account URL. */
const SOCIAL_ICONS: Record<string, string> = {
  Instagram:
    "M10 6.1a3.9 3.9 0 1 0 0 7.8 3.9 3.9 0 0 0 0-7.8Zm0 6.43a2.53 2.53 0 1 1 0-5.06 2.53 2.53 0 0 1 0 5.06Zm4.97-6.59a.91.91 0 1 1-1.82 0 .91.91 0 0 1 1.82 0ZM17.55 6.6c-.04-1.22-.32-2.3-1.21-3.19-.9-.89-1.98-1.17-3.2-1.24-1.25-.07-5.02-.07-6.27 0-1.22.07-2.3.35-3.2 1.24-.89.89-1.16 1.97-1.23 3.19-.07 1.26-.07 5.02 0 6.28.04 1.22.32 2.3 1.22 3.19.9.89 1.98 1.17 3.2 1.24 1.26.07 5.02.07 6.28 0 1.22.07 2.3-.35 3.2-1.24.89-.89 1.17-1.97 1.21-3.19.07-1.26.07-5.02 0-6.28Zm-1.62 7.63a2.56 2.56 0 0 1-1.44 1.44c-1 .4-3.37.31-4.48.31-1.11 0-3.49.08-4.49-.31a2.56 2.56 0 0 1-1.44-1.44c-.4-1-.31-3.37-.31-4.49 0-1.11-.08-3.49.31-4.49a2.56 2.56 0 0 1 1.44-1.44c1-.4 3.38-.31 4.49-.31 1.11 0 3.49-.08 4.48.31.66.26 1.18.78 1.44 1.44.4 1 .31 3.38.31 4.49 0 1.12.09 3.49-.31 4.49Z",
  Facebook:
    "M12.4 10.2h-1.9V16H8.1v-5.8H6.8V8.3h1.3V7.1c0-1.7.75-2.7 2.8-2.7h1.7v1.9h-1.06c-.8 0-.85.3-.85.85v1.15h1.92l-.22 1.9Z",
  X: "M13.6 3.5h2.2l-4.8 5.5 5.65 7.5h-4.42l-3.47-4.53-3.96 4.53H2.6l5.14-5.88L2.32 3.5h4.53l3.13 4.14L13.6 3.5Zm-.77 11.68h1.22L6.5 4.74H5.18l7.65 10.44Z",
  TikTok:
    "M13.2 2.5h-2.3v9.35a1.9 1.9 0 1 1-1.36-1.82V7.66a4.2 4.2 0 1 0 3.66 4.16V7.4a4.6 4.6 0 0 0 2.7.87V5.98a2.7 2.7 0 0 1-2.7-2.7v-.78Z",
  YouTube:
    "M17.4 6.2a1.94 1.94 0 0 0-1.36-1.37C14.83 4.5 10 4.5 10 4.5s-4.83 0-6.04.33A1.94 1.94 0 0 0 2.6 6.2C2.27 7.4 2.27 10 2.27 10s0 2.6.33 3.8c.18.67.71 1.19 1.36 1.37 1.21.33 6.04.33 6.04.33s4.83 0 6.04-.33a1.94 1.94 0 0 0 1.36-1.37c.33-1.2.33-3.8.33-3.8s0-2.6-.33-3.8ZM8.45 12.31V7.69L12.47 10l-4.02 2.31Z",
  WhatsApp:
    "M10.02 2.5a7.42 7.42 0 0 0-6.35 11.25L2.5 17.5l3.85-1.13A7.42 7.42 0 1 0 10.02 2.5Zm0 13.35a5.9 5.9 0 0 1-3.02-.83l-.22-.13-2.29.67.68-2.23-.14-.23a5.93 5.93 0 1 1 4.99 2.75Zm3.26-4.44c-.18-.09-1.06-.52-1.22-.58-.16-.06-.28-.09-.4.09-.12.18-.46.58-.56.7-.1.12-.21.13-.39.04a4.85 4.85 0 0 1-1.43-.88 5.4 5.4 0 0 1-.99-1.23c-.1-.18-.01-.28.08-.37l.27-.32c.09-.1.12-.18.18-.3.06-.12.03-.22-.01-.31-.05-.09-.4-.97-.55-1.33-.15-.35-.29-.3-.4-.3l-.34-.01a.65.65 0 0 0-.47.22c-.16.18-.62.6-.62 1.47s.63 1.71.72 1.83c.09.12 1.24 1.9 3.01 2.66.42.18.75.29 1 .37.42.14.8.12 1.11.07.34-.05 1.06-.43 1.2-.85.15-.42.15-.78.11-.85-.04-.08-.16-.12-.34-.21Z",
};

/* Hubs plus a conversion link each — the rest of the catalogue lives in
   the mega-menu, so the footer does not repeat it. */
const COLUMNS = [
  {
    heading: "Care at home",
    links: [
      { label: "Care services", href: "/care" },
      { label: "Who we support", href: "/care#who-we-support" },
      { label: "Fees and funding", href: "/care/fees-funding" },
      { label: "Request care", href: "/care/refer" },
    ],
  },
  {
    heading: "Care businesses",
    links: [
      { label: "Business services", href: "/agency" },
      { label: "CQC registration", href: "/agency/cqc-registration" },
      { label: "Launch Kit", href: "/agency/launch-kit" },
      { label: "Book a free call", href: "/agency/book-a-call" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About & CQC", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Complaints", href: "/complaints" },
];

export async function SiteFooter() {
  const settings = await getSiteSettings();

  return (
    <footer data-surface="navy" className="pb-6">
      <Container>
        <div className="rounded-lg bg-navy-900 px-6 py-10 text-on-navy md:px-10 md:py-12">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
            <div className="flex flex-col gap-4">
              <Logo variant="white" className="h-10 self-start md:h-12" />
              <p className="max-w-sm text-small text-on-navy">
                Dependable support at home, and practical expertise for people
                building better care services.
              </p>
              <ul className="flex flex-col gap-1">
                {settings.email ? (
                  <li>
                    <a
                      href={`mailto:${settings.email}`}
                      className="inline-flex min-h-9 items-center gap-2 text-small underline-offset-4 hover:text-white hover:underline"
                    >
                      <Mail
                        className="size-3.5 shrink-0 text-care-500"
                        aria-hidden="true"
                      />
                      {settings.email}
                    </a>
                  </li>
                ) : null}
                {settings.phone ? (
                  <li>
                    <a
                      href={`tel:${settings.phone.replace(/\s/g, "")}`}
                      className="inline-flex min-h-9 items-center gap-2 text-small underline-offset-4 hover:text-white hover:underline"
                    >
                      <Phone
                        className="size-3.5 shrink-0 text-care-500"
                        aria-hidden="true"
                      />
                      <span>
                        {settings.phone}
                        {settings.phoneNote ? (
                          <span className="text-on-navy/75">
                            {" "}
                            · {settings.phoneNote}
                          </span>
                        ) : null}
                      </span>
                    </a>
                  </li>
                ) : null}
                {settings.address ? (
                  <li className="flex items-start gap-2 py-1.5 text-small">
                    <MapPin
                      className="mt-0.5 size-3.5 shrink-0 text-care-500"
                      aria-hidden="true"
                    />
                    {settings.address.join(", ")}
                  </li>
                ) : null}
              </ul>
              {settings.socials?.length ? (
                <ul className="flex flex-wrap items-center gap-1">
                  {settings.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        aria-label={`Rakuxon on ${social.label}`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="grid size-9 place-items-center rounded-pill text-on-navy transition-colors hover:bg-navy-800 hover:text-white"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className="size-4 fill-current"
                        >
                          <path d={SOCIAL_ICONS[social.label]} />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:contents">
              {COLUMNS.map((col) => (
                <div key={col.heading} className="flex min-w-0 flex-col gap-2">
                  <h2 className="text-overline text-white uppercase">
                    {col.heading}
                  </h2>
                  <ul className="flex flex-col">
                    {col.links.map((l) => (
                      <li key={`${col.heading}-${l.label}`}>
                        <Link
                          href={l.href}
                          className="flex min-h-9 items-center text-small text-on-navy underline-offset-4 transition-colors hover:text-white hover:underline"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-navy-700 pt-5">
            <ul className="grid grid-cols-2 gap-x-6 sm:flex sm:flex-wrap sm:items-center sm:gap-x-4">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-9 items-center text-small text-on-navy/85 underline-offset-4 hover:text-white hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-small text-on-navy/85">
              © {new Date().getFullYear()} {settings.legalName}.
              {settings.companyNumber
                ? ` Company number ${settings.companyNumber}.`
                : ""}
              {settings.icoRegistration
                ? ` ICO ${settings.icoRegistration}.`
                : ""}{" "}
              {settings.cqc.state === "registered"
                ? `CQC registered, rated ${settings.cqc.rating}.`
                : "CQC information available on request."}
            </p>
            {settings.easNote ? (
              <p className="text-small text-on-navy/75">{settings.easNote}</p>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}
