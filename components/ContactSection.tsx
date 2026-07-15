import { socials } from "@/data/site";

export function ContactSection() {
  return (
    <section className="section-pad flex flex-col gap-6 border-t border-white/15 lg:flex-row lg:items-center lg:justify-between" id="contact">
      <div data-scroll-anchor>
        <div className="eyebrow">Contact</div>
        <h2 className="section-title">Ready when the next story needs a lens.</h2>
        <p className="mt-4 body-copy">Serving Vancouver, Burnaby, Richmond, Surrey, Coquitlam, and nearby Lower Mainland locations.</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
        <a className="rounded-full border border-white/15 px-4 py-3 text-ink/80 transition hover:border-gold/50 hover:text-ink" href="mailto:hello@ajcmedia.ca">hello@ajcmedia.ca</a>
        <a className="rounded-full border border-white/15 px-4 py-3 text-ink/80 transition hover:border-gold/50 hover:text-ink" href="tel:+16045550188">(604) 555-0188</a>
        <a className="rounded-full border border-white/15 px-4 py-3 text-ink/80 transition hover:border-gold/50 hover:text-ink" href={socials.facebook} target="_blank" rel="noreferrer">Facebook</a>
        <a className="rounded-full border border-white/15 px-4 py-3 text-ink/80 transition hover:border-gold/50 hover:text-ink" href={socials.instagram} target="_blank" rel="noreferrer">Instagram</a>
        <a className="rounded-full border border-white/15 px-4 py-3 text-ink/80 transition hover:border-gold/50 hover:text-ink" href={socials.messenger} target="_blank" rel="noreferrer">Messenger</a>
      </div>
    </section>
  );
}
