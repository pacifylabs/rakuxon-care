import { Container } from "@/components/ui/container";

/* Legal text is the company's to write and approve; inventing it here would
   be worse than leaving it out, since these documents bind. Where `sections`
   is empty the page says plainly it is still in preparation. Where it is
   filled in, the banner instead says plainly that it is an AI-drafted
   starting point awaiting a solicitor's review, not the company's approved
   final wording — never presented as though it already binds. */
export function LegalPage({
  title,
  summary,
  sections,
  lastUpdated,
}: {
  title: string;
  summary: string;
  sections: { heading: string; body: string[] }[];
  lastUpdated?: string;
}) {
  const hasDraftContent = sections.length > 0;

  return (
    <article className="py-16 md:py-24">
      <Container>
        <div className="flex max-w-3xl flex-col gap-6">
          <span className="inline-flex w-fit items-center rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
            Legal
          </span>
          <h1 className="text-h1">{title}</h1>
          <p className="text-body-lg text-ink-500">{summary}</p>

          {hasDraftContent ? (
            <p
              role="note"
              className="rounded-md border-2 border-warning bg-paper-100 px-5 py-4 text-ink-900"
            >
              <strong>Draft — pending legal review.</strong> This is a
              starting point, not our approved final wording. It has not
              been reviewed by a solicitor and should not be relied on as
              binding.
              {lastUpdated ? ` Last edited ${lastUpdated}.` : null} Questions
              in the meantime:{" "}
              <a
                href="mailto:info@rakuxoncare.co.uk"
                className="break-all underline underline-offset-4"
              >
                info@rakuxoncare.co.uk
              </a>
              .
            </p>
          ) : (
            <p
              role="note"
              className="rounded-md border-2 border-warning bg-paper-100 px-5 py-4 text-ink-900"
            >
              <strong>In preparation.</strong> This notice is being written
              and approved. For anything you need in the meantime, email{" "}
              <a
                href="mailto:info@rakuxoncare.co.uk"
                className="break-all underline underline-offset-4"
              >
                info@rakuxoncare.co.uk
              </a>
              .
            </p>
          )}

          <div className="mt-6 flex flex-col gap-10">
            {sections.map((s) => (
              <section key={s.heading} className="flex flex-col gap-3">
                <h2 className="text-h3">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="text-ink-700">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
