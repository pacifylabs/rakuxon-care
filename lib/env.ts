import { z } from "zod";

/**
 * Typed configuration. Nothing outside this module reads process.env.
 *
 * Validation is lazy on purpose. Reading and asserting at module load would
 * break `next build`, which prerenders 58 static pages in environments that
 * legitimately have no database or mail credentials. Each accessor is called
 * at request time, where a missing value is a real error worth throwing on.
 */

const serverSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is not set")
    .refine(
      (v) => v.startsWith("postgres"),
      "DATABASE_URL must be a Postgres URL",
    ),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is not set"),
  ENQUIRY_FROM_EMAIL: z.string().email("ENQUIRY_FROM_EMAIL must be an email"),
  ENQUIRY_NOTIFY_EMAIL: z
    .string()
    .email("ENQUIRY_NOTIFY_EMAIL must be an email"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://rakuxoncare.co.uk"),
});

export type ServerEnv = z.infer<typeof serverSchema>;

let cached: ServerEnv | null = null;

/** Throws if anything required is missing. Call at request time only. */
export function serverEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    const missing = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid server configuration — ${missing}`);
  }
  cached = parsed.data;
  return cached;
}

/**
 * Per-capability checks, so a missing mail key does not stop a lead being
 * written to the database. Degrading one capability at a time is the whole
 * point of splitting these.
 */
export function databaseUrl(): string {
  const value = process.env.DATABASE_URL;
  if (!value) throw new Error("DATABASE_URL is not set");
  return value;
}

export function mailConfig():
  | { ready: true; apiKey: string; from: string; notify: string }
  | { ready: false; reason: string } {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const notify = process.env.ENQUIRY_NOTIFY_EMAIL;
  const missing = [
    !apiKey && "RESEND_API_KEY",
    !from && "ENQUIRY_FROM_EMAIL",
    !notify && "ENQUIRY_NOTIFY_EMAIL",
  ].filter(Boolean);
  if (missing.length) {
    return { ready: false, reason: `${missing.join(", ")} not set` };
  }
  return { ready: true, apiKey: apiKey!, from: from!, notify: notify! };
}

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://rakuxoncare.co.uk";
}
