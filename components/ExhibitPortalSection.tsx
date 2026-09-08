"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FramedImage } from "@/components/FramedImage";
import { PortalWarpCanvas } from "@/components/PortalWarpCanvas";
import { Reveal } from "@/components/Reveal";
import type { SiteContent } from "@/types/site";

export function ExhibitPortalSection({ content }: { content: SiteContent["portals"] }) {
  const portals = content.items;
  const sectionRef = useRef<HTMLElement>(null);
  const warpTimersRef = useRef<number[]>([]);

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

      if (isCancelled || !sectionRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      window.dispatchEvent(new CustomEvent("ajc:portal-navigate", { detail: { hash: "#gallery", categoryId: portals[index].categoryId } }));
      return;
    }

    setWarpPortal(index);
    setWarpPhase("enter");
    document.body.classList.add("portal-warp-lock");

    const navigateTimer = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("ajc:portal-navigate", { detail: { hash: "#gallery", categoryId: portals[index].categoryId } }));
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
    <section ref={sectionRef} id="portals" className="portal-section">
      <div className="portal-introduction"><FramedImage src={portals[0].image} alt="" position={portals[0].position ?? { x: 50, y: 18 }} fit="cover" sizes="100vw"/><div className="portal-introduction-shade"/>
      <Reveal><div className="section-heading" data-scroll-anchor>
        <div><p className="eyebrow">{content.eyebrow}</p><h2 className="section-title">{content.title}</h2></div>
        <p className="body-copy">{content.description}</p>
      </div></Reveal>
      </div>
      <div className="collection-grid">
        {portals.map((portal, index) => (
          <Link key={portal.id} className="portal-card collection-card group" data-color={portal.color} data-portal-link href="/#gallery" onClick={(event) => enterPortal(event, index)} onPointerMove={handleCardPointerMove} onPointerLeave={resetCardPerspective}>
            <div className="collection-image"><FramedImage className="collection-photo" src={portal.image} alt={portal.title} position={portal.position} fit="cover" sizes="(max-width: 768px) 90vw, 30vw" /></div>
            <div className="collection-label"><span className="eyebrow">Collection / {String(index + 1).padStart(2, "0")}</span><span aria-hidden="true">↗︎</span></div>
            <h3>{portal.title}</h3><p className="body-copy">{portal.label}</p><span className="text-link">Explore collection</span>
          </Link>
        ))}
      </div>

      {warpPortal !== null ? (
        <div className="portal-warp-overlay" data-phase={warpPhase} data-tone={portals[warpPortal].color} aria-hidden="true">
          <div className="portal-warp-image">
            <FramedImage src={portals[warpPortal].image} alt="" position={portals[warpPortal].position} sizes="100vw" />
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
