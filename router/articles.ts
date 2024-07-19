import express from "express";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { articles } from "../schema/article";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";

dotenv.config();

const sql = neon(process.env.POSTGRES_DEV_DB_URL!);
const db = drizzle(sql);
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await db.select().from(articles);
  res.json(result);
});

router.post("/", async (req, res) => {
  const response = await db.insert(articles).values(req.body).returning();
  res.json(response);
});

router.delete("/:id", async (req, res) => {
  const response = await db
    .delete(articles)
    .where(eq(articles.id, req.params.id));
  res.json(response);
});

export default router;
