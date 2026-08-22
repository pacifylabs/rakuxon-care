const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileConfig =
  | { enabled: true; siteKey: string; secret: string }
  | { enabled: false };

/**
 * Both keys must be present before the widget is shown and before the
 * API starts rejecting missing tokens. Local and CI stay usable without
 * Cloudflare credentials; production should set both.
 */
export function turnstileConfig(): TurnstileConfig {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (siteKey && secret) return { enabled: true, siteKey, secret };
  return { enabled: false };
}

export function turnstileSiteKey(): string | null {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null;
}

export async function verifyTurnstile(
  token: unknown,
  ip: string,
): Promise<boolean> {
  const config = turnstileConfig();
  if (!config.enabled) return true;
  if (typeof token !== "string" || token.length < 10) return false;

  const body = new URLSearchParams({
    secret: config.secret,
    response: token,
  });
  if (ip && ip !== "unknown") body.set("remoteip", ip);

  try {
    const res = await fetch(SITEVERIFY, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
