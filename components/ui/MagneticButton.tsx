"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** How far the element drifts toward the cursor (px at the edge). */
  strength?: number;
}

/**
 * Wraps content and gently pulls it toward the pointer while hovering — the
 * classic "magnetic" micro-interaction. The offset is driven by springs for a
 * soft settle, and disabled entirely under reduced-motion / touch.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.4,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Distance of cursor from element center, scaled by `strength`.
    const relX = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const relY = (event.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(relX);
    y.set(relY);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
