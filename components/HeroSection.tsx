"use client";

import { useEffect, useRef, useState } from "react";
import { FramedImage } from "@/components/FramedImage";
import type { SiteContent } from "@/types/site";

export function HeroSection({ content }: { content: SiteContent["hero"] }) {
  const frames = [
    { id: "lead", image: content.backgroundImage, alt: "AJC Media photography", position: content.backgroundPosition },
    ...content.showcaseFrames,
    ...content.thumbnailFrames
  ];
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setSelected(current => (current + 1) % frames.length), 6000);
    return () => window.clearInterval(timer);
  }, [playing, frames.length]);

  function moveRail(direction: number) {
    railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.7,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  return (
    <section className="beige-opening" id="top" aria-label="AJC Media photography">
      <div className="beige-hero">
        <div key={frames[selected].id} className="beige-hero-photo">
          <FramedImage src={frames[selected].image} alt={frames[selected].alt} position={frames[selected].position} fit="cover" priority sizes="100vw" />
        </div>
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
            <button key={frame.id} className="beige-filmstrip-frame" type="button" aria-label={`Focus portfolio frame ${index + 1}`} aria-pressed={selected === index} onClick={() => { setSelected(index); setPlaying(false); }}>
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
