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
      lastUpdated="3 September 2026"
      sections={[
        {
          heading: "Acceptance of these terms",
          body: [
            "By using this website you agree to these terms. If you do not agree, please do not use the site.",
          ],
        },
        {
          heading: "What this website is for",
          body: [
            "This website provides information about Rakuxon Care's services and a way to make an enquiry. It is not a substitute for a formal care needs assessment, and using it does not create a contract for care. Any care service we provide is governed by a separate written service agreement, entered into once we have assessed your needs.",
            "If you or someone else is in immediate danger or needs urgent medical help, call 999. For non-emergency medical advice, call NHS 111. This website is not monitored for emergencies.",
          ],
        },
        {
          heading: "Using the site",
          body: [
            "You agree not to misuse this website — for example by attempting to gain unauthorised access to it, disrupting its operation, submitting false information through the enquiry form, or using automated tools to extract data from it at scale.",
            "The honeypot field and submission limits on our enquiry form exist to stop automated abuse; attempting to circumvent them is a breach of these terms.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "The text, design and branding on this website belong to Rakuxon Care Ltd or our licensors, unless stated otherwise. You may view and print pages for your own personal, non-commercial use. You may not reproduce, republish or reuse the content commercially without our written permission.",
          ],
        },
        {
          heading: "Links to other websites",
          body: [
            "This site may link to third-party websites, such as regulatory bodies. We are not responsible for the content or availability of sites we do not control.",
          ],
        },
        {
          heading: "Accuracy and availability",
          body: [
            "We try to keep this website accurate and available, but we do not guarantee it will be error-free, uninterrupted, or fit for a particular purpose. We may change or remove content, or suspend the site, at any time.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "Nothing in these terms limits our liability for death or personal injury caused by our negligence, for fraud, or for anything else that cannot legally be limited or excluded. Subject to that, we are not liable for indirect or consequential loss arising from your use of this website.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the law of England and Wales, and any dispute relating to them will be dealt with by the courts of England and Wales.",
          ],
        },
        {
          heading: "Contact and changes",
          body: [
            "We may update these terms from time to time; the version in force is the one published here. Questions about these terms can be sent to info@rakuxoncare.co.uk.",
          ],
        },
      ]}
    />
  );
}
