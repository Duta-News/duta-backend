import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  author: text("author").notNull(),
  publishedAt: text("published_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  language: text("language").notNull(),
  category: text("category").notNull(),
  label: text("label").notNull(),
  sourceUrl: text("source_url").notNull(),
  source: text("source").notNull(),
});
