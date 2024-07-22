import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userVerifications = pgTable("user_verifications", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: text("email"),
  otp: text("otp"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
