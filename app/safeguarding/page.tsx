import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Safeguarding",
  description:
    "How to raise a safeguarding concern if you are worried about abuse, neglect or harm.",
};

export default function Page() {
  return (
    <LegalPage
      title="Safeguarding"
      summary="How to raise a safeguarding concern if you are worried about abuse, neglect or harm."
      sections={[
        {
          heading: "Raising a safeguarding concern",
          body: [
            "If you are worried that someone using our service is being abused, neglected, harmed or placed at unacceptable risk, please tell us immediately.",
            "You can raise a concern:",
            "• By email to info@rakuxoncare.co.uk with 'SAFEGUARDING CONCERN' in the subject line",
            "• By phone on +44 776 094 4935",
            "• Verbally to any member of the care team",
            "• In writing to the address provided when care is arranged",
          ],
        },
        {
          heading: "What we will do",
          body: [
            "We will take all concerns seriously and follow our safeguarding procedure. Where required, we will involve the appropriate authorities, including local safeguarding teams and the Care Quality Commission.",
            "Safeguarding is everyone's responsibility, and we are committed to protecting people from abuse and improper treatment.",
          ],
        },
        {
          heading: "If there is immediate danger",
          body: [
            "If someone is in immediate danger, contact the emergency services by calling 999.",
            "You should also contact your local authority's adult safeguarding team if you have serious concerns about abuse or neglect.",
          ],
        },
        {
          heading: "Your concern will be taken seriously",
          body: [
            "You will not be treated unfairly for raising a safeguarding concern. Everyone has the right to be safe, and reporting concerns helps us protect vulnerable people.",
          ],
        },
      ]}
    />
  );
}
