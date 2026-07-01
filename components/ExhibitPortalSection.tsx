"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";

const portals = [
  {
    title: "Wedding",
    label: "Vows, dance floors, details",
    image: "/assets/gallery/wedding-waterfront.png",
    href: "/#gallery"
  },
  {
    title: "Events",
    label: "Birthdays, baptisms, showers",
    image: "/assets/gallery/birthday-candles.png",
    href: "/#gallery"
  },
  {
    title: "Portraits",
    label: "Families, grads, branding",
    image: "/assets/gallery/neon-portrait.png",
    href: "/#gallery"
  }
];

export function ExhibitPortalSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let isCancelled = false;

    async function setupMotion() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (isCancelled || !sectionRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".portal-card");
        gsap.fromTo(
          cards,
          {
            autoAlpha: 0,
            y: 90,
            rotateX: -12,
            scale: 0.92
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            stagger: 0.16,
            duration: 1,
            ease: "power4.out",
            clearProps: "opacity,visibility",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%"
            }
          }
        );

        if (window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)").matches) {
          cards.forEach((card, index) => {
            gsap.to(card, {
              y: index % 2 === 0 ? -34 : 26,
              rotateZ: index === 1 ? 1.4 : -1.2,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            });
          });
        }
      }, sectionRef);

      ScrollTrigger.refresh();
    }

    setupMotion();

    return () => {
      isCancelled = true;
      context?.revert();
    };
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--portal-x", `${x}%`);
    event.currentTarget.style.setProperty("--portal-y", `${y}%`);
  }

  return (
    <section ref={sectionRef} onPointerMove={handlePointerMove} className="relative overflow-hidden bg-black px-[clamp(18px,5vw,70px)] py-[clamp(62px,9vw,118px)]">
      <div className="portal-field pointer-events-none absolute inset-0" />
      <Reveal>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="eyebrow">Gallery Portals</p>
          <h2 className="text-[clamp(1.9rem,4.2vw,4.6rem)] font-black leading-none text-ink">Choose which story you want to step inside.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[clamp(0.98rem,1.35vw,1.2rem)] leading-relaxed text-ink/68">
            Each cover acts like a doorway into a different kind of memory: weddings, private events, and editorial portraits.
          </p>
        </div>
      </Reveal>

      <div className="relative z-10 mx-auto mt-12 grid max-w-6xl gap-5 perspective-1000 md:grid-cols-3">
        {portals.map((portal, index) => (
          <Reveal key={portal.title} delay={index * 110}>
            <Link className="portal-cover portal-card group relative block aspect-[3/4] overflow-hidden border border-white/15 bg-night shadow-glow transition duration-500 hover:border-cyan/45" href={portal.href}>
              <Image className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" src={portal.image} alt={`${portal.title} photography portal`} fill sizes="(max-width: 768px) 100vw, 31vw" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/90" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--portal-x,50%)_var(--portal-y,50%),rgba(61,229,255,0.22),transparent_36%)] opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 top-7 px-2 text-center text-[clamp(2rem,3.65vw,4.25rem)] font-black uppercase leading-none tracking-normal text-white/88 mix-blend-screen sm:text-[clamp(2.25rem,4.5vw,4.9rem)] md:text-[clamp(1.95rem,3.25vw,4.15rem)]">
                {portal.title}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-gold">AJC Media Exhibit</p>
                <h3 className="mt-2 text-2xl font-black text-ink">{portal.label}</h3>
                <span className="mt-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-ink backdrop-blur-md transition group-hover:border-cyan/60 group-hover:text-cyan">
                  Enter story
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
