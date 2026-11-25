import nodemailer from "nodemailer";
import { BOOK } from "./event";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  return transporter.sendMail({
    // Update this so emails come from "The Silent Echo Launch" instead of the couple's names
    from: `"${BOOK.title} Launch" <${process.env.GMAIL_USER}>`,
    to: opts.to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
  });
}