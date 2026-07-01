import { ButtonLink } from "@/components/ButtonLink";
import { pricingPackages } from "@/data/site";

export function PricingSection() {
  return (
    <section className="section-pad bg-[linear-gradient(90deg,rgba(255,189,115,0.08),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent)]" id="pricing">
      <div className="eyebrow">Pricing</div>
      <div className="section-heading">
        <h2 className="section-title">Simple starting points for a sales-ready conversation.</h2>
        <p className="body-copy">These draft packages are easy to move into a database, CMS, or Stripe-backed quote flow later.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {pricingPackages.map((item) => (
          <article key={item.label} className={`glass-panel flex flex-col p-7 ${item.featured ? "border-cyan/50 lg:-translate-y-4" : ""}`}>
            <p className="mb-3 text-sm font-black uppercase text-cyan">{item.label}</p>
            <h3 className="text-[clamp(2.2rem,4.2vw,3.9rem)] font-bold leading-none text-ink">{item.price}</h3>
            <p className="mt-5 body-copy">{item.description}</p>
            <ul className="my-6 list-disc space-y-2 pl-5 text-ink/80">
              {item.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <ButtonLink className="mt-auto min-h-10 px-4 py-2" href="/#booking" variant={item.featured ? "primary" : "ghost"}>
              Request date
            </ButtonLink>
          </article>
        ))}
      </div>
    </section>
  );
}
