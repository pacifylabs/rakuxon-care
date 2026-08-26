import { getSiteSettings } from "@/lib/cms";

/* §4.5: two states — registered (with rating) or registration in progress.
   Never claims registration the business does not hold; PRD §9 question 2
   decides which state ships. */
export async function CqcBadge() {
  const settings = await getSiteSettings();
  const cqc = settings.cqc;

  const shield = (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="size-5 shrink-0 fill-current"
    >
      <path d="M10 1.5 3.5 4v5.2c0 4 2.8 7.7 6.5 9.3 3.7-1.6 6.5-5.3 6.5-9.3V4L10 1.5Zm3.4 6.3-4 4.6a1 1 0 0 1-1.5 0L6 10.4a1 1 0 1 1 1.5-1.3l1.2 1.4 3.2-3.7a1 1 0 1 1 1.5 1.3Z" />
    </svg>
  );

  if (cqc.state === "registered") {
    return (
      <a
        href={cqc.profileUrl}
        className="inline-flex min-h-11 items-center gap-3 rounded-md border border-care-500/40 bg-care-50 px-4 py-2 text-care-700 transition-colors hover:bg-care-100"
      >
        {shield}
        <span className="text-small">
          <span className="block text-ink-900">CQC registered</span>
          <span className="block text-ink-700">Rated {cqc.rating}</span>
        </span>
      </a>
    );
  }

  return (
    <span className="inline-flex min-h-11 items-center gap-3 rounded-md border border-ink-300 bg-paper-100 px-4 py-2 text-ink-700">
      {shield}
      <span className="text-small">
        <span className="block text-ink-900">CQC registration in progress</span>
        <span className="block text-ink-500">
          No regulated activity until confirmed
        </span>
      </span>
    </span>
  );
}
