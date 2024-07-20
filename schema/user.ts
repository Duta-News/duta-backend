import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: text("email"),
  password: text("password"),
  phoneNumber: text("phone_number"),
  name: text("name").notNull(),
  authenticationType: text("authentication_type").notNull(),
  dob: text("dob"),
  gender: text("gender"),
});
