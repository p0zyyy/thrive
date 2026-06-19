"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Custom animated cursor: a small dot that tracks the pointer exactly plus a
 * larger ring that lags behind via spring. The ring grows when hovering
 * interactive elements. Rendered only on fine-pointer (desktop) devices and
 * disabled under reduced motion — the OS cursor remains as a fallback.
 */
export function Cursor() {
  const prefersReduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const enabled = isDesktop && !prefersReduced;

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      // Grow the ring over clickable targets.
      const el = e.target as HTMLElement;
      setHovering(Boolean(el.closest("a, button, [data-cursor='hover'], input, textarea")));
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.body.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeEventListener("mouseleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* exact-tracking dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      />
      {/* lagging ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-soft"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          backgroundColor: hovering ? "rgba(162,75,255,0.12)" : "rgba(162,75,255,0)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  );
}
