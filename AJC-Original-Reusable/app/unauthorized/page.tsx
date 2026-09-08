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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(244,91,105,0.16),transparent_26%),radial-gradient(circle_at_84%_24%,rgba(61,229,255,0.16),transparent_28%),linear-gradient(180deg,rgba(5,7,11,0.2),rgba(5,7,11,0.94))]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(78vw,580px)] w-[min(78vw,580px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/20">
          <div className="absolute inset-[12%] rounded-full border border-dashed border-gold/20" />
          <div className="absolute inset-[30%] rounded-full border border-white/15" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-rose/45 to-transparent" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-cyan/45 to-transparent" />
        </div>

        <section className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="eyebrow">Access denied</p>
          <h1 className="text-[clamp(2.7rem,8vw,7rem)] font-black leading-[0.9] text-ink">This darkroom is locked.</h1>
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
