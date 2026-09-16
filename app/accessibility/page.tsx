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
      lastUpdated="3 September 2026"
      sections={[
        {
          heading: "Our commitment",
          body: [
            "We want this website to be usable by as many people as possible, including people using assistive technology such as a screen reader, magnification, voice control, or keyboard-only navigation. We aim to meet WCAG 2.2 at level AA.",
          ],
        },
        {
          heading: "Legal status",
          body: [
            "Rakuxon Care is a private company, so the Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018 do not apply to this site. We follow the same standard voluntarily.",
          ],
        },
        {
          heading: "What we have built in",
          body: [
            "A “skip to content” link at the top of every page for keyboard users.",
            "Semantic HTML headings and landmarks, so screen readers can navigate the page structure.",
            "Visible focus states on interactive elements, and labelled form fields with inline error messages on the enquiry form.",
            "Support for both light and dark appearance, following your choice or your device's setting.",
          ],
        },
        {
          heading: "What we have not finished checking",
          body: [
            "We have not yet completed a full accessibility audit against WCAG 2.2 AA. We will update this statement — including any known issues and a target date to fix them — once that audit has taken place.",
          ],
        },
        {
          heading: "Reporting a problem",
          body: [
            "If you find something on this site that is hard to use because of a disability, email info@rakuxoncare.co.uk describing the page and the problem, and we will get back to you and try to fix it.",
          ],
        },
      ]}
    />
  );
}
