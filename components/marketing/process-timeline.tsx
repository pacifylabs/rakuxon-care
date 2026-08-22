import type { ProcessStep } from "@/lib/cms";
import type { Lane } from "@/lib/cms";

/* §4.11 / §0.1 "working process": numbered steps with large faint numerals. */
export function ProcessTimeline({
  steps,
  lane = "both",
  invert = false,
}: {
  steps: ProcessStep[];
  lane?: Lane;
  invert?: boolean;
}) {
  const numberTone = invert
    ? "text-navy-700"
    : lane === "b2c"
      ? "text-care-100"
      : "text-navy-100";

  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <li
          key={step.number}
          className={
            invert
              ? "relative flex flex-col gap-2 overflow-hidden rounded-lg border border-navy-700 bg-brand-navy p-6"
              : "relative flex flex-col gap-2 overflow-hidden rounded-lg bg-paper-100 p-6 shadow-card"
          }
        >
          <span
            aria-hidden="true"
            className={`absolute -top-2 right-2 text-[4rem] leading-none font-bold ${numberTone}`}
          >
            {step.number}
          </span>
          <span
            className={`relative text-overline uppercase ${
              invert ? "text-navy-100" : "text-ink-500"
            }`}
          >
            Step {step.number}
          </span>
          <h3 className={`relative text-h4 ${invert ? "text-white" : ""}`}>
            {step.title}
          </h3>
          <p
            className={`relative ${invert ? "text-navy-100" : "text-ink-500"}`}
          >
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
