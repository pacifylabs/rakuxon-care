import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { enquiries, type EnquiryRow } from "@/lib/db/schema";
import type { EnquiryInput } from "@/lib/enquiry";

/**
 * Lead persistence — the single pipeline every form feeds
 * (04_SITE_ARCHITECTURE §4).
 *
 * The honeypot never reaches here, and `consent` is deliberately not stored
 * as a boolean: UK GDPR wants evidence of when consent was given, which the
 * consent_given_at timestamp carries instead.
 */
export async function storeLead(
  input: EnquiryInput,
  meta: { sourcePath?: string } = {},
): Promise<EnquiryRow> {
  const branch =
    input.intent === "family"
      ? { careFor: input.careFor, postcode: emptyToNull(input.postcode) }
      : input.intent === "council"
        ? { organisation: input.organisation, packageType: input.packageType }
        : { organisation: input.organisation, stage: input.stage };

  const [row] = await db()
    .insert(enquiries)
    .values({
      intent: input.intent,
      name: input.name,
      email: input.email,
      phone: emptyToNull(input.phone),
      message: input.message,
      sourcePath: meta.sourcePath ?? null,
      ...branch,
    })
    .returning();

  console.info(
    `[enquiry] ${row.id} stored intent=${row.intent} email=${redact(row.email)}`,
  );
  return row;
}

/** Records the delivery outcome so a failed send is visible in the data. */
export async function recordEmailStatus(
  id: string,
  status: Record<string, string>,
): Promise<void> {
  try {
    await db()
      .update(enquiries)
      .set({ emailStatus: status, updatedAt: new Date() })
      .where(eq(enquiries.id, id));
  } catch (error) {
    // Never fail the request over bookkeeping — the lead is already safe.
    console.error(`[enquiry] ${id} could not record email status`, error);
  }
}

function emptyToNull(value: string | undefined | null): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/** Never log a full address. */
export function redact(value: string): string {
  const [user, domain] = value.split("@");
  if (!domain) return "***";
  return `${user.slice(0, 2)}***@${domain}`;
}
