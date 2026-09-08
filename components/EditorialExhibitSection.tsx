"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useRef } from "react";
import { FramedImage } from "@/components/FramedImage";
import { Reveal } from "@/components/Reveal";
import type { SiteContent } from "@/types/site";

export function EditorialExhibitSection({ content }: { content: SiteContent["editorial"] }) {
  const exhibitFrames = content.frames;
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ isActive: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let isCancelled = false;
    let media: { revert: () => void } | undefined;

    async function setupMotion() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (isCancelled || !sectionRef.current || !viewportRef.current || !trackRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const responsive = gsap.matchMedia();
      media = responsive;
      context = gsap.context(() => {
        responsive.add({ desktop: "(min-width: 900px)", mobile: "(max-width: 899px)", reduce: "(prefers-reduced-motion: reduce)" }, (matchContext) => {
        const frames = gsap.utils.toArray<HTMLElement>(".exhibit-frame");
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(frames, { autoAlpha: 1, scale: 1, rotateZ: 0 });

        if (matchContext.conditions?.reduce) return;
        if (matchContext.conditions?.desktop) {
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
        });
      }, sectionRef);

      ScrollTrigger.refresh();
    }

    setupMotion();

    return () => {
      isCancelled = true;
      media?.revert();
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
    <section ref={sectionRef} id="editorial" className="editorial-section">
      <div ref={viewportRef} className="editorial-viewport section-pad">
        <Reveal><div className="section-heading"><div><p className="eyebrow">{content.eyebrow}</p><h2 className="section-title">{content.title}</h2></div><p className="body-copy">{content.description}</p></div></Reveal>
        <div className="editorial-toolbar"><span className="eyebrow">Selected photographs / {String(exhibitFrames.length).padStart(2,"0")}</span><div className="editorial-rail-controls"><button type="button" aria-label="Previous editorial panel" onClick={()=>scrollRailBy(-1)}>←</button><button type="button" aria-label="Next editorial panel" onClick={()=>scrollRailBy(1)}>→</button></div></div>
        <div ref={trackRef} className="exhibit-rail editorial-rail" onPointerDown={handleRailPointerDown} onPointerMove={handleRailPointerMove} onPointerUp={stopRailDrag} onPointerCancel={stopRailDrag} onPointerLeave={stopRailDrag}>
          {exhibitFrames.map((frame,index)=>(<figure key={frame.id} className="exhibit-frame group" style={{"--frame-index":index} as CSSProperties}><div className="exhibit-frame-image editorial-frame"><FramedImage draggable={false} className="collection-photo" src={frame.image} alt={frame.title} position={frame.position} sizes="(max-width: 768px) 80vw, 48vw" /></div><figcaption><span>{frame.title}</span><span>{String(index+1).padStart(2,"0")}</span></figcaption></figure>))}
        </div>
        <div className="editorial-rule"><div ref={progressRef} /></div>
      </div>
    </section>
  );
}
