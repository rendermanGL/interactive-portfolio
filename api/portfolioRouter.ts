import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { getSupabase } from "./lib/supabase";

// Row shapes returned by Supabase (column names preserved from the old MySQL schema)
export interface ProjectRow {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  outcome: string | null;
  techStack: string[];
  status: string;
  accent: string;
  sortOrder: number;
  createdAt: string;
}

export interface ExperienceRow {
  id: number;
  role: string;
  company: string;
  companyDesc: string | null;
  location: string;
  period: string;
  bullets: string[];
  current: boolean;
  era: string;
  sortOrder: number;
}

export interface SkillGroupRow {
  id: number;
  title: string;
  icon: string;
  items: string[];
  sortOrder: number;
}

export interface GuestbookEntryRow {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

interface StatsOverview {
  visits: number;
  signals: number;
  tours: number;
}

function rethrow(error: { message: string } | null): void {
  if (error) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
  }
}

export const portfolioRouter = createRouter({
  projects: publicQuery.query(async () => {
    const { data, error } = await getSupabase()
      .from("projects")
      .select("*")
      .order("sortOrder", { ascending: true });
    rethrow(error);
    return (data ?? []) as ProjectRow[];
  }),

  experience: publicQuery.query(async () => {
    const { data, error } = await getSupabase()
      .from("experience")
      .select("*")
      .order("sortOrder", { ascending: true });
    rethrow(error);
    return (data ?? []) as ExperienceRow[];
  }),

  skillGroups: publicQuery.query(async () => {
    const { data, error } = await getSupabase()
      .from("skill_groups")
      .select("*")
      .order("sortOrder", { ascending: true });
    rethrow(error);
    return (data ?? []) as SkillGroupRow[];
  }),

  projectBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const { data, error } = await getSupabase()
        .from("projects")
        .select("*")
        .eq("slug", input.slug)
        .limit(1)
        .maybeSingle();
      rethrow(error);
      return (data ?? null) as ProjectRow | null;
    }),
});

export const guestbookRouter = createRouter({
  list: publicQuery.query(async () => {
    const { data, error } = await getSupabase()
      .from("guestbook_entries")
      .select("*")
      .order("createdAt", { ascending: false })
      .limit(50);
    rethrow(error);
    return (data ?? []) as GuestbookEntryRow[];
  }),

  post: publicQuery
    .input(
      z.object({
        name: z.string().trim().min(1).max(80),
        message: z.string().trim().min(1).max(280),
      }),
    )
    .mutation(async ({ input }) => {
      const { data, error } = await getSupabase()
        .from("guestbook_entries")
        .insert({ name: input.name, message: input.message })
        .select()
        .single();
      rethrow(error);
      return data as GuestbookEntryRow;
    }),
});

export const statsRouter = createRouter({
  overview: publicQuery.query(async () => {
    // Aggregate counts come from a security-definer Postgres function —
    // raw site_events rows are never exposed to the anon role.
    const { data, error } = await getSupabase().rpc("stats_overview");
    rethrow(error);
    return data as StatsOverview;
  }),

  track: publicQuery
    .input(z.object({ kind: z.string().min(1).max(50), meta: z.string().max(255).optional() }))
    .mutation(async ({ input }) => {
      const { error } = await getSupabase()
        .from("site_events")
        .insert({ kind: input.kind, meta: input.meta ?? null });
      rethrow(error);
      return { ok: true };
    }),
});
