import { Resend } from "resend";
import { mailConfig } from "@/lib/env";
import type { EnquiryRow } from "@/lib/db/schema";
import { adminNotification, userConfirmation } from "./email-templates";

export type SendOutcome = "sent" | "failed" | "skipped";
export type EmailStatus = { admin: SendOutcome; user: SendOutcome };

let client: Resend | null = null;
function resend(apiKey: string) {
  if (!client) client = new Resend(apiKey);
  return client;
}

/**
 * Sends the admin notification and the enquirer's confirmation.
 *
 * Never throws. A lead is already committed by the time this runs, and
 * failing the request because an email bounced would tell the enquirer their
 * message was lost when it was not. Failures are logged and recorded against
 * the row instead, so they are visible rather than silent.
 */
export async function sendEnquiryEmails(
  lead: EnquiryRow,
): Promise<EmailStatus> {
  const config = mailConfig();
  if (!config.ready) {
    console.warn(
      `[email] ${lead.id} not sent — ${config.reason}. The lead is saved.`,
    );
    return { admin: "skipped", user: "skipped" };
  }

  const mailer = resend(config.apiKey);
  const admin = adminNotification(lead);
  const user = userConfirmation(lead);

  /* Each call is wrapped so a SYNCHRONOUS throw from the SDK becomes a
     rejected promise. Passing mailer.emails.send(...) directly to
     Promise.allSettled evaluates it while building the array, so a sync
     throw escapes before allSettled can catch it — and this function must
     never throw. */
  const attempt = <T>(fn: () => Promise<T>) => Promise.resolve().then(fn);

  const [adminResult, userResult] = await Promise.allSettled([
    attempt(() =>
      mailer.emails.send({
        from: config.from,
        to: config.notify,
        // A reply goes to the enquirer, not to the no-reply sender.
        replyTo: lead.email,
        subject: admin.subject,
        html: admin.html,
        text: admin.text,
      }),
    ),
    attempt(() =>
      mailer.emails.send({
        from: config.from,
        to: lead.email,
        replyTo: config.notify,
        subject: user.subject,
        html: user.html,
        text: user.text,
      }),
    ),
  ]);

  return {
    admin: outcome(lead.id, "admin", adminResult),
    user: outcome(lead.id, "user", userResult),
  };
}

function outcome(
  id: string,
  which: "admin" | "user",
  result: PromiseSettledResult<{ error: unknown } | unknown>,
): SendOutcome {
  if (result.status === "rejected") {
    console.error(`[email] ${id} ${which} send threw`, result.reason);
    return "failed";
  }
  // Resend resolves with { data, error } rather than throwing on API errors.
  const error = (result.value as { error?: unknown } | null)?.error;
  if (error) {
    console.error(`[email] ${id} ${which} send failed`, error);
    return "failed";
  }
  return "sent";
}
