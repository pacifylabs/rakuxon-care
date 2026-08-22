import "dotenv/config";
import { defineConfig } from "drizzle-kit";

/**
 * Migrations use a DIRECT (unpooled) connection — PgBouncer does not support
 * the session-level statements DDL needs. Set DATABASE_URL_UNPOOLED to the
 * hostname WITHOUT `-pooler`; the app itself uses the pooled URL.
 */
export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? "",
  },
  strict: true,
  verbose: true,
});
