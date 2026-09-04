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
      lastUpdated="3 September 2026"
      sections={[
        {
          heading: "Who we are",
          body: [
            "Rakuxon Care Ltd (“Rakuxon Care”, “we”, “us”) is the data controller for the personal data described in this notice. You can contact us at info@rakuxoncare.co.uk.",
          ],
        },
        {
          heading: "What we collect",
          body: [
            "When you submit an enquiry through this website we ask for your name, an email address, and a message describing what you need. A phone number is optional.",
            "Depending on which kind of enquiry you select, we also ask for a small number of extra details: who the care is for and, optionally, a postcode, if you are enquiring about care for yourself or a relative; or your organisation's name and, where relevant, the type of care package or the stage your business is at, if you are enquiring as a council, commissioning body, or care business.",
            "We record the time you gave consent to this notice and the page of the site you were on when you submitted the enquiry, so we can see which parts of the site enquiries come from.",
            "We do not ask for payment details or health records through this form. If a message to us happens to include that kind of detail, we only use it to answer your enquiry.",
          ],
        },
        {
          heading: "Enquiring on someone else's behalf",
          body: [
            "If you tell us about someone else — for example a relative you are enquiring for — please only share details you are authorised to share, and let them know we may hold this information about them.",
          ],
        },
        {
          heading: "Why we use it, and our legal basis",
          body: [
            "We use your details to read, route and respond to your enquiry, and to keep a record of it. We do this on the basis of the consent you give when you tick the consent box and submit the form. You can withdraw that consent at any time by emailing us, though this does not affect anything we did before you withdrew it.",
            "We also use limited technical checks — how often submissions arrive from the same source, and, where enabled, a Cloudflare Turnstile check — to stop automated and abusive submissions. This is a legitimate interest of ours in keeping the enquiry service usable, and it is not used to identify you personally.",
          ],
        },
        {
          heading: "Who we share it with",
          body: [
            "We use a small number of service providers to run this website and the enquiry service, each acting as a processor on our instructions: Neon, our database host, stores enquiry records; Resend, our email provider, sends the confirmation you receive and the notification our team receives; and, where enabled, Cloudflare checks that a submission was made by a person rather than a bot.",
            "We do not sell personal data, and we do not share it with other organisations for their own marketing.",
            "Some of these providers may process data outside the UK. Where that happens, we rely on the legal safeguards they provide — such as the UK's International Data Transfer Addendum or an adequacy decision — to keep your data protected to a UK standard.",
          ],
        },
        {
          heading: "How long we keep it",
          body: [
            "We keep enquiry records for as long as we reasonably need them to respond to you and for our own business records, and delete or anonymise them once we no longer need them. If you would like a record deleted sooner, email us and we will action it — see “Your rights” below.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Under UK GDPR you can ask us for a copy of the data we hold about you, ask us to correct it, ask us to delete it, restrict or object to how we use it, and ask to receive it in a portable format. You can withdraw consent at any time. To exercise any of these, email info@rakuxoncare.co.uk.",
            "If you are not satisfied with how we have handled your data, you can complain to the Information Commissioner's Office at ico.org.uk.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "This notice covers the information you give us directly. For the cookies and similar technologies this site sets, see our Cookie policy.",
          ],
        },
        {
          heading: "Changes to this notice",
          body: [
            "We may update this notice from time to time. Material changes will be reflected here with a new date at the top of the page.",
          ],
        },
      ]}
    />
  );
}
