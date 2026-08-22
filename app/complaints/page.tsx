import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Complaints procedure",
  description:
    "How to raise a concern about your care or our service, and what happens next.",
};

export default function Page() {
  return (
    <LegalPage
      title="Complaints procedure"
      summary="How to raise a concern about your care or our service, and what happens next."
      sections={[]}
    />
  );
}
