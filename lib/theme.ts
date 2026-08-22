export const THEME_COOKIE = "rakuxon-theme";

/** "system" is the default and is represented by the absence of data-theme. */
export type ThemePreference = "system" | "light" | "dark";

export const THEME_ORDER: ThemePreference[] = ["system", "light", "dark"];

/**
 * Runs before first paint, inlined into <head>.
 *
 * Reading the cookie in the layout via next/headers would opt every page out
 * of static generation, so the preference is applied here on the client
 * instead. It is synchronous and ahead of paint, so there is no flash and no
 * hydration mismatch — the server never renders a data-theme attribute, and
 * this sets it before React attaches.
 */
export const THEME_INIT_SCRIPT = `
(function(){
  try {
    var m = document.cookie.match(/(?:^|;\\s*)${THEME_COOKIE}=(light|dark|system)/);
    var p = m ? m[1] : "system";
    if (p === "light" || p === "dark") {
      document.documentElement.setAttribute("data-theme", p);
    }
  } catch (e) {}
})();
`.trim();
