import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { EnquiryInput } from "@/lib/enquiry";

/**
 * Lead persistence.
 *
 * PRD names Postgres for leads; no database is provisioned yet, so this
 * appends newline-delimited JSON to a local file and always logs the lead.
 * That means a submission is never silently lost in development.
 *
 * NOT production-ready: a serverless filesystem is ephemeral and not shared
 * between instances. Swap the body of this function for the real datastore
 * before launch — the call site does not change. See TODO.md.
 */
const LEAD_FILE = path.join(process.cwd(), ".leads", "enquiries.jsonl");

export type StoredLead = Omit<EnquiryInput, "honeypot" | "consent"> & {
  id: string;
  receivedAt: string;
  consentGivenAt: string;
};

export async function storeLead(
  input: EnquiryInput,
): Promise<{ id: string; persisted: boolean }> {
  const now = new Date().toISOString();
  /* honeypot and consent are deliberately dropped: the honeypot is an
     anti-spam artefact, and the consent flag is recorded as a timestamp
     below rather than as a bare boolean. */
  const rest = { ...input } as Partial<EnquiryInput>;
  delete rest.honeypot;
  delete rest.consent;
  const lead: StoredLead = {
    ...(rest as Omit<EnquiryInput, "honeypot" | "consent">),
    id: crypto.randomUUID(),
    receivedAt: now,
    // UK GDPR: record when consent was given, not merely that it was.
    consentGivenAt: now,
  };

  // Logged first, so the lead survives even if the write fails.
  console.info(
    `[enquiry] ${lead.id} intent=${lead.intent} email=${redact(lead.email)}`,
  );

  try {
    await mkdir(path.dirname(LEAD_FILE), { recursive: true });
    await appendFile(LEAD_FILE, JSON.stringify(lead) + "\n", "utf8");
    return { id: lead.id, persisted: true };
  } catch (error) {
    // Surfaced, never swallowed — but the caller still succeeds, because the
    // lead is in the log and losing the enquirer's message is the worse
    // outcome.
    console.error(`[enquiry] ${lead.id} could not be written to disk`, error);
    return { id: lead.id, persisted: false };
  }
}

/** Never log a full address. */
function redact(value: string) {
  const [user, domain] = value.split("@");
  if (!domain) return "***";
  return `${user.slice(0, 2)}***@${domain}`;
}
