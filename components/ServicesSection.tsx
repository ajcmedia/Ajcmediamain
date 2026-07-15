"use client";

import { FramedImage } from "@/components/FramedImage";
import { ServiceIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { services } from "@/data/site";

export function ServicesSection() {
  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty("--service-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--service-y", `${y * 100}%`);
    event.currentTarget.style.setProperty("--service-rx", `${(0.5 - y) * 6}deg`);
    event.currentTarget.style.setProperty("--service-ry", `${(x - 0.5) * 8}deg`);
  }

  function resetPerspective(event: React.PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--service-x", "50%");
    event.currentTarget.style.setProperty("--service-y", "50%");
    event.currentTarget.style.setProperty("--service-rx", "0deg");
    event.currentTarget.style.setProperty("--service-ry", "0deg");
  }

  return (
    <section className="service-section section-pad relative isolate overflow-hidden" id="services">
      <div className="service-stage-light pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div data-scroll-anchor>
      <Reveal>
        <div className="eyebrow">Services</div>
      </Reveal>
      <Reveal>
        <div className="section-heading">
        <h2 className="section-title">Coverage built around real moments, not stiff poses.</h2>
        <p className="body-copy">Choose a focused session or a full-day story. This structure is ready for real service pages and CMS-managed packages later.</p>
        </div>
      </Reveal>
      </div>
      <div className="service-deck grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 80}>
            <article
              className="service-card group relative min-h-[390px] overflow-hidden border border-white/15 bg-[rgba(9,15,25,0.78)] shadow-glow"
              data-service={String(index + 1).padStart(2, "0")}
              onPointerMove={handlePointerMove}
              onPointerLeave={resetPerspective}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-night">
                <FramedImage className="transition duration-500 group-hover:scale-[1.025]" src={service.image} alt={`${service.title} photography sample`} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-night/90" />
              <div className="service-card-glint pointer-events-none absolute inset-0 z-10" aria-hidden="true" />
              <div className="absolute left-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cyan/25 bg-cyan/10 text-cyan">
                <ServiceIcon icon={service.icon} />
              </div>
              <span className="absolute right-5 top-5 z-10 font-mono text-xs font-black tracking-[0.18em] text-white/55">{String(index + 1).padStart(2, "0")}</span>
              <div className="relative z-10 -mt-28 p-5 pt-32">
                <h3 className="text-xl font-bold text-ink">{service.title}</h3>
                <p className="mt-3 body-copy">{service.description}</p>
              </div>
              <div className="service-signal absolute inset-x-5 bottom-3 z-20 flex gap-1" aria-hidden="true">
                <i /><i /><i /><i />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
