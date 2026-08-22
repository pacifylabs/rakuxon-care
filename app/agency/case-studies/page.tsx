import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";
import { PHOTOS } from "@/lib/images";

export const metadata: Metadata = {
  title: "Results and evidence",
  description:
    "How Rakuxon Care Agency evidences its work: what a registration, tender or staffing engagement produces, and the checkable outcome at the end of each.",
};

/*
 * No client case studies exist yet, and a case study naming a client and a
 * result cannot be invented. This page describes what each engagement
 * actually produces and how the outcome is verified — all of it true and
 * checkable. Named case studies replace it when clients consent (TODO.md).
 */
export default function CaseStudiesPage() {
  return (
    <UtilityPage
      lane="b2b"
      eyebrow="Care businesses"
      title="What our work produces"
      intro="Rather than claim results we cannot yet show you, here is exactly what each engagement delivers and how you can tell whether it worked."
      photo={PHOTOS.businessReview}
      pointsTitle="Where the outcome is checkable"
      points={[
        "A registration either succeeds or it does not — the CQC register is public",
        "A tender is won or lost, and the award notice is published",
        "A framework place appears on the authority's own supplier list",
        "A policy suite is judged at inspection, and the report is published",
        "A vacancy is filled, or the rota still has a gap in it",
      ]}
      cta={{ label: "Discuss your situation", href: "/agency/book-a-call" }}
      secondaryCta={{
        label: "Care Business Launch Kit",
        href: "/agency/launch-kit",
      }}
      notes={[
        {
          title: "Why there are no case studies here yet",
          body: [
            "A case study needs a named client, a real engagement and permission to publish. We have not put anonymised or illustrative examples here, because in this sector they are indistinguishable from invention, and a provider choosing a consultancy deserves better than that.",
            "When clients agree to be named, their work appears here with the detail that makes it useful: what the situation was, what we did, and what the outcome was.",
          ],
        },
        {
          title: "What you can ask for instead",
          body: [
            "Ask us to walk you through a live piece of work in detail: the evidence we assembled, the questions the regulator or commissioner asked, and what we would do differently a second time.",
            "Ask to speak to a provider we have worked with. Ask what happens if a registration is refused, and what we do next at no additional cost. Those questions tell you more than a published summary would.",
          ],
        },
      ]}
    />
  );
}
