import express from "express";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import dotenv from "dotenv";
import { articles } from "./schema/article";

dotenv.config();

const sql = neon(process.env.POSTGRES_DEV_DB_URL!);
const db = drizzle(sql);
const app = express();

app.get("/", async (req, res) => {
  const result = await db.select().from(articles);
  res.json(result);
});

app.get("/sample", async (req, res) => {
  const response = await db.insert(articles).values({
    title: "Sample Title",
    summary: "Sample Summary",
  });

  res.json(response);
});

app.listen(8080, () => {
  console.log("Server is running on port 3000");
});
