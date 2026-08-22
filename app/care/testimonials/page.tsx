import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";
import { PHOTOS } from "@/lib/images";

export const metadata: Metadata = {
  title: "References and proof",
  description:
    "How to check Rakuxon Care before you commit: CQC registration, references on request, the standards we are measured against, and the complaints route.",
};

/*
 * No published client testimonials exist yet, and quotes attributed to
 * named people cannot be invented. This page carries what is actually
 * true and checkable instead — regulation, references, standards and the
 * complaints route. Real quotes replace this content when consent to
 * publish exists (TODO.md).
 */
export default function TestimonialsPage() {
  return (
    <UtilityPage
      lane="b2c"
      eyebrow="Families and councils"
      title="How to check us before you commit"
      intro="We would rather you verified us than took our word for it. Everything on this page is something you can check independently."
      photo={PHOTOS.coupleAtHome}
      pointsTitle="What you can ask for"
      points={[
        "References from families we currently support, provided on request",
        "Our CQC registration status, checkable on the CQC register",
        "The care plan template you would be asked to agree to",
        "A named contact for the person coordinating your package",
        "Our complaints procedure, in writing, before care starts",
      ]}
      cta={{ label: "Ask for references", href: "/contact" }}
      secondaryCta={{ label: "Our CQC standing", href: "/care/cqc-rating" }}
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-h3">What we are measured against</h2>
        <p className="text-ink-700">
          Regulated home care in England is assessed by the Care Quality
          Commission against five questions: whether a service is safe,
          effective, caring, responsive and well-led. Those are the same
          questions we hold our own service to, and the same framework our
          advisory work is built on.
        </p>
        <p className="text-ink-700">
          If a package is arranged through a local authority or an ICB, that
          commissioner carries its own monitoring and review process on top. You
          are entitled to see the outcome of those reviews.
        </p>
        <h2 className="mt-4 text-h3">If something goes wrong</h2>
        <p className="text-ink-700">
          Raise it with us first and we will respond in writing. If you are not
          satisfied with our response, a complaint about a regulated care
          service can be taken to the Local Government and Social Care
          Ombudsman, and concerns about the quality of care can be reported to
          the Care Quality Commission at any time.
        </p>
      </div>
    </UtilityPage>
  );
}
