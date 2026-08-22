import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description:
    "Our commitment to WCAG 2.2 AA, what we have tested, and how to report a barrier.",
};

export default function Page() {
  return (
    <LegalPage
      title="Accessibility statement"
      summary="Our commitment to WCAG 2.2 AA, what we have tested, and how to report a barrier."
      sections={[]}
    />
  );
}
