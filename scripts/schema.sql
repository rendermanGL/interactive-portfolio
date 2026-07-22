-- Portfolio database schema (Supabase / Postgres 17)
-- Applied via the Supabase migration `create_portfolio_tables`.
-- Column names are camelCase (quoted) to preserve the API response shape.

create table if not exists public.projects (
  id bigint generated always as identity primary key,
  slug varchar(100) not null unique,
  title varchar(255) not null,
  tagline varchar(255) not null,
  description text not null,
  outcome text,
  "techStack" jsonb not null,
  status varchar(50) not null default 'shipped',
  accent varchar(20) not null default 'cyan',
  "sortOrder" integer not null default 0,
  "createdAt" timestamptz not null default now()
);

create table if not exists public.experience (
  id bigint generated always as identity primary key,
  role varchar(255) not null,
  company varchar(255) not null,
  "companyDesc" varchar(255),
  location varchar(100) not null,
  period varchar(100) not null,
  bullets jsonb not null,
  current boolean not null default false,
  era varchar(20) not null default 'main',
  "sortOrder" integer not null default 0
);

create table if not exists public.skill_groups (
  id bigint generated always as identity primary key,
  title varchar(100) not null,
  icon varchar(50) not null default 'cpu',
  items jsonb not null,
  "sortOrder" integer not null default 0
);

create table if not exists public.guestbook_entries (
  id bigint generated always as identity primary key,
  name varchar(80) not null,
  message varchar(280) not null,
  "createdAt" timestamptz not null default now()
);
create index if not exists guestbook_created_idx on public.guestbook_entries ("createdAt" desc);

create table if not exists public.site_events (
  id bigint generated always as identity primary key,
  kind varchar(50) not null,
  meta varchar(255),
  "createdAt" timestamptz not null default now()
);
create index if not exists events_kind_idx on public.site_events (kind);

-- ── Row-Level Security (migration `rls_policies_and_stats_function`) ──
alter table public.projects enable row level security;
alter table public.experience enable row level security;
alter table public.skill_groups enable row level security;
alter table public.guestbook_entries enable row level security;
alter table public.site_events enable row level security;

create policy "public read projects" on public.projects for select using (true);
create policy "public read experience" on public.experience for select using (true);
create policy "public read skill groups" on public.skill_groups for select using (true);
create policy "public read guestbook" on public.guestbook_entries for select using (true);
create policy "public write guestbook" on public.guestbook_entries for insert with check (true);
create policy "public write events" on public.site_events for insert with check (true);

-- Aggregate stats without exposing raw event rows (no select policy on site_events)
create or replace function public.stats_overview()
returns json
language sql
security definer
set search_path = public
as $$
  select json_build_object(
    'visits', (select count(*) from site_events where kind = 'visit'),
    'signals', (select count(*) from guestbook_entries),
    'tours', (select count(*) from site_events where kind = 'tour_complete')
  );
$$;
