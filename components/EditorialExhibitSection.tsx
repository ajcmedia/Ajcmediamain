"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useRef } from "react";
import { FramedImage } from "@/components/FramedImage";
import { Reveal } from "@/components/Reveal";
import { WebGLAtmosphere } from "@/components/WebGLAtmosphere";

const exhibitFrames = [
  { title: "Reception Dance Energy", image: "/assets/gallery/reception-dance.png" },
  { title: "Waterfront Wedding Glow", image: "/assets/gallery/wedding-waterfront.png" },
  { title: "Studio Family Legacy", image: "/assets/gallery/studio-family.png" },
  { title: "Graduation Day Portraits", image: "/assets/gallery/graduation-family.png" },
  { title: "Rain Street Engagement", image: "/assets/gallery/rain-engagement.png" },
  { title: "Local Brand Content", image: "/assets/gallery/commercial-cafe.png" },
  { title: "Baptism Family Gathering", image: "/assets/gallery/baptism-church.png" },
  { title: "Wedding Detail Flatlay", image: "/assets/gallery/wedding-details.png" }
];

const introWords = "A curated photo wall gives visitors the feeling of stepping inside a private exhibit before they open the full gallery.";

export function EditorialExhibitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ isActive: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let isCancelled = false;

    async function setupMotion() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (isCancelled || !sectionRef.current || !viewportRef.current || !trackRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        const frames = gsap.utils.toArray<HTMLElement>(".exhibit-frame");
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(frames, { autoAlpha: 1, scale: 1, rotateZ: 0 });

        if (window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)").matches) {
          const getDistance = () => {
            if (!trackRef.current || !viewportRef.current) {
              return 0;
            }
            return Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth + 70);
          };

          gsap.set(trackRef.current, { x: 0 });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${getDistance() + window.innerHeight * 0.9}`,
              scrub: 0.85,
              pin: viewportRef.current,
              anticipatePin: 1,
              invalidateOnRefresh: true
            }
          });

          timeline.fromTo(trackRef.current, { x: 0 }, { x: () => -getDistance(), ease: "none" }, 0);
          timeline.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);

          gsap.fromTo(
            frames,
            { autoAlpha: 0, y: 44, rotateZ: -1.2 },
            {
              autoAlpha: 1,
              y: 0,
              rotateZ: 0,
              stagger: 0.08,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 72%"
              }
            }
          );
        } else {
          gsap.fromTo(
            frames,
            { autoAlpha: 0, y: 48, scale: 0.96 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              stagger: 0.08,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 72%"
              }
            }
          );

          gsap.to(progressRef.current, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              end: "bottom 25%",
              scrub: true
            }
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

  function handleRailPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!trackRef.current || window.matchMedia("(min-width: 900px)").matches) {
      return;
    }

    dragRef.current = {
      isActive: true,
      startX: event.clientX,
      scrollLeft: trackRef.current.scrollLeft
    };
    trackRef.current.classList.add("is-dragging");
    trackRef.current.setPointerCapture(event.pointerId);
  }

  function handleRailPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragRef.current.isActive || !trackRef.current) {
      return;
    }

    event.preventDefault();
    const dragDistance = event.clientX - dragRef.current.startX;
    trackRef.current.scrollLeft = dragRef.current.scrollLeft - dragDistance;
  }

  function stopRailDrag(event: PointerEvent<HTMLDivElement>) {
    if (!trackRef.current || !dragRef.current.isActive) {
      return;
    }

    dragRef.current.isActive = false;
    trackRef.current.classList.remove("is-dragging");
    if (trackRef.current.hasPointerCapture(event.pointerId)) {
      trackRef.current.releasePointerCapture(event.pointerId);
    }
  }

  function scrollRailBy(direction: -1 | 1) {
    if (!trackRef.current) {
      return;
    }

    const amount = Math.min(trackRef.current.clientWidth * 0.82, 420);
    trackRef.current.scrollBy({
      left: direction * amount,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  }

  return (
    <section ref={sectionRef} id="editorial" className="editorial-section relative overflow-hidden bg-[#071019] text-ink">
      <WebGLAtmosphere variant="editorial" className="opacity-75 mix-blend-screen" />
      <div className="editorial-scan pointer-events-none absolute inset-0" aria-hidden="true" />
      <div ref={viewportRef} className="editorial-viewport relative flex min-h-[100svh] flex-col justify-start overflow-hidden px-[clamp(18px,5vw,70px)] py-[clamp(58px,8vw,104px)]">
        <p className="absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap text-[0.62rem] font-black uppercase tracking-[0.22em] text-white/35">Archive / scroll to explore</p>
        <div className="pointer-events-none absolute inset-x-0 top-[11%] select-none text-center text-[clamp(4.4rem,16vw,14rem)] font-black uppercase leading-none tracking-normal text-white/[0.035]">
          Archive 26
        </div>

        <div className="relative z-10">
        <Reveal>
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan">Editorial Wall</p>
            <h2 className="editorial-title mt-4 text-[clamp(2.2rem,4.1vw,4.6rem)] font-black leading-[0.94] text-ink">An illuminated archive of real moments.</h2>
            <p className="editorial-copy mt-5 text-bloom text-lg leading-relaxed text-ink/62">
              {introWords.split(" ").map((word, index) => (
                <span key={`${word}-${index}`} style={{ animationDelay: `${index * 45}ms` }}>{word} </span>
              ))}
            </p>
          </div>
        </Reveal>

          <div className="editorial-rule mx-auto mt-10 h-px max-w-6xl bg-white/12">
            <div ref={progressRef} className="h-px w-full bg-gradient-to-r from-cyan via-white to-gold shadow-[0_0_18px_rgba(61,229,255,0.6)]" />
          </div>

          <div className="mt-4 text-center text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/38">
            <span className="editorial-scroll-hint">Vertical scroll drives the horizontal light table / </span><span className="editorial-touch-hint">Drag or swipe frames</span>
          </div>

          <div className="editorial-rail-controls mt-4 flex items-center justify-center gap-3">
            <button
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-xl font-black text-ink shadow-glow backdrop-blur-md"
              type="button"
              aria-label="Previous editorial panel"
              onClick={() => scrollRailBy(-1)}
            >
              ‹
            </button>
            <button
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-xl font-black text-ink shadow-glow backdrop-blur-md"
              type="button"
              aria-label="Next editorial panel"
              onClick={() => scrollRailBy(1)}
            >
              ›
            </button>
          </div>

          <div
            ref={trackRef}
            className="exhibit-rail editorial-rail mt-6 flex snap-x gap-3 overflow-x-auto pb-6 sm:gap-5"
            onPointerDown={handleRailPointerDown}
            onPointerMove={handleRailPointerMove}
            onPointerUp={stopRailDrag}
            onPointerCancel={stopRailDrag}
            onPointerLeave={stopRailDrag}
          >
            {exhibitFrames.map((frame, index) => (
              <figure key={frame.title} className="exhibit-frame group shrink-0 snap-center" style={{ "--frame-index": index } as CSSProperties}>
                <div className="exhibit-frame-image editorial-frame relative aspect-[4/3] overflow-hidden border border-white/15 bg-night shadow-[0_28px_90px_rgba(0,0,0,0.48)]">
                  <FramedImage draggable={false} className="transition duration-700 group-hover:scale-[1.025]" src={frame.image} alt={frame.title} sizes="(max-width: 768px) 78vw, 52vw" />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/62 via-transparent to-black/15" />
                  <div className="film-perforations pointer-events-none absolute inset-x-3 top-2 z-20 h-1.5 opacity-55" aria-hidden="true" />
                  <span className="absolute left-4 top-4 z-20 border border-white/20 bg-black/55 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-cyan backdrop-blur-md">Frame {String(index + 1).padStart(2, "0")}</span>
                  <span className="absolute bottom-4 right-4 z-20 text-[0.58rem] font-black uppercase tracking-[0.2em] text-white/55">AJC / 2026</span>
                </div>
                <figcaption className="mt-3 flex items-center justify-between gap-4 border-t border-white/15 pt-3 text-sm font-black uppercase tracking-[0.12em] text-white/65">
                  <span>{frame.title}</span>
                  <span className="text-gold">Selected</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
