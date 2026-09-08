"use client";

import { useEffect, useMemo, useState } from "react";
import type { PortfolioProject, SiteContent } from "@/types/site";
import { Reveal } from "@/components/Reveal";
import { getImagePresentationStyle } from "@/lib/image-presentation";

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

  useEffect(() => {
    if (!activeProject) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = document.querySelector<HTMLElement>('.gallery-dialog');
    dialog?.querySelector<HTMLButtonElement>('button')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveProject(null);
      if (event.key === 'Tab') { event.preventDefault(); dialog?.querySelector<HTMLButtonElement>('button')?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); previous?.focus(); };
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
        <div className="mb-6 flex flex-wrap gap-2.5" role="group" aria-label="Gallery filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`min-h-10 rounded-full border px-4 py-2 transition ${filter === category.id ? "border-cyan/45 bg-cyan/15 text-ink" : "border-ink/15 bg-white/5 text-ink/75 hover:border-cyan/45 hover:text-ink"}`}
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
            <article className="inline-block w-full overflow-hidden border border-ink/15 bg-white shadow-glow">
              <button className="group block w-full text-left" type="button" onClick={() => setActiveProject(project)} aria-label={`Open ${project.title}`}>
                <GalleryProjectImage project={project} />
                <div className="p-6">
                  <small className="font-medium uppercase text-gold">{categoryLabels.get(project.categoryId) || "Gallery"}</small>
                  <h3 className="mt-2 text-[clamp(1.25rem,2.2vw,2rem)] font-bold leading-none text-ink">{project.title}</h3>
                  <p className="mt-3 body-copy">{project.description}</p>
                </div>
              </button>
            </article>
          </Reveal>
        ))}
      </div>

      {activeProject ? (
        <div className="gallery-dialog fixed inset-0 z-[80] grid place-items-center overflow-y-auto p-[clamp(18px,4vw,44px)]" role="dialog" aria-modal="true" aria-label={activeProject.title}>
          <button className="fixed right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-white/10 text-3xl text-ink" type="button" aria-label="Close gallery preview" onClick={() => setActiveProject(null)}>
            &times;
          </button>
          <div className="relative z-10 grid justify-items-center">
            <div className="lightbox-image">
              <img className="max-h-[65vh] w-auto max-w-full object-contain" src={activeProject.image} alt={activeProject.title} />
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

const galleryCropClasses = {
  original: "",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[3/4]"
} as const;

function GalleryProjectImage({ project }: { project: PortfolioProject }) {
  const cropAspect = project.cropAspect || "original";
  const isCropped = cropAspect !== "original";

  return (
    <div className={`relative overflow-hidden border-b border-ink/10 bg-night/80 ${galleryCropClasses[cropAspect]}`}>
      <img
        className={`${isCropped ? "h-full w-full object-cover" : "h-auto w-full"} transition duration-500 group-hover:scale-[1.015] group-hover:saturate-110`}
        src={project.image}
        alt={project.title}
        style={getImagePresentationStyle(project.position)}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(61,229,255,0.08),transparent_45%)] opacity-80" />
    </div>
  );
}
