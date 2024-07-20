import express from "express";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import dotenv from "dotenv";
import { users } from "../schema/user";

dotenv.config();

const sql = neon(process.env.POSTGRES_DEV_DB_URL!);
const db = drizzle(sql);
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await db.select().from(users);
  res.json(result);
});

export default router;
