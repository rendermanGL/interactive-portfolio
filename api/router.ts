import { createRouter, publicQuery } from "./middleware";
import { portfolioRouter, guestbookRouter, statsRouter } from "./portfolioRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  portfolio: portfolioRouter,
  guestbook: guestbookRouter,
  stats: statsRouter,
});

export type AppRouter = typeof appRouter;
