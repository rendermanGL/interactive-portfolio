# jm-os — Interactive Portfolio

A full-stack, mobile-first personal portfolio built as an interactive operating system for Jeffrey Martin's career.

## Highlights

- **Guided tour** — a terminal-style boot sequence on first visit, with an optional JM-01 guide module (fully skippable, remembered via localStorage)
- **Terminal palette** — press `` ` `` or use the nav button / mobile FAB. Commands: `help`, `go <section>`, `stats`, `tour`, `whoami`, `contact`, `sudo hire --jeffrey`
- **Live database** — projects, experience, skills, guestbook entries and site analytics are all served from a real database via tRPC
- **Signal Tower guestbook** — visitors leave messages that persist for everyone
- **Mobile-first** — bottom tab nav on phones, two-column grids on iPad, full layout on desktop

## Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, lucide-react
- **Backend**: Hono + tRPC 11 (superjson)
- **Database**: Drizzle ORM (MySQL dialect; schema is portable to Postgres/Supabase)

## Structure

```
api/          Hono server + tRPC routers
api/queries/  Database connection (lazy drizzle instance)
contracts/    Shared types (frontend <-> backend)
db/           Drizzle schema + seed
db/seed.ts    Seeds projects, experience, skill groups from CV data
src/components/  Starfield, Nav, Onboarding (boot + tour), TerminalPalette
src/sections/    Hero, Projects, Timeline, Skills, Guestbook, Contact
src/pages/       Home (composition + visit tracking)
```

## Develop

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL
npm run db:push        # sync schema
npx tsx db/seed.ts     # seed portfolio data
npm run dev            # http://localhost:3000
```

## Build & run

```bash
npm run build
npm start              # NODE_ENV=production node dist/boot.js
```

## Docker

```bash
docker build -t jm-os .
docker run -p 3000:3000 --env-file .env jm-os
```

## Notes

- `package-lock.json` is not tracked here — run `npm install` once to regenerate it locally.
- Environment variables are read from `.env` (never commit the real file).
