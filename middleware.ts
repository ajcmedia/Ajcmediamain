import { NextResponse, type NextRequest } from "next/server";

const adminSessionToken = process.env.ADMIN_SESSION_TOKEN;
const adminCookieName = "ajc_admin_session";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/about") {
    const aboutUrl = new URL("/", request.url);
    aboutUrl.hash = "about";
    return NextResponse.redirect(aboutUrl);
  }

  if (requiresAdminAuth(request) && !hasValidAdminAuth(request)) {
    if (request.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  const response = NextResponse.next();

  response.headers.set("x-ajc-route", request.nextUrl.pathname);
  return response;
}

function requiresAdminAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin/login")) {
    return false;
  }

  if (pathname.startsWith("/admin")) {
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
