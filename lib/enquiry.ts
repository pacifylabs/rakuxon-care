import { z } from "zod";

/**
 * Segmented enquiry schema — PRD §8.1.
 *
 * One schema shared by the client and the API route, so the two can never
 * drift. The discriminated union is what makes the branching safe: a council
 * enquiry cannot be submitted with a care-business payload.
 */

export const INTENTS = [
  {
    value: "family",
    label: "Care at home",
    hint: "For yourself or a relative",
  },
  {
    value: "council",
    label: "Commissioning care",
    hint: "Council, ICB or NHS team",
  },
  {
    value: "business",
    label: "Support for my care business",
    hint: "Registration, tenders, staffing",
  },
] as const;

export type Intent = (typeof INTENTS)[number]["value"];

/** Query-string aliases used on CTAs around the site. Unknown values are ignored. */
const INTENT_ALIASES: Record<string, Intent> = {
  family: "family",
  care: "family",
  council: "council",
  business: "business",
  call: "business",
  audit: "business",
};

export function parseEnquiryIntent(raw: string | string[] | undefined): Intent | null {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return null;
  return INTENT_ALIASES[value] ?? null;
}

const name = z
  .string({ message: "Please tell us your name." })
  .trim()
  .min(2, "Please tell us your name.")
  .max(100, "That name is too long.");

const email = z
  .string({ message: "We need an email address to reply to." })
  .trim()
  .min(1, "We need an email address to reply to.")
  .max(254, "That email address is too long.")
  .email("That does not look like an email address.");

const phone = z
  .string()
  .trim()
  .max(30, "That phone number is too long.")
  .optional()
  .or(z.literal(""));

const message = z
  .string({ message: "Please tell us how we can help." })
  .trim()
  .min(10, "A sentence or two helps us route this to the right person.")
  .max(4000, "Please keep this under 4000 characters.");

const consent = z.literal(true, {
  message: "We need your consent before we can store your enquiry.",
});

/* Bots fill hidden fields; humans do not. Deliberately permissive: if the
   schema rejected a filled honeypot, the bot would get a 400 naming the field
   it needs to clear. The route accepts it, answers 200, and stores nothing. */
const honeypot = z.string().optional();

const base = { name, email, phone, message, consent, honeypot };

export const enquirySchema = z.discriminatedUnion("intent", [
  z.object({
    ...base,
    intent: z.literal("family"),
    careFor: z.enum(["myself", "relative", "someone-else"], {
      message: "Please tell us who the care is for.",
    }),
    postcode: z.string().trim().max(12).optional().or(z.literal("")),
  }),
  z.object({
    ...base,
    intent: z.literal("council"),
    organisation: z
      .string({ message: "Please tell us which organisation you are with." })
      .trim()
      .min(2, "Please tell us which organisation you are with."),
    packageType: z
      .enum(["domiciliary", "live-in", "complex", "framework", "other"])
      .optional(),
  }),
  z.object({
    ...base,
    intent: z.literal("business"),
    organisation: z
      .string({ message: "Please tell us your business name." })
      .trim()
      .min(2, "Please tell us your business name."),
    stage: z.enum(["idea", "applying", "registered", "growing"], {
      message: "Please tell us what stage you are at.",
    }),
  }),
]);

export type EnquiryInput = z.infer<typeof enquirySchema>;

/** Field errors keyed by field name, as returned by the API route. */
export type EnquiryErrors = Partial<Record<string, string>>;
