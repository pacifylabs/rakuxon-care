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
      lastUpdated="3 September 2026"
      sections={[
        {
          heading: "What this page covers",
          body: [
            "This page explains the cookies and similar technologies (such as browser storage) this website uses, and how to change your choice about the ones that are optional.",
          ],
        },
        {
          heading: "Cookies we set",
          body: [
            "rakuxon-theme — remembers whether you chose light, dark, or system appearance. Lasts 1 year. This does not identify you and is not used for tracking.",
            "rakuxon-consent — records the choice you make in the cookie banner (accept or reject analytics), so we do not ask again on your next visit. This is stored in your browser's local storage rather than as a cookie, but works the same way and is covered by this policy. Lasts until you clear your browser's storage for this site.",
          ],
        },
        {
          heading: "Analytics cookies",
          body: [
            "At the time of writing, we do not load any analytics service on this site — no analytics provider is switched on yet, even if you accept analytics in the banner. Your choice is stored so that, if and when we do add one, it is respected from the start rather than asking you again. We will update this page before any analytics cookies are actually set.",
          ],
        },
        {
          heading: "Cookies set by others",
          body: [
            "Where Cloudflare Turnstile is active on our enquiry form — a check that a submission comes from a person, not a bot — Cloudflare may set its own cookies as part of that check. We do not control these directly; see Cloudflare's own privacy and cookie information for details.",
          ],
        },
        {
          heading: "Managing cookies",
          body: [
            "You can change your analytics choice at any time by clearing your browser's storage for this site. Most browsers also let you block or delete cookies in their settings, though doing so may affect how parts of the site work.",
          ],
        },
        {
          heading: "More information",
          body: [
            "For how we use the personal data you give us directly — for example through the enquiry form — see our Privacy notice.",
          ],
        },
      ]}
    />
  );
}
