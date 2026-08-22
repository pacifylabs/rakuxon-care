"use client";

import { useEffect, useRef } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          theme?: "auto" | "light" | "dark";
          appearance?: "always" | "execute" | "interaction-only";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export function isTurnstileEnabled() {
  return Boolean(SITE_KEY);
}

export function resetTurnstile() {
  window.turnstile?.reset();
}

export function Turnstile() {
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY || !hostRef.current) return;
    let cancelled = false;

    function renderWidget() {
      if (cancelled || !hostRef.current || !window.turnstile || !SITE_KEY) {
        return;
      }
      widgetId.current = window.turnstile.render(hostRef.current, {
        sitekey: SITE_KEY,
        theme: "auto",
      });
    }

    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-cf-turnstile]",
    );
    if (window.turnstile) {
      renderWidget();
    } else if (existing) {
      existing.addEventListener("load", renderWidget);
    } else {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.dataset.cfTurnstile = "";
      script.addEventListener("load", renderWidget);
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
    };
  }, []);

  if (!SITE_KEY) return null;

  return (
    <div className="min-h-16">
      <div ref={hostRef} />
    </div>
  );
}
