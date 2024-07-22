import * as express from "express";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv";
import { users } from "../schema/user";
import { eq } from "drizzle-orm";

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await db.select().from(users);
  res.json(result);
});

router.post("/", async (req, res) => {
  try {
    const result = await db.insert(users).values(req.body).returning();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, req.params.id))
      .limit(1);

    if (result.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/fid/:fid", async (req, res) => {
  console.log("Request Received");
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.authenticationId, req.params.fid))
      .limit(1);

    if (result.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
