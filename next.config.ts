import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
