import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import type { SiteContent } from "@/types/site";

const approachCards = [
  {
    number: "01",
    title: "Read the room.",
    copy: "Every event has a rhythm. Jayson moves with it, catching candids, reactions, and small details that make the story believable."
  },
  {
    number: "02",
    title: "Shape the light.",
    copy: "Natural light, venue glow, flash, and color are treated as part of the scene, giving each gallery a vivid cinematic finish."
  },
  {
    number: "03",
    title: "Deliver with care.",
    copy: "Edited previews arrive quickly, with final images organized for sharing, printing, and long-term keepsakes."
  }
];

export function AboutSection({ content }: { content: SiteContent["about"] }) {
  return (
    <section id="about" className="section-pad scroll-mt-24 border-y border-white/10 bg-[linear-gradient(135deg,rgba(61,229,255,0.06),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]">
      <div data-scroll-anchor className="grid items-center gap-[clamp(28px,5vw,68px)] lg:grid-cols-[minmax(0,0.88fr)_minmax(320px,0.62fr)]">
        <Reveal>
          <div>
            <p className="eyebrow">Behind the camera</p>
            <h2 className="section-title max-w-[13ch]">Jayson builds images that feel personal, polished, and alive.</h2>
            <p className="mt-5 max-w-2xl body-copy">
              AJC Media is a Vancouver photography brand for clients who want the emotion of the day preserved with a modern editorial finish. The visual direction is approachable, fast-moving, and premium without losing warmth.
            </p>
            <ButtonLink className="mt-7" href="/#booking" variant="primary">
              Check availability
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="lg:justify-self-end" delay={120}>
          <div className="relative mx-auto w-full max-w-[min(88vw,420px)] overflow-hidden border border-white/15 bg-night shadow-glow lg:mx-0 xl:max-w-[460px]">
            <Image className="h-auto w-full" src={content.portraitImage} alt={content.portraitAlt} width={768} height={1024} sizes="(max-width: 1024px) 88vw, 420px" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5" />
            <div className="absolute bottom-5 left-5 border border-white/15 bg-night/80 px-3.5 py-3 text-sm font-black uppercase text-cyan">
              AJC / Vancouver / Photo
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-[clamp(34px,6vw,78px)] grid gap-5 lg:grid-cols-3">
        {approachCards.map((card, index) => (
          <Reveal key={card.title} delay={index * 90}>
            <article className="h-full border-t border-white/15 pt-6">
              <span className="font-black text-gold">{card.number}</span>
              <h3 className="mt-5 text-[clamp(1.7rem,2.6vw,2.65rem)] font-bold leading-none text-ink">{card.title}</h3>
              <p className="mt-4 body-copy">{card.copy}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
