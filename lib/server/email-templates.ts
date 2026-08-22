import type { EnquiryRow } from "@/lib/db/schema";

/**
 * Email-safe HTML: table layout, inline styles, no external stylesheet and
 * no web fonts — Outlook and Gmail strip all three. Colours are the design
 * system's navy and care teal, hard-coded because CSS variables do not
 * survive an email client either.
 *
 * Every template ships with a plain-text alternative. Sending HTML alone
 * hurts deliverability and fails for anyone reading in plain text.
 */

const NAVY = "#1f3864";
const NAVY_DARK = "#10203d";
const CARE = "#158368";
const INK = "#33404f";
const INK_MUTED = "#5c6b7a";
const PAPER = "#f7f9fb";
const BORDER = "#dde6f2";

const INTENT_LABEL: Record<string, string> = {
  family: "Care at home",
  council: "Commissioning care",
  business: "Support for a care business",
};

const CARE_FOR_LABEL: Record<string, string> = {
  myself: "Themselves",
  relative: "A relative",
  "someone-else": "Someone else",
};

const PACKAGE_LABEL: Record<string, string> = {
  domiciliary: "Domiciliary visits",
  "live-in": "Live-in care",
  complex: "Complex or specialist",
  framework: "Framework or DPS",
  other: "Something else",
};

const STAGE_LABEL: Record<string, string> = {
  idea: "Thinking about starting",
  applying: "Preparing or submitting a CQC application",
  registered: "Registered, not yet trading fully",
  growing: "Trading and looking to grow",
};

/** Escapes untrusted enquirer input before it enters an HTML email. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shell(title: string, bodyHtml: string, preheader: string): string {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${BORDER};border-radius:12px;overflow:hidden;">
<tr><td style="background:${NAVY_DARK};padding:20px 28px;">
<span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:0.02em;">Rakuxon Care</span>
</td></tr>
<tr><td style="padding:28px;">${bodyHtml}</td></tr>
<tr><td style="background:${PAPER};padding:18px 28px;border-top:1px solid ${BORDER};">
<p style="margin:0;font-size:12px;line-height:1.6;color:${INK_MUTED};">
Rakuxon Care &middot; CQC and regulated-care information available on request<br>
This message was sent because an enquiry was submitted at rakuxoncare.co.uk.
</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
<td style="padding:8px 0;border-bottom:1px solid ${BORDER};font-size:13px;color:${INK_MUTED};width:38%;vertical-align:top;">${escapeHtml(label)}</td>
<td style="padding:8px 0;border-bottom:1px solid ${BORDER};font-size:14px;color:${INK};vertical-align:top;">${escapeHtml(value)}</td>
</tr>`;
}

/** Field list shared by both templates, so they cannot describe a lead differently. */
function fields(lead: EnquiryRow): [string, string][] {
  const out: [string, string][] = [
    ["Enquiry type", INTENT_LABEL[lead.intent] ?? lead.intent],
    ["Name", lead.name],
    ["Email", lead.email],
  ];
  if (lead.phone) out.push(["Phone", lead.phone]);
  if (lead.organisation) out.push(["Organisation", lead.organisation]);
  if (lead.careFor)
    out.push(["Care is for", CARE_FOR_LABEL[lead.careFor] ?? lead.careFor]);
  if (lead.postcode) out.push(["Postcode", lead.postcode]);
  if (lead.packageType)
    out.push([
      "Package type",
      PACKAGE_LABEL[lead.packageType] ?? lead.packageType,
    ]);
  if (lead.stage) out.push(["Stage", STAGE_LABEL[lead.stage] ?? lead.stage]);
  if (lead.sourcePath) out.push(["Started on", lead.sourcePath]);
  out.push(["Reference", lead.id]);
  return out;
}

/* ---------------------------------------------------------- admin notify */

export function adminNotification(lead: EnquiryRow): {
  subject: string;
  html: string;
  text: string;
} {
  const label = INTENT_LABEL[lead.intent] ?? lead.intent;
  const subject = `New enquiry — ${label} — ${lead.name}`;

  const html = shell(
    subject,
    `<h1 style="margin:0 0 6px;font-size:20px;line-height:1.3;color:${NAVY_DARK};">New enquiry</h1>
<p style="margin:0 0 20px;font-size:14px;color:${INK_MUTED};">${escapeHtml(label)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${fields(lead)
  .map(([k, v]) => row(k, v))
  .join("")}
</table>
<h2 style="margin:24px 0 8px;font-size:15px;color:${NAVY_DARK};">Message</h2>
<div style="background:${PAPER};border-left:3px solid ${CARE};padding:14px 16px;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(lead.message)}</div>
<p style="margin:22px 0 0;">
<a href="mailto:${escapeHtml(lead.email)}?subject=${encodeURIComponent(`Re: your enquiry (${lead.id.slice(0, 8)})`)}"
   style="display:inline-block;background:${NAVY};color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px;font-weight:600;">Reply to ${escapeHtml(lead.name)}</a>
</p>
<p style="margin:16px 0 0;font-size:12px;color:${INK_MUTED};">Consent recorded ${escapeHtml(lead.consentGivenAt.toISOString())}.</p>`,
    `${label} enquiry from ${lead.name}`,
  );

  const text = [
    `NEW ENQUIRY — ${label}`,
    "",
    ...fields(lead).map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    lead.message,
    "",
    `Consent recorded ${lead.consentGivenAt.toISOString()}`,
  ].join("\n");

  return { subject, html, text };
}

/* ------------------------------------------------------ user confirmation */

export function userConfirmation(lead: EnquiryRow): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = "We have your enquiry — Rakuxon Care";
  const firstName = lead.name.split(" ")[0] || lead.name;

  const html = shell(
    subject,
    `<h1 style="margin:0 0 14px;font-size:20px;line-height:1.3;color:${NAVY_DARK};">Thank you, ${escapeHtml(firstName)}</h1>
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">
We have your enquiry and a person will read it — not an autoresponder. We aim to come back to you within one working day.
</p>
<p style="margin:0 0 20px;font-size:15px;line-height:1.7;">
Your reference is <strong style="color:${NAVY_DARK};">${escapeHtml(lead.id.slice(0, 8))}</strong>. Quote it if you need to chase us.
</p>
<h2 style="margin:0 0 8px;font-size:15px;color:${NAVY_DARK};">What you sent us</h2>
<div style="background:${PAPER};border-left:3px solid ${CARE};padding:14px 16px;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(lead.message)}</div>
<p style="margin:22px 0 0;font-size:14px;line-height:1.7;color:${INK_MUTED};">
If anything changes in the meantime, reply to this email and it reaches the same team.
</p>`,
    "We have your enquiry and will come back to you within one working day.",
  );

  const text = [
    `Thank you, ${firstName}`,
    "",
    "We have your enquiry and a person will read it — not an autoresponder.",
    "We aim to come back to you within one working day.",
    "",
    `Your reference is ${lead.id.slice(0, 8)}. Quote it if you need to chase us.`,
    "",
    "What you sent us:",
    lead.message,
    "",
    "If anything changes, reply to this email and it reaches the same team.",
    "",
    "Rakuxon Care",
  ].join("\n");

  return { subject, html, text };
}
