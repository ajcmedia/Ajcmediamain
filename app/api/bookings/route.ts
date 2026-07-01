import { NextResponse } from "next/server";
import { createId, memoryStore } from "@/lib/api-placeholders";
import type { BookingRequest } from "@/types/site";

export async function GET() {
  return NextResponse.json({ bookings: memoryStore.bookings });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Omit<BookingRequest, "id" | "createdAt">;
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

  memoryStore.bookings.unshift(booking);
  return NextResponse.json({ booking }, { status: 201 });
}
