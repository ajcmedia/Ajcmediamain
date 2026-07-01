"use client";

import { FormEvent, useEffect, useState } from "react";
import { starterProjects } from "@/data/site";
import { readLocalStore, writeLocalStore } from "@/lib/localStorage";
import type { BookingRequest, PortfolioProject, ProjectCategory } from "@/types/site";
import { getMergedProjects } from "@/components/GalleryExperience";
import { Reveal } from "@/components/Reveal";

const PROJECT_KEY = "ajcMediaProjects";
const BOOKING_KEY = "ajcMediaBookings";

export function AdminDashboard() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>(starterProjects);
  const [featuredIds, setFeaturedIds] = useState<string[]>(["starter-reception", "starter-wedding", "starter-branding"]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let isMounted = true;
    const mergedProjects = getMergedProjects(readLocalStore<PortfolioProject[]>(PROJECT_KEY, starterProjects));
    setProjects(mergedProjects);
    setBookings(readLocalStore<BookingRequest[]>(BOOKING_KEY, []));
    writeLocalStore(PROJECT_KEY, mergedProjects);

    async function loadServerBookings() {
      try {
        const response = await fetch("/api/bookings", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { bookings: BookingRequest[] };
        if (!isMounted) {
          return;
        }

        const localBookings = readLocalStore<BookingRequest[]>(BOOKING_KEY, []);
        const mergedBookings = mergeBookings(data.bookings, localBookings);
        setBookings(mergedBookings);
        writeLocalStore(BOOKING_KEY, mergedBookings);
      } catch {
        // Local fallback remains available until MongoDB is connected.
      }
    }

    loadServerBookings();

    return () => {
      isMounted = false;
    };
  }, []);

  function persistProjects(nextProjects: PortfolioProject[]) {
    setProjects(nextProjects);
    writeLocalStore(PROJECT_KEY, nextProjects);
  }

  function persistBookings(nextBookings: BookingRequest[]) {
    setBookings(nextBookings);
    writeLocalStore(BOOKING_KEY, nextBookings);
  }

  async function handleProjectSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const upload = data.get("upload");
    let image = String(data.get("image") || "");

    if (upload instanceof File && upload.size) {
      image = await fileToDataUrl(upload);
    }

    if (!image) {
      setStatus("Add an image URL or upload an image.");
      return;
    }

    const project: PortfolioProject = {
      id: `project-${Date.now()}`,
      title: String(data.get("title") || ""),
      category: String(data.get("category") || "Wedding") as ProjectCategory,
      image,
      description: String(data.get("description") || "")
    };

    persistProjects([project, ...projects]);
    form.reset();
    setStatus("Project published to the gallery.");
  }

  return (
    <main className="pb-20">
      <section className="grid min-h-[70svh] items-center gap-[clamp(30px,6vw,84px)] px-[clamp(18px,5vw,70px)] pb-16 pt-28 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.75fr)]">
        <div>
          <p className="eyebrow">Protected control room</p>
          <h1 className="max-w-[12ch] text-[clamp(2.45rem,5.8vw,5.85rem)] leading-[0.94] tracking-normal text-ink">Bookings and portfolio updates in one place.</h1>
          <p className="mt-6 max-w-2xl body-copy">This admin area is password protected. Booking and project APIs are structured so MongoDB and email notifications can be connected when the live credentials are ready.</p>
        </div>
        <div className="grid border border-white/15 sm:grid-cols-2">
          <Stat value={bookings.length} label="booking requests" />
          <Stat value={projects.length} label="gallery projects" />
        </div>
      </section>

      <section className="px-[clamp(18px,5vw,70px)] pb-5">
        <div className="grid gap-4 lg:grid-cols-4">
          <Reveal>
            <PipelineCard label="New inquiries" value={bookings.length} detail="Needs photographer reply" tone="cyan" />
          </Reveal>
          <Reveal delay={80}>
            <PipelineCard label="Featured frames" value={featuredIds.length} detail="Homepage-ready picks" tone="gold" />
          </Reveal>
          <Reveal delay={160}>
            <PipelineCard label="Portfolio library" value={projects.length} detail="Gallery entries" tone="green" />
          </Reveal>
          <Reveal delay={240}>
            <PipelineCard label="Backend status" value="Ready" detail="MongoDB/email hooks next" tone="rose" />
          </Reveal>
        </div>
      </section>

      <section className="grid gap-5 px-[clamp(18px,5vw,70px)] xl:grid-cols-[minmax(320px,0.7fr)_minmax(0,1fr)]">
        <Reveal>
          <form className="glass-panel grid content-start gap-4 p-[clamp(20px,4vw,32px)]" onSubmit={handleProjectSubmit}>
            <PanelHeading title="Add recent project" copy="Use an image URL or upload a local image. Database persistence can be connected next." />
            <AdminLabel label="Project title"><input className="form-control" name="title" type="text" placeholder="Downtown Engagement Session" required /></AdminLabel>
            <AdminLabel label="Category">
              <select className="form-control" name="category" required>
                <option>Wedding</option>
                <option>Event</option>
                <option>Portrait</option>
                <option>Family</option>
                <option>Commercial</option>
              </select>
            </AdminLabel>
            <AdminLabel label="Image URL"><input className="form-control" name="image" type="url" placeholder="https://example.com/photo.jpg" /></AdminLabel>
            <AdminLabel label="Upload image"><input className="form-control" name="upload" type="file" accept="image/*" /></AdminLabel>
            <AdminLabel label="Short description"><textarea className="form-control min-h-28" name="description" rows={4} placeholder="A short portfolio caption." required /></AdminLabel>
            <button className="pill-button pill-button-primary" type="submit">Publish to gallery</button>
            <p className="min-h-6 text-green" role="status">{status}</p>
          </form>
        </Reveal>

        <Reveal delay={120}>
          <section className="glass-panel p-[clamp(20px,4vw,32px)]">
            <PanelHeading title="Booking requests" copy="New requests from the booking form appear here." />
            <div className="grid gap-3.5">
              {bookings.length ? bookings.map((booking) => (
                <article key={booking.id} className="border border-white/15 bg-white/[0.04] p-5">
                  <h3 className="text-lg font-bold text-ink">{booking.name}</h3>
                  <p className="mt-1 body-copy">{booking.email}{booking.phone ? ` / ${booking.phone}` : ""}</p>
                  <p className="mt-2 body-copy">{booking.message}</p>
                  <footer className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="border border-cyan/35 px-3 py-1.5 text-cyan">{booking.type} / {booking.date} / {booking.budget}</span>
                    <button className="border border-white/15 bg-white/5 px-3 py-2 text-ink transition hover:border-rose/45 hover:text-rose" type="button" onClick={() => persistBookings(bookings.filter((item) => item.id !== booking.id))}>
                      Delete
                    </button>
                  </footer>
                </article>
              )) : <p className="body-copy">No booking requests yet.</p>}
            </div>
          </section>
        </Reveal>
      </section>

      <section className="glass-panel mx-[clamp(18px,5vw,70px)] mt-5 p-[clamp(20px,4vw,32px)]">
        <PanelHeading title="Gallery manager" copy="Remove projects or restore the starter portfolio." />
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button className="pill-button pill-button-ghost" type="button" onClick={() => persistProjects(starterProjects)}>Restore starter projects</button>
          <button className="pill-button border-rose/40 text-rose" type="button" onClick={() => persistBookings([])}>Clear bookings</button>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article key={project.id} className="border border-white/15 bg-white/[0.04] p-4">
              <img className="h-auto w-full bg-night/80" src={project.image} alt={project.title} />
              <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-ink">{project.title}</h3>
                  <p className="mt-1 text-muted">{project.category}</p>
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-xs font-black uppercase ${featuredIds.includes(project.id) ? "border-gold/60 text-gold" : "border-white/15 text-muted"}`}>
                  {featuredIds.includes(project.id) ? "Featured" : "Library"}
                </span>
              </div>
              <p className="mt-2 body-copy">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  className="border border-cyan/30 bg-cyan/10 px-3 py-2 text-cyan transition hover:border-cyan"
                  type="button"
                  onClick={() => setFeaturedIds((ids) => (ids.includes(project.id) ? ids.filter((id) => id !== project.id) : [project.id, ...ids].slice(0, 6)))}
                >
                  {featuredIds.includes(project.id) ? "Unfeature" : "Feature"}
                </button>
                <button className="border border-white/15 bg-white/5 px-3 py-2 text-ink transition hover:border-rose/45 hover:text-rose" type="button" onClick={() => persistProjects(projects.filter((item) => item.id !== project.id))}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function PipelineCard({ label, value, detail, tone }: { label: string; value: number | string; detail: string; tone: "cyan" | "gold" | "green" | "rose" }) {
  const toneClass = {
    cyan: "text-cyan border-cyan/35",
    gold: "text-gold border-gold/35",
    green: "text-green border-green/35",
    rose: "text-rose border-rose/35"
  }[tone];

  return (
    <article className="glass-panel p-5">
      <p className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase ${toneClass}`}>{label}</p>
      <strong className="mt-5 block text-4xl font-black text-ink">{value}</strong>
      <p className="mt-2 body-copy">{detail}</p>
    </article>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="border-b border-white/15 bg-white/[0.045] p-[clamp(22px,5vw,42px)] last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <strong className="block text-[clamp(3rem,8vw,6rem)] leading-none text-ink">{value}</strong>
      <span className="mt-2 block uppercase text-muted">{label}</span>
    </div>
  );
}

function mergeBookings(primary: BookingRequest[], secondary: BookingRequest[]) {
  const seenIds = new Set<string>();
  return [...primary, ...secondary].filter((booking) => {
    if (seenIds.has(booking.id)) {
      return false;
    }

    seenIds.add(booking.id);
    return true;
  });
}

function PanelHeading({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-[clamp(1.7rem,3vw,2.8rem)] font-bold leading-none text-ink">{title}</h2>
      <p className="mt-3 body-copy">{copy}</p>
    </div>
  );
}

function AdminLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-extrabold text-ink/80">
      {label}
      {children}
    </label>
  );
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
