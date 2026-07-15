"use client";

import { useRef, useState } from "react";
import { FramedImage } from "@/components/FramedImage";
import { Reveal } from "@/components/Reveal";

const storyFrames = [
  {
    chapter: "Chapter 01 / Details",
    eyebrow: "The quiet setup",
    title: "Details before the aisle.",
    copy: "Rings, florals, fabric, and the small decisions that establish the visual language of the day.",
    image: "/assets/gallery/wedding-details.png"
  },
  {
    chapter: "Chapter 02 / Portraits",
    eyebrow: "A sense of place",
    title: "Portraits with room to breathe.",
    copy: "A waterfront pause that keeps the couple, the light, and the city connected in one complete frame.",
    image: "/assets/gallery/wedding-waterfront.png"
  },
  {
    chapter: "Chapter 03 / Reception",
    eyebrow: "The room ignites",
    title: "Energy after the vows.",
    copy: "Fast movement, changing light, and real reactions captured without losing the atmosphere of the room.",
    image: "/assets/gallery/reception-dance.png"
  },
  {
    chapter: "Chapter 04 / In between",
    eyebrow: "A quiet exhale",
    title: "The frames between the big ones.",
    copy: "Unscripted movement and soft pauses give the final gallery its pacing, honesty, and emotional texture.",
    image: "/assets/gallery/forest-engagement.png"
  }
];

export function FeaturedStorySection() {
  const stageRef = useRef<HTMLButtonElement>(null);
  const [activeFrame, setActiveFrame] = useState(2);

  function handleStagePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--story-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    event.currentTarget.style.setProperty("--story-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }

  function nextFrame() {
    setActiveFrame((current) => (current + 1) % storyFrames.length);
  }

  return (
    <section className="story-section section-pad relative overflow-hidden border-y border-white/10 bg-[linear-gradient(135deg,rgba(61,229,255,0.06),transparent_35%),linear-gradient(315deg,rgba(255,189,115,0.07),transparent_42%)]">
      <div className="story-background-title pointer-events-none absolute -right-[0.03em] top-[0.05em] text-[clamp(6rem,20vw,19rem)] font-black uppercase leading-none text-white/[0.025]" aria-hidden="true">Story</div>
      <Reveal>
        <div className="section-heading relative z-10">
          <div>
            <div className="eyebrow">Featured Story / Interactive cut</div>
            <h2 className="section-title">One wedding day, told like a cinematic magazine spread.</h2>
          </div>
          <p className="body-copy">Choose a frame—or tap the main image to move forward—and watch the editorial spread recompose around that moment.</p>
        </div>
      </Reveal>

      <div className="story-layout relative z-10 grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(330px,0.7fr)]">
        <Reveal>
          <button
            ref={stageRef}
            className="story-stage group relative block min-h-[clamp(480px,62vw,700px)] w-full overflow-hidden border border-white/15 bg-night text-left shadow-glow lg:min-h-[620px]"
            type="button"
            onClick={nextFrame}
            onPointerMove={handleStagePointerMove}
            aria-label={`Currently showing ${storyFrames[activeFrame].title}. Show next story frame.`}
          >
            {storyFrames.map((frame, index) => (
              <div key={frame.image} className="story-stage-frame absolute inset-0" data-active={activeFrame === index} aria-hidden={activeFrame !== index}>
                <FramedImage className="story-stage-image transition duration-1000" src={frame.image} alt={frame.title} sizes="(max-width: 1024px) 100vw, 64vw" />
              </div>
            ))}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-night/95 via-night/10 to-black/20" />
            <div className="story-cursor-light pointer-events-none absolute inset-0 z-10" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 z-20 max-w-3xl p-[clamp(22px,4vw,46px)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">{storyFrames[activeFrame].chapter}</p>
              <h3 className="mt-3 text-[clamp(2.2rem,5vw,5rem)] font-black leading-[0.91] text-ink">{storyFrames[activeFrame].title}</h3>
              <p className="mt-4 max-w-2xl text-[clamp(0.95rem,1.3vw,1.12rem)] leading-relaxed text-ink/72">{storyFrames[activeFrame].copy}</p>
            </div>
            <span className="absolute right-5 top-5 z-30 grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-black/35 text-xl text-ink backdrop-blur-md transition duration-500 group-hover:rotate-90 group-hover:border-cyan group-hover:text-cyan" aria-hidden="true">→</span>
            <span className="absolute right-6 top-24 z-30 text-[0.58rem] font-black uppercase tracking-[0.2em] text-white/55 [writing-mode:vertical-rl]">Tap to advance</span>
          </button>
        </Reveal>

        <div className="story-selector grid gap-3" role="list" aria-label="Choose a story frame">
          {storyFrames.map((frame, index) => (
            <Reveal key={frame.image} delay={index * 70}>
              <button
                className="story-choice group grid w-full grid-cols-[96px_1fr_auto] items-center gap-4 overflow-hidden border border-white/15 bg-white/[0.035] p-3 text-left transition"
                type="button"
                data-active={activeFrame === index}
                onClick={() => setActiveFrame(index)}
                aria-current={activeFrame === index ? "step" : undefined}
              >
                <span className="relative block aspect-square overflow-hidden bg-night">
                  <FramedImage className="transition duration-700 group-hover:scale-[1.045]" src={frame.image} alt="" sizes="96px" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.62rem] font-black uppercase tracking-[0.16em] text-cyan">{String(index + 1).padStart(2, "0")} / {frame.eyebrow}</span>
                  <span className="mt-1 block text-lg font-black leading-tight text-ink">{frame.title}</span>
                </span>
                <span className="story-choice-arrow mr-1 text-lg text-white/35 transition group-hover:text-cyan" aria-hidden="true">→</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
