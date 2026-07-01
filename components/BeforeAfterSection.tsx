"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";

export function BeforeAfterSection() {
  const [position, setPosition] = useState(54);
  const tweenRef = useRef<{ kill: () => void } | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function setupAutoCompare() {
      const { gsap } = await import("gsap");

      if (isCancelled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const proxy = { value: 34 };
      tweenRef.current = gsap.to(proxy, {
        value: 74,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.45,
        onUpdate: () => setPosition(Math.round(proxy.value))
      });
    }

    setupAutoCompare();

    return () => {
      isCancelled = true;
      tweenRef.current?.kill();
    };
  }, []);

  function handleManualChange(value: number) {
    tweenRef.current?.kill();
    tweenRef.current = null;
    setPosition(value);
  }

  return (
    <section className="section-pad">
      <Reveal>
        <div className="section-heading">
          <div>
            <div className="eyebrow">Editing Difference</div>
            <h2 className="section-title">From clean capture to a finished emotional frame.</h2>
          </div>
          <p className="body-copy">The left side simulates a flatter color capture. The right side shows the polished direction: contrast, clarity, skin tone, atmosphere, and final gallery mood.</p>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
        <Reveal>
          <div className="relative overflow-hidden border border-white/15 bg-night shadow-glow">
            <div className="relative aspect-[16/9] min-h-[300px]">
              <Image className="h-full w-full object-cover saturate-125 contrast-110" src="/assets/gallery/rain-engagement.png" alt="Edited engagement photo" fill sizes="(max-width: 1024px) 100vw, 70vw" />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
                <Image className="h-full w-full max-w-none object-cover saturate-[0.68] brightness-[0.88] contrast-[0.78] blur-[0.35px]" src="/assets/gallery/rain-engagement.png" alt="Raw engagement photo simulation" fill sizes="(max-width: 1024px) 100vw, 70vw" />
                <div className="absolute inset-0 bg-[#43566c]/20" />
              </div>
              <div className="absolute inset-y-0 z-10 w-px bg-cyan shadow-[0_0_28px_rgba(61,229,255,0.75)]" style={{ left: `${position}%` }}>
                <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan/70 bg-night/80 text-xs font-black uppercase text-cyan backdrop-blur-md shadow-[0_0_35px_rgba(61,229,255,0.35)]">
                  Edit
                </div>
              </div>
              <div className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-night/75 px-3 py-1 text-xs font-black uppercase text-muted">Flat Capture</div>
              <div className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-night/75 px-3 py-1 text-xs font-black uppercase text-gold">Final Grade</div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 to-transparent" />
            </div>
            <input
              className="absolute inset-x-6 bottom-5 z-20 h-2 cursor-ew-resize accent-cyan"
              type="range"
              min="8"
              max="92"
              value={position}
              aria-label="Compare raw and edited photo"
              onPointerDown={() => handleManualChange(position)}
              onChange={(event) => handleManualChange(Number(event.target.value))}
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass-panel p-6">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan">Client confidence</p>
            <h3 className="mt-3 text-3xl font-black leading-tight text-ink">The photo is captured with care, then finished with intent.</h3>
            <p className="mt-4 body-copy">This makes the value of professional editing visible before the client even asks about deliverables.</p>
            <div className="mt-6 grid grid-cols-3 border border-white/15 text-center">
              {["Raw", "Grade", "Final"].map((item) => (
                <div key={item} className="border-r border-white/15 p-3 text-sm font-black uppercase text-ink last:border-r-0">{item}</div>
              ))}
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ["01", "Expose for real light"],
                ["02", "Shape color and skin tone"],
                ["03", "Deliver a polished story"]
              ].map(([number, label]) => (
                <div key={number} className="flex items-center gap-3 border border-white/10 bg-white/[0.04] p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/35 text-sm font-black text-gold">{number}</span>
                  <span className="text-sm font-bold text-ink/82">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
