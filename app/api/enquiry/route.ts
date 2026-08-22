import { NextResponse } from "next/server";
import { enquirySchema, type EnquiryErrors } from "@/lib/enquiry";
import { storeLead } from "@/lib/server/leads";

/* Rate limit. Redis is named in the plan but not provisioned; this in-memory
   window is per-instance and resets on deploy — enough to blunt a naive
   flood, not a substitute for the real thing. See TODO.md. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, formError: "Too many enquiries. Please try again shortly." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, formError: "We could not read that submission." },
      { status: 400 },
    );
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    const errors: EnquiryErrors = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      errors[field] ??= issue.message;
    }
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // Honeypot: a bot filled a field no human can see. Answer 200 so the bot
  // learns nothing, but store nothing.
  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true, id: null });
  }

  const { id, persisted } = await storeLead(parsed.data);

  return NextResponse.json({
    ok: true,
    id,
    // Honest about the remaining gap rather than claiming an email was sent.
    persisted,
  });
}
