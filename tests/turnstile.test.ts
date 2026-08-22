import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ORIGINAL = { ...process.env };

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllGlobals();
});

afterEach(() => {
  process.env = { ...ORIGINAL };
});

async function turnstile() {
  return import("@/lib/turnstile");
}

describe("turnstileConfig", () => {
  it("stays disabled when either key is missing, so local and CI still work", async () => {
    delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    delete process.env.TURNSTILE_SECRET_KEY;
    const { turnstileConfig, verifyTurnstile } = await turnstile();
    expect(turnstileConfig().enabled).toBe(false);
    await expect(verifyTurnstile("", "127.0.0.1")).resolves.toBe(true);
  });

  it("enables only when both keys are present", async () => {
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "site";
    process.env.TURNSTILE_SECRET_KEY = "secret";
    const { turnstileConfig } = await turnstile();
    expect(turnstileConfig()).toEqual({
      enabled: true,
      siteKey: "site",
      secret: "secret",
    });
  });
});

describe("verifyTurnstile", () => {
  it("rejects a missing token when enabled", async () => {
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "site";
    process.env.TURNSTILE_SECRET_KEY = "secret";
    const { verifyTurnstile } = await turnstile();
    await expect(verifyTurnstile("", "127.0.0.1")).resolves.toBe(false);
  });

  it("asks Cloudflare and trusts only success: true", async () => {
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "site";
    process.env.TURNSTILE_SECRET_KEY = "secret";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { verifyTurnstile } = await turnstile();
    await expect(verifyTurnstile("ok-token-12", "203.0.113.9")).resolves.toBe(
      true,
    );
    expect(fetchMock).toHaveBeenCalledOnce();
    const body = fetchMock.mock.calls[0][1].body as URLSearchParams;
    expect(body.get("secret")).toBe("secret");
    expect(body.get("response")).toBe("ok-token-12");
    expect(body.get("remoteip")).toBe("203.0.113.9");
  });

  it("fails closed when Cloudflare is unreachable", async () => {
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "site";
    process.env.TURNSTILE_SECRET_KEY = "secret";
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const { verifyTurnstile } = await turnstile();
    await expect(verifyTurnstile("ok-token-12", "127.0.0.1")).resolves.toBe(
      false,
    );
  });
});
