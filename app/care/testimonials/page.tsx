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
      notes={[
        {
          title: "What we are measured against",
          body: [
            "Regulated home care in England is assessed by the Care Quality Commission against five questions: whether a service is safe, effective, caring, responsive and well-led. Those are the same questions we hold our own service to, and the same framework our advisory work is built on.",
            "If a package is arranged through a local authority or an ICB, that commissioner carries its own monitoring and review process on top. You are entitled to see the outcome of those reviews.",
          ],
        },
        {
          title: "If something goes wrong",
          body: [
            "Raise it with us first and we will respond in writing. Our complaints procedure sets out who receives a complaint and how long a response takes, and you can ask for it before care starts.",
            "If you are not satisfied with our response, a complaint about a regulated care service can be taken to the Local Government and Social Care Ombudsman. Concerns about the quality of care can be reported to the Care Quality Commission at any time, independently of us.",
          ],
        },
      ]}
    />
  );
}
