import type { Metadata } from "next";
import Link from "next/link";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Admin Login"
};

export default function AdminLoginPage() {
  return (
    <PageShell footerAdminLabel="Public site" footerAdminHref="/">
      <main className="relative grid min-h-[100svh] items-center overflow-hidden px-[clamp(18px,5vw,70px)] pb-16 pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(61,229,255,0.14),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(255,189,115,0.13),transparent_28%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.7fr)]">
          <section>
            <p className="eyebrow">Private darkroom</p>
            <h1 className="section-title max-w-[11ch]">Admin access for AJC Media only.</h1>
            <p className="mt-5 max-w-xl body-copy">
              Enter the studio password to manage booking requests and portfolio updates. Public visitors can head back to the main gallery.
            </p>
            <Link className="pill-button pill-button-ghost mt-7" href="/">
              Back to public site
            </Link>
          </section>
          <AdminLoginForm />
        </div>
      </main>
    </PageShell>
  );
}
