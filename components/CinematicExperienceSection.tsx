"use client";

import { useEffect, useRef, useState } from "react";
import { FramedImage } from "@/components/FramedImage";
import type { SiteContent } from "@/types/site";

export function CinematicExperienceSection({ content }: { content: SiteContent["experience"] }) {
  const scenes = content.scenes;
  const sectionRef = useRef<HTMLElement>(null);
  const desktopStageRef = useRef<HTMLDivElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const activeSceneRef = useRef(0);

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let mediaContext: { add: (conditions: string, callback: () => void | (() => void)) => void; revert: () => void } | undefined;
    let isCancelled = false;

    async function setupMotion() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (isCancelled || !sectionRef.current || !desktopStageRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        mediaContext = gsap.matchMedia();
        mediaContext.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
          const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * 3.2, 2200)}`,
            pin: desktopStageRef.current,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const nextScene = Math.min(scenes.length - 1, Math.floor(self.progress * scenes.length));
              if (nextScene !== activeSceneRef.current) {
                activeSceneRef.current = nextScene;
                setActiveScene(nextScene);
              }
              sectionRef.current?.style.setProperty("--reel-progress", `${Math.max(0.02, self.progress)}`);
              const sceneProgress = self.progress * scenes.length - nextScene;
              sectionRef.current?.style.setProperty("--scene-progress", `${Math.max(0, Math.min(1, sceneProgress))}`);
            }
          });

          return () => trigger.kill();
        });
      }, sectionRef);

      ScrollTrigger.refresh();
    }

    setupMotion();

    return () => {
      isCancelled = true;
      mediaContext?.revert();
      context?.revert();
    };
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 899px)");
    const syncMobileRail = () => {
      if (!mobileQuery.matches) {
        return;
      }
      window.requestAnimationFrame(() => {
        if (mobileRailRef.current) {
          mobileRailRef.current.scrollLeft = 0;
        }
        activeSceneRef.current = 0;
        setActiveScene(0);
      });
    };

    mobileQuery.addEventListener("change", syncMobileRail);
    syncMobileRail();
    return () => mobileQuery.removeEventListener("change", syncMobileRail);
  }, []);

  function handleMobileScroll() {
    const rail = mobileRailRef.current;
    if (!rail) {
      return;
    }

    const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-reel-card]"));
    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - railCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    if (nearestIndex !== activeSceneRef.current) {
      activeSceneRef.current = nearestIndex;
      setActiveScene(nearestIndex);
    }
  }

  function focusMobileScene(index: number) {
    const rail = mobileRailRef.current;
    const card = rail?.querySelector<HTMLElement>(`[data-reel-card="${index}"]`);
    if (!rail || !card) {
      return;
    }

    rail.scrollTo({
      left: card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  }

  return (
    <section ref={sectionRef} id="experience" className="experience-reel">
      <div ref={desktopStageRef} className="reel-desktop section-pad">
        <div className="reel-composition">
          <div data-scroll-anchor><p className="eyebrow">{content.eyebrow}</p><h2 className="section-title">{content.title}</h2><p className="body-copy mt-5">{content.description}</p>
            <div className="reel-chapter-list">
              {scenes.map((scene,index)=>(<button key={scene.id} className="reel-chapter" type="button" data-active={activeScene===index} onClick={()=>{activeSceneRef.current=index;setActiveScene(index);}} aria-current={activeScene===index ? "step":undefined}>
                <span className="eyebrow">{scene.label}</span><span className="reel-chapter-title">{scene.title}</span><span className="reel-chapter-copy">{scene.copy}</span>
              </button>))}
            </div>
          </div>
          <div><div className="reel-photograph">
            {scenes.map((scene,index)=>(<div key={scene.id} className="reel-frame" data-active={activeScene===index} aria-hidden={activeScene!==index}><FramedImage src={scene.image} alt={scene.title} position={scene.position} sizes="55vw" /></div>))}
          </div><div className="image-index"><span>{String(activeScene+1).padStart(2,"0")} / {String(scenes.length).padStart(2,"0")}</span><span>{scenes[activeScene].title}</span></div><div className="reel-progress-track"><div className="reel-scroll-progress" /></div></div>
        </div>
      </div>
      <div className="reel-mobile section-pad" data-scroll-anchor>
        <p className="eyebrow">{content.eyebrow}</p><h2 className="section-title">{content.title}</h2><p className="body-copy mt-5">{content.description}</p>
        <div className="image-index mt-7"><span>Swipe to discover</span><span>{String(activeScene+1).padStart(2,"0")} / {scenes.length}</span></div>
        <div ref={mobileRailRef} className="reel-mobile-rail" onScroll={handleMobileScroll}>
          {scenes.map((scene,index)=>(<article key={scene.id} data-reel-card={index}><div className="reel-photograph"><FramedImage src={scene.image} alt={scene.title} position={scene.position} sizes="85vw" /></div><p className="eyebrow mt-5">{scene.label}</p><h3>{scene.title}</h3><p className="body-copy mt-3">{scene.copy}</p></article>))}
        </div>
        <div className="scene-dots" aria-label="Choose experience reel scene">{scenes.map((scene,index)=>(<button key={scene.id} type="button" aria-label={"Show " + scene.title} aria-current={activeScene===index ? "step":undefined} onClick={()=>focusMobileScene(index)} />))}</div>
      </div>
    </section>
  );
}
