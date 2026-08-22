import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/marketing/service-page";
import { getProcess, getServices } from "@/lib/cms";
import { serviceMetadata } from "@/lib/seo";

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
  return serviceMetadata(await find((await params).slug));
}

export default async function AgencyServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = await find((await params).slug);
  if (!service) notFound();
  const process = await getProcess("b2b");
  return (
    <ServicePage
      service={service}
      process={process}
      backHref="/agency"
      backLabel="All business services"
    />
  );
}
