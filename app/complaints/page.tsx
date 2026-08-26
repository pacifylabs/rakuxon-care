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
      sections={[
        {
          heading: "How to complain",
          body: [
            "We welcome feedback and complaints because they help us improve. You can raise a concern in the way that works best for you:",
            "• By email to hello@rakuxoncare.co.uk",
            "• By phone on +44 776 094 4935",
            "• In writing to the address provided when care is arranged",
            "• Verbally to any member of the care team",
          ],
        },
        {
          heading: "What happens next",
          body: [
            "We will acknowledge your complaint and investigate it appropriately. You will be kept informed of progress, and we will record the outcome and take proportionate action where problems are identified.",
            "We aim to resolve concerns quickly and fairly. More complex complaints may take longer to investigate thoroughly.",
          ],
        },
        {
          heading: "Support with making a complaint",
          body: [
            "If you need help to complain, including communication support, an interpreter, an accessible format (such as large print or Easy Read), or advocacy support, please tell us and we will arrange appropriate assistance.",
          ],
        },
        {
          heading: "Your care will not be affected",
          body: [
            "You will not be treated unfairly or have your care affected because you have complained. Making a complaint is your right, and we take all concerns seriously.",
          ],
        },
        {
          heading: "If you are not satisfied with our response",
          body: [
            "If you are not satisfied with how we have handled your complaint, you can take your concern to the Local Government and Social Care Ombudsman. They provide a free, independent service for complaints about adult social care providers.",
            "You can also raise concerns about the quality of care with the Care Quality Commission (CQC) at any time, independently of our complaints process.",
            "Contact details for these organisations will be provided in our full complaints response.",
          ],
        },
      ]}
    />
  );
}
