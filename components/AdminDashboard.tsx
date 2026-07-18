"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  BookingRequest,
  BookingStatus,
  GalleryCategory,
  GalleryPortal,
  PortfolioProject,
  PricingPackage,
  SiteContent
} from "@/types/site";

type TabId = "overview" | "requests" | "images" | "portals" | "gallery" | "pricing" | "story" | "editorial";
type PublishNotice = { tone: "info" | "success" | "error"; message: string };

const tabs: Array<{ id: TabId; label: string; description: string }> = [
  { id: "overview", label: "Overview", description: "Website and inquiry status" },
  { id: "requests", label: "Booking Requests", description: "Reply queue and internal notes" },
  { id: "images", label: "Site Images", description: "Hero, About, reel, and services" },
  { id: "portals", label: "Gallery Portals", description: "Three connected Gallery entrances" },
  { id: "gallery", label: "Gallery", description: "Categories and portfolio projects" },
  { id: "pricing", label: "Pricing", description: "Packages and featured offer" },
  { id: "story", label: "Featured Story", description: "Interactive story frames" },
  { id: "editorial", label: "Editorial Wall", description: "Curated archive frames" }
];

const bookingStatuses: Array<{ value: BookingStatus; label: string }> = [
  { value: "new", label: "New" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" }
];

export function AdminDashboard({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [content, setContent] = useState<SiteContent>(() => structuredClone(initialContent));
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [databaseConfigured, setDatabaseConfigured] = useState(false);
  const [status, setStatus] = useState("");
  const [publishNotice, setPublishNotice] = useState<PublishNotice | null>(null);
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);

  const categoryLabels = useMemo(
    () => new Map(content.gallery.categories.map((category) => [category.id, category.label])),
    [content.gallery.categories]
  );

  useEffect(() => {
    let cancelled = false;
    async function loadDashboard() {
      try {
        const [contentResponse, bookingResponse] = await Promise.all([
          fetch("/api/site-content", { cache: "no-store" }),
          fetch("/api/bookings", { cache: "no-store" })
        ]);
        if (contentResponse.ok) {
          const result = (await contentResponse.json()) as { content: SiteContent; databaseConfigured: boolean };
          if (!cancelled) {
            setContent(result.content);
            setDatabaseConfigured(result.databaseConfigured);
          }
        }
        if (bookingResponse.ok) {
          const result = (await bookingResponse.json()) as { bookings: BookingRequest[] };
          if (!cancelled) setBookings(result.bookings);
        }
      } catch {
        if (!cancelled) setStatus("The dashboard could not refresh from the server.");
      } finally {
        if (!cancelled) setIsLoadingBookings(false);
      }
    }
    loadDashboard();
    return () => { cancelled = true; };
  }, []);

  function mutateContent(mutator: (draft: SiteContent) => void) {
    setHasUnpublishedChanges(true);
    setPublishNotice(null);
    setContent((current) => {
      const next = structuredClone(current);
      mutator(next);
      return next;
    });
  }

  async function saveContent() {
    setIsSaving(true);
    setStatus("Saving website content...");
    setPublishNotice({ tone: "info", message: "Publishing your website changes..." });
    try {
      const response = await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      });
      const result = (await response.json()) as { content?: SiteContent; error?: string };
      if (!response.ok || !result.content) throw new Error(result.error || "Content could not be saved.");
      setContent(result.content);
      setStatus("Website content published successfully.");
      setHasUnpublishedChanges(false);
      setPublishNotice({ tone: "success", message: "Published successfully. The public website now has your latest changes." });
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Content could not be saved.";
      setStatus(message);
      setPublishNotice({ tone: "error", message: `Publishing failed: ${message}` });
    } finally {
      setIsSaving(false);
    }
  }

  async function saveBooking(booking: BookingRequest) {
    setStatus(`Saving ${booking.name}'s request...`);
    try {
      const response = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: booking.status, internalNotes: booking.internalNotes })
      });
      const result = (await response.json()) as { booking?: BookingRequest; error?: string };
      if (!response.ok || !result.booking) throw new Error(result.error || "Request could not be updated.");
      setBookings((items) => items.map((item) => item.id === booking.id ? result.booking! : item));
      setStatus("Booking request updated.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Request could not be updated.");
    }
  }

  async function removeBooking(booking: BookingRequest) {
    if (!window.confirm(`Permanently delete the booking request from ${booking.name}?`)) return;
    const response = await fetch(`/api/bookings/${booking.id}`, { method: "DELETE" });
    if (response.ok) {
      setBookings((items) => items.filter((item) => item.id !== booking.id));
      setStatus("Booking request deleted.");
    } else {
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      setStatus(result.error || "Booking request could not be deleted.");
    }
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin-login");
    router.refresh();
  }

  function removePortalAndCategory(portal: GalleryPortal) {
    const linkedProjects = content.gallery.projects.filter((project) => project.categoryId === portal.categoryId);
    if (linkedProjects.length) {
      setStatus(`Reassign or delete the ${linkedProjects.length} Gallery item(s) in “${categoryLabels.get(portal.categoryId)}” before deleting this portal.`);
      setActiveTab("gallery");
      return;
    }
    if (!window.confirm("Remove this portal and its connected Gallery category from the draft? You must add a replacement before publishing.")) return;
    mutateContent((draft) => {
      draft.portals.items = draft.portals.items.filter((item) => item.id !== portal.id);
      const stillUsed = draft.portals.items.some((item) => item.categoryId === portal.categoryId);
      if (!stillUsed) draft.gallery.categories = draft.gallery.categories.filter((item) => item.id !== portal.categoryId);
    });
    setStatus("Portal removed from the draft. Add a replacement to return to three before publishing.");
  }

  function addPortal() {
    if (content.portals.items.length >= 3) {
      setStatus("The public website is limited to exactly three Gallery Portals.");
      return;
    }
    const categoryId = createId("category");
    mutateContent((draft) => {
      draft.gallery.categories.push({ id: categoryId, label: "New category" });
      draft.portals.items.push({ id: createId("portal"), categoryId, title: "New category", label: "Describe this story", image: "/assets/gallery/wedding-waterfront.png", color: "cyan" });
    });
    setStatus("Replacement portal added. Edit its category, image, and wording before publishing.");
  }

  function deleteCategory(category: GalleryCategory) {
    const portal = content.portals.items.find((item) => item.categoryId === category.id);
    const projectCount = content.gallery.projects.filter((item) => item.categoryId === category.id).length;
    if (portal || projectCount) {
      setStatus(`“${category.label}” cannot be deleted while it is linked to ${portal ? "a portal" : ""}${portal && projectCount ? " and " : ""}${projectCount ? `${projectCount} Gallery item(s)` : ""}.`);
      return;
    }
    if (!window.confirm(`Delete the unused “${category.label}” category?`)) return;
    mutateContent((draft) => { draft.gallery.categories = draft.gallery.categories.filter((item) => item.id !== category.id); });
  }

  const newBookingCount = bookings.filter((booking) => booking.status === "new").length;

  return (
    <main className="min-h-screen pb-20 pt-24">
      <header className="px-[clamp(18px,5vw,70px)] pb-8">
        <div className="flex flex-col gap-5 border-b border-white/15 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">AJC Media control room</p>
            <h1 className="max-w-[15ch] text-[clamp(2.2rem,5vw,4.8rem)] font-black leading-[0.94] text-ink">Manage the website without touching the layout.</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="pill-button pill-button-ghost" href="/" target="_blank" rel="noreferrer">Preview website</a>
            <button className="pill-button border-white/15 text-muted" type="button" onClick={signOut}>Sign out</button>
          </div>
        </div>
        <p className={`mt-4 min-h-6 ${status.toLowerCase().includes("could not") || status.toLowerCase().includes("before deleting") ? "text-rose" : "text-green"}`} role="status">{status}</p>
      </header>

      <div className="grid gap-6 px-[clamp(18px,5vw,70px)] xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="glass-panel h-fit p-3 xl:sticky xl:top-24">
          <nav className="grid gap-1" aria-label="Admin sections">
            {tabs.map((tab) => (
              <button key={tab.id} className={`border px-4 py-3 text-left transition ${activeTab === tab.id ? "border-cyan/45 bg-cyan/10 text-ink" : "border-transparent text-ink/72 hover:border-white/15 hover:bg-white/[0.04]"}`} type="button" onClick={() => setActiveTab(tab.id)}>
                <span className="block font-black">{tab.label}{tab.id === "requests" && newBookingCount ? ` (${newBookingCount})` : ""}</span>
                <span className="mt-1 block text-xs text-muted">{tab.description}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          {activeTab === "overview" ? <Overview content={content} bookings={bookings} databaseConfigured={databaseConfigured} isLoadingBookings={isLoadingBookings} onOpen={setActiveTab} /> : null}
          {activeTab === "requests" ? <BookingManager bookings={bookings} onChange={setBookings} onSave={saveBooking} onDelete={removeBooking} isLoading={isLoadingBookings} /> : null}
          {activeTab === "images" ? <SiteImageManager content={content} mutate={mutateContent} setStatus={setStatus} /> : null}
          {activeTab === "portals" ? <PortalManager content={content} mutate={mutateContent} onAdd={addPortal} onDelete={removePortalAndCategory} setStatus={setStatus} /> : null}
          {activeTab === "gallery" ? <GalleryManager content={content} mutate={mutateContent} onDeleteCategory={deleteCategory} setStatus={setStatus} /> : null}
          {activeTab === "pricing" ? <PricingManager content={content} mutate={mutateContent} setStatus={setStatus} /> : null}
          {activeTab === "story" ? <StoryManager content={content} mutate={mutateContent} setStatus={setStatus} /> : null}
          {activeTab === "editorial" ? <EditorialManager content={content} mutate={mutateContent} setStatus={setStatus} /> : null}

          {activeTab !== "overview" && activeTab !== "requests" ? (
            <div className={`sticky bottom-4 z-40 mt-6 flex flex-col gap-3 border bg-night/95 p-4 shadow-glow backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between ${publishNotice?.tone === "success" ? "border-green/45" : publishNotice?.tone === "error" ? "border-rose/55" : "border-cyan/25"}`}>
              <div
                className="min-w-0"
                role={publishNotice?.tone === "error" ? "alert" : "status"}
                aria-live="polite"
                data-publish-status={publishNotice?.tone || (hasUnpublishedChanges ? "draft" : "idle")}
              >
                <strong className={`block text-sm font-black ${publishNotice?.tone === "success" ? "text-green" : publishNotice?.tone === "error" ? "text-rose" : hasUnpublishedChanges ? "text-gold" : "text-cyan"}`}>
                  {publishNotice?.tone === "success" ? "Changes published" : publishNotice?.tone === "error" ? "Could not publish" : hasUnpublishedChanges ? "Unpublished changes" : "Website is up to date"}
                </strong>
                <p className="mt-1 text-sm text-muted">
                  {publishNotice?.message || (hasUnpublishedChanges ? "Your edits are saved in this draft until you publish them." : "Make an edit to enable publishing.")}
                </p>
              </div>
              <button className="pill-button pill-button-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={saveContent} disabled={isSaving || !hasUnpublishedChanges}>
                {isSaving ? "Publishing..." : "Publish website changes"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}

function Overview({ content, bookings, databaseConfigured, isLoadingBookings, onOpen }: { content: SiteContent; bookings: BookingRequest[]; databaseConfigured: boolean; isLoadingBookings: boolean; onOpen: (tab: TabId) => void }) {
  const cards = [
    { label: "New inquiries", value: bookings.filter((item) => item.status === "new").length, tab: "requests" as TabId },
    { label: "Gallery projects", value: content.gallery.projects.length, tab: "gallery" as TabId },
    { label: "Published portals", value: content.portals.items.length, tab: "portals" as TabId },
    { label: "Pricing packages", value: content.pricing.packages.length, tab: "pricing" as TabId }
  ];
  return (
    <section className="grid gap-5">
      <Panel title="Dashboard overview" copy="Everything here controls existing content slots; the public design and interactions remain unchanged.">
        <div className={`border p-4 ${databaseConfigured ? "border-green/35 bg-green/5 text-green" : "border-gold/35 bg-gold/5 text-gold"}`}>
          {databaseConfigured ? "MongoDB is configured. Content, uploads, and requests are persistent." : "MongoDB is not configured yet. The public site is safely using its built-in content; publishing and uploads will activate after the environment variables are added."}
        </div>
      </Panel>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <button key={card.label} className="glass-panel p-5 text-left transition hover:border-cyan/45" type="button" onClick={() => onOpen(card.tab)}>
            <strong className="block text-4xl font-black text-ink">{isLoadingBookings && card.tab === "requests" ? "—" : card.value}</strong>
            <span className="mt-2 block text-sm uppercase text-muted">{card.label}</span>
          </button>
        ))}
      </div>
      <Panel title="Connected content model" copy="Portal links use stable category IDs. Renaming a category never breaks its portal, filter, or assigned photographs.">
        <div className="grid gap-3 md:grid-cols-3">
          {content.portals.items.map((portal) => (
            <div key={portal.id} className="border border-white/15 bg-white/[0.04] p-4">
              <p className="font-black text-ink">{portal.title}</p>
              <p className="mt-1 text-sm text-muted">Gallery filter: {content.gallery.categories.find((category) => category.id === portal.categoryId)?.label}</p>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function BookingManager({ bookings, onChange, onSave, onDelete, isLoading }: { bookings: BookingRequest[]; onChange: (bookings: BookingRequest[]) => void; onSave: (booking: BookingRequest) => void; onDelete: (booking: BookingRequest) => void; isLoading: boolean }) {
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const visible = filter === "all" ? bookings : bookings.filter((booking) => booking.status === filter);
  function patch(id: string, changes: Partial<BookingRequest>) {
    onChange(bookings.map((booking) => booking.id === id ? { ...booking, ...changes } : booking));
  }
  return (
    <Panel title="Booking requests" copy="Every public form submission is saved here and also emailed when SMTP is configured.">
      <div className="mb-5 flex flex-wrap gap-2">
        {[{ value: "all", label: "All" }, ...bookingStatuses].map((option) => (
          <button key={option.value} className={`rounded-full border px-3 py-2 text-sm ${filter === option.value ? "border-cyan/45 bg-cyan/10 text-ink" : "border-white/15 text-muted"}`} type="button" onClick={() => setFilter(option.value as BookingStatus | "all")}>{option.label}</button>
        ))}
      </div>
      {isLoading ? <p className="body-copy">Loading booking requests...</p> : null}
      {!isLoading && !visible.length ? <p className="body-copy">No booking requests in this view.</p> : null}
      <div className="grid gap-4">
        {visible.map((booking) => (
          <article key={booking.id} className="border border-white/15 bg-white/[0.035] p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan">{new Date(booking.createdAt).toLocaleString()}</p>
                <h3 className="mt-2 text-2xl font-black text-ink">{booking.name}</h3>
                <p className="mt-1 text-muted"><a className="text-cyan" href={`mailto:${booking.email}`}>{booking.email}</a>{booking.phone ? ` · ${booking.phone}` : ""}</p>
              </div>
              <span className={`w-fit rounded-full border px-3 py-1.5 text-xs font-black uppercase ${booking.emailSent ? "border-green/35 text-green" : "border-gold/35 text-gold"}`}>{booking.emailSent ? "Email sent" : "Email pending"}</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Detail label="Shoot type" value={booking.type} />
              <Detail label="Preferred date" value={booking.date} />
              <Detail label="Budget" value={booking.budget} />
            </div>
            <p className="mt-4 whitespace-pre-wrap border-l-2 border-cyan/35 pl-4 text-ink/80">{booking.message}</p>
            <div className="mt-5 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
              <Field label="Request status"><select className="form-control" value={booking.status} onChange={(event) => patch(booking.id, { status: event.target.value as BookingStatus })}>{bookingStatuses.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>
              <Field label="Private notes"><textarea className="form-control min-h-24" value={booking.internalNotes} onChange={(event) => patch(booking.id, { internalNotes: event.target.value })} placeholder="Call outcome, follow-up date, or quote notes..." /></Field>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="pill-button pill-button-primary min-h-10 px-4 py-2" type="button" onClick={() => onSave(booking)}>Save request</button>
              <a className="pill-button pill-button-ghost min-h-10 px-4 py-2" href={`mailto:${booking.email}?subject=${encodeURIComponent("Your AJC Media booking request")}`}>Reply by email</a>
              <button className="pill-button min-h-10 border-rose/35 px-4 py-2 text-rose" type="button" onClick={() => onDelete(booking)}>Delete permanently</button>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function SiteImageManager({ content, mutate, setStatus }: EditorProps) {
  return (
    <div className="grid gap-5">
      <Panel title="Hero images" copy="The current hero composition stays fixed. Replace the background, four showcase frames, or four strip thumbnails.">
        <ImageField label="Hero background" value={content.hero.backgroundImage} onChange={(image) => mutate((draft) => { draft.hero.backgroundImage = image; })} setStatus={setStatus} />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {content.hero.showcaseFrames.map((frame, index) => <ImageField key={frame.id} label={`Showcase frame ${index + 1}`} value={frame.image} onChange={(image) => mutate((draft) => { draft.hero.showcaseFrames[index].image = image; })} setStatus={setStatus} />)}
          {content.hero.thumbnailFrames.map((frame, index) => <ImageField key={frame.id} label={`Strip thumbnail ${index + 1}`} value={frame.image} onChange={(image) => mutate((draft) => { draft.hero.thumbnailFrames[index].image = image; })} setStatus={setStatus} />)}
        </div>
      </Panel>
      <Panel title="About and editing comparison" copy="These controls replace the existing images without changing either section’s layout.">
        <div className="grid gap-4 md:grid-cols-2">
          <ImageField label="About portrait" value={content.about.portraitImage} onChange={(image) => mutate((draft) => { draft.about.portraitImage = image; })} setStatus={setStatus} />
          <ImageField label="Before/after photograph" value={content.beforeAfter.image} onChange={(image) => mutate((draft) => { draft.beforeAfter.image = image; })} setStatus={setStatus} />
        </div>
      </Panel>
      <Panel title="Experience reel" copy="Add, edit, remove, or reorder scenes in the existing scroll experience.">
        <SectionCopy content={content.experience} onChange={(key, value) => mutate((draft) => { draft.experience[key] = value; })} />
        <div className="mt-5 grid gap-4">
          {content.experience.scenes.map((scene, index) => (
            <ItemCard key={scene.id} title={scene.title || `Scene ${index + 1}`} index={index} count={content.experience.scenes.length} onMove={(direction) => mutate((draft) => { draft.experience.scenes = moveItem(draft.experience.scenes, index, direction); })} onDelete={() => content.experience.scenes.length > 1 ? mutate((draft) => { draft.experience.scenes.splice(index, 1); }) : setStatus("The experience reel needs at least one scene.")}>
              <div className="grid gap-4 md:grid-cols-2"><TextField label="Scene label" value={scene.label} onChange={(value) => mutate((draft) => { draft.experience.scenes[index].label = value; })} /><TextField label="Title" value={scene.title} onChange={(value) => mutate((draft) => { draft.experience.scenes[index].title = value; })} /><TextArea label="Description" value={scene.copy} onChange={(value) => mutate((draft) => { draft.experience.scenes[index].copy = value; })} /><ImageField label="Scene image" value={scene.image} onChange={(image) => mutate((draft) => { draft.experience.scenes[index].image = image; })} setStatus={setStatus} /></div>
            </ItemCard>
          ))}
        </div>
        <AddButton label="Add experience scene" onClick={() => mutate((draft) => { draft.experience.scenes.push({ id: createId("experience"), label: `Scene ${String(draft.experience.scenes.length + 1).padStart(2, "0")}`, title: "New scene", copy: "Describe this moment.", image: "/assets/gallery/wedding-details.png" }); })} />
      </Panel>
      <Panel title="Services images" copy="Service cards keep the same presentation while their photographs and wording can be maintained here.">
        <div className="grid gap-4">
          {content.services.items.map((service, index) => (
            <ItemCard key={service.id} title={service.title} index={index} count={content.services.items.length} onMove={(direction) => mutate((draft) => { draft.services.items = moveItem(draft.services.items, index, direction); })} onDelete={() => content.services.items.length > 1 ? mutate((draft) => { draft.services.items.splice(index, 1); }) : setStatus("At least one service is required.")}>
              <div className="grid gap-4 md:grid-cols-2"><TextField label="Service title" value={service.title} onChange={(value) => mutate((draft) => { draft.services.items[index].title = value; })} /><Field label="Icon"><select className="form-control" value={service.icon} onChange={(event) => mutate((draft) => { draft.services.items[index].icon = event.target.value as typeof service.icon; })}><option value="camera">Camera</option><option value="event">Event</option><option value="portrait">Portrait</option><option value="content">Content</option></select></Field><TextArea label="Description" value={service.description} onChange={(value) => mutate((draft) => { draft.services.items[index].description = value; })} /><ImageField label="Service image" value={service.image} onChange={(image) => mutate((draft) => { draft.services.items[index].image = image; })} setStatus={setStatus} /></div>
            </ItemCard>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function PortalManager({ content, mutate, onAdd, onDelete, setStatus }: EditorProps & { onAdd: () => void; onDelete: (portal: GalleryPortal) => void }) {
  return (
    <Panel title="Gallery Portals" copy="Exactly three portals are published. Each points to a category by ID, so its Gallery filter remains connected even when wording changes.">
      <SectionCopy content={content.portals} onChange={(key, value) => mutate((draft) => { draft.portals[key] = value; })} />
      <div className={`my-5 border p-4 ${content.portals.items.length === 3 ? "border-green/35 text-green" : "border-gold/35 text-gold"}`}>{content.portals.items.length}/3 portal slots prepared. Publishing is allowed only when all three slots are present.</div>
      <div className="grid gap-4">
        {content.portals.items.map((portal, index) => (
          <ItemCard key={portal.id} title={`Portal ${index + 1}: ${portal.title}`} index={index} count={content.portals.items.length} onMove={(direction) => mutate((draft) => { draft.portals.items = moveItem(draft.portals.items, index, direction); })} onDelete={() => onDelete(portal)} deleteLabel="Delete portal + category">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Connected Gallery category"><select className="form-control" value={portal.categoryId} onChange={(event) => mutate((draft) => { const category = draft.gallery.categories.find((item) => item.id === event.target.value); draft.portals.items[index].categoryId = event.target.value; if (category) draft.portals.items[index].title = category.label; })}>{content.gallery.categories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}</select></Field>
              <TextField label="Portal and Gallery name" value={portal.title} onChange={(value) => mutate((draft) => { const category = draft.gallery.categories.find((item) => item.id === draft.portals.items[index].categoryId); draft.portals.items[index].title = value; if (category) category.label = value; })} />
              <TextField label="Feature wording" value={portal.label} onChange={(value) => mutate((draft) => { draft.portals.items[index].label = value; })} />
              <Field label="Accent"><select className="form-control" value={portal.color} onChange={(event) => mutate((draft) => { draft.portals.items[index].color = event.target.value as GalleryPortal["color"]; })}><option value="cyan">Cyan</option><option value="gold">Gold</option><option value="rose">Rose</option></select></Field>
              <div className="md:col-span-2"><ImageField label="Portal image" value={portal.image} onChange={(image) => mutate((draft) => { draft.portals.items[index].image = image; })} setStatus={setStatus} /></div>
            </div>
          </ItemCard>
        ))}
      </div>
      {content.portals.items.length < 3 ? <AddButton label="Add replacement portal and category" onClick={onAdd} /> : null}
    </Panel>
  );
}

function GalleryManager({ content, mutate, onDeleteCategory, setStatus }: EditorProps & { onDeleteCategory: (category: GalleryCategory) => void }) {
  return (
    <div className="grid gap-5">
      <Panel title="Gallery settings" copy="Category labels drive Gallery filters. Portal connections continue using their stable internal IDs.">
        <SectionCopy content={content.gallery} onChange={(key, value) => mutate((draft) => { draft.gallery[key] = value; })} />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {content.gallery.categories.map((category, index) => (
            <div key={category.id} className="flex items-end gap-2 border border-white/15 bg-white/[0.035] p-3">
              <div className="min-w-0 flex-1"><TextField label="Filter/category name" value={category.label} onChange={(value) => mutate((draft) => { draft.gallery.categories[index].label = value; const portal = draft.portals.items.find((item) => item.categoryId === category.id); if (portal) portal.title = value; })} /></div>
              <button className="min-h-11 border border-rose/35 px-3 text-rose" type="button" onClick={() => onDeleteCategory(category)}>Delete</button>
            </div>
          ))}
        </div>
        <AddButton label="Add Gallery category" onClick={() => mutate((draft) => { draft.gallery.categories.push({ id: createId("category"), label: "New category" }); })} />
      </Panel>
      <Panel title="Gallery projects" copy="Create, edit, hide, reorder, or delete photographs. Reassign a project here before removing its category or portal.">
        <div className="grid gap-4">
          {content.gallery.projects.map((project, index) => (
            <ItemCard key={project.id} title={project.title} index={index} count={content.gallery.projects.length} onMove={(direction) => mutate((draft) => { draft.gallery.projects = moveItem(draft.gallery.projects, index, direction); })} onDelete={() => window.confirm(`Delete “${project.title}” from the Gallery draft?`) && mutate((draft) => { draft.gallery.projects.splice(index, 1); })}>
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Project title" value={project.title} onChange={(value) => mutate((draft) => { draft.gallery.projects[index].title = value; })} />
                <Field label="Category"><select className="form-control" value={project.categoryId} onChange={(event) => mutate((draft) => { draft.gallery.projects[index].categoryId = event.target.value; })}>{content.gallery.categories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}</select></Field>
                <TextArea label="Description" value={project.description} onChange={(value) => mutate((draft) => { draft.gallery.projects[index].description = value; })} />
                <ImageField label="Project image" value={project.image} onChange={(image) => mutate((draft) => { draft.gallery.projects[index].image = image; })} setStatus={setStatus} />
              </div>
              <label className="mt-3 flex items-center gap-2 text-sm font-bold text-ink"><input type="checkbox" checked={project.visible} onChange={(event) => mutate((draft) => { draft.gallery.projects[index].visible = event.target.checked; })} /> Show this project on the public Gallery</label>
            </ItemCard>
          ))}
        </div>
        <AddButton label="Add Gallery project" onClick={() => mutate((draft) => { const firstCategory = draft.gallery.categories[0]; if (!firstCategory) return; const project: PortfolioProject = { id: createId("project"), title: "New project", categoryId: firstCategory.id, image: "/assets/gallery/wedding-waterfront.png", description: "Add a short portfolio caption.", visible: true }; draft.gallery.projects.unshift(project); })} />
      </Panel>
    </div>
  );
}

function PricingManager({ content, mutate }: EditorProps) {
  return (
    <Panel title="Pricing packages" copy="Package cards keep the existing frontend styling and can be created, reordered, featured, edited, or removed.">
      <SectionCopy content={content.pricing} onChange={(key, value) => mutate((draft) => { draft.pricing[key] = value; })} />
      <div className="mt-5 grid gap-4">
        {content.pricing.packages.map((item, index) => (
          <ItemCard key={item.id} title={item.label} index={index} count={content.pricing.packages.length} onMove={(direction) => mutate((draft) => { draft.pricing.packages = moveItem(draft.pricing.packages, index, direction); })} onDelete={() => content.pricing.packages.length > 1 && window.confirm(`Delete “${item.label}”?`) && mutate((draft) => { draft.pricing.packages.splice(index, 1); })}>
            <div className="grid gap-4 md:grid-cols-2"><TextField label="Package name" value={item.label} onChange={(value) => mutate((draft) => { draft.pricing.packages[index].label = value; })} /><TextField label="Displayed price" value={item.price} onChange={(value) => mutate((draft) => { draft.pricing.packages[index].price = value; })} /><TextArea label="Description" value={item.description} onChange={(value) => mutate((draft) => { draft.pricing.packages[index].description = value; })} /><TextArea label="Features (one per line)" value={item.features.join("\n")} onChange={(value) => mutate((draft) => { draft.pricing.packages[index].features = value.split("\n").map((feature) => feature.trim()).filter(Boolean); })} /></div>
            <label className="mt-3 flex items-center gap-2 text-sm font-bold text-ink"><input type="checkbox" checked={item.featured} onChange={(event) => mutate((draft) => { if (event.target.checked) draft.pricing.packages.forEach((pack) => { pack.featured = false; }); draft.pricing.packages[index].featured = event.target.checked; })} /> Feature this package</label>
          </ItemCard>
        ))}
      </div>
      <AddButton label="Add pricing package" onClick={() => mutate((draft) => { const item: PricingPackage = { id: createId("pricing"), label: "New Package", price: "$0", description: "Describe who this package is for.", features: ["Add a feature"], featured: false }; draft.pricing.packages.push(item); })} />
    </Panel>
  );
}

function StoryManager({ content, mutate, setStatus }: EditorProps) {
  return (
    <Panel title="Featured Story" copy="Control the story introduction and every frame in the existing interactive composition.">
      <SectionCopy content={content.featuredStory} onChange={(key, value) => mutate((draft) => { draft.featuredStory[key] = value; })} />
      <div className="mt-5 grid gap-4">
        {content.featuredStory.frames.map((frame, index) => (
          <ItemCard key={frame.id} title={frame.title} index={index} count={content.featuredStory.frames.length} onMove={(direction) => mutate((draft) => { draft.featuredStory.frames = moveItem(draft.featuredStory.frames, index, direction); })} onDelete={() => content.featuredStory.frames.length > 1 ? mutate((draft) => { draft.featuredStory.frames.splice(index, 1); }) : setStatus("Featured Story needs at least one frame.")}>
            <div className="grid gap-4 md:grid-cols-2"><TextField label="Chapter label" value={frame.chapter} onChange={(value) => mutate((draft) => { draft.featuredStory.frames[index].chapter = value; })} /><TextField label="Selector eyebrow" value={frame.eyebrow} onChange={(value) => mutate((draft) => { draft.featuredStory.frames[index].eyebrow = value; })} /><TextField label="Frame title" value={frame.title} onChange={(value) => mutate((draft) => { draft.featuredStory.frames[index].title = value; })} /><TextArea label="Frame copy" value={frame.copy} onChange={(value) => mutate((draft) => { draft.featuredStory.frames[index].copy = value; })} /><div className="md:col-span-2"><ImageField label="Frame image" value={frame.image} onChange={(image) => mutate((draft) => { draft.featuredStory.frames[index].image = image; })} setStatus={setStatus} /></div></div>
          </ItemCard>
        ))}
      </div>
      <AddButton label="Add story frame" onClick={() => mutate((draft) => { draft.featuredStory.frames.push({ id: createId("story"), chapter: `Chapter ${String(draft.featuredStory.frames.length + 1).padStart(2, "0")}`, eyebrow: "New moment", title: "New story frame", copy: "Describe this part of the story.", image: "/assets/gallery/wedding-details.png" }); })} />
    </Panel>
  );
}

function EditorialManager({ content, mutate, setStatus }: EditorProps) {
  return (
    <Panel title="Editorial Wall" copy="Maintain the illuminated archive’s introduction and ordered image rail.">
      <SectionCopy content={content.editorial} onChange={(key, value) => mutate((draft) => { draft.editorial[key] = value; })} />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {content.editorial.frames.map((frame, index) => (
          <ItemCard key={frame.id} title={frame.title} index={index} count={content.editorial.frames.length} onMove={(direction) => mutate((draft) => { draft.editorial.frames = moveItem(draft.editorial.frames, index, direction); })} onDelete={() => content.editorial.frames.length > 1 ? mutate((draft) => { draft.editorial.frames.splice(index, 1); }) : setStatus("The Editorial Wall needs at least one frame.")}>
            <TextField label="Frame title" value={frame.title} onChange={(value) => mutate((draft) => { draft.editorial.frames[index].title = value; })} />
            <div className="mt-4"><ImageField label="Frame image" value={frame.image} onChange={(image) => mutate((draft) => { draft.editorial.frames[index].image = image; })} setStatus={setStatus} /></div>
          </ItemCard>
        ))}
      </div>
      <AddButton label="Add Editorial Wall frame" onClick={() => mutate((draft) => { draft.editorial.frames.push({ id: createId("editorial"), title: "New editorial frame", image: "/assets/gallery/wedding-waterfront.png" }); })} />
    </Panel>
  );
}

type EditorProps = { content: SiteContent; mutate: (mutator: (draft: SiteContent) => void) => void; setStatus: (status: string) => void };

function Panel({ title, copy, children }: { title: string; copy: string; children: React.ReactNode }) {
  return <section className="glass-panel p-[clamp(18px,4vw,32px)]"><div className="mb-6"><h2 className="text-[clamp(1.7rem,3vw,2.7rem)] font-black leading-none text-ink">{title}</h2><p className="mt-3 body-copy">{copy}</p></div>{children}</section>;
}

function SectionCopy<T extends { eyebrow: string; title: string; description: string }>({ content, onChange }: { content: T; onChange: (key: "eyebrow" | "title" | "description", value: string) => void }) {
  return <div className="grid gap-4 md:grid-cols-2"><TextField label="Section eyebrow" value={content.eyebrow} onChange={(value) => onChange("eyebrow", value)} /><TextField label="Section title" value={content.title} onChange={(value) => onChange("title", value)} /><div className="md:col-span-2"><TextArea label="Section introduction" value={content.description} onChange={(value) => onChange("description", value)} /></div></div>;
}

function ItemCard({ title, index, count, onMove, onDelete, deleteLabel = "Delete", children }: { title: string; index: number; count: number; onMove: (direction: -1 | 1) => void; onDelete: () => void; deleteLabel?: string; children: React.ReactNode }) {
  return <article className="border border-white/15 bg-white/[0.035] p-4"><header className="mb-4 flex flex-col gap-3 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between"><h3 className="text-lg font-black text-ink">{title}</h3><div className="flex flex-wrap gap-2"><button className="border border-white/15 px-3 py-2 text-muted disabled:opacity-30" type="button" disabled={index === 0} onClick={() => onMove(-1)}>↑</button><button className="border border-white/15 px-3 py-2 text-muted disabled:opacity-30" type="button" disabled={index === count - 1} onClick={() => onMove(1)}>↓</button><button className="border border-rose/35 px-3 py-2 text-rose" type="button" onClick={onDelete}>{deleteLabel}</button></div></header>{children}</article>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-extrabold text-ink/80">{label}{children}</label>;
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <Field label={label}><input className="form-control" type="text" value={value} onChange={(event) => onChange(event.target.value)} /></Field>;
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <Field label={label}><textarea className="form-control min-h-24 resize-y" value={value} onChange={(event) => onChange(event.target.value)} /></Field>;
}

function ImageField({ label, value, onChange, setStatus }: { label: string; value: string; onChange: (value: string) => void; setStatus: (status: string) => void }) {
  const [uploading, setUploading] = useState(false);
  async function upload(file: File) {
    setUploading(true);
    setStatus(`Uploading ${file.name}...`);
    const formData = new FormData();
    formData.set("file", file);
    try {
      const response = await fetch("/api/media", { method: "POST", body: formData });
      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error || "Image upload failed.");
      onChange(result.url);
      setStatus("Image uploaded. Publish website changes when the section is ready.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }
  return (
    <div className="grid gap-3 border border-white/12 bg-black/15 p-3">
      <div className="aspect-[16/9] overflow-hidden border border-white/10 bg-night"><img className="h-full w-full object-cover" src={value} alt="" /></div>
      <TextField label={label} value={value} onChange={onChange} />
      <label className="inline-flex w-fit cursor-pointer items-center rounded-full border border-white/15 px-4 py-2 text-sm font-black text-ink transition hover:border-cyan/45">
        {uploading ? "Uploading..." : "Upload replacement"}
        <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) upload(file); event.currentTarget.value = ""; }} />
      </label>
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button className="mt-5 border border-cyan/35 bg-cyan/10 px-4 py-3 font-black text-cyan transition hover:border-cyan" type="button" onClick={onClick}>+ {label}</button>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div className="border border-white/10 bg-white/[0.03] p-3"><span className="block text-xs font-black uppercase text-muted">{label}</span><strong className="mt-1 block text-ink">{value}</strong></div>;
}

function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const next = [...items];
  const target = index + direction;
  if (target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}
