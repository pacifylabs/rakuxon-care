import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Enquiry leads — the single pipeline every form on the site feeds
 * (04_SITE_ARCHITECTURE §4).
 *
 * Enum-backed columns rather than free text: the intent and the branch
 * fields come from a closed set in lib/enquiry.ts, and the database is the
 * right place to enforce that rather than trusting the caller.
 */

export const enquiryIntent = pgEnum("enquiry_intent", [
  "family",
  "council",
  "business",
]);

export const enquiryStatus = pgEnum("enquiry_status", [
  "new",
  "in_progress",
  "closed",
]);

export const enquiries = pgTable(
  "enquiries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    intent: enquiryIntent("intent").notNull(),
    status: enquiryStatus("status").notNull().default("new"),

    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 254 }).notNull(),
    phone: varchar("phone", { length: 30 }),
    message: text("message").notNull(),

    /* Branch-specific fields. Nullable because which ones apply depends on
       intent; the discriminated union in lib/enquiry.ts is what guarantees
       the right combination arrives. */
    organisation: varchar("organisation", { length: 200 }),
    careFor: varchar("care_for", { length: 32 }),
    postcode: varchar("postcode", { length: 12 }),
    packageType: varchar("package_type", { length: 32 }),
    stage: varchar("stage", { length: 32 }),

    /* UK GDPR: record WHEN consent was given, not merely that it was. */
    consentGivenAt: timestamp("consent_given_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    /* Which page the enquiry started on — PRD asks leads to be tagged by
       source route and intent. */
    sourcePath: varchar("source_path", { length: 512 }),

    /* Delivery outcome per recipient, so a failed send is visible rather
       than lost. Shape: { admin: "sent"|"failed"|"skipped", user: ... }. */
    emailStatus: jsonb("email_status"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    // The two queries an inbox actually runs: newest first, and by status.
    index("enquiries_created_at_idx").on(table.createdAt),
    index("enquiries_status_created_at_idx").on(table.status, table.createdAt),
    index("enquiries_email_idx").on(table.email),
  ],
);

export type EnquiryRow = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
