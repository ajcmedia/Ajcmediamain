import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Unauthorized"
};

export default function UnauthorizedPage() {
  return (
    <PageShell footerAdminLabel="Admin login" footerAdminHref="/admin-login">
      <main className="relative grid min-h-[100svh] items-center overflow-hidden px-[clamp(18px,5vw,70px)] pb-16 pt-28">
        <section className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="eyebrow">Access denied</p>
          <h1 className="text-[clamp(2.7rem,8vw,7rem)] font-normal leading-[0.9] text-ink">This space is private.</h1>
          <p className="mx-auto mt-6 max-w-2xl body-copy">
            The admin dashboard is reserved for AJC Media. If you are here to book a session, the public site has the portfolio, packages, and booking request form.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link className="pill-button pill-button-primary" href="/#booking">
              Request a booking
            </Link>
            <Link className="pill-button pill-button-ghost" href="/admin-login">
              Photographer login
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
