import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

const adminCookieName = "ajc_admin_session";

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSessionToken = process.env.ADMIN_SESSION_TOKEN;
  if (!adminPassword || !adminSessionToken) {
    return NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });
  }

  const payload = (await request.json().catch(() => ({}))) as { password?: string };
  if (!safeEqual(payload.password || "", adminPassword)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, adminSessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
  return response;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}
