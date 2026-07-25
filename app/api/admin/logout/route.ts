import { adminCookieName } from "@/lib/admin-session";
import { noStoreJson } from "@/lib/api-response";

export async function POST() {
  const response = noStoreJson({ ok: true });
  response.cookies.set(adminCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
  return response;
}
