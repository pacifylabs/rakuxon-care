import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/marketing/service-page";
import { getProcess, getServices } from "@/lib/cms";
import { serviceMetadata } from "@/lib/seo";

/* Cluster B — Who We Support (04_SITE_ARCHITECTURE §3.1). */
export async function generateStaticParams() {
  const services = await getServices();
  return services
    .filter((s) => s.template === "who-we-support")
    .map((s) => ({ slug: s.slug }));
}

async function find(slug: string) {
  const services = await getServices();
  return services.find(
    (s) => s.template === "who-we-support" && s.slug === slug,
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return serviceMetadata(await find((await params).slug));
}

export default async function WhoWeSupportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = await find((await params).slug);
  if (!service) notFound();
  const process = await getProcess("b2c");
  return (
    <ServicePage
      service={service}
      process={process}
      backHref="/care#who-we-support"
      backLabel="Who we support"
    />
  );
}
