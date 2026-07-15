"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/data/site";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 flex min-h-[76px] items-center justify-between border-b border-white/15 px-[clamp(18px,4vw,56px)] backdrop-blur-2xl transition ${isScrolled || isOpen ? "bg-night/92 min-h-16" : "bg-night/70"}`}>
      <Link className="relative z-[70] inline-flex h-9 items-center" href="/" aria-label="AJC Media home">
        <Image className="brand-logo" src="/assets/brand/ajc-logo.svg" alt="AJC Media" width={112} height={31} priority />
      </Link>

      <button
        className={`group relative z-[70] h-12 w-12 overflow-hidden rounded-full border transition lg:hidden ${isOpen ? "border-cyan/70 bg-cyan/10 shadow-[0_0_34px_rgba(61,229,255,0.34)]" : "border-white/15 bg-white/5"}`}
        type="button"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_120deg,transparent,rgba(61,229,255,0.48),transparent)] opacity-0 transition group-hover:opacity-100" />
        <span className={`absolute left-3.5 top-[17px] h-0.5 w-5 rounded-full bg-ink transition duration-300 ${isOpen ? "translate-y-[5px] rotate-45" : ""}`} />
        <span className={`absolute left-3.5 top-[24px] h-0.5 w-5 rounded-full bg-ink transition duration-300 ${isOpen ? "opacity-0" : ""}`} />
        <span className={`absolute left-3.5 top-[31px] h-0.5 w-5 rounded-full bg-ink transition duration-300 ${isOpen ? "-translate-y-[9px] -rotate-45" : ""}`} />
      </button>

      <nav className={`fixed left-0 top-0 z-[60] grid h-[100dvh] w-[100dvw] content-start overflow-y-auto overflow-x-hidden bg-[#05070b] px-[clamp(28px,9vw,76px)] pb-10 pt-[clamp(112px,18svh,156px)] backdrop-blur-2xl transition duration-500 lg:static lg:z-auto lg:flex lg:h-auto lg:w-auto lg:translate-x-0 lg:translate-y-0 lg:items-center lg:gap-[clamp(12px,1.55vw,24px)] lg:overflow-visible lg:bg-transparent lg:p-0 lg:opacity-100 lg:backdrop-blur-0 ${isOpen ? "pointer-events-auto visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-4 opacity-0 lg:pointer-events-auto lg:visible"}`}>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(72vw,430px)] w-[min(72vw,430px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/20 opacity-60 lg:hidden">
          <div className="absolute inset-[13%] rounded-full border border-dashed border-gold/25" />
          <div className="absolute inset-[31%] rounded-full border border-white/15" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan/40 to-transparent" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
        </div>

        <div className="relative z-10 grid gap-4 lg:flex lg:items-center lg:gap-[clamp(12px,1.55vw,24px)]">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              className={`text-[clamp(1.75rem,9vw,3.35rem)] font-black leading-[0.95] text-ink/85 transition duration-300 hover:translate-x-2 hover:text-cyan lg:text-[0.82rem] lg:font-normal lg:leading-normal lg:hover:translate-x-0 lg:hover:text-ink xl:text-sm ${isOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0 lg:translate-y-0 lg:opacity-100"}`}
              href={item.href}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: isOpen ? `${index * 55}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className={`mt-2 inline-flex w-fit rounded-full border border-cyan/45 px-6 py-3 text-base font-black text-ink transition duration-300 hover:border-cyan lg:mt-0 lg:px-3.5 lg:py-2.5 lg:text-[0.82rem] lg:font-normal xl:px-4 xl:text-sm ${isOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0 lg:translate-y-0 lg:opacity-100"}`}
            href="/admin"
            onClick={() => setIsOpen(false)}
            style={{ transitionDelay: isOpen ? `${navItems.length * 55}ms` : "0ms" }}
          >
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
