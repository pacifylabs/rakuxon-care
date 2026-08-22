import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How Rakuxon Care collects, uses and stores personal data, and the rights you have over it.",
};

export default function Page() {
  return (
    <LegalPage
      title="Privacy notice"
      summary="How Rakuxon Care collects, uses and stores personal data, and the rights you have over it."
      sections={[]}
    />
  );
}
