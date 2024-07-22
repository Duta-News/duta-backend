import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { User } from "../types/user";

dotenv.config();

export class UserService {
  db: NeonHttpDatabase = undefined;

  constructor() {
    const neonSQL = neon(process.env.DATABASE_URL!);
    this.db = drizzle(neonSQL);
  }

  async getUser(email: string): Promise<User> {
    const abcd = (await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)) as User[];

    return abcd[0];
  }
}
