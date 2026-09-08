"use client";

import { useRef, useState } from "react";
import { FramedImage } from "@/components/FramedImage";
import { Reveal } from "@/components/Reveal";
import type { SiteContent } from "@/types/site";

export function FeaturedStorySection({ content }: { content: SiteContent["featuredStory"] }) {
  const storyFrames = content.frames;
  const stageRef = useRef<HTMLButtonElement>(null);
  const [activeFrame, setActiveFrame] = useState(Math.min(2, storyFrames.length - 1));

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
    <section className="story-section section-pad">
      <Reveal><div className="section-heading"><div><p className="eyebrow">{content.eyebrow}</p><h2 className="section-title">{content.title}</h2></div><p className="body-copy">{content.description}</p></div></Reveal>
      <div className="story-layout">
        <div><button ref={stageRef} className="story-stage" type="button" onClick={nextFrame} onPointerMove={handleStagePointerMove} aria-label={"Currently showing " + storyFrames[activeFrame].title + ". Show next story frame."}>
          {storyFrames.map((frame,index)=>(<div key={frame.id} className="story-stage-frame" data-active={activeFrame===index} aria-hidden={activeFrame!==index}><FramedImage src={frame.image} alt={frame.title} position={frame.position} sizes="(max-width: 1024px) 90vw, 60vw" /></div>))}<span className="story-next" aria-hidden="true">Next frame ↗︎</span>
        </button><div className="story-caption" aria-live="polite"><p className="eyebrow">{storyFrames[activeFrame].chapter}</p><h3>{storyFrames[activeFrame].title}</h3><p className="body-copy mt-3">{storyFrames[activeFrame].copy}</p></div></div>
        <div className="story-selector" aria-label="Choose a story frame">{storyFrames.map((frame,index)=>(<button key={frame.id} className="story-choice" type="button" data-active={activeFrame===index} onClick={()=>setActiveFrame(index)} aria-current={activeFrame===index ? "step":undefined}><span className="story-thumbnail"><FramedImage src={frame.image} alt="" position={frame.position} sizes="80px" /></span><span><span className="eyebrow">{String(index+1).padStart(2,"0")} / {frame.eyebrow}</span><span className="story-choice-title">{frame.title}</span></span><span aria-hidden="true">↗︎</span></button>))}</div>
      </div>
    </section>
  );
}
