import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title"),
  summary: text("summary"),
  author: text("author"),
  publishedAt: text("published_at"),
  updatedAt: text("updated_at"),
  language: text("language"),
  category: text("category"),
  label: text("label"),
  sourceUrl: text("source_url"),
  source: text("source"),
});
