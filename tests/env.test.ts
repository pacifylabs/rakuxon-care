import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/* Configuration is read lazily so `next build` can prerender 58 static pages
   without any secrets present. These tests hold that guarantee in place. */

const ORIGINAL = { ...process.env };

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  process.env = { ...ORIGINAL };
});

async function env() {
  return import("@/lib/env");
}

describe("databaseUrl", () => {
  it("returns the URL when set", async () => {
    process.env.DATABASE_URL = "postgresql://user:pw@host/db";
    const { databaseUrl } = await env();
    expect(databaseUrl()).toBe("postgresql://user:pw@host/db");
  });

  it("throws a named error when missing, rather than returning undefined", async () => {
    delete process.env.DATABASE_URL;
    const { databaseUrl } = await env();
    expect(() => databaseUrl()).toThrow(/DATABASE_URL is not set/);
  });

  it("does not throw at import time", async () => {
    delete process.env.DATABASE_URL;
    // Importing must stay safe — this is what keeps the build green.
    await expect(env()).resolves.toBeDefined();
  });
});

describe("mailConfig", () => {
  const full = {
    RESEND_API_KEY: "re_test",
    ENQUIRY_FROM_EMAIL: "no-reply@rakuxoncare.co.uk",
    ENQUIRY_NOTIFY_EMAIL: "hello@rakuxoncare.co.uk",
  };

  it("reports ready when every value is present", async () => {
    Object.assign(process.env, full);
    const { mailConfig } = await env();
    const config = mailConfig();
    expect(config.ready).toBe(true);
    if (config.ready) expect(config.apiKey).toBe("re_test");
  });

  it.each(["RESEND_API_KEY", "ENQUIRY_FROM_EMAIL", "ENQUIRY_NOTIFY_EMAIL"])(
    "reports not ready and names %s when it is missing",
    async (key) => {
      Object.assign(process.env, full);
      delete process.env[key];
      const { mailConfig } = await env();
      const config = mailConfig();
      expect(config.ready).toBe(false);
      if (!config.ready) expect(config.reason).toContain(key);
    },
  );

  it("names every missing value at once, not just the first", async () => {
    for (const key of Object.keys(full)) delete process.env[key];
    const { mailConfig } = await env();
    const config = mailConfig();
    if (!config.ready) {
      expect(config.reason).toContain("RESEND_API_KEY");
      expect(config.reason).toContain("ENQUIRY_FROM_EMAIL");
      expect(config.reason).toContain("ENQUIRY_NOTIFY_EMAIL");
    }
  });

  it("is independent of the database, so one missing key degrades only its own capability", async () => {
    Object.assign(process.env, full);
    delete process.env.DATABASE_URL;
    const { mailConfig } = await env();
    expect(mailConfig().ready).toBe(true);
  });
});

describe("serverEnv", () => {
  it("rejects a DATABASE_URL that is not a Postgres URL", async () => {
    Object.assign(process.env, {
      DATABASE_URL: "mysql://user:pw@host/db",
      RESEND_API_KEY: "re_test",
      ENQUIRY_FROM_EMAIL: "no-reply@rakuxoncare.co.uk",
      ENQUIRY_NOTIFY_EMAIL: "hello@rakuxoncare.co.uk",
    });
    const { serverEnv } = await env();
    expect(() => serverEnv()).toThrow(/must be a Postgres URL/);
  });

  it("rejects a malformed notification address", async () => {
    Object.assign(process.env, {
      DATABASE_URL: "postgresql://user:pw@host/db",
      RESEND_API_KEY: "re_test",
      ENQUIRY_FROM_EMAIL: "no-reply@rakuxoncare.co.uk",
      ENQUIRY_NOTIFY_EMAIL: "not-an-email",
    });
    const { serverEnv } = await env();
    expect(() => serverEnv()).toThrow(/ENQUIRY_NOTIFY_EMAIL/);
  });
});

describe("siteUrl", () => {
  it("falls back to the production origin", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const { siteUrl } = await env();
    expect(siteUrl()).toBe("https://www.rakuxoncare.co.uk");
  });

  it("rewrites the apex host to www so og:url matches the live site", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://rakuxoncare.co.uk";
    const { siteUrl } = await env();
    expect(siteUrl()).toBe("https://www.rakuxoncare.co.uk");
  });

  it("prefers the configured value", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://staging.example.org";
    const { siteUrl } = await env();
    expect(siteUrl()).toBe("https://staging.example.org");
  });
});
