"use client";

import { useEffect, useMemo, useState } from "react";
import type { PortfolioProject, SiteContent } from "@/types/site";
import { Reveal } from "@/components/Reveal";

export function GalleryExperience({ content }: { content: SiteContent["gallery"] }) {
  const projects = content.projects;
  const categories = useMemo(() => [{ id: "all", label: "All" }, ...content.categories], [content.categories]);
  const categoryLabels = useMemo(() => new Map(content.categories.map((category) => [category.id, category.label])), [content.categories]);
  const [filter, setFilter] = useState("all");
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    function handleGalleryFilter(event: Event) {
      const categoryId = (event as CustomEvent<{ categoryId?: string }>).detail?.categoryId;
      if (categoryId && categories.some((category) => category.id === categoryId)) {
        setFilter(categoryId);
        setActiveProject(null);
      }
    }

    window.addEventListener("ajc:gallery-filter", handleGalleryFilter);
    return () => window.removeEventListener("ajc:gallery-filter", handleGalleryFilter);
  }, [categories]);

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  const visibleProjects = useMemo(
    () => projects.filter((project) => project.visible && (filter === "all" || project.categoryId === filter)),
    [filter, projects]
  );

  return (
    <section className="section-pad" id="gallery">
      <div data-scroll-anchor>
      <Reveal>
        <div className="eyebrow">{content.eyebrow}</div>
      </Reveal>
      <Reveal>
        <div className="section-heading">
          <h2 className="section-title">{content.title}</h2>
          <p className="body-copy">{content.description}</p>
        </div>
      </Reveal>
      </div>

      <Reveal>
        <div className="mb-6 flex flex-wrap gap-2.5" role="tablist" aria-label="Gallery filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`min-h-10 rounded-full border px-4 py-2 transition ${filter === category.id ? "border-cyan/45 bg-cyan/15 text-ink" : "border-white/15 bg-white/5 text-ink/75 hover:border-cyan/45 hover:text-ink"}`}
              type="button"
              onClick={() => setFilter(category.id)}
              aria-pressed={filter === category.id}
            >
              {category.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
        {visibleProjects.map((project, index) => (
          <Reveal key={project.id} className="mb-5 break-inside-avoid" delay={(index % 6) * 70}>
            <article className="inline-block w-full overflow-hidden border border-white/15 bg-[rgba(9,15,25,0.78)] shadow-glow">
              <button className="group block w-full text-left" type="button" onClick={() => setActiveProject(project)} aria-label={`Open ${project.title}`}>
                <div className="relative overflow-hidden border-b border-white/10 bg-night/80">
                  <img className="h-auto w-full transition duration-500 group-hover:scale-[1.015] group-hover:saturate-110" src={project.image} alt={project.title} />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(61,229,255,0.08),transparent_45%)] opacity-80" />
                </div>
                <div className="p-6">
                  <small className="font-black uppercase text-gold">{categoryLabels.get(project.categoryId) || "Gallery"}</small>
                  <h3 className="mt-2 text-[clamp(1.25rem,2.2vw,2rem)] font-bold leading-none text-ink">{project.title}</h3>
                  <p className="mt-3 body-copy">{project.description}</p>
                </div>
              </button>
            </article>
          </Reveal>
        ))}
      </div>

      {activeProject ? (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-black/90 p-[clamp(18px,4vw,44px)]" role="dialog" aria-modal="true">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="shutter-blade shutter-blade-top" />
            <div className="shutter-blade shutter-blade-bottom" />
            <div className="absolute left-1/2 top-1/2 h-[min(72vw,620px)] w-[min(72vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/25" />
            <div className="absolute left-1/2 top-1/2 h-[min(52vw,430px)] w-[min(52vw,430px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/25" />
          </div>
          <button className="fixed right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-3xl text-ink" type="button" aria-label="Close gallery preview" onClick={() => setActiveProject(null)}>
            &times;
          </button>
          <div className="relative z-10 grid justify-items-center">
            <div className="relative border border-white/20 bg-night/70 p-2 shadow-[0_0_80px_rgba(61,229,255,0.16)]">
              <img className="max-h-[76vh] w-auto max-w-full object-contain" src={activeProject.image} alt={activeProject.title} />
              <div className="pointer-events-none absolute inset-5 border border-cyan/50" />
              <div className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l-2 border-t-2 border-gold" />
              <div className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b-2 border-r-2 border-gold" />
            </div>
            <div className="max-w-3xl text-center">
              <h3 className="mt-5 text-[clamp(1.7rem,4vw,3rem)] font-bold text-ink">{activeProject.title}</h3>
              <p className="mt-2 body-copy">{activeProject.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
