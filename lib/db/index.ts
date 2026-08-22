import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { databaseUrl } from "@/lib/env";
import * as schema from "./schema";

export { schema };

/**
 * Drizzle over Neon's HTTP transport.
 *
 * HTTP suits this workload exactly: every write is a single INSERT with no
 * transaction spanning statements, and HTTP avoids paying for a WebSocket
 * handshake per invocation in a serverless runtime. Point DATABASE_URL at
 * the POOLED hostname (the one containing `-pooler`).
 *
 * Built lazily and cached — constructing at module load would require
 * DATABASE_URL during `next build`, which prerenders pages that never touch
 * the database.
 */
let cached: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function db() {
  if (!cached) {
    cached = drizzle(neon(databaseUrl()), { schema });
  }
  return cached;
}
