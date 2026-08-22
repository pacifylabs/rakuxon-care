import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The terms on which you may use this website. Care services are governed by a separate service agreement.",
};

export default function Page() {
  return (
    <LegalPage
      title="Terms of use"
      summary="The terms on which you may use this website. Care services are governed by a separate service agreement."
      sections={[]}
    />
  );
}
