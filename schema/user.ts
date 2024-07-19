import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email"),
  password: text("password"),
  phoneNumber: text("phone_number"),
  name: text("name"),
  authenticationType: text("authentication_type"),
  dob: text("dob"),
  gender: text("gender"),
});
