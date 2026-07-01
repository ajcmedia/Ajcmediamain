import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function FeaturedStorySection() {
  return (
    <section className="section-pad border-y border-white/10 bg-[linear-gradient(135deg,rgba(61,229,255,0.06),transparent_35%),linear-gradient(315deg,rgba(255,189,115,0.07),transparent_42%)]">
      <Reveal>
        <div className="section-heading">
          <div>
            <div className="eyebrow">Featured Story</div>
            <h2 className="section-title">One wedding day, told like a cinematic magazine spread.</h2>
          </div>
          <p className="body-copy">This section shows how a client gallery can feel more like an editorial story than a folder of loose images.</p>
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <article className="group relative min-h-[520px] overflow-hidden border border-white/15 bg-night shadow-glow">
            <Image className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" src="/assets/gallery/reception-dance.png" alt="Wedding reception dance floor" fill sizes="(max-width: 1024px) 100vw, 58vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/15 to-transparent" />
            <div className="absolute bottom-0 max-w-2xl p-7">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-gold">Chapter 03 / Reception</p>
              <h3 className="mt-3 text-[clamp(2rem,4vw,4.3rem)] font-black leading-none text-ink">Energy after the vows.</h3>
              <p className="mt-4 body-copy">Fast movement, changing light, and real reactions captured without losing the atmosphere of the room.</p>
            </div>
          </article>
        </Reveal>

        <div className="grid gap-5">
          <Reveal delay={80}>
            <StoryCard image="/assets/gallery/wedding-details.png" title="Details before the aisle" />
          </Reveal>
          <Reveal delay={150}>
            <StoryCard image="/assets/gallery/wedding-waterfront.png" title="Portraits with place" />
          </Reveal>
          <Reveal delay={220}>
            <StoryCard image="/assets/gallery/forest-engagement.png" title="Quiet frames between the big ones" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StoryCard({ image, title }: { image: string; title: string }) {
  return (
    <article className="group grid gap-4 border border-white/15 bg-white/[0.035] p-4 sm:grid-cols-[0.9fr_1fr]">
      <div className="relative min-h-[170px] overflow-hidden bg-night">
        <Image className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 24vw" />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan">Story frame</p>
        <h3 className="mt-2 text-2xl font-bold leading-tight text-ink">{title}</h3>
        <p className="mt-3 body-copy">A curated moment that helps the gallery feel intentional, not generic.</p>
      </div>
    </article>
  );
}
