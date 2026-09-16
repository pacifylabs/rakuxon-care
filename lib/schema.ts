import { serviceHref } from "@/lib/clusters";
import { absoluteUrl, origin } from "@/lib/seo";
import type { Faq, Service } from "@/lib/cms/types";

export function organisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rakuxon Care",
    legalName: "Rakuxon Care Ltd",
    url: origin(),
    email: "info@rakuxoncare.co.uk",
    areaServed: { "@type": "Country", name: "United Kingdom" },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rakuxon Care",
    url: origin(),
    inLanguage: "en-GB",
    publisher: {
      "@type": "Organization",
      name: "Rakuxon Care",
      url: origin(),
    },
  };
}

export function breadcrumbJsonLd(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceJsonLd(service: Service) {
  const url = absoluteUrl(serviceHref(service));
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    url,
    serviceType: service.title,
    areaServed: { "@type": "Country", name: "United Kingdom" },
    provider: {
      "@type": "Organization",
      name: service.arm === "care" ? "Rakuxon Care" : "Rakuxon Care Agency",
      url: origin(),
    },
  };
}
