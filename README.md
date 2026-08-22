This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Setup

```bash
pnpm install
cp .env.example .env.local     # fill in the five values
pnpm db:migrate                # create the enquiries table
pnpm dev
```

`.env.example` documents every variable and where to get it. The app builds
and serves without any of them — configuration is read lazily at request
time, so `pnpm build` prerenders all 58 static pages with no secrets present.
Only the enquiry API needs them.

### Commands

| Command                     | Purpose                                      |
| --------------------------- | -------------------------------------------- |
| `pnpm dev`                  | Development server                           |
| `pnpm build` / `pnpm start` | Production build and serve                   |
| `pnpm test`                 | Vitest suite                                 |
| `pnpm test:watch`           | Vitest in watch mode                         |
| `pnpm typecheck`            | TypeScript, no emit                          |
| `pnpm lint`                 | ESLint                                       |
| `pnpm db:generate`          | Generate a migration from `lib/db/schema.ts` |
| `pnpm db:migrate`           | Apply migrations (uses the **unpooled** URL) |
| `pnpm db:studio`            | Drizzle Studio                               |

### Database

Neon Postgres via Drizzle, over Neon's HTTP driver — every write is a single
INSERT, so HTTP avoids a WebSocket handshake per invocation.

Use the **pooled** URL (`-pooler` in the hostname) for `DATABASE_URL`, and the
**direct** URL for `DATABASE_URL_UNPOOLED`. PgBouncer does not support the
session-level statements DDL needs, so migrations must not go through it.

### Email

Resend, with a branded HTML template plus a plain-text alternative for both
the admin notification and the enquirer's confirmation. The `From` domain must
be verified in Resend or sends fail. Mail failures never fail the request —
the lead is already committed, and the outcome is recorded on the row.

### Docker

Only needed for self-hosting; Vercel ignores it.

```bash
docker compose up --build
```

Multi-stage build on `output: "standalone"`, running as an unprivileged user
with a healthcheck. No local Postgres service: Neon branching gives each
developer an isolated database, which is closer to production than a
container running a different Postgres build.
