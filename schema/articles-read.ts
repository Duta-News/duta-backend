import { numeric, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const articlesRead = pgTable("articles_read", {
  id: uuid("id").primaryKey().defaultRandom(),
  articleId: uuid("article_id").notNull(),
  userId: uuid("user_id").notNull(),
  readAt: timestamp("timestamp", { mode: "string" }).defaultNow(),
  timeSpent: numeric("time_spent").notNull(),
});
