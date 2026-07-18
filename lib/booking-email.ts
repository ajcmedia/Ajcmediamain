import "server-only";

import nodemailer from "nodemailer";
import type { BookingRequest } from "@/types/site";

export async function sendBookingNotification(booking: BookingRequest): Promise<boolean> {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const to = process.env.BOOKING_EMAIL_TO?.trim();
  if (!user || !pass || !to) {
    return false;
  }

  const port = Number(process.env.SMTP_PORT || "465");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user, pass }
  });

  try {
    await transporter.sendMail({
      from: process.env.BOOKING_EMAIL_FROM?.trim() || `AJC Media Website <${user}>`,
      to,
      replyTo: booking.email,
      subject: `New AJC Media booking request from ${booking.name}`,
      text: [
        `Name: ${booking.name}`,
        `Email: ${booking.email}`,
        `Phone: ${booking.phone || "Not provided"}`,
        `Shoot type: ${booking.type}`,
        `Preferred date: ${booking.date}`,
        `Budget: ${booking.budget}`,
        "",
        booking.message
      ].join("\n"),
      html: `<h1>New booking request</h1><p><strong>Name:</strong> ${escapeHtml(booking.name)}</p><p><strong>Email:</strong> ${escapeHtml(booking.email)}</p><p><strong>Phone:</strong> ${escapeHtml(booking.phone || "Not provided")}</p><p><strong>Shoot type:</strong> ${escapeHtml(booking.type)}</p><p><strong>Preferred date:</strong> ${escapeHtml(booking.date)}</p><p><strong>Budget:</strong> ${escapeHtml(booking.budget)}</p><p><strong>Message:</strong></p><p>${escapeHtml(booking.message).replace(/\n/g, "<br>")}</p>`
    });
    return true;
  } catch (error) {
    console.error("Booking saved, but the notification email could not be sent.", error);
    return false;
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character] || character);
}
