import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <PageShell>
      <main>
        <section className="grid min-h-[86svh] items-center gap-[clamp(30px,6vw,84px)] px-[clamp(18px,5vw,70px)] pb-16 pt-28 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.75fr)]">
          <div>
            <p className="eyebrow">Behind the camera</p>
            <h1 className="max-w-[12ch] text-[clamp(2.45rem,5.8vw,5.85rem)] leading-[0.94] tracking-normal text-ink">Jayson builds images that feel personal, polished, and alive.</h1>
            <p className="mt-6 max-w-2xl body-copy">
              AJC Media is a Vancouver photography brand for clients who want the emotion of the day preserved with a modern editorial finish. The visual direction positions the photographer as approachable, fast-moving, and premium without losing warmth.
            </p>
            <ButtonLink className="mt-7" href="/#booking" variant="primary">
              Check availability
            </ButtonLink>
          </div>
          <div className="relative min-h-[420px] overflow-hidden lg:min-h-[480px]">
            <Image className="h-full w-full object-cover" src="/assets/brand/jayson-photo.jpg" alt="Jayson of AJC Media" fill sizes="(max-width: 1024px) 100vw, 42vw" />
            <div className="absolute bottom-5 left-5 border border-white/15 bg-night/80 px-3.5 py-3 font-black uppercase text-cyan">AJC / Vancouver / Photo</div>
          </div>
        </section>

        <section className="section-pad">
          <div className="eyebrow">Approach</div>
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              ["01", "Read the room.", "Every event has a rhythm. The photographer moves with it, catching candids, reactions, and small details that make the story believable."],
              ["02", "Shape the light.", "Natural light, venue glow, flash, and color are treated as part of the scene, giving each gallery a vivid cinematic finish."],
              ["03", "Deliver with care.", "Edited previews arrive quickly, with final images organized for sharing, printing, and long-term keepsakes."]
            ].map(([number, title, copy]) => (
              <article key={title} className="border-t border-white/15 pt-6">
                <span className="font-black text-gold">{number}</span>
                <h2 className="mt-5 text-[clamp(1.8rem,3vw,3rem)] font-bold leading-none text-ink">{title}</h2>
                <p className="mt-4 body-copy">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-pad grid items-center gap-[clamp(24px,5vw,64px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
          <Image className="aspect-[16/10] h-full w-full object-cover" src="/assets/gallery/rain-engagement.png" alt="Rainy engagement photography sample" width={1000} height={625} />
          <div>
            <div className="eyebrow">Client fit</div>
            <h2 className="section-title">Best for couples, families, and hosts who want photos with real motion.</h2>
            <p className="mt-5 body-copy">The updated website leans into a boutique studio experience: fewer generic promises, stronger visual proof, easier booking, and a portfolio the photographer can refresh without developer help.</p>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
