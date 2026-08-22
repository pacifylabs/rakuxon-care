import type { Metadata } from "next";
import { Inter, Lora, Plus_Jakarta_Sans } from "next/font/google";
import { CookieConsent } from "@/components/marketing/cookie-consent";
import { JsonLd } from "@/components/marketing/json-ld";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { StickyCta } from "@/components/marketing/sticky-cta";
import { organisationJsonLd, websiteJsonLd } from "@/lib/schema";
import { origin } from "@/lib/seo";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

/* docs/design-system.md §2: serif is scoped to testimonial pull-quotes
   only — never applied to UI. Exposed as `font-serif`, applied nowhere
   globally. */
const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

export const metadata: Metadata = {
  metadataBase: new URL(origin()),
  title: {
    default: "Rakuxon Care | Home care and care-business support",
    template: "%s · Rakuxon Care",
  },
  description:
    "Home care for families and councils, and end-to-end support for care businesses — CQC registration, tenders, branding and staffing.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Rakuxon Care",
    url: origin(),
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Next 16 no longer overrides scroll-behavior on navigation;
    // data-scroll-behavior restores the instant scroll-to-top on route
    // change while keeping smooth scrolling for in-page anchors.
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jakarta.variable} ${lora.variable}`}
      // The pre-paint script below sets data-theme, so the server markup
      // and the first client markup differ on <html> by design.
      suppressHydrationWarning
    >
      <head>
        {/* Applies the saved theme before first paint. Static string, no
            user input, so no injection surface. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <JsonLd data={organisationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <a
          href="#main"
          className="sr-only rounded-md focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-brand-navy focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <CookieConsent />
        <StickyCta />
      </body>
    </html>
  );
}
