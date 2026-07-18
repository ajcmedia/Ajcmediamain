import { NextResponse } from "next/server";
import { deleteBooking, updateBooking } from "@/lib/bookings";
import { DatabaseConfigurationError } from "@/lib/mongodb";
import type { BookingStatus } from "@/types/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const statuses = new Set<BookingStatus>(["new", "in-progress", "completed", "archived"]);

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const payload = (await request.json().catch(() => null)) as { status?: unknown; internalNotes?: unknown } | null;
  if (!payload || typeof payload.status !== "string" || !statuses.has(payload.status as BookingStatus)) {
    return NextResponse.json({ error: "Choose a valid booking status." }, { status: 400 });
  }
  const internalNotes = typeof payload.internalNotes === "string" ? payload.internalNotes.slice(0, 5_000) : "";

  try {
    const booking = await updateBooking(id, payload.status as BookingStatus, internalNotes);
    return booking
      ? NextResponse.json({ booking })
      : NextResponse.json({ error: "Booking request not found." }, { status: 404 });
  } catch (error) {
    return databaseError(error);
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    return (await deleteBooking(id))
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ error: "Booking request not found." }, { status: 404 });
  } catch (error) {
    return databaseError(error);
  }
}

function databaseError(error: unknown) {
  if (error instanceof DatabaseConfigurationError) {
    return NextResponse.json({ error: error.message }, { status: 503 });
  }
  console.error("Booking management error", error);
  return NextResponse.json({ error: "The booking service is temporarily unavailable." }, { status: 500 });
}
