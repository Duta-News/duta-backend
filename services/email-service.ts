import * as dotenv from "dotenv";

import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

dotenv.config();

export class EmailService {
  mailerSend = undefined;
  sentFrom = undefined;
  recipients = [];

  constructor() {
    this.mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });

    this.sentFrom = new Sender(
      "duta@trial-3yxj6lje1e1gdo2r.mlsender.net",
      "Duta News"
    );
  }

  addReceipient(email: string, name: string) {
    this.recipients.push(new Recipient(email, name));
  }

  sendEmail(subject: string, html: string) {
    const emailParams = new EmailParams()
      .setFrom(this.sentFrom)
      .setTo(this.recipients)
      .setSubject(subject)
      .setHtml(html);

    return this.mailerSend.email.send(emailParams);
  }
}
