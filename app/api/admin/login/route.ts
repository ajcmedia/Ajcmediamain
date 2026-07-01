import { NextResponse } from "next/server";

const fallbackAdminPassword = "michaelchuabading123";
const adminPassword = process.env.ADMIN_PASSWORD || fallbackAdminPassword;
const adminSessionToken = process.env.ADMIN_SESSION_TOKEN || `ajc-admin-${adminPassword}`;
const adminCookieName = "ajc_admin_session";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as { password?: string };

  if (payload.password !== adminPassword) {
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
