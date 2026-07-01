"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const scenes = [
  {
    label: "Scene 01",
    title: "The anticipation",
    copy: "Soft details, quiet nerves, and the first frames that set the emotional tone.",
    image: "/assets/gallery/wedding-details.png"
  },
  {
    label: "Scene 02",
    title: "The moment opens",
    copy: "Movement, reactions, and the real atmosphere of the day captured without feeling staged.",
    image: "/assets/gallery/wedding-waterfront.png"
  },
  {
    label: "Scene 03",
    title: "The room comes alive",
    copy: "Color, music, candlelight, family energy, and the images that make the night feel vivid again.",
    image: "/assets/gallery/reception-dance.png"
  },
  {
    label: "Scene 04",
    title: "The final gallery",
    copy: "A polished story delivered as a complete visual memory, from raw light to finished emotion.",
    image: "/assets/gallery/rain-engagement.png"
  }
];

export function CinematicExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let isCancelled = false;

    async function setupMotion() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (isCancelled || !sectionRef.current || !pinRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        const frames = gsap.utils.toArray<HTMLElement>(".reel-frame");
        const steps = gsap.utils.toArray<HTMLElement>(".reel-step");
        const labels = gsap.utils.toArray<HTMLElement>(".reel-timeline-label");

        gsap.set(frames, { autoAlpha: 0, scale: 1.1, yPercent: 5 });
        gsap.set(frames[0], { autoAlpha: 1, scale: 1, yPercent: 0 });
        gsap.set(steps, { autoAlpha: 0.34, x: 18 });
        gsap.set(steps[0], { autoAlpha: 1, x: 0 });
        gsap.set(labels, { autoAlpha: 0.4 });
        gsap.set(labels[0], { autoAlpha: 1 });
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });

        if (window.matchMedia("(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)").matches) {
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 3.2}`,
              pin: pinRef.current,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true
            }
          });

          timeline.to(progressRef.current, { scaleX: 1, duration: scenes.length - 1 }, 0);

          scenes.forEach((_, index) => {
            timeline.to(steps, { autoAlpha: 0.28, x: 18, duration: 0.18 }, index);
            timeline.to(labels, { autoAlpha: 0.4, duration: 0.18 }, index);
            timeline.to(steps[index], { autoAlpha: 1, x: 0, duration: 0.18 }, index);
            timeline.to(labels[index], { autoAlpha: 1, duration: 0.18 }, index);

            if (index > 0) {
              timeline.to(frames[index - 1], { autoAlpha: 0, scale: 0.96, yPercent: -4, duration: 0.34 }, index - 0.04);
              timeline.fromTo(
                frames[index],
                { autoAlpha: 0, scale: 1.1, yPercent: 6 },
                { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.44 },
                index
              );
            }
          });
        } else {
          const mobileTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.35 });
          gsap.set(frames[0], { autoAlpha: 1, scale: 1, yPercent: 0 });

          scenes.forEach((_, index) => {
            mobileTimeline.to(steps, { autoAlpha: 0.32, x: 12, duration: 0.28 }, index * 2.65);
            mobileTimeline.to(labels, { autoAlpha: 0.4, duration: 0.28 }, index * 2.65);
            mobileTimeline.to(frames, { autoAlpha: 0, scale: 1.05, duration: 0.32 }, index * 2.65);
            mobileTimeline.to(steps[index], { autoAlpha: 1, x: 0, duration: 0.34 }, index * 2.65);
            mobileTimeline.to(labels[index], { autoAlpha: 1, duration: 0.34 }, index * 2.65);
            mobileTimeline.to(frames[index], { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.55, ease: "power2.out" }, index * 2.65);
          });

          gsap.to(progressRef.current, {
            scaleX: 1,
            duration: scenes.length * 2.65,
            ease: "none",
            repeat: -1
          });
        }
      }, sectionRef);

      ScrollTrigger.refresh();
    }

    setupMotion();

    return () => {
      isCancelled = true;
      context?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-night text-ink">
      <div ref={pinRef} className="relative min-h-[100svh] px-[clamp(18px,5vw,70px)] pb-[clamp(34px,5svh,72px)] pt-[clamp(82px,10svh,116px)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(61,229,255,0.16),transparent_28%),radial-gradient(circle_at_86%_16%,rgba(255,189,115,0.13),transparent_30%),linear-gradient(180deg,rgba(5,7,11,0.18),rgba(5,7,11,0.94))]" />
        <div className="relative z-10 grid min-h-0 items-center gap-[clamp(18px,4vw,48px)] sm:min-h-[calc(100svh-188px)] lg:grid-cols-[minmax(0,0.78fr)_minmax(380px,0.92fr)] lg:grid-rows-[auto_minmax(0,1fr)]">
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            <p className="eyebrow">Experience Reel</p>
            <h2 className="max-w-[11ch] text-[clamp(2rem,4.9vw,5.2rem)] font-black leading-[0.9] tracking-normal text-ink">
              Feel the day before you book it.
            </h2>
            <p className="mt-4 max-w-xl text-[clamp(0.92rem,1.25vw,1.12rem)] leading-relaxed text-ink/72">
              A visitor should not only see photos. They should feel the rhythm of a real event becoming a polished gallery.
            </p>
          </div>

          <div className="order-3 hidden gap-2.5 sm:grid lg:col-start-1 lg:row-start-2 lg:max-h-[calc(100svh-430px)] lg:content-start lg:overflow-hidden">
            <div className="mt-5 grid gap-2.5">
              {scenes.map((scene) => (
                <article key={scene.label} className="reel-step border-l border-white/15 pl-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-gold">{scene.label}</p>
                  <h3 className="mt-1 text-[clamp(1.16rem,1.8vw,1.72rem)] font-black leading-tight text-ink">{scene.title}</h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">{scene.copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="order-2 relative h-[min(45svh,360px)] min-h-[260px] min-[430px]:min-h-[330px] sm:h-[min(52svh,430px)] sm:min-h-[500px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[min(62svh,600px)] lg:min-h-[390px]">
            <div className="absolute inset-0 rounded-[999px] border border-cyan/15" aria-hidden="true" />
            <div className="absolute inset-[7%] rounded-[999px] border border-dashed border-gold/20" aria-hidden="true" />
            <div className="absolute inset-[11%] overflow-hidden border border-white/15 bg-black shadow-[0_0_90px_rgba(61,229,255,0.16)]">
              {scenes.map((scene) => (
                <div key={scene.title} className="reel-frame absolute inset-0">
                  <Image className="h-full w-full object-cover" src={scene.image} alt={scene.title} fill sizes="(max-width: 1024px) 88vw, 44vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />
                  <div className="absolute bottom-14 left-5 right-5 hidden sm:block">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-gold">{scene.label}</p>
                    <h3 className="mt-1 max-w-sm text-[clamp(1.25rem,4.8vw,2.4rem)] font-black leading-none text-ink">{scene.title}</h3>
                  </div>
                </div>
              ))}
              <div className="pointer-events-none absolute inset-5 border border-cyan/45" />
              <div className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l-2 border-t-2 border-gold" />
              <div className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b-2 border-r-2 border-gold" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="h-px bg-white/20">
                  <div ref={progressRef} className="h-px w-full bg-cyan shadow-[0_0_18px_rgba(61,229,255,0.8)]" />
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2 text-[0.62rem] font-black uppercase tracking-[0.14em] text-white/55">
                  {scenes.map((scene) => (
                    <span key={scene.label} className="reel-timeline-label">{scene.label.replace("Scene ", "")}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -right-2 top-[18%] hidden rotate-90 text-xs font-black uppercase tracking-[0.2em] text-cyan/75 sm:block">
              Scroll edit
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
