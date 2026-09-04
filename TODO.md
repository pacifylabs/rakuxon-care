# TODO — real information still owed

Everything below was **removed from the site** rather than shipped as a
placeholder. Supply the real content and it can go back in.

Sources consulted for this pass:

| Source                                                              | Result                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `https://rakuxon.com/`                                              | Reachable. **This is a different business** — Rakuxon Ltd, a global _education_ consultancy ("Where Minds Meet Maps": university placement, visas, travel). None of its service copy applies to Rakuxon Care. Its contact details belong to the education arm. |
| `https://rakuxon-care-designs--mychat247.replit.app/#organisations` | Reachable, but client-rendered — a plain fetch returned only the shell. Read via a JS-executing browser instead. This supplied nearly all the real Rakuxon Care copy now on the site.                                                                          |

---

## 1. Contact details

**Currently shown: `info@rakuxoncare.co.uk` only.** One real channel, per instruction.

| Field            | Status                                                                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Email            | `info@rakuxoncare.co.uk` — from the Rakuxon Care source. **Confirm this mailbox is live before launch.**                                                                                          |
| Phone            | **Removed.** The source lists `020 7946 0000`, which is inside Ofcom's `020 7946 0xxx` range reserved for fiction and drama. It is not a real number and was not used. Supply a real one.          |
| Postal address   | **Removed.** `rakuxon.com` publishes _Flat 15, St Matthews House, Phelp Street, London SE17 2PJ_, but that is the education business. Supply the care service's registered address.                |
| Company number   | **Removed.** Never published on either source.                                                                                                                                                     |
| ICO registration | **Removed.** Never published on either source.                                                                                                                                                     |
| Social accounts  | **Removed.** `rakuxon.com` lists Instagram/TikTok/X/Facebook/YouTube `@rakuxon`, but those are the education brand's. Supply care-specific accounts, or confirm the group accounts should be used. |

Also available from `rakuxon.com` if you want them, though they are the
education arm's: `enquiries@rakuxon.com`, `+44 776 094 4935`, `+234 816 717 8847`.

## 2. Sections removed for lack of real content

| Removed                                   | Was                                                                                       | Restore when you have                                                                                      |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Testimonials section (home)               | 7 invented quotes with invented names                                                     | Real client quotes with consent to publish                                                                 |
| `/care/testimonials` page                 | Same invented quotes                                                                      | As above                                                                                                   |
| `/agency/case-studies` page               | Same invented quotes                                                                      | Real case studies with outcomes                                                                            |
| Team / specialists grid (home + `/about`) | 3 invented people with stock headshots                                                    | Real names, roles, photos                                                                                  |
| `/agency/opportunities` page              | Invented tenders from "Placeholder County Council"                                        | A real feed or CMS collection                                                                              |
| "Trusted by" partner logo row             | Six invented companies (Boltshift, Lightbox, FeatherDev, Spherule, GlobalBank, Nietzsche) | Real partner or accreditation logos. Replaced with the source's real trust line and three practice badges. |

Their nav and footer links were removed too, so nothing points at a dead route.

## 3. Enquiry form — wired to Postgres and Resend

**You only need to fill in `.env.local`.** Copy `.env.example`, paste the five
values, run the migration. Nothing else is outstanding in the code.

```bash
cp .env.example .env.local   # then fill it in
pnpm db:migrate              # creates the enquiries table
pnpm dev
```

| Variable                | Where it comes from                                                            |
| ----------------------- | ------------------------------------------------------------------------------ |
| `DATABASE_URL`          | Neon → Connection string → **Pooled** (hostname contains `-pooler`)            |
| `DATABASE_URL_UNPOOLED` | The same URL **without** `-pooler`. Migrations only; PgBouncer cannot run DDL. |
| `RESEND_API_KEY`        | resend.com → API Keys                                                          |
| `ENQUIRY_FROM_EMAIL`    | Any address on a domain **verified in Resend**, or every send fails            |
| `ENQUIRY_NOTIFY_EMAIL`  | The mailbox that should receive new enquiries                                  |

Built and tested: intent selector with branching fields, one Zod schema shared
by client and server, field-keyed errors, unticked GDPR consent stored as a
timestamp, honeypot, per-IP rate limiting, Postgres persistence via Drizzle,
and two Resend emails (admin notification and enquirer confirmation) with
plain-text alternatives.

**Degradation is deliberate.** If the database is unreachable the API returns
503 and tells the enquirer to email instead — it never shows a success screen
for a message nobody will read. If mail is unconfigured or a send fails, the
lead is still saved, the outcome is written to `enquiries.email_status`, and
the request still succeeds.

**Still outstanding for production:**

| Gap                 | Detail                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Rate limiting       | In-memory and per-instance; resets on deploy. Move to Redis for multi-instance deployments.                        |
| CAPTCHA             | Cloudflare Turnstile is wired. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in the host env.    |
| Data erasure        | UK-GDPR erasure path for stored leads is not built. `enquiries.status` exists for triage but there is no admin UI. |
| Domain verification | Resend will reject every send until the `ENQUIRY_FROM_EMAIL` domain has its DNS records in place.                  |

## 4. Legal pages

`/privacy`, `/terms`, `/cookies`, `/complaints`, `/accessibility` previously
listed invented section stubs ("Placeholder — the data controller…"). Those are
gone. Each page now carries an honest "in preparation" notice and the real
email. **Binding legal text must be written and approved by you** — it is not
something to generate.

## 5. Still unverified

- **CQC status.** The site says "CQC registration in progress" and the footer
  says regulated-care information is available on request, matching the
  source's own wording. Confirm before launch.
- **Market statistics** (£77.8bn, 15,232 locations, 1.71m jobs, etc.) come from
  PRD §7 and are real, but the PRD attributes them to an internal strategy deck
  rather than to public sources. Add public citations (CQC, Skills for Care)
  before launch.
- **`/resources`** has no articles. It now says so plainly and offers a
  conversation instead of showing an empty grid.

## 6. Assets

- `public/logo.png` is an opaque wordmark on a light background. `logo-navy.png`
  and `logo-white.png` are transparent variants generated from it; the white one
  is used on the navy footer. A vector original (SVG) would render more crisply.
- `app/icon.png` and `app/apple-icon.png` are cropped from the logo's "R" badge.
