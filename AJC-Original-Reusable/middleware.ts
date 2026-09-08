import { NextResponse, type NextRequest } from "next/server";
import { adminCookieName, getAdminCookieOptions } from "@/lib/admin-session";
import { createRequestId, noStoreHeaders, noStoreJson } from "@/lib/api-response";

const adminSessionToken = process.env.ADMIN_SESSION_TOKEN;

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/about") {
    const aboutUrl = new URL("/", request.url);
    aboutUrl.hash = "about";
    return NextResponse.redirect(aboutUrl);
  }

  const adminAuthRequired = requiresAdminAuth(request);
  const requestId = createRequestId();

  if (adminAuthRequired && !hasValidAdminAuth(request)) {
    if (request.nextUrl.pathname.startsWith("/api")) {
      return noStoreJson(
        {
          error: "Your admin session expired. Sign in again to continue without losing the current draft.",
          code: "ADMIN_SESSION_REQUIRED",
          requestId
        },
        {
          status: 401,
          headers: { "X-AJC-Request-Id": requestId }
        }
      );
    }

    const loginUrl = new URL("/admin-login", request.url);
    loginUrl.searchParams.set("reason", "session-expired");
    return NextResponse.redirect(loginUrl);
  }

  const forwardedHeaders = new Headers(request.headers);
  if (adminAuthRequired) {
    forwardedHeaders.set("X-AJC-Request-Id", requestId);
  }
  const response = NextResponse.next({
    request: { headers: forwardedHeaders }
  });

  response.headers.set("x-ajc-route", request.nextUrl.pathname);
  if (adminAuthRequired) {
    response.headers.set("X-AJC-Request-Id", requestId);
    Object.entries(noStoreHeaders).forEach(([name, value]) => response.headers.set(name, value));

    if (adminSessionToken && request.nextUrl.pathname !== "/api/admin/logout") {
      response.cookies.set(adminCookieName, adminSessionToken, getAdminCookieOptions());
    }
  }
  return response;
}

function requiresAdminAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin/login")) {
    return false;
  }

  if (pathname.startsWith("/api/admin/session")) {
    return true;
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return true;
  }

  if (pathname.startsWith("/api/bookings")) {
    return request.method !== "POST";
  }

  if (pathname.startsWith("/api/projects")) {
    return request.method !== "GET";
  }

  if (pathname.startsWith("/api/site-content")) {
    return request.method !== "GET";
  }

  if (pathname.startsWith("/api/media")) {
    return request.method !== "GET";
  }

  if (pathname.startsWith("/api/admin/logout")) {
    return true;
  }

  return false;
}

function hasValidAdminAuth(request: NextRequest) {
  return Boolean(adminSessionToken) && request.cookies.get(adminCookieName)?.value === adminSessionToken;
}

export const config = {
  matcher: ["/about", "/admin/:path*", "/api/:path*"]
};
