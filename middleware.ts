import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("x-ajc-route", request.nextUrl.pathname);

  // Future production hook:
  // Protect /admin with auth here, for example NextAuth, Clerk, or custom session cookies.
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"]
};
