"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { THEME_COOKIE, THEME_ORDER, type ThemePreference } from "@/lib/theme";
import { cn } from "@/lib/cn";

const META: Record<
  ThemePreference,
  { icon: typeof Sun; label: string; next: ThemePreference }
> = {
  system: { icon: Monitor, label: "System theme", next: "light" },
  light: { icon: Sun, label: "Light theme", next: "dark" },
  dark: { icon: Moon, label: "Dark theme", next: "system" },
};

/* The preference lives in a cookie — state outside React. useSyncExternalStore
   is the supported way to read that: it gives the server a stable snapshot and
   lets the client correct itself on hydration, without a setState-in-effect. */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): ThemePreference {
  const m = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${THEME_COOKIE}=(light|dark|system)`),
  );
  return (m?.[1] as ThemePreference) ?? "system";
}

/** The server cannot read the cookie; the pre-paint script has already
    applied the real theme to <html> by the time this matters. */
const getServerSnapshot = (): ThemePreference => "system";

function apply(pref: ThemePreference) {
  // A display preference, not tracking: one year, lax, no other scope.
  document.cookie = `${THEME_COOKIE}=${pref};path=/;max-age=31536000;samesite=lax`;
  if (pref === "system") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", pref);
  }
  listeners.forEach((l) => l());
}

/** Cycles system → light → dark. */
export function ThemeToggle({ className }: { className?: string }) {
  const pref = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { icon: Icon, label, next } = META[pref];

  return (
    <button
      type="button"
      onClick={() => {
        const i = THEME_ORDER.indexOf(pref);
        apply(THEME_ORDER[(i + 1) % THEME_ORDER.length]);
      }}
      aria-label={`${label}. Switch to ${META[next].label.toLowerCase()}.`}
      title={label}
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-pill text-ink-700 transition-colors hover:bg-navy-50 hover:text-navy-800",
        className,
      )}
    >
      {/* The icon depends on a cookie the server cannot see, so the first
          client render legitimately differs from the server's. */}
      <span suppressHydrationWarning>
        <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
    </button>
  );
}
