import Image from "next/image";
import { ServiceIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { services } from "@/data/site";

export function ServicesSection() {
  return (
    <section className="section-pad" id="services">
      <Reveal>
        <div className="eyebrow">Services</div>
      </Reveal>
      <Reveal>
        <div className="section-heading">
        <h2 className="section-title">Coverage built around real moments, not stiff poses.</h2>
        <p className="body-copy">Choose a focused session or a full-day story. This structure is ready for real service pages and CMS-managed packages later.</p>
        </div>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 80}>
            <article className="group relative min-h-[390px] overflow-hidden border border-white/15 bg-[rgba(9,15,25,0.78)] shadow-glow transition hover:-translate-y-1.5 hover:border-cyan/35">
              <Image className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" src={service.image} alt={`${service.title} photography sample`} width={640} height={480} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-night/90" />
              <div className="absolute left-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cyan/25 bg-cyan/10 text-cyan">
                <ServiceIcon icon={service.icon} />
              </div>
              <div className="relative z-10 -mt-28 p-5 pt-32">
                <h3 className="text-xl font-bold text-ink">{service.title}</h3>
                <p className="mt-3 body-copy">{service.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
