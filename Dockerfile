# syntax=docker/dockerfile:1

# Rakuxon Care — production image.
#
# Only needed for self-hosting (Fly, Railway, ECS, a VPS). On Vercel this
# file is ignored; deploy from git instead.
#
# Multi-stage so the runtime image carries no package manager, no source and
# no dev dependencies. Neon is reached over HTTPS, so nothing else is needed
# at runtime.

# ── deps ─────────────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile

# ── build ────────────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# No build-time secrets: every page that needs the database or the mailer is
# rendered per request, and lib/env.ts reads configuration lazily. The build
# succeeds with no .env present, which is what keeps this stage cacheable.
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ── runtime ──────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Unprivileged user. node:alpine ships uid 1000 as `node`.
RUN addgroup -g 1001 nodejs && adduser -u 1001 -G nodejs -S nextjs

# standalone contains server.js plus only the modules that are imported.
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
