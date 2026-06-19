"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Returns true when the user has requested reduced motion.
 * Defaults to `false` on the server / first paint, then syncs on mount.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    setPrefersReduced(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
