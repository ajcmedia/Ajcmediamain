"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { CalendarIcon, GalleryIcon } from "@/components/Icons";

const showcaseFrames = [
  { image: "/assets/gallery/reception-dance.png", alt: "Wedding reception photography sample", className: "showcase-main", priority: true },
  { image: "/assets/gallery/wedding-waterfront.png", alt: "Waterfront wedding photography sample", className: "showcase-card-a" },
  { image: "/assets/gallery/family-park.png", alt: "Family photography sample", className: "showcase-card-b" },
  { image: "/assets/gallery/corporate-branding.png", alt: "Brand portrait photography sample", className: "showcase-card-c" }
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [selectedFrame, setSelectedFrame] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSelectedFrame((current) => (current + 1) % showcaseFrames.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let isCancelled = false;

    async function setupIntro() {
      const { gsap } = await import("gsap");

      if (isCancelled || !heroRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      context = gsap.context(() => {
        const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
        timeline
          .from(".hero-kicker", { autoAlpha: 0, y: 18, duration: 0.65 })
          .from(".hero-title", { autoAlpha: 0, y: 34, filter: "blur(12px)", duration: 0.9 }, "-=0.32")
          .from(".hero-copy", { autoAlpha: 0, y: 24, duration: 0.7 }, "-=0.42")
          .from(".hero-action", { autoAlpha: 0, y: 20, stagger: 0.08, duration: 0.55 }, "-=0.32")
          .from(".hero-stat", { autoAlpha: 0, y: 20, stagger: 0.08, duration: 0.55 }, "-=0.3")
          .fromTo(
            ".showcase-card",
            { autoAlpha: 0, scale: 0.86, y: 46, rotateZ: -2 },
            { autoAlpha: 1, scale: 1, y: 0, rotateZ: 0, stagger: 0.12, duration: 0.95, clearProps: "opacity,visibility" },
            "-=0.85"
          );
      }, heroRef);
    }

    setupIntro();

    return () => {
      isCancelled = true;
      context?.revert();
    };
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--mx", `${x}%`);
    event.currentTarget.style.setProperty("--my", `${y}%`);
  }

  return (
    <section ref={heroRef} onPointerMove={handlePointerMove} className="relative grid min-h-[94svh] overflow-hidden px-[clamp(18px,5vw,70px)] pb-12 pt-28" id="top" aria-label="AJC Media hero">
      <div className="hero-bg absolute inset-0" aria-hidden="true">
        <Image className="h-full w-full scale-[1.04] object-cover" src="/assets/gallery/hero-lens.png" alt="" fill priority sizes="100vw" />
        <div className="absolute inset-x-0 -top-1/4 h-[22%] animate-scan bg-gradient-to-b from-transparent via-cyan/20 to-transparent" />
        <div className="focus-field absolute inset-0 opacity-85" />
      </div>

      <div className="absolute inset-0" aria-hidden="true">
        <div className="aperture-hud absolute left-1/2 top-[48%] h-[clamp(220px,36vw,470px)] w-[clamp(220px,36vw,470px)] -translate-x-1/2 -translate-y-1/2 animate-spinSlow rounded-full border border-cyan/20 before:absolute before:inset-[12%] before:rounded-full before:border before:border-dashed before:border-gold/20 after:absolute after:inset-[31%] after:rounded-full after:border after:border-dashed after:border-white/20">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <span key={item} className="absolute left-1/2 top-1/2 h-px w-1/2 origin-left bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
          ))}
        </div>
      </div>

      <div className="relative z-10 grid items-center gap-[clamp(24px,5vw,72px)] lg:grid-cols-[minmax(0,0.88fr)_minmax(420px,1fr)]">
        <div className="max-w-[640px] lg:max-w-[760px]">
          <p className="hero-kicker eyebrow">Vancouver photography for moments with pulse</p>
          <h1 className="hero-title max-w-[12ch] text-[clamp(2.45rem,5.8vw,5.85rem)] leading-[0.94] tracking-normal text-ink">Cinematic photos for the stories you actually lived.</h1>
          <p className="hero-copy mt-5 max-w-[620px] text-[clamp(0.98rem,1.3vw,1.16rem)] leading-relaxed text-ink/75">
            Weddings, birthdays, portraits, family milestones, and content sessions captured with color, movement, and a gallery-first delivery experience.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <span className="hero-action inline-flex">
              <ButtonLink href="/#booking" variant="primary" icon={<CalendarIcon />}>
                Book a shoot
              </ButtonLink>
            </span>
            <span className="hero-action inline-flex">
              <ButtonLink href="/#gallery" icon={<GalleryIcon />}>
                View gallery
              </ButtonLink>
            </span>
          </div>
          <div className="mt-7 grid w-full max-w-xl grid-cols-3 border border-white/15">
            {[
              ["48h", "preview edits"],
              ["15+", "sample sets"],
              ["VAN", "lower mainland"]
            ].map(([value, label]) => (
              <div key={value} className="hero-stat min-w-0 border-r border-white/15 bg-night/60 p-4 last:border-r-0 backdrop-blur-xl">
                <strong className="block text-[clamp(1.25rem,2vw,2rem)] leading-none text-ink">{value}</strong>
                <span className="mt-2 block text-[0.72rem] uppercase text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[390px] sm:min-h-[470px] lg:min-h-[clamp(500px,62vh,690px)]">
          <div className="absolute inset-[15%_7%_13%_9%] z-20 animate-focusPulse border border-cyan/25" aria-hidden="true" />
          {showcaseFrames.map((frame, index) => (
            <ShowcaseCard
              key={frame.image}
              className={`${frame.className} ${index % 2 === 0 ? "animate-heroFloat" : "animate-heroFloatReverse"}`}
              image={frame.image}
              alt={frame.alt}
              selected={selectedFrame === index}
              priority={frame.priority}
              onFocus={() => setSelectedFrame(index)}
            />
          ))}
          <div className="absolute bottom-0 left-[7%] right-[5%] z-30 flex animate-stripDrift gap-2.5 opacity-80">
            {["baby-shower.png", "neon-portrait.png", "graduation-family.png", "forest-engagement.png"].map((image, index) => (
              <button
                key={image}
                className={`relative min-w-[28%] overflow-hidden border transition ${selectedFrame === index ? "border-cyan shadow-[0_0_28px_rgba(61,229,255,0.3)]" : "border-white/20"}`}
                type="button"
                aria-label={`Focus portfolio frame ${index + 1}`}
                onClick={() => setSelectedFrame(index)}
              >
                <Image className="aspect-[4/3] w-full object-cover" src={`/assets/gallery/${image}`} alt="" width={320} height={240} />
                {selectedFrame === index ? <div className="absolute inset-2 border border-cyan/80" /> : null}
              </button>
            ))}
          </div>
          <div className="pointer-events-none absolute right-4 top-1/2 z-40 hidden -translate-y-1/2 text-right text-[0.68rem] font-black uppercase tracking-[0.18em] text-cyan/80 sm:block">
            <div>AF-C Lock</div>
            <div className="mt-1 text-gold/80">ISO 800 / F2.8</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({
  image,
  alt,
  className,
  priority = false,
  selected,
  onFocus
}: {
  image: string;
  alt: string;
  className: string;
  priority?: boolean;
  selected: boolean;
  onFocus: () => void;
}) {
  return (
    <button
      className={`showcase-card absolute overflow-hidden border bg-white/5 text-left shadow-glow transition duration-500 ${selected ? "border-cyan shadow-[0_0_45px_rgba(61,229,255,0.28)]" : "border-white/20"} ${className}`}
      type="button"
      onClick={onFocus}
      aria-label={alt}
    >
      <Image className={`h-full w-full object-cover transition duration-700 ${selected ? "scale-[1.035] saturate-125" : ""}`} src={image} alt={alt} fill priority={priority} sizes="(max-width: 1024px) 80vw, 45vw" />
      {selected ? (
        <>
          <div className="pointer-events-none absolute inset-3 border border-cyan/85" />
          <div className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-gold" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-gold" />
        </>
      ) : null}
    </button>
  );
}
