import * as React from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "accent";
export type ButtonTone = "navy" | "care";
export type ButtonSize = "sm" | "md" | "lg";

/* §4.1 buttons are pill-shaped (§0.1), never below 44px tall (§5), and
   carry a 2px offset focus ring — the ring is applied globally by
   :focus-visible in globals.css so every focusable element inherits it. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-pill text-center " +
  "font-semibold transition-colors select-none " +
  "disabled:pointer-events-none";

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-5 py-2 text-small",
  md: "min-h-12 px-6 py-2 text-body",
  lg: "min-h-14 px-8 py-3 text-body-lg",
};

/* Tertiary is text-only, so horizontal padding shrinks but the 44px
   touch target is preserved. */
const tertiarySizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-2 py-2 text-small",
  md: "min-h-12 px-2 py-2 text-body",
  lg: "min-h-14 px-3 py-3 text-body-lg",
};

/* Where a token for the darker active state exists (navy-900, care-700)
   it is used. The palette has no care-800 or accent-700, so those two
   fall back to a brightness filter rather than inventing a token —
   see the note in docs/design-system.md §1. */
const variants: Record<ButtonVariant, Record<ButtonTone, string>> = {
  primary: {
    navy:
      "bg-brand-navy text-white hover:bg-brand-navy-hover active:bg-brand-navy-active " +
      "disabled:bg-ink-300 disabled:text-white",
    care:
      "bg-brand-care text-white hover:bg-brand-care-hover active:bg-brand-care-hover " +
      "active:brightness-90 disabled:bg-ink-300 disabled:text-white",
  },
  secondary: {
    navy:
      "border-2 border-navy-800 text-navy-800 hover:bg-navy-50 " +
      "active:bg-navy-100 disabled:border-ink-300 disabled:text-ink-300",
    care:
      "border-2 border-care-600 text-care-700 hover:bg-care-50 " +
      "active:bg-care-100 disabled:border-ink-300 disabled:text-ink-300",
  },
  tertiary: {
    navy:
      "text-navy-800 underline-offset-4 hover:underline active:text-navy-900 " +
      "disabled:text-ink-300 disabled:no-underline",
    care:
      "text-care-700 underline-offset-4 hover:underline active:text-care-700 " +
      "disabled:text-ink-300 disabled:no-underline",
  },
  /* §1: warm accent, max one per view. Tone is ignored — the accent is
     lane-neutral by definition. */
  accent: {
    navy:
      "bg-accent-600 text-white hover:brightness-95 active:brightness-90 " +
      "disabled:bg-ink-300 disabled:text-white",
    care:
      "bg-accent-600 text-white hover:brightness-95 active:brightness-90 " +
      "disabled:bg-ink-300 disabled:text-white",
  },
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function buttonClasses({
  variant = "primary",
  tone = "navy",
  size = "md",
  fullWidth = false,
  className,
}: Pick<ButtonProps, "variant" | "tone" | "size" | "fullWidth" | "className">) {
  return cn(
    base,
    variant === "tertiary" ? tertiarySizes[size] : sizes[size],
    variants[variant][tone],
    fullWidth && "w-full",
    className,
  );
}

export function Button({
  variant = "primary",
  tone = "navy",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClasses({ variant, tone, size, fullWidth, className })}
      {...props}
    />
  );
}
