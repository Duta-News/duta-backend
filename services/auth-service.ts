import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

import { EmailService } from "./email-service";
import { neon } from "@neondatabase/serverless";
import { NeonHttpDatabase, drizzle } from "drizzle-orm/neon-http";
import { userVerifications } from "../schema/user-verification";

import { createHash } from "crypto";
import { and, desc, eq, lte } from "drizzle-orm";

dotenv.config();

export class AuthService {
  db: NeonHttpDatabase = undefined;

  constructor() {
    const neonSQL = neon(process.env.DATABASE_URL!);
    this.db = drizzle(neonSQL);
  }

  sendSignupVerificationEmail() {}
  sendPasswordResetEmail(email: string, name, otp: string) {
    let htmlTemplate = fs
      .readFileSync(
        path.join(__dirname, "../templates/email/password-reset.html")
      )
      .toString();
    htmlTemplate = htmlTemplate.replace("{{OTP}}", otp);

    const emailService = new EmailService();
    emailService.addReceipient(email, name);
    const response = emailService.sendEmail(
      "Verify your account from Duta",
      htmlTemplate
    );

    return response;
  }

  async createOTP(email: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const response = await this.db.insert(userVerifications).values({
      email: email,
      otp: createHash("sha256").update(otp).digest("hex"),
    });

    return otp;
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    const unverifiedOTP = await this.db
      .select()
      .from(userVerifications)
      .where(
        and(
          eq(userVerifications.email, email),
          eq(userVerifications.status, "pending")
        )
      )
      .orderBy(desc(userVerifications.createdAt))
      .limit(1);

    const row = unverifiedOTP[0];

    if (new Date(row.createdAt).getTime() < new Date().getTime() - 600000) {
      return false;
    }

    const hashedOTP = createHash("sha256").update(otp).digest("hex");

    if (hashedOTP === row.otp) {
      await this.db
        .update(userVerifications)
        .set({ status: "verified" })
        .where(eq(userVerifications.email, email));

      return true;
    }

    return false;
  }

  sendSignupPhoneVerification() {}
  sendLoginPhoneVerification() {}
}
