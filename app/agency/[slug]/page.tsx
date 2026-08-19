import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/marketing/service-page";
import { getFaqs, getProcess, getServices } from "@/lib/cms";

/* Clusters A–E — agency service lines (04_SITE_ARCHITECTURE §3.2). */
export async function generateStaticParams() {
  const services = await getServices();
  return services
    .filter((s) => s.arm === "agency")
    .map((s) => ({ slug: s.slug }));
}

async function find(slug: string) {
  const services = await getServices();
  return services.find((s) => s.arm === "agency" && s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = await find((await params).slug);
  return service ? { title: service.title, description: service.summary } : {};
}

export default async function AgencyServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = await find((await params).slug);
  if (!service) notFound();
  const [process, faqs] = await Promise.all([
    getProcess("b2b"),
    getFaqs("b2b"),
  ]);
  return (
    <ServicePage
      service={service}
      process={process}
      faqs={faqs}
      backHref="/agency"
      backLabel="All business services"
    />
  );
}
