import type { NextConfig } from "next";

/*
 * Nonce-based script-src (the strict option) needs Next to parse a
 * per-request nonce out of the CSP header, which only happens for
 * dynamically-rendered pages — see
 * node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md
 * ("Static vs Dynamic Rendering with CSP"). This site prerenders its pages
 * (lib/env.ts's comment on 58 static pages), and opting every route into
 * dynamic rendering to satisfy a nonce is not a trade worth making here.
 * So this follows the docs' "Without Nonces" recipe: 'unsafe-inline' for
 * script-src, matching Next's own RSC hydration scripts, which are
 * generated per request and can't be pinned by a static hash either.
 *
 * JSON-LD blocks (components/marketing/json-ld.tsx) use
 * type="application/ld+json", which browsers never execute as script, so
 * they need no script-src entry of their own. Fonts are self-hosted by
 * next/font at build time, so no fonts.googleapis.com/gstatic.com entries
 * are needed. Turnstile is the only third party the page talks to.
 */
const isDev = process.env.NODE_ENV === "development";

const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    /* 04_SITE_ARCHITECTURE §6 — migration map from the flat v2.0 routes to
       the nested namespaces. Permanent so anything already indexed or
       shared follows to the new URL. */
    return [
      { source: "/find-care", destination: "/care", permanent: true },
      { source: "/care-businesses", destination: "/agency", permanent: true },
      { source: "/services", destination: "/care", permanent: true },
      {
        source: "/services/home-care",
        destination: "/care/home-care",
        permanent: true,
      },
      {
        source: "/services/cqc-registration",
        destination: "/agency/cqc-registration",
        permanent: true,
      },
      {
        source: "/services/tender-writing",
        destination: "/agency/tender-writing",
        permanent: true,
      },
      {
        source: "/services/policies-procedures",
        destination: "/agency/policies-procedures",
        permanent: true,
      },
      {
        /* §6 splits this one in two; digital-services is the closer match
           for the old page's intent, and it links across to branding-kits. */
        source: "/services/digital-branding",
        destination: "/agency/digital-services",
        permanent: true,
      },
      {
        source: "/services/consulting",
        destination: "/agency/consulting",
        permanent: true,
      },
      {
        source: "/services/staffing",
        destination: "/agency/staffing",
        permanent: true,
      },
      { source: "/staffing", destination: "/agency/staffing", permanent: true },
      {
        source: "/launch-kit",
        destination: "/agency/launch-kit",
        permanent: true,
      },
      {
        source: "/start-a-care-business",
        destination: "/agency/launch-kit",
        permanent: true,
      },
      { source: "/blog", destination: "/resources", permanent: true },
      {
        source: "/case-studies",
        destination: "/agency/case-studies",
        permanent: true,
      },
      /* File-based metadata lives at *.jpg. WhatsApp (and older crawlers)
         follow og:image with no extension and get a 404 without this. */
      {
        source: "/opengraph-image",
        destination: "/opengraph-image.jpg",
        permanent: true,
      },
      {
        source: "/twitter-image",
        destination: "/twitter-image.jpg",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
