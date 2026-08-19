import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";
import { PHOTOS } from "@/lib/images";

export const metadata: Metadata = {
  title: "Book a free consultation",
  description:
    "Book a free consultation or audit call with a provider that runs its own CQC-registered service.",
};

export default function BookACallPage() {
  return (
    <UtilityPage
      lane="b2b"
      eyebrow="Book a call"
      title="Book a free consultation"
      intro="A call with someone who runs a regulated service, not a salesperson. Booking is handled by the shared calendar engine — see the note below."
      photo={PHOTOS.businessMeeting}
      pointsTitle="What to expect"
      points={[
        "Thirty minutes, no charge and no obligation",
        "A straight answer on whether we can help",
        "Rough timescales and what it would cost",
        "Written follow-up with the next step",
      ]}
      cta={{ label: "Request a call", href: "/contact?intent=call" }}
      secondaryCta={{
        label: "Care Business Launch Kit",
        href: "/agency/launch-kit",
      }}
    />
  );
}
