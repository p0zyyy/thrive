"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { timeline } from "@/lib/data";
import { colors } from "@/lib/theme";
import type { TimelinePhase } from "@/lib/types";

/**
 * Scroll-lit benefits timeline. A vertical rail fills from the top and a glowing
 * arrow indicator travels down it (pinned near viewport centre) as the user
 * scrolls. Each hollow node lights up the moment the arrow passes it and stays
 * lit. Each phase's copy fades in as it reaches the centre of the viewport and
 * fades back out as it leaves. Reduced motion shows everything lit and static.
 */
export function Timeline() {
  const reduced = usePrefersReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  // Progress as the rail travels through the viewport centre: 0 when the top of
  // the rail hits centre, 1 when the bottom does. The indicator's offset within
  // the rail equals the scrolled distance, so it stays pinned near screen centre.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start center", "end center"],
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const indicatorTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="timeline" className="bg-elevated/40">
      <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
        <Reveal>
          <Eyebrow className="justify-center">Your journey</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-5 max-w-2xl text-display-sm font-extrabold">
            What Benefits Will You Experience By Drinking{" "}
            <span className="text-gradient">Thrive?</span>
          </h2>
        </Reveal>
      </div>

      <div ref={railRef} className="relative mx-auto max-w-2xl">
        {/* faint static track */}
        <span
          aria-hidden
          className="absolute bottom-3 left-[15px] top-3 w-[2px] -translate-x-1/2 rounded-full bg-line"
        />
        {/* bright progress fill (grows with scroll) */}
        <motion.span
          aria-hidden
          className="absolute left-[15px] top-3 w-[2px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-accent-soft via-accent to-magenta"
          style={reduced ? { height: "100%" } : { height: fillHeight }}
        />

        {/* travelling arrow indicator */}
        {!reduced && (
          <motion.span
            aria-hidden
            className="absolute left-[15px] top-3 z-20 -translate-x-1/2"
            style={{ top: indicatorTop }}
          >
            <span className="relative grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-accent-soft/60 bg-base text-accent-soft shadow-glow">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
              <ArrowDown />
            </span>
          </motion.span>
        )}

        <ol className="flex flex-col gap-16 pl-12 md:gap-24 md:pl-16">
          {timeline.map((phase) => (
            <Phase key={phase.id} phase={phase} reduced={reduced} />
          ))}
        </ol>
      </div>
    </Section>
  );
}

/**
 * A single timeline phase. Its node lights up as the centre-pinned arrow passes
 * it (and stays lit); its copy fades in/out as the phase passes the centre.
 */
function Phase({ phase, reduced }: { phase: TimelinePhase; reduced: boolean }) {
  const ref = useRef<HTMLLIElement>(null);

  // Full pass-through of the phase: 0 when it enters from the bottom, 1 when it
  // exits the top. Only used to fade the copy back out once the phase leaves the
  // centre and heads off-screen.
  const { scrollYProgress: pass } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const fadeOut = useTransform(pass, [0.62, 0.84], [1, 0]);

  // Node ignition: the arrow sits at viewport centre, so the node lights up as
  // its top crosses ~50% of the viewport, then clamps lit for the rest. This is
  // the SAME signal that fades the copy in — text appears only as the arrow
  // ignites the node.
  const { scrollYProgress: cross } = useScroll({
    target: ref,
    offset: ["start 56%", "start 44%"],
  });
  const textY = useTransform(cross, [0, 1], [24, 0]);
  // Fade in with ignition, then fade out as the phase leaves the centre.
  const textOpacity = useTransform(
    [cross, fadeOut] as const,
    ([c, f]: number[]) => Math.min(c, f),
  );
  const nodeBg = useTransform(cross, [0, 1], [colors.base, colors.accent]);
  const nodeBorder = useTransform(
    cross,
    [0, 1],
    ["rgba(255,255,255,0.12)", colors.accentSoft],
  );
  const nodeShadow = useTransform(
    cross,
    [0, 1],
    ["0 0 0px 0px rgba(162,75,255,0)", "0 0 22px 3px rgba(162,75,255,0.75)"],
  );
  const nodeScale = useTransform(cross, [0, 1], [0.82, 1.12]);

  return (
    <li ref={ref} className="relative">
      {/* hollow node — left edge sits on the rail (rail x = 15px; list padding
          is 3rem mobile / 4rem desktop, so offset = 15px − padding). It lights
          up and grows as the arrow passes. */}
      <span
        aria-hidden
        className="absolute top-[2px] left-[-33px] -translate-x-1/2 md:left-[-49px]"
      >
        <motion.span
          className="block h-8 w-8 rounded-full border"
          style={
            reduced
              ? {
                  backgroundColor: colors.accent,
                  borderColor: colors.accentSoft,
                  boxShadow: "0 0 22px 3px rgba(162,75,255,0.6)",
                }
              : {
                  backgroundColor: nodeBg,
                  borderColor: nodeBorder,
                  boxShadow: nodeShadow,
                  scale: nodeScale,
                }
          }
        />
      </span>

      {/* copy — fades in at centre, fades out when leaving */}
      <motion.div style={reduced ? undefined : { opacity: textOpacity, y: textY }}>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-soft">
          {phase.marker}
        </p>
        <h3 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">
          {phase.title}
        </h3>
        <p className="mt-4 max-w-xl text-base text-muted md:text-lg">
          {phase.body}
        </p>
      </motion.div>
    </li>
  );
}

function ArrowDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="relative"
    >
      <path
        d="M12 5v14m0 0 5-5m-5 5-5-5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
