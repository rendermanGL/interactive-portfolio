import {
  mysqlTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  json,
  int,
  index,
} from "drizzle-orm/mysql-core";

export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  tagline: varchar("tagline", { length: 255 }).notNull(),
  description: text("description").notNull(),
  outcome: text("outcome"),
  techStack: json("techStack").$type<string[]>().notNull(),
  status: varchar("status", { length: 50 }).notNull().default("shipped"),
  accent: varchar("accent", { length: 20 }).notNull().default("cyan"),
  sortOrder: int("sortOrder").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const experience = mysqlTable("experience", {
  id: serial("id").primaryKey(),
  role: varchar("role", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  companyDesc: varchar("companyDesc", { length: 255 }),
  location: varchar("location", { length: 100 }).notNull(),
  period: varchar("period", { length: 100 }).notNull(),
  bullets: json("bullets").$type<string[]>().notNull(),
  current: boolean("current").notNull().default(false),
  era: varchar("era", { length: 20 }).notNull().default("main"),
  sortOrder: int("sortOrder").notNull().default(0),
});

export const skillGroups = mysqlTable("skill_groups", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  icon: varchar("icon", { length: 50 }).notNull().default("cpu"),
  items: json("items").$type<string[]>().notNull(),
  sortOrder: int("sortOrder").notNull().default(0),
});

export const guestbookEntries = mysqlTable(
  "guestbook_entries",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 80 }).notNull(),
    message: varchar("message", { length: 280 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => ({
    createdIdx: index("guestbook_created_idx").on(table.createdAt),
  }),
);

export const siteEvents = mysqlTable(
  "site_events",
  {
    id: serial("id").primaryKey(),
    kind: varchar("kind", { length: 50 }).notNull(),
    meta: varchar("meta", { length: 255 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => ({
    kindIdx: index("events_kind_idx").on(table.kind),
  }),
);

export type Project = typeof projects.$inferSelect;
export type Experience = typeof experience.$inferSelect;
export type SkillGroup = typeof skillGroups.$inferSelect;
export type GuestbookEntry = typeof guestbookEntries.$inferSelect;
export type SiteEvent = typeof siteEvents.$inferSelect;
