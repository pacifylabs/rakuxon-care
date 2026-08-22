import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Styleguide",
  description:
    "Living reference for the Rakuxon Care design system: tokens, type scale, shape and UI primitives.",
};

/* Class names are written out in full because Tailwind resolves them by
   static analysis — a computed `bg-${name}` would compile to nothing. */
const swatchGroups = [
  {
    name: "Navy · primary",
    note: "Authority. Leads the B2B lane and all shared chrome.",
    swatches: [
      { token: "navy-900", hex: "#10203D", bg: "bg-navy-900", dark: true },
      { token: "navy-800", hex: "#1F3864", bg: "bg-navy-800", dark: true },
      { token: "navy-700", hex: "#2E4A7D", bg: "bg-navy-700", dark: true },
      { token: "navy-600", hex: "#3A5B96", bg: "bg-navy-600", dark: true },
      { token: "navy-100", hex: "#DDE6F2", bg: "bg-navy-100", dark: false },
      { token: "navy-50", hex: "#EEF3FA", bg: "bg-navy-50", dark: false },
    ],
  },
  {
    name: "Care teal · secondary",
    note: "Warmth. Leads the B2C lane.",
    swatches: [
      { token: "care-700", hex: "#0F6E56", bg: "bg-care-700", dark: true },
      { token: "care-600", hex: "#158368", bg: "bg-care-600", dark: true },
      { token: "care-500", hex: "#1D9E75", bg: "bg-care-500", dark: true },
      { token: "care-100", hex: "#DCF2EA", bg: "bg-care-100", dark: false },
      { token: "care-50", hex: "#EEF8F4", bg: "bg-care-50", dark: false },
    ],
  },
  {
    name: "Warm accent",
    note: "Optional. Maximum one per view.",
    swatches: [
      { token: "accent-600", hex: "#C2410C", bg: "bg-accent-600", dark: true },
      { token: "accent-500", hex: "#EA580C", bg: "bg-accent-500", dark: true },
    ],
  },
  {
    name: "Ink · text",
    note: "Body copy, captions, borders.",
    swatches: [
      { token: "ink-900", hex: "#14181F", bg: "bg-ink-900", dark: true },
      { token: "ink-700", hex: "#33404F", bg: "bg-ink-700", dark: true },
      { token: "ink-500", hex: "#5C6B7A", bg: "bg-ink-500", dark: true },
      { token: "ink-300", hex: "#A7B2BF", bg: "bg-ink-300", dark: false },
    ],
  },
  {
    name: "Paper · surfaces",
    note: "Page is paper-50 — never pure white (§0.1).",
    swatches: [
      { token: "paper-100", hex: "#FFFFFF", bg: "bg-paper-100", dark: false },
      { token: "paper-50", hex: "#F7F9FB", bg: "bg-paper-50", dark: false },
      { token: "paper-0", hex: "#EEF2F6", bg: "bg-paper-0", dark: false },
    ],
  },
  {
    name: "Semantic",
    note: "States only — never decoration.",
    swatches: [
      { token: "success", hex: "#158368", bg: "bg-success", dark: true },
      { token: "warning", hex: "#B45309", bg: "bg-warning", dark: true },
      { token: "danger", hex: "#B91C1C", bg: "bg-danger", dark: true },
      { token: "info", hex: "#1F3864", bg: "bg-info", dark: true },
    ],
  },
];

const typeScale = [
  { cls: "text-h1", label: "Hero H1", spec: "clamp 40→56 / 700 / 1.1" },
  { cls: "text-h2", label: "H2", spec: "clamp 30→36 / 700 / 1.2" },
  { cls: "text-h3", label: "H3", spec: "clamp 23→28 / 600 / 1.3" },
  { cls: "text-h4", label: "H4", spec: "clamp 19→22 / 600 / 1.35" },
  { cls: "text-body-lg", label: "Body large", spec: "18 / 400 / 1.7" },
  { cls: "text-body", label: "Body", spec: "16 / 400 / 1.7" },
  { cls: "text-small", label: "Small", spec: "14 / 500 / 1.5" },
  {
    cls: "text-overline uppercase",
    label: "Overline",
    spec: "13 / 600 / 1.4 / 0.04em",
  },
];

const spacingSteps = [
  { cls: "w-1", px: "4px", step: "1" },
  { cls: "w-2", px: "8px", step: "2" },
  { cls: "w-3", px: "12px", step: "3" },
  { cls: "w-4", px: "16px", step: "4" },
  { cls: "w-6", px: "24px", step: "6" },
  { cls: "w-8", px: "32px", step: "8" },
  { cls: "w-12", px: "48px", step: "12" },
  { cls: "w-16", px: "64px", step: "16" },
  { cls: "w-24", px: "96px", step: "24" },
  { cls: "w-32", px: "128px", step: "32" },
];

