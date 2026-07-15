"use client";

import { useEffect, useRef, useState } from "react";

type TransitionPhase = "idle" | "cover" | "reveal";

const COVER_DURATION = 170;
const REVEAL_DURATION = 380;

export function SectionTransition() {
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const timersRef = useRef<number[]>([]);
  const isTransitioningRef = useRef(false);
  const targetCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    function clearTimers() {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
      targetCleanupRef.current?.();
      targetCleanupRef.current = null;
    }

    function jumpToTarget(target: HTMLElement, url: URL) {
      const header = document.querySelector<HTMLElement>("header");
      const contentAnchor = target.querySelector<HTMLElement>("[data-scroll-anchor]") ?? target;
      const headerHeight = header?.offsetHeight ?? 0;
      const breathingRoom = window.innerWidth < 768 ? 14 : Math.max(10, Math.min(18, window.innerHeight * 0.012));
      const top = target.id === "top"
        ? 0
        : Math.max(0, window.scrollY + contentAnchor.getBoundingClientRect().top - headerHeight - breathingRoom);
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
      setPhase("cover");

      const coverTimer = window.setTimeout(() => {
        jumpToTarget(target, url);
        setPhase("reveal");

        const revealTimer = window.setTimeout(() => {
          setPhase("idle");
          isTransitioningRef.current = false;
        }, REVEAL_DURATION);
        timersRef.current.push(revealTimer);
      }, COVER_DURATION);
      timersRef.current.push(coverTimer);
    }

    function handlePortalNavigation(event: Event) {
      const detail = (event as CustomEvent<{ hash?: string }>).detail;
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
    <div className="section-transition" data-phase={phase} aria-hidden="true">
      <div className="section-transition-reticle">
        <span />
      </div>
    </div>
  );
}
