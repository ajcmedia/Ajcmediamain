import { timingSafeEqual } from "crypto";
import { adminCookieName, getAdminCookieOptions } from "@/lib/admin-session";
import { createRequestId, noStoreJson } from "@/lib/api-response";

export async function POST(request: Request) {
  const requestId = createRequestId();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSessionToken = process.env.ADMIN_SESSION_TOKEN;
  if (!adminPassword || !adminSessionToken) {
    return noStoreJson(
      { error: "Admin access is not configured.", requestId },
      { status: 503, headers: { "X-AJC-Request-Id": requestId } }
    );
  }

  const payload = (await request.json().catch(() => ({}))) as { password?: string };
  if (!safeEqual(payload.password || "", adminPassword)) {
    return noStoreJson(
      { error: "Invalid password.", requestId },
      { status: 401, headers: { "X-AJC-Request-Id": requestId } }
    );
  }

  const response = noStoreJson(
    { ok: true, requestId },
    { headers: { "X-AJC-Request-Id": requestId } }
  );
  response.cookies.set(adminCookieName, adminSessionToken, getAdminCookieOptions());
  return response;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}
