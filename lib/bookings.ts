import "server-only";

import { randomUUID } from "crypto";
import { getDatabase } from "@/lib/mongodb";
import type { BookingRequest, BookingStatus } from "@/types/site";

type BookingDocument = BookingRequest & { _id: string };
type NewBooking = Pick<BookingRequest, "name" | "email" | "phone" | "type" | "date" | "budget" | "message">;

export async function listBookings(): Promise<BookingRequest[]> {
  const database = await getDatabase();
  const documents = await database.collection<BookingDocument>("bookings").find().sort({ createdAt: -1 }).toArray();
  return documents.map(({ _id: _ignored, ...booking }) => booking);
}

export async function createBooking(payload: NewBooking): Promise<BookingRequest> {
  const database = await getDatabase();
  const now = new Date().toISOString();
  const booking: BookingRequest = {
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone?.trim() || undefined,
    type: payload.type.trim(),
    date: payload.date.trim(),
    budget: payload.budget.trim(),
    message: payload.message.trim(),
    status: "new",
    internalNotes: "",
    emailSent: false
  };

  await database.collection<BookingDocument>("bookings").insertOne({ ...booking, _id: booking.id });
  return booking;
}

export async function markBookingEmailSent(id: string) {
  const database = await getDatabase();
  await database.collection<BookingDocument>("bookings").updateOne(
    { _id: id },
    { $set: { emailSent: true, updatedAt: new Date().toISOString() } }
  );
}

export async function updateBooking(id: string, status: BookingStatus, internalNotes: string): Promise<BookingRequest | null> {
  const database = await getDatabase();
  const result = await database.collection<BookingDocument>("bookings").findOneAndUpdate(
    { _id: id },
    { $set: { status, internalNotes: internalNotes.trim(), updatedAt: new Date().toISOString() } },
    { returnDocument: "after" }
  );
  if (!result) {
    return null;
  }
  const { _id: _ignored, ...booking } = result;
  return booking;
}

export async function deleteBooking(id: string): Promise<boolean> {
  const database = await getDatabase();
  const result = await database.collection<BookingDocument>("bookings").deleteOne({ _id: id });
  return result.deletedCount === 1;
}
