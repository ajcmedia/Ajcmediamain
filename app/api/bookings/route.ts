import { NextResponse } from "next/server";
import { createId, memoryStore } from "@/lib/api-placeholders";
import type { BookingRequest } from "@/types/site";

export async function GET() {
  return NextResponse.json({ bookings: memoryStore.bookings });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Omit<BookingRequest, "id" | "createdAt">;
  const requiredFields = [payload.name, payload.email, payload.type, payload.date, payload.budget, payload.message];

  if (requiredFields.some((field) => !field?.trim())) {
    return NextResponse.json({ error: "Missing required booking fields." }, { status: 400 });
  }

  const booking: BookingRequest = {
    id: createId("booking"),
    createdAt: new Date().toISOString(),
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    type: payload.type,
    date: payload.date,
    budget: payload.budget,
    message: payload.message
  };

  // Temporary live bridge: this keeps the API contract ready while MongoDB
  // and email delivery credentials are still pending.
  memoryStore.bookings.unshift(booking);
  return NextResponse.json({ booking }, { status: 201 });
}
