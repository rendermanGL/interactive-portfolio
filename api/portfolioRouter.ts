import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { projects, experience, skillGroups, guestbookEntries, siteEvents } from "@db/schema";
import { asc, desc, eq, sql } from "drizzle-orm";

export const portfolioRouter = createRouter({
  projects: publicQuery.query(() =>
    getDb().select().from(projects).orderBy(asc(projects.sortOrder)),
  ),

  experience: publicQuery.query(() =>
    getDb().select().from(experience).orderBy(asc(experience.sortOrder)),
  ),

  skillGroups: publicQuery.query(() =>
    getDb().select().from(skillGroups).orderBy(asc(skillGroups.sortOrder)),
  ),

  projectBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const [row] = await getDb()
        .select()
        .from(projects)
        .where(eq(projects.slug, input.slug))
        .limit(1);
      return row ?? null;
    }),
});

export const guestbookRouter = createRouter({
  list: publicQuery.query(() =>
    getDb().select().from(guestbookEntries).orderBy(desc(guestbookEntries.createdAt)).limit(50),
  ),

  post: publicQuery
    .input(
      z.object({
        name: z.string().trim().min(1).max(80),
        message: z.string().trim().min(1).max(280),
      }),
    )
    .mutation(async ({ input }) => {
      const [{ id }] = await getDb()
        .insert(guestbookEntries)
        .values({ name: input.name, message: input.message })
        .$returningId();
      const [entry] = await getDb()
        .select()
        .from(guestbookEntries)
        .where(eq(guestbookEntries.id, id))
        .limit(1);
      return entry;
    }),
});

export const statsRouter = createRouter({
  overview: publicQuery.query(async () => {
    const db = getDb();
    const [{ visits }] = await db
      .select({ visits: sql<number>`count(*)` })
      .from(siteEvents)
      .where(eq(siteEvents.kind, "visit"));
    const [{ signals }] = await db
      .select({ signals: sql<number>`count(*)` })
      .from(guestbookEntries);
    const [{ tours }] = await db
      .select({ tours: sql<number>`count(*)` })
      .from(siteEvents)
      .where(eq(siteEvents.kind, "tour_complete"));
    return { visits: Number(visits), signals: Number(signals), tours: Number(tours) };
  }),

  track: publicQuery
    .input(z.object({ kind: z.string().min(1).max(50), meta: z.string().max(255).optional() }))
    .mutation(async ({ input }) => {
      await getDb().insert(siteEvents).values({ kind: input.kind, meta: input.meta ?? null });
      return { ok: true };
    }),
});
