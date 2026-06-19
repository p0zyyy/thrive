"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Smooth scrolling (Lenis) synced to GSAP ScrollTrigger.
 *
 * Lenis is driven off the GSAP ticker (not its own rAF) and pushes every scroll
 * into `ScrollTrigger.update`, so pinned/scrubbed timelines stay perfectly in
 * step with the smoothed scroll position. Skipped entirely under reduced motion
 * (ScrollTrigger then falls back to native scroll). Also smooth-scrolls in-page
 * hash links.
 */
export function useLenis() {
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // keep ScrollTrigger in lockstep with Lenis
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // smooth-scroll for same-page hash links
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [prefersReduced]);
}
