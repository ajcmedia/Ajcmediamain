import { NextResponse } from "next/server";
import { sendBookingNotification } from "@/lib/booking-email";
import { createBooking, listBookings, markBookingEmailSent } from "@/lib/bookings";
import { DatabaseConfigurationError } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ bookings: await listBookings() });
  } catch (error) {
    return databaseError(error);
  }
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!payload) {
    return NextResponse.json({ error: "Invalid booking request." }, { status: 400 });
  }

  const fields = {
    name: stringValue(payload.name),
    email: stringValue(payload.email),
    phone: stringValue(payload.phone),
    type: stringValue(payload.type),
    date: stringValue(payload.date),
    budget: stringValue(payload.budget),
    message: stringValue(payload.message)
  };

  if (!fields.name || !fields.email || !fields.type || !fields.date || !fields.budget || !fields.message) {
    return NextResponse.json({ error: "Missing required booking fields." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(fields.email) || fields.email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (fields.message.length > 5_000 || Object.values(fields).some((value) => value.length > 5_000)) {
    return NextResponse.json({ error: "Booking request is too long." }, { status: 400 });
  }

  try {
    let booking = await createBooking(fields);
    const emailSent = await sendBookingNotification(booking);
    if (emailSent) {
      await markBookingEmailSent(booking.id);
      booking = { ...booking, emailSent: true };
    }
    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    return databaseError(error);
  }
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function databaseError(error: unknown) {
  if (error instanceof DatabaseConfigurationError) {
    return NextResponse.json({ error: error.message }, { status: 503 });
  }
  console.error("Booking API error", error);
  return NextResponse.json({ error: "The booking service is temporarily unavailable." }, { status: 500 });
}
