import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "The cookies this site sets, what they do, and how to change your choice.",
};

export default function Page() {
  return (
    <LegalPage
      title="Cookie policy"
      summary="The cookies this site sets, what they do, and how to change your choice."
      sections={[]}
    />
  );
}
