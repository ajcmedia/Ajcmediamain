import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <main className="relative grid min-h-[100svh] items-center overflow-hidden px-[clamp(18px,5vw,70px)] pb-16 pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(61,229,255,0.14),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(255,189,115,0.14),transparent_30%),linear-gradient(180deg,rgba(5,7,11,0.2),rgba(5,7,11,0.94))]" />
        <div className="pointer-events-none absolute inset-x-0 top-[22%] select-none text-center text-[clamp(8rem,22vw,24rem)] font-black leading-none text-white/[0.055]">
          404
        </div>
        <section className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="eyebrow">Frame not found</p>
          <h1 className="text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.92] text-ink">That shot never made the gallery.</h1>
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
