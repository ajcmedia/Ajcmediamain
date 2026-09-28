"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FramedImage } from "@/components/FramedImage";
import type { SiteContent } from "@/types/site";

const heroFallbackFocalPoints: Record<string, { x: number; y: number }> = {
  "/assets/gallery/reception-dance.png": { x: 51, y: 45 },
  "/assets/gallery/wedding-waterfront.png": { x: 50, y: 36 },
  "/assets/gallery/family-park.png": { x: 52, y: 43 },
  "/assets/gallery/corporate-branding.png": { x: 50, y: 27 },
  "/assets/gallery/baby-shower.png": { x: 50, y: 35 },
  "/assets/gallery/neon-portrait.png": { x: 50, y: 34 },
  "/assets/gallery/graduation-family.png": { x: 54, y: 38 },
  "/assets/gallery/forest-engagement.png": { x: 52, y: 45 }
};

export function HeroSection({ content }: { content: SiteContent["hero"] }) {
  const frames = [
    { id: "lead", image: content.backgroundImage, alt: "AJC Media photography", position: content.backgroundPosition },
    ...content.showcaseFrames,
    ...content.thumbnailFrames
  ];
  const [selected, setSelected] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [incomingReady, setIncomingReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const railRef = useRef<HTMLDivElement>(null);

  function heroFrameStyle(index: number) {
    const position = frames[index].position;
    const fallback = heroFallbackFocalPoints[frames[index].image];
    const x = position?.x ?? fallback?.x ?? 50;
    const y = position?.y ?? fallback?.y ?? 50;
    const zoom = position?.zoom ?? 1;
    return {
      "--hero-mobile-position": `${x}% ${y}%`,
      "--hero-desktop-position": `${x}% ${Math.min(72, Math.max(28, 22 + y * 0.56))}%`,
      "--hero-mobile-scale": zoom,
      "--hero-desktop-scale": 1 + (zoom - 1) * 0.55
    } as CSSProperties;
  }

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIncomingReady(false);
      setSelected(current => (current + 1) % frames.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [playing, frames.length]);

  useEffect(() => {
    setIncomingReady(false);
  }, [selected]);

  useEffect(() => {
    if (selected === displayed || !incomingReady) return;
    const timer = window.setTimeout(() => setDisplayed(selected), 950);
    return () => window.clearTimeout(timer);
  }, [displayed, incomingReady, selected]);

  function moveRail(direction: number) {
    railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.7,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  function selectFrame(index: number) {
    setIncomingReady(false);
    setSelected(index);
  }

  return (
    <section className="beige-opening" id="top" aria-label="AJC Media photography">
      <div className="beige-hero">
        <div key={frames[displayed].id} className="beige-hero-photo beige-hero-photo-current" style={heroFrameStyle(displayed)}>
          <FramedImage src={frames[displayed].image} alt={frames[displayed].alt} position={frames[displayed].position} fit="cover" priority={displayed === 0} sizes="100vw" />
        </div>
        {selected !== displayed ? (
          <div key={frames[selected].id} className="beige-hero-photo beige-hero-photo-incoming" data-ready={incomingReady} style={heroFrameStyle(selected)}>
            <FramedImage
              src={frames[selected].image}
              alt={frames[selected].alt}
              position={frames[selected].position}
              fit="cover"
              sizes="100vw"
              onLoad={() => setIncomingReady(true)}
              onError={() => setSelected(displayed)}
            />
          </div>
        ) : null}
        <div className="beige-hero-shade" aria-hidden="true" />
        <p className="beige-hero-note">Weddings. Portraits. Celebrations.<br />Your moments, captured with care.<br /><span>— AJC Media</span></p>
        <div className="beige-hero-title">
          <h1>Life, as it <em>feels.</em><br />Stories, <em>beautifully</em> kept.</h1>
          <a href="/#booking">Vancouver & the Lower Mainland.</a>
        </div>
        <div className="beige-hero-bottom">
          <a href="/#gallery">Explore the photographs</a>
          <button type="button" aria-pressed={playing} onClick={() => setPlaying(value => !value)}>{playing ? "Pause slideshow" : "Play slideshow"}</button>
          <span>{String(selected + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}</span>
        </div>
      </div>
      <div className="beige-filmstrip">
        <div ref={railRef} className="beige-filmstrip-track" aria-label="Portfolio highlights">
          {frames.map((frame, index) => (
            <button key={frame.id} className="beige-filmstrip-frame" type="button" aria-label={`Focus portfolio frame ${index + 1}`} aria-pressed={selected === index} onClick={() => selectFrame(index)}>
              <FramedImage src={frame.image} alt={frame.alt} position={frame.position} fit="cover" sizes="(max-width:640px) 72vw, 28vw" />
            </button>
          ))}
        </div>
        <button className="filmstrip-arrow previous" type="button" aria-label="Previous portfolio photographs" onClick={() => moveRail(-1)}>←</button>
        <button className="filmstrip-arrow next" type="button" aria-label="Next portfolio photographs" onClick={() => moveRail(1)}>→</button>
      </div>
    </section>
  );
}
