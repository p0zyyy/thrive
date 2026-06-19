"use client";

import { motion, type Variants } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Delay before the whole line starts animating. */
  delay?: number;
  /** Per-word stagger. */
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Splits a string into words and reveals them one-by-one with a mask-up
 * effect. Each word sits in an overflow-hidden wrapper so it slides up from
 * behind an invisible line — a common Awwwards intro flourish.
 *
 * The full string is exposed to assistive tech via aria-label; the animated
 * spans are hidden from screen readers to avoid per-word reading.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as = "span",
}: SplitTextProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word: Variants = {
    hidden: { y: "110%" },
    show: {
      y: "0%",
      transition: { duration: 0.7, ease: EASE_SMOOTH },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden
          className="relative inline-flex overflow-hidden align-bottom"
        >
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
          {/* preserve spaces between words */}
          {i < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </MotionTag>
  );
}
