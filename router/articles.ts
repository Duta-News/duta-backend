import * as express from "express";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { articles } from "../schema/article";
import * as dotenv from "dotenv";
import { eq, sql } from "drizzle-orm";
import { articlesRead } from "../schema/articles-read";

dotenv.config();

const neonSQL = neon(process.env.DATABASE_URL!);
const db = drizzle(neonSQL);
const router = express.Router();

router.get("/all", async (req, res) => {
  const result = (await db.select().from(articles)).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  res.json(result);
});

router.get("/:id", async (req, res) => {
  try {
    console.log("Retrieving articles for user:", req.params.id);
    const { limit, offset, language, category } = req.query;
    const id = req.params.id;

    let whereSQL = `AND 1=1`;

    if (language) {
      whereSQL += ` AND a.language = '${language}'`;
    } else {
      res.status(400).json({ error: "Language is required" });
      return;
    }

    if (category) {
      whereSQL += ` AND a.category = '${category}'`;
    }

    const query = `
    SELECT a.* FROM articles a
    LEFT JOIN articles_read ar
    ON a.id = ar.article_id AND ar.user_id = '${id}'
    WHERE ar.id is NULL ${whereSQL}
    ORDER BY a.published_at DESC
    LIMIT ${limit || 10} OFFSET ${offset || 0};
  `;

    const result = await db.execute(sql.raw(query));
    res.json(result.rows);
  } catch (error) {
    console.log("Error in articles/:id", error);
    res.status(500).json({ message: error.message });
  }
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

router.post("/read", async (req, res) => {
  console.log(req.body);
  const response = await db
    .insert(articlesRead)
    .values(req.body.articles)
    .returning();
  res.json(response);
});

export default router;
