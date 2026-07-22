# Jeffrey Martin — Interactive Portfolio

A futuristic, mobile-first interactive portfolio with a guided tour, a terminal
command palette, a live guestbook, and real-time visit stats — all backed by a
**real Supabase (Postgres) database**.

## Stack

| Layer     | Tech                                                        |
| --------- | ----------------------------------------------------------- |
| Frontend  | React 19 · TypeScript · Vite · Tailwind CSS · framer-motion |
| API       | Hono · tRPC 11 (end-to-end type safety, superjson)          |
| Database  | **Supabase** Postgres 17 (RLS-secured, `@supabase/supabase-js`) |
| Packaging | Docker (multi-stage ready) · Node 22                        |

## Features

- **Guided onboarding tour** — boot sequence → 6-step guided walkthrough with a
  skip option; restartable anytime via the terminal (`tour` command)
- **Terminal palette** — press `` ` `` and type `help`; try `sudo hire --jeffrey`
- **Live guestbook** — visitor messages persist in Supabase
- **Live stats** — visits / guestbook signals / completed tours, aggregated by a
  security-definer Postgres function (raw analytics rows are never exposed)
- **Interactive starfield** with pointer-repulsion physics
- **Mobile-first** — bottom nav + safe-area padding on phones, top nav on
  tablet/desktop

## Database

Schema + RLS policies + seed data live in [`scripts/`](scripts/):

- `scripts/schema.sql` — tables, indexes, RLS policies, `stats_overview()` function
- `scripts/seed.sql` — portfolio content (projects, experience, skills, guestbook)

Row-Level Security is enabled on every table. The app connects with the
**publishable (anon) key** only — no service key anywhere.

## Develop

```bash
npm install
cp .env.example .env   # fill in SUPABASE_URL + SUPABASE_PUBLISHABLE_KEY
npm run dev            # http://localhost:3000
```

## Deploy (any Node 22 host / Docker)

```bash
npm install
npm run build
npm start              # serves frontend + API on :3000
```

Or with Docker:

```bash
docker build -t portfolio .
docker run -p 3000:3000 --env-file .env portfolio
```

## Environment

| Variable                  | Where to find it                          |
| ------------------------- | ----------------------------------------- |
| `SUPABASE_URL`            | Supabase Dashboard → Settings → API       |
| `SUPABASE_PUBLISHABLE_KEY`| Supabase Dashboard → Settings → API Keys  |
