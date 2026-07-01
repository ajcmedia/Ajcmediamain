const items = [
  ["01", "Weddings", "Emotion-led coverage with polished editorial details."],
  ["02", "Events", "Birthdays, baby showers, baptisms, and private milestones."],
  ["03", "Portraits", "Creative solo, couple, family, and brand-ready sessions."]
];

export function IntroStrip() {
  return (
    <section className="grid border-y border-white/15 lg:grid-cols-3" aria-label="Featured disciplines">
      {items.map(([number, title, copy]) => (
        <div key={title} className="border-b border-white/10 bg-white/[0.035] p-[clamp(24px,4vw,42px)] last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
          <span className="font-black text-gold">{number}</span>
          <strong className="mt-4 block text-xl text-ink">{title}</strong>
          <p className="mt-3 body-copy">{copy}</p>
        </div>
      ))}
    </section>
  );
}
