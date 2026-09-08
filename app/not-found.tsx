import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <main className="relative grid min-h-[100svh] items-center overflow-hidden px-[clamp(18px,5vw,70px)] pb-16 pt-28">
        <section className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="eyebrow">Frame not found</p>
          <h1 className="text-[clamp(2.5rem,7vw,6.5rem)] font-normal leading-[0.92] text-ink">That shot never made the gallery.</h1>
          <p className="mx-auto mt-6 max-w-2xl body-copy">
            The page may have moved, or the link may be out of focus. Head back to the portfolio and keep exploring the finished frames.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link className="pill-button pill-button-primary" href="/">
              Back home
            </Link>
            <Link className="pill-button pill-button-ghost" href="/#gallery">
              View gallery
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
