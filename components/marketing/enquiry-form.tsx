"use client";

import { useId, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { INTENTS, type EnquiryErrors, type Intent } from "@/lib/enquiry";
import { cn } from "@/lib/cn";
import { Turnstile, resetTurnstile } from "@/components/marketing/turnstile";

/* PRD §8.1 — step 1 picks the intent, step 2 shows only that branch's fields.
   Validation is server-authoritative: the API returns field-keyed errors and
   this renders them, so the two can never disagree. */

const FIELD =
  "w-full rounded-sm border border-ink-300 bg-paper-100 px-4 py-3 text-ink-900 transition-colors placeholder:text-ink-500 focus-visible:border-navy-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800";

function Field({
  id,
  label,
  error,
  children,
  hint,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-small font-semibold text-ink-900">
        {label}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-small text-ink-500">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        /* Not colour alone: the message states the problem in words. */
        <p id={`${id}-error`} className="text-small font-semibold text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm({
  initialIntent = null,
}: {
  initialIntent?: Intent | null;
}) {
  const uid = useId();
  const [intent, setIntent] = useState<Intent | null>(initialIntent);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const errorRef = useRef<HTMLDivElement>(null);

  const f = (n: string) => `${uid}-${n}`;
  const err = (n: string) =>
    errors[n]
      ? { "aria-invalid": true as const, "aria-describedby": `${f(n)}-error` }
      : {};

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!intent) return;
    setStatus("sending");
    setErrors({});
    setFormError(null);

    const data = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = {
      intent,
      // Tags the lead with the page it started on — PRD asks for leads to be
      // identifiable by source route as well as intent.
      sourcePath: window.location.pathname,
    };
    data.forEach((value, key) => {
      payload[key] = key === "consent" ? value === "on" : value;
    });
    payload.consent = data.get("consent") === "on";
    payload.turnstileToken = data.get("cf-turnstile-response") ?? "";

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) {
        setErrors(body.errors ?? {});
        setFormError(body.formError ?? null);
        setStatus("idle");
        resetTurnstile();
        // Move focus to the summary so a screen reader announces the failure.
        requestAnimationFrame(() => errorRef.current?.focus());
        return;
      }
      setStatus("sent");
    } catch {
      setFormError("We could not send that. Please try again, or email us.");
      setStatus("idle");
      resetTurnstile();
      requestAnimationFrame(() => errorRef.current?.focus());
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-lg bg-care-50 p-8 shadow-card"
      >
        <span className="grid size-11 place-items-center rounded-pill bg-brand-care text-white">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h2 className="text-h3">Thank you — we have your enquiry</h2>
        <p className="measure text-ink-700">
          A person will read it and come back to you. If it is urgent, email us
          at{" "}
          <a
            href="mailto:info@rakuxoncare.co.uk"
            className="break-all underline underline-offset-4"
          >
            info@rakuxoncare.co.uk
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative flex flex-col gap-8 rounded-lg bg-paper-100 p-5 shadow-card sm:p-8"
    >
      <fieldset className="flex flex-col gap-3">
        <legend className="font-display text-h4 text-ink-900">
          What is this about?
        </legend>
        <div className="flex flex-col gap-2">
          {INTENTS.map((option) => {
            const selected = intent === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer flex-col gap-0.5 rounded-md border-2 px-4 py-3 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-4",
                  selected
                    ? "border-brand-care bg-care-50"
                    : "border-navy-100 hover:bg-navy-50",
                )}
              >
                <input
                  type="radio"
                  name="intent-choice"
                  value={option.value}
                  checked={selected}
                  onChange={() => setIntent(option.value)}
                  className="sr-only"
                />
                <span className="font-semibold text-ink-900">
                  {option.label}
                </span>
                <span className="text-small text-ink-500">{option.hint}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Step 2 */}
      {intent ? (
        <fieldset className="flex flex-col gap-5">
          <legend className="font-display text-h4 text-ink-900">
            Your details
          </legend>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={f("name")} label="Your name" error={errors.name}>
              <input
                id={f("name")}
                name="name"
                autoComplete="name"
                className={FIELD}
                {...err("name")}
              />
            </Field>

            <Field id={f("email")} label="Email address" error={errors.email}>
              <input
                id={f("email")}
                name="email"
                type="email"
                autoComplete="email"
                className={FIELD}
                {...err("email")}
              />
            </Field>
          </div>

          <Field
            id={f("phone")}
            label="Phone number"
            hint="Optional."
            error={errors.phone}
          >
            <input
              id={f("phone")}
              name="phone"
              type="tel"
              autoComplete="tel"
              className={FIELD}
              {...err("phone")}
            />
          </Field>

          {intent === "family" ? (
            <>
              <Field
                id={f("careFor")}
                label="Who is the care for?"
                error={errors.careFor}
              >
                <select
                  id={f("careFor")}
                  name="careFor"
                  className={FIELD}
                  {...err("careFor")}
                >
                  <option value="">Please choose</option>
                  <option value="myself">Myself</option>
                  <option value="relative">A relative</option>
                  <option value="someone-else">Someone else</option>
                </select>
              </Field>
              <Field
                id={f("postcode")}
                label="Postcode"
                hint="Optional. Helps us check we cover the area."
                error={errors.postcode}
              >
                <input
                  id={f("postcode")}
                  name="postcode"
                  autoComplete="postal-code"
                  className={FIELD}
                  {...err("postcode")}
                />
              </Field>
            </>
          ) : null}

          {intent === "council" ? (
            <>
              <Field
                id={f("organisation")}
                label="Organisation"
                error={errors.organisation}
              >
                <input
                  id={f("organisation")}
                  name="organisation"
                  autoComplete="organization"
                  className={FIELD}
                  {...err("organisation")}
                />
              </Field>
              <Field
                id={f("packageType")}
                label="Type of package"
                error={errors.packageType}
              >
                <select
                  id={f("packageType")}
                  name="packageType"
                  className={FIELD}
                  {...err("packageType")}
                >
                  <option value="">Please choose</option>
                  <option value="domiciliary">Domiciliary visits</option>
                  <option value="live-in">Live-in care</option>
                  <option value="complex">Complex or specialist</option>
                  <option value="framework">Framework or DPS</option>
                  <option value="other">Something else</option>
                </select>
              </Field>
            </>
          ) : null}

          {intent === "business" ? (
            <>
              <Field
                id={f("organisation")}
                label="Business name"
                error={errors.organisation}
              >
                <input
                  id={f("organisation")}
                  name="organisation"
                  autoComplete="organization"
                  className={FIELD}
                  {...err("organisation")}
                />
              </Field>
              <Field
                id={f("stage")}
                label="Where are you now?"
                error={errors.stage}
              >
                <select
                  id={f("stage")}
                  name="stage"
                  className={FIELD}
                  {...err("stage")}
                >
                  <option value="">Please choose</option>
                  <option value="idea">Thinking about starting</option>
                  <option value="applying">
                    Preparing or submitting a CQC application
                  </option>
                  <option value="registered">
                    Registered, not yet trading fully
                  </option>
                  <option value="growing">Trading and looking to grow</option>
                </select>
              </Field>
            </>
          ) : null}

          <Field
            id={f("message")}
            label="How can we help?"
            hint="A sentence or two is enough."
            error={errors.message}
          >
            <textarea
              id={f("message")}
              name="message"
              rows={5}
              className={FIELD}
              {...err("message")}
            />
          </Field>

          {/* Honeypot — hidden from people, visible to bots. */}
          <div aria-hidden="true" className="absolute left-[-9999px]">
            <label htmlFor={f("honeypot")}>Leave this empty</label>
            <input
              id={f("honeypot")}
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="flex items-start gap-3 text-ink-700">
              {/* Unticked by default — UK GDPR consent must be affirmative. */}
              <input
                type="checkbox"
                name="consent"
                className="mt-1 size-5 shrink-0 rounded-sm border-ink-300"
                {...err("consent")}
              />
              <span className="text-small">
                I agree that Rakuxon Care may store these details in order to
                respond to my enquiry.
              </span>
            </label>
            {errors.consent ? (
              <p
                id={`${f("consent")}-error`}
                className="text-small font-semibold text-danger"
              >
                {errors.consent}
              </p>
            ) : null}
          </div>

          <Turnstile />

          <div
            ref={errorRef}
            tabIndex={-1}
            role="alert"
            className={cn(
              "text-small font-semibold text-danger",
              !formError && "sr-only",
            )}
          >
            {formError ??
              (Object.keys(errors).length
                ? "Please check the highlighted fields."
                : "")}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className={cn(
              buttonClasses({ tone: "care" }),
              "w-full sm:w-auto",
            )}
          >
            {status === "sending" ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Sending
              </>
            ) : (
              "Send enquiry"
            )}
          </button>
        </fieldset>
      ) : (
        <p className="text-small text-ink-500">
          Choose an option to continue.
        </p>
      )}
    </form>
  );
}
