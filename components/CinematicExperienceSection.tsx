"use client";

import { useEffect, useRef, useState } from "react";
import { FramedImage } from "@/components/FramedImage";

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
  const desktopStageRef = useRef<HTMLDivElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const activeSceneRef = useRef(0);

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let mediaContext: { add: (conditions: string, callback: () => void | (() => void)) => void; revert: () => void } | undefined;
    let isCancelled = false;

    async function setupMotion() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (isCancelled || !sectionRef.current || !desktopStageRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        mediaContext = gsap.matchMedia();
        mediaContext.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
          const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * 3.2, 2200)}`,
            pin: desktopStageRef.current,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const nextScene = Math.min(scenes.length - 1, Math.floor(self.progress * scenes.length));
              if (nextScene !== activeSceneRef.current) {
                activeSceneRef.current = nextScene;
                setActiveScene(nextScene);
              }
              sectionRef.current?.style.setProperty("--reel-progress", `${Math.max(0.02, self.progress)}`);
              const sceneProgress = self.progress * scenes.length - nextScene;
              sectionRef.current?.style.setProperty("--scene-progress", `${Math.max(0, Math.min(1, sceneProgress))}`);
            }
          });

          return () => trigger.kill();
        });
      }, sectionRef);

      ScrollTrigger.refresh();
    }

    setupMotion();

    return () => {
      isCancelled = true;
      mediaContext?.revert();
      context?.revert();
    };
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 899px)");
    const syncMobileRail = () => {
      if (!mobileQuery.matches) {
        return;
      }
      window.requestAnimationFrame(() => {
        if (mobileRailRef.current) {
          mobileRailRef.current.scrollLeft = 0;
        }
        activeSceneRef.current = 0;
        setActiveScene(0);
      });
    };

    mobileQuery.addEventListener("change", syncMobileRail);
    syncMobileRail();
    return () => mobileQuery.removeEventListener("change", syncMobileRail);
  }, []);

  function handleMobileScroll() {
    const rail = mobileRailRef.current;
    if (!rail) {
      return;
    }

    const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-reel-card]"));
    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - railCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    if (nearestIndex !== activeSceneRef.current) {
      activeSceneRef.current = nearestIndex;
      setActiveScene(nearestIndex);
    }
  }

  function focusMobileScene(index: number) {
    const rail = mobileRailRef.current;
    const card = rail?.querySelector<HTMLElement>(`[data-reel-card="${index}"]`);
    if (!rail || !card) {
      return;
    }

    rail.scrollTo({
      left: card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  }

  return (
    <section ref={sectionRef} id="experience" className="experience-reel relative overflow-hidden bg-night text-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(61,229,255,0.15),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(255,189,115,0.12),transparent_28%),linear-gradient(180deg,#07111a,#05070b_72%)]" />
      <div className="reel-grid pointer-events-none absolute inset-0 opacity-35" />

      <div ref={desktopStageRef} className="reel-desktop relative z-10 min-h-[100svh] px-[clamp(34px,5vw,70px)] py-[clamp(78px,8svh,104px)]">
        <div className="pointer-events-none absolute right-[3vw] top-[7svh] select-none font-mono text-[clamp(6rem,15vw,14rem)] font-black leading-none text-white/[0.025]" aria-hidden="true">
          {String(activeScene + 1).padStart(2, "0")}
        </div>
        <div className="grid min-h-[calc(100svh-clamp(156px,16svh,208px))] grid-cols-[minmax(320px,0.76fr)_minmax(480px,1.12fr)] items-center gap-[clamp(42px,6vw,92px)]">
          <div className="flex min-h-0 flex-col justify-center" data-scroll-anchor>
            <p className="eyebrow">Experience Reel</p>
            <h2 className="max-w-[10ch] text-[clamp(2.8rem,4.4vw,5.1rem)] font-black leading-[0.91] tracking-normal text-ink">
              Feel the day before you book it.
            </h2>
            <p className="mt-5 max-w-[560px] text-[clamp(1rem,1.2vw,1.16rem)] leading-relaxed text-ink/68">
              A four-scene cut from quiet detail to final delivery. Scroll at your own pace; every beat has room to land.
            </p>

            <div className="reel-chapter-list mt-[clamp(24px,4vh,42px)] border-l border-white/15">
              {scenes.map((scene, index) => (
                <button
                  key={scene.label}
                  className="reel-chapter block w-full border-l-2 border-transparent py-2.5 pl-5 text-left"
                  type="button"
                  data-active={activeScene === index}
                  onClick={() => {
                    activeSceneRef.current = index;
                    setActiveScene(index);
                  }}
                  aria-current={activeScene === index ? "step" : undefined}
                >
                  <span className="flex items-center gap-3 text-[0.64rem] font-black uppercase tracking-[0.18em] text-white/35">
                    <span className="reel-chapter-dot h-1.5 w-1.5 rounded-full bg-white/25" /> {scene.label}
                  </span>
                  <span className="mt-1 block text-[clamp(1.1rem,1.55vw,1.75rem)] font-black leading-none text-white/32 transition">{scene.title}</span>
                  <span className="reel-chapter-copy mt-2 block max-w-[520px] overflow-hidden text-sm leading-relaxed text-muted">{scene.copy}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/3] w-full max-w-[860px]">
            <div className="reel-orbit absolute -inset-[9%] rounded-[48%] border border-cyan/15" aria-hidden="true" />
            <div className="reel-orbit reel-orbit-secondary absolute -inset-[3%] rounded-[46%] border border-dashed border-gold/20" aria-hidden="true" />
            <div className="absolute inset-0 overflow-hidden border border-white/15 bg-black shadow-[0_0_110px_rgba(61,229,255,0.15)]">
              {scenes.map((scene, index) => (
                <div key={scene.title} className="reel-frame absolute inset-0" data-active={activeScene === index} aria-hidden={activeScene !== index}>
                  <FramedImage src={scene.image} alt={scene.title} sizes="(max-width: 1280px) 56vw, 860px" />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/68 via-transparent to-black/20" />
                  <div className="absolute bottom-7 left-7 z-20 max-w-md">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">Now viewing / {scene.label}</p>
                    <p className="mt-2 text-[clamp(1.35rem,2vw,2.4rem)] font-black leading-none text-ink">{scene.title}</p>
                  </div>
                </div>
              ))}
              <div className="pointer-events-none absolute inset-5 z-30 border border-cyan/38" />
              <div className="reel-shutter-line pointer-events-none absolute inset-y-0 left-0 z-30 w-px bg-cyan/70 shadow-[0_0_24px_rgba(61,229,255,0.9)]" />
              <div className="pointer-events-none absolute left-5 top-5 z-30 h-10 w-10 border-l-2 border-t-2 border-gold" />
              <div className="pointer-events-none absolute bottom-5 right-5 z-30 h-10 w-10 border-b-2 border-r-2 border-gold" />
              <div className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/15">
                <div className="reel-scroll-progress h-px origin-left bg-cyan shadow-[0_0_20px_rgba(61,229,255,0.9)]" />
              </div>
            </div>
            <span className="absolute -right-8 top-1/2 -translate-y-1/2 rotate-90 text-[0.62rem] font-black uppercase tracking-[0.22em] text-cyan/65">
              Scroll to cut
            </span>
          </div>
        </div>
      </div>

      <div className="reel-mobile relative z-10 px-[clamp(18px,5vw,44px)] py-[clamp(64px,9vw,92px)]" data-scroll-anchor>
        <p className="eyebrow">Experience Reel</p>
        <h2 className="max-w-[11ch] text-[clamp(2.4rem,10vw,4.5rem)] font-black leading-[0.92] tracking-normal text-ink">
          Feel the day before you book it.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/68">
          Swipe through four moments. On touch screens, the story stays in your hands instead of being tied to the page scroll.
        </p>

        <div className="mt-7 flex items-center justify-between border-y border-white/10 py-3 text-xs font-black uppercase tracking-[0.16em] text-white/45">
          <span>Swipe scenes</span>
          <span className="text-cyan">{String(activeScene + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</span>
        </div>

        <div
          ref={mobileRailRef}
          className="reel-mobile-rail -mx-[clamp(18px,5vw,44px)] mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(18px,5vw,44px)] pb-5"
          onScroll={handleMobileScroll}
        >
          {scenes.map((scene, index) => (
            <article key={scene.label} data-reel-card={index} className="w-[84vw] max-w-[440px] shrink-0 snap-center overflow-hidden border border-white/15 bg-white/[0.035] shadow-glow">
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <FramedImage src={scene.image} alt={scene.title} sizes="(max-width: 1023px) 84vw, 440px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/64 via-transparent to-black/10" />
                <span className="absolute left-4 top-4 border border-cyan/35 bg-night/75 px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.16em] text-cyan backdrop-blur-md">
                  {scene.label}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-[clamp(1.55rem,7vw,2.2rem)] font-black leading-none text-ink">{scene.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{scene.copy}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-2 flex justify-center gap-2" aria-label="Choose experience reel scene">
          {scenes.map((scene, index) => (
            <button
              key={scene.label}
              className={`h-2.5 rounded-full transition-all ${activeScene === index ? "w-9 bg-cyan" : "w-2.5 bg-white/20"}`}
              type="button"
              onClick={() => focusMobileScene(index)}
              aria-label={`Show ${scene.title}`}
              aria-current={activeScene === index ? "step" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
