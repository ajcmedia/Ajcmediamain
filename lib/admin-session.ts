export const adminCookieName = "ajc_admin_session";
export const adminSessionMaxAge = 60 * 60 * 8;

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminSessionMaxAge
  };
}
