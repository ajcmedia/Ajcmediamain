"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FramedImage } from "@/components/FramedImage";
import { PortalWarpCanvas } from "@/components/PortalWarpCanvas";
import { Reveal } from "@/components/Reveal";
import { WebGLAtmosphere } from "@/components/WebGLAtmosphere";

const portals = [
  {
    title: "Wedding",
    label: "Vows, dance floors, details",
    image: "/assets/gallery/wedding-waterfront.png",
    href: "/#gallery",
    color: "cyan",
    filter: "Wedding"
  },
  {
    title: "Events",
    label: "Birthdays, baptisms, showers",
    image: "/assets/gallery/birthday-candles.png",
    href: "/#gallery",
    color: "gold",
    filter: "Event"
  },
  {
    title: "Portraits",
    label: "Families, grads, branding",
    image: "/assets/gallery/neon-portrait.png",
    href: "/#gallery",
    color: "rose",
    filter: "Portrait"
  }
];

export function ExhibitPortalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const warpTimersRef = useRef<number[]>([]);
  const [hoveredPortal, setHoveredPortal] = useState<number | null>(null);
  const [warpPortal, setWarpPortal] = useState<number | null>(null);
  const [warpPhase, setWarpPhase] = useState<"idle" | "enter" | "exit">("idle");

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let isCancelled = false;

    async function setupMotion() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (isCancelled || !sectionRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".portal-card");
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 72, rotateX: -9, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            stagger: 0.13,
            duration: 0.9,
            ease: "power4.out",
            clearProps: "opacity,visibility,transform",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%"
            }
          }
        );
      }, sectionRef);

      ScrollTrigger.refresh();
    }

    setupMotion();

    return () => {
      isCancelled = true;
      context?.revert();
      warpTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      document.body.classList.remove("portal-warp-lock");
    };
  }, []);

  function enterPortal(event: React.MouseEvent<HTMLAnchorElement>, index: number) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    if (warpPhase !== "idle") {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      window.dispatchEvent(new CustomEvent("ajc:portal-navigate", { detail: { hash: "#gallery", category: portals[index].filter } }));
      return;
    }

    setWarpPortal(index);
    setWarpPhase("enter");
    document.body.classList.add("portal-warp-lock");

    const navigateTimer = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("ajc:portal-navigate", { detail: { hash: "#gallery", category: portals[index].filter } }));
      setWarpPhase("exit");
    }, 1050);
    const finishTimer = window.setTimeout(() => {
      setWarpPhase("idle");
      setWarpPortal(null);
      document.body.classList.remove("portal-warp-lock");
    }, 1850);
    warpTimersRef.current.push(navigateTimer, finishTimer);
  }

  function handleCardPointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty("--card-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--card-y", `${y * 100}%`);
    event.currentTarget.style.setProperty("--card-rx", `${(0.5 - y) * 5}deg`);
    event.currentTarget.style.setProperty("--card-ry", `${(x - 0.5) * 7}deg`);
  }

  function resetCardPerspective(event: React.PointerEvent<HTMLAnchorElement>) {
    event.currentTarget.style.setProperty("--card-x", "50%");
    event.currentTarget.style.setProperty("--card-y", "50%");
    event.currentTarget.style.setProperty("--card-rx", "0deg");
    event.currentTarget.style.setProperty("--card-ry", "0deg");
  }

  return (
    <section ref={sectionRef} id="portals" className="portal-section relative overflow-hidden bg-black px-[clamp(18px,5vw,70px)] py-[clamp(70px,9vw,122px)]">
      <WebGLAtmosphere variant="portal" className="opacity-90 mix-blend-screen" />
      <div className="portal-field pointer-events-none absolute inset-0" />
      <div className="portal-stars pointer-events-none absolute inset-0" aria-hidden="true" />

      <Reveal>
        <div className="relative z-10 mx-auto max-w-3xl text-center" data-scroll-anchor>
          <p className="eyebrow">Gallery Portals</p>
          <h2 className="text-[clamp(2.25rem,4.7vw,5.2rem)] font-black leading-[0.92] text-ink">Choose a story. Step through the frame.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[clamp(0.98rem,1.3vw,1.16rem)] leading-relaxed text-ink/68">
            Each portal opens the same gallery from a different emotional doorway—celebration, connection, or character.
          </p>
        </div>
      </Reveal>

      <div className="relative z-10 mx-auto mt-[clamp(38px,6vw,72px)] grid max-w-6xl gap-5 perspective-1000 md:grid-cols-3">
        {portals.map((portal, index) => (
          <Reveal key={portal.title} delay={index * 100}>
            <Link
              className="portal-card group relative block aspect-[4/5] overflow-hidden border border-white/15 bg-night shadow-glow"
              data-color={portal.color}
              data-portal-link
              href={portal.href}
              onClick={(event) => enterPortal(event, index)}
              onPointerEnter={() => setHoveredPortal(index)}
              onPointerMove={handleCardPointerMove}
              onPointerLeave={(event) => {
                setHoveredPortal(null);
                resetCardPerspective(event);
              }}
            >
              <FramedImage className="saturate-[0.82] transition duration-700 group-hover:scale-[1.035] group-hover:saturate-110" src={portal.image} alt={`${portal.title} photography portal`} sizes="(max-width: 768px) 100vw, 31vw" />
              <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(5,7,11,0.4),transparent_38%,rgba(5,7,11,0.94)_92%)]" />
              <div className="portal-glow absolute inset-0 z-10 opacity-70 transition duration-500 group-hover:opacity-100" />
              <PortalWarpCanvas active={hoveredPortal === index} tone={index} className="pointer-events-none absolute inset-0 z-20 h-full w-full opacity-90" />
              <div className="portal-aperture pointer-events-none absolute inset-x-[8%] top-[24%] z-20 h-[42%] overflow-hidden border-y border-white/20" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <div className="absolute inset-x-0 top-6 z-30 flex items-start justify-between gap-4 px-5">
                <div>
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/55">Portal {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-[clamp(2rem,3vw,3.5rem)] font-black uppercase leading-none tracking-normal text-ink drop-shadow-[0_3px_22px_rgba(0,0,0,0.8)]">
                    {portal.title}
                  </h3>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25 bg-black/30 text-lg text-cyan backdrop-blur-md transition duration-500 group-hover:rotate-45 group-hover:border-cyan/70">
                  ↗
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-30 p-6">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-gold">AJC Media / Enter archive</p>
                <p className="mt-2 max-w-[18ch] text-[clamp(1.25rem,2vw,1.75rem)] font-black leading-tight text-ink">{portal.label}</p>
                <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-4 py-2 text-sm font-black text-ink backdrop-blur-md transition group-hover:border-cyan/70 group-hover:bg-cyan/10 group-hover:text-cyan">
                  Enter story <span aria-hidden="true">→</span>
                </span>
              </div>

              <div className="pointer-events-none absolute inset-3 z-40 border border-white/10 transition duration-500 group-hover:inset-4 group-hover:border-cyan/35" />
            </Link>
          </Reveal>
        ))}
      </div>

      {warpPortal !== null ? (
        <div className="portal-warp-overlay" data-phase={warpPhase} data-tone={portals[warpPortal].color} aria-hidden="true">
          <div className="portal-warp-image">
            <FramedImage src={portals[warpPortal].image} alt="" sizes="100vw" />
          </div>
          <PortalWarpCanvas active overlay tone={warpPortal} className="absolute inset-0 h-full w-full" />
          <div className="portal-warp-slices"><span /><span /><span /><span /><span /></div>
          <div className="portal-warp-copy">
            <span>Entering story</span>
            <strong>{portals[warpPortal].title}</strong>
          </div>
        </div>
      ) : null}
    </section>
  );
}
