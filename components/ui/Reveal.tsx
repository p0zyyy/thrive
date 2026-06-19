"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_SMOOTH, STAGGER, motionDurations } from "@/lib/theme";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  /** When true, animate each direct child in sequence (stagger). */
  stagger?: boolean;
  once?: boolean;
}

/**
 * Scroll-triggered reveal. Wraps content and fades/slides it into view the
 * first time it enters the viewport. Set `stagger` to cascade direct children
 * (each child should be wrapped in <RevealItem/>).
 *
 * Motion is automatically disabled by the global reduced-motion CSS rule and
 * by Framer Motion's own reduced-motion handling.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  stagger = false,
  once = true,
}: RevealProps) {
  if (stagger) {
    const container: Variants = {
      hidden: {},
      show: {
        transition: { staggerChildren: STAGGER, delayChildren: delay },
      },
    };
    return (
      <motion.div
        className={className}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "-10% 0px -10% 0px" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: motionDurations.base, ease: EASE_SMOOTH, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered child for use inside <Reveal stagger>. */
export function RevealItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const item: Variants = {
    hidden: { opacity: 0, ...offset[direction] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: motionDurations.base, ease: EASE_SMOOTH },
    },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