const radii = [
  { cls: "rounded-sm", label: "sm · 8px", use: "inputs, chips" },
  { cls: "rounded-md", label: "md · 12px", use: "cards" },
  { cls: "rounded-lg", label: "lg · 20px", use: "panels, hero cards, images" },
  { cls: "rounded-pill", label: "pill · 999px", use: "buttons" },
];

const contrastPairs = [
  { pair: "white on navy-800", ratio: "11.5:1", verdict: "pass" },
  { pair: "white on navy-600", ratio: "6.7:1", verdict: "pass" },
  { pair: "white on care-600", ratio: "4.8:1", verdict: "pass" },
  { pair: "white on accent-600", ratio: "5.2:1", verdict: "pass" },
  { pair: "ink-700 on paper-50", ratio: "9.9:1", verdict: "pass" },
  { pair: "ink-500 on paper-50", ratio: "5.1:1", verdict: "pass" },
  { pair: "white on care-500", ratio: "3.4:1", verdict: "large-only" },
  { pair: "white on accent-500", ratio: "3.5:1", verdict: "large-only" },
] as const;

function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-ink-300/60 pt-12">
      <h2 className="text-h2">{title}</h2>
      {intro ? <p className="measure mt-3 text-ink-500">{intro}</p> : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-8">
      <header className="mb-16">
        <Badge tone="navy">Phase 0</Badge>
        <h1 className="mt-4 text-h1">Rakuxon Care styleguide</h1>
        <p className="measure mt-4 text-body-lg text-ink-500">
          The living reference for every visual decision. Tokens come from{" "}
          <code className="rounded-sm bg-paper-0 px-1.5 py-0.5 text-small">
            docs/design-system.md
          </code>{" "}
          and are defined once in{" "}
          <code className="rounded-sm bg-paper-0 px-1.5 py-0.5 text-small">
            app/globals.css
          </code>
          . If something here disagrees with the doc, the doc wins.
        </p>
      </header>

      <div className="flex flex-col gap-16">
        <Section
          id="colour"
          title="Colour"
          intro="Two brand colours, neutrals, and semantic states. Tailwind's stock palette is cleared, so off-system colours do not compile."
        >
          <div className="flex flex-col gap-10">
            {swatchGroups.map((group) => (
              <div key={group.name}>
                <h3 className="text-h4">{group.name}</h3>
                <p className="mt-1 text-small text-ink-500">{group.note}</p>
                <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                  {group.swatches.map((s) => (
                    <li
                      key={s.token}
                      className="overflow-hidden rounded-md bg-paper-100 shadow-card"
                    >
                      <div className={`${s.bg} h-20`} />
                      <div className="px-3 py-2">
                        <p className="text-small text-ink-900">{s.token}</p>
                        <p className="text-small text-ink-500 tabular-nums">
                          {s.hex}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="contrast"
          title="Verified contrast"
          intro="Measured pairs. AA needs 4.5:1 for body text and 3:1 for large text (18.66px bold or 24px regular)."
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {contrastPairs.map((c) => (
              <li
                key={c.pair}
                className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-md bg-paper-100 px-4 py-3 shadow-card"
              >
                <span className="text-small text-ink-700">{c.pair}</span>
                <span className="flex flex-wrap items-center gap-3">
                  <span className="text-small text-ink-900 tabular-nums">
                    {c.ratio}
                  </span>
                  {c.verdict === "pass" ? (
                    <Badge tone="success">AA</Badge>
                  ) : (
                    <Badge tone="warning">Large only</Badge>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <p className="measure mt-6 text-small text-ink-700">
            <strong>
              care-500 and accent-500 fail AA for white body text.
            </strong>{" "}
            Both clear 3:1, so they are safe behind large display text only.
            Filled buttons and any small white label must use care-600 or
            accent-600.
          </p>
        </Section>

        <Section
          id="type"
          title="Typography"
          intro="Plus Jakarta Sans throughout. Display sizes use clamp() so they step down ~15–20% on mobile without breakpoints. Source Serif 4 is loaded but scoped to pull-quotes only."
        >
          <div className="flex flex-col gap-6">
            {typeScale.map((t) => (
              <div
                key={t.cls}
                className="flex flex-col gap-1 border-b border-ink-300/40 pb-6 last:border-0"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <code className="text-small text-ink-500">{t.cls}</code>
                  <span className="text-small text-ink-500">{t.spec}</span>
                </div>
                <p className={t.cls}>
                  {t.label} — caring for you, backed by expertise
                </p>
              </div>
            ))}
            <div className="rounded-lg bg-paper-100 p-6 shadow-card">
              <p className="text-small text-ink-500">
                Pull-quote — the only permitted use of the serif
              </p>
              <blockquote className="measure mt-3 font-serif text-h3 text-ink-900">
                “They handled our CQC registration end to end. We opened three
                months earlier than planned.”
              </blockquote>
            </div>
          </div>
        </Section>

        <Section
          id="spacing"
          title="Spacing"
          intro="4px base. Tailwind's default scale is kept because it already contains every step the design system lists. Sections breathe on the 64–128px steps."
        >
          <ul className="flex flex-col gap-2">
            {spacingSteps.map((s) => (
              <li key={s.cls} className="flex items-center gap-4">
                <code className="w-16 shrink-0 text-small text-ink-500">
                  {s.step}
                </code>
                <span className={`${s.cls} h-4 rounded-sm bg-navy-600`} />
                <span className="text-small text-ink-500 tabular-nums">
                  {s.px}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="shape"
          title="Shape and elevation"
          intro="Four radii and exactly one shadow. Tailwind's stock radius and shadow scales are cleared, so shadow-2xl and off-system radii do not exist."
        >
          <div className="flex flex-col gap-8">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {radii.map((r) => (
                <li key={r.cls} className="flex flex-col gap-2">
                  <div
                    className={`${r.cls} h-24 border-2 border-navy-800 bg-navy-50`}
                  />
                  <p className="text-small text-ink-900">{r.label}</p>
                  <p className="text-small text-ink-500">{r.use}</p>
                </li>
              ))}
            </ul>
            <div>
              <div className="rounded-lg bg-paper-100 p-8 shadow-card">
                <p className="text-small text-ink-900">shadow-card</p>
                <p className="mt-1 text-small text-ink-500">
                  0 1px 3px rgb(16 32 61 / 0.08), 0 8px 24px rgb(16 32 61 /
                  0.06)
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="buttons"
          title="Buttons"
          intro="Pill-shaped, never under 44px tall. Hover, active and focus are live — tab through them to check the focus ring."
        >
          <div className="flex flex-col gap-10">
            {(["navy", "care"] as const).map((tone) => (
              <div key={tone}>
                <h3 className="text-h4">
                  {tone === "navy"
                    ? "Navy tone · B2B and shared"
                    : "Care tone · B2C"}
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Button variant="primary" tone={tone}>
                    Get in touch
                  </Button>
                  <Button variant="secondary" tone={tone}>
                    See all services
                  </Button>
                  <Button variant="tertiary" tone={tone}>
                    Read the guide
                  </Button>
                  <Button variant="primary" tone={tone} disabled>
                    Disabled
                  </Button>
                  <Button variant="secondary" tone={tone} disabled>
                    Disabled
                  </Button>
                </div>
              </div>
            ))}

            <div>
              <h3 className="text-h4">Sizes</h3>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Button size="sm">Small · 44px</Button>
                <Button size="md">Medium · 48px</Button>
                <Button size="lg">Large · 56px</Button>
              </div>
            </div>

            <div>
              <h3 className="text-h4">Warm accent</h3>
              <p className="measure mt-1 text-small text-ink-500">
                Maximum one per view. Lane-neutral by definition, so it ignores
                tone.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Button variant="accent">Book a call</Button>
                <Button variant="accent" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            <div data-surface="navy" className="rounded-lg bg-navy-800 p-8">
              <h3 className="text-h4 text-white">On a navy surface</h3>
              <p className="measure mt-1 text-small text-on-navy">
                The focus ring flips to white here via{" "}
                <code>data-surface=&quot;navy&quot;</code>. Tab into these to
                confirm.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Button variant="primary" tone="care">
                  Find care
                </Button>
                <Button
                  variant="secondary"
                  className="border-white text-white hover:bg-navy-700 active:bg-navy-900"
                >
                  For care businesses
                </Button>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="inputs"
          title="Inputs"
          intro="Persistent labels, optional-by-default marking, and errors that carry an icon so they never depend on colour alone."
        >
          <div className="grid max-w-2xl gap-6">
            <Input label="Full name" name="name" required />
            <Input
              label="Email address"
              name="email"
              type="email"
              required
              hint="We'll only use this to reply to your enquiry."
            />
            <Input
              label="Phone number"
              name="phone"
              type="tel"
              defaultValue="0712"
              error="Enter a UK phone number, including the area code."
            />
            <Input
              label="Organisation"
              name="org"
              disabled
              placeholder="Disabled"
            />
          </div>
        </Section>

        <Section
          id="badges"
          title="Badges"
          intro="The Eyebrow label and the CQC rating badge are both built on this in Phase 1."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="navy">Services</Badge>
            <Badge tone="care">Find care</Badge>
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="success">CQC registered</Badge>
            <Badge tone="warning">Registration in progress</Badge>
            <Badge tone="danger">Action needed</Badge>
          </div>
        </Section>

        <Section
          id="chips"
          title="Chips"
          intro="Filter toggles for the careers and case-study indexes. Selection is carried by fill and border weight, plus aria-pressed."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Chip selected>Home care</Chip>
            <Chip>Registration</Chip>
            <Chip>Tenders</Chip>
            <Chip>Staffing</Chip>
            <Chip disabled>Unavailable</Chip>
          </div>
        </Section>
      </div>
    </div>
  );
}
