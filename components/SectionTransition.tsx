"use client";

import { useEffect, useRef, useState } from "react";

type TransitionPhase = "idle" | "cover" | "reveal";

type Destination = {
  code: string;
  id: string;
  label: string;
};

const COVER_DURATION = 920;
const REVEAL_DURATION = 720;

const destinations: Record<string, Destination> = {
  top: { code: "00", id: "top", label: "Home" },
  about: { code: "01", id: "about", label: "About" },
  experience: { code: "02", id: "experience", label: "Experience" },
  portals: { code: "03", id: "portals", label: "Gallery Portals" },
  services: { code: "04", id: "services", label: "Services" },
  pricing: { code: "05", id: "pricing", label: "Pricing" },
  editorial: { code: "06", id: "editorial", label: "Editorial Wall" },
  gallery: { code: "07", id: "gallery", label: "Gallery" },
  booking: { code: "08", id: "booking", label: "Booking" },
  contact: { code: "09", id: "contact", label: "Contact" }
};

const defaultDestination = destinations.top;

export function SectionTransition() {
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [destination, setDestination] = useState<Destination>(defaultDestination);
  const timersRef = useRef<number[]>([]);
  const isTransitioningRef = useRef(false);
  const targetCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    function clearTimers() {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
      targetCleanupRef.current?.();
      targetCleanupRef.current = null;
      document.body.classList.remove("section-transition-lock");
    }

    function jumpToTarget(target: HTMLElement, url: URL) {
      const header = document.querySelector<HTMLElement>("header");
      const contentAnchor = Array.from(target.querySelectorAll<HTMLElement>("[data-scroll-anchor]"))
        .find((anchor) => anchor.getClientRects().length > 0) ?? target;
      const headerHeight = header?.offsetHeight ?? 0;
      const breathingRoom = window.innerWidth < 768 ? 14 : Math.max(10, Math.min(18, window.innerHeight * 0.012));
      let layoutTop = 0;
      let layoutNode: HTMLElement | null = contentAnchor;
      while (layoutNode) {
        layoutTop += layoutNode.offsetTop;
        layoutNode = layoutNode.offsetParent as HTMLElement | null;
      }
      const top = target.id === "top"
        ? 0
        : Math.max(0, layoutTop - headerHeight - breathingRoom);
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;

      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo({ top, left: 0, behavior: "auto" });
      window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);

      const hadTabIndex = target.hasAttribute("tabindex");
      if (!hadTabIndex) {
        target.setAttribute("tabindex", "-1");
      }
      target.focus({ preventScroll: true });
      target.classList.remove("section-arrival");
      void target.offsetWidth;
      target.classList.add("section-arrival");

      window.requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
      });

      const cleanupTarget = () => {
        target.classList.remove("section-arrival");
        if (!hadTabIndex) {
          target.removeAttribute("tabindex");
        }
      };
      targetCleanupRef.current = cleanupTarget;

      const cleanupTimer = window.setTimeout(() => {
        cleanupTarget();
        if (targetCleanupRef.current === cleanupTarget) {
          targetCleanupRef.current = null;
        }
      }, 900);
      timersRef.current.push(cleanupTimer);
    }

    function handleAnchorClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const clickedElement = event.target instanceof Element ? event.target : null;
      const anchor = clickedElement?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      // Gallery portals own their longer, WebGL-assisted transition.
      if (anchor.hasAttribute("data-portal-link")) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search ||
        !url.hash
      ) {
        return;
      }

      const targetId = decodeURIComponent(url.hash.slice(1));
      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      if (targetId === "gallery") {
        window.dispatchEvent(new CustomEvent("ajc:gallery-filter", { detail: { category: "All" } }));
      }

      if (isTransitioningRef.current) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      clearTimers();

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        jumpToTarget(target, url);
        return;
      }

      isTransitioningRef.current = true;
      const fallbackLabel = anchor.dataset.transitionLabel || targetId.replace(/[-_]+/g, " ");
      setDestination(destinations[targetId] ?? {
        code: "--",
        id: targetId,
        label: fallbackLabel.replace(/\b\w/g, (character) => character.toUpperCase())
      });
      document.body.classList.add("section-transition-lock");
      setPhase("cover");

      const coverTimer = window.setTimeout(() => {
        jumpToTarget(target, url);
        setPhase("reveal");

        const revealTimer = window.setTimeout(() => {
          setPhase("idle");
          isTransitioningRef.current = false;
          document.body.classList.remove("section-transition-lock");
        }, REVEAL_DURATION);
        timersRef.current.push(revealTimer);
      }, COVER_DURATION);
      timersRef.current.push(coverTimer);
    }

    function handlePortalNavigation(event: Event) {
      const detail = (event as CustomEvent<{ category?: string; hash?: string }>).detail;
      if (!detail?.hash) {
        return;
      }
      const targetId = decodeURIComponent(detail.hash.replace(/^#/, ""));
      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }
      clearTimers();
      jumpToTarget(target, new URL(detail.hash, window.location.href));
      if (detail.category) {
        window.dispatchEvent(new CustomEvent("ajc:gallery-filter", { detail: { category: detail.category } }));
      }
    }

    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("ajc:portal-navigate", handlePortalNavigation);
    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("ajc:portal-navigate", handlePortalNavigation);
      clearTimers();
    };
  }, []);

  return (
    <>
      <div className="section-transition" data-phase={phase} data-destination={destination.id} aria-hidden="true">
        <div className="section-transition-shutters">
          <span /><span /><span /><span />
        </div>
        <div className="section-transition-field" />
        <div className="section-transition-frame">
          <i /><i /><i /><i />
        </div>
        <div className="section-transition-copy">
          <span>AJC Media / Destination {destination.code}</span>
          <strong>{destination.label}</strong>
          <em>Reframing the view</em>
        </div>
        <div className="section-transition-progress"><span /></div>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {phase === "cover" ? `Opening ${destination.label}` : ""}
      </span>
    </>
  );
}
