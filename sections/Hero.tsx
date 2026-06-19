"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { CoffeePacket } from "@/components/CoffeePacket";
import { brand, product } from "@/lib/data";
import { EASE_SMOOTH } from "@/lib/theme";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  // Parallax: as the hero scrolls away, the packet drifts up and the giant
  // background word drifts down, creating layered depth.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const packetY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const wordY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      {/* oversized ghost word behind everything */}
      <motion.span
        aria-hidden
        style={{ y: wordY }}
        className="pointer-events-none absolute inset-x-0 top-1/2 z-0 select-none text-center text-[28vw] font-extrabold leading-none tracking-tightest text-white/[0.03]"
      >
        THRIVE
      </motion.span>

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-xs font-medium text-muted"
            >
              <span className="h-2 w-2 rounded-full bg-magenta" />
              Half the caffeine · 6 functional mushrooms
            </motion.div>

            <h1 className="text-display font-extrabold leading-[0.9]">
              <span className="block overflow-hidden">
                <SplitText text="Half the caffeine." />
              </span>
              <span className="block overflow-hidden">
                <SplitText text="All the focus." className="text-gradient" delay={0.25} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: 0.7 }}
              className="mt-7 max-w-md text-lg text-muted"
            >
              {brand.product} is smooth arabica blended with six functional mushrooms.
              Calm, all-day energy with none of the jitters, delivered across Singapore
              on your schedule.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: 0.85 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <Button href="#plans" size="lg">
                  Start your subscription
                </Button>
              </MagneticButton>
              <Button href="#blend" variant="secondary" size="lg">
                Explore the blend
              </Button>
            </motion.div>

            {/* trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-faint"
            >
              <span className="flex items-center gap-2">
                <Stars /> 4.9/5 from 2,400+ subscribers
              </span>
              <span>·</span>
              <span>Free delivery across Singapore</span>
            </motion.div>
          </div>

          {/* packet visual */}
          <motion.div
            style={{ y: packetY }}
            initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: EASE_SMOOTH, delay: 0.3 }}
            className="relative mx-auto w-full max-w-sm"
          >
            {/* glow halo */}
            <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-accent/30 blur-[90px]" />
            {/* slow rotating accent ring */}
            <div className="absolute -inset-6 -z-10 animate-spin-slow rounded-full border border-dashed border-white/10" />
            <div className="animate-float">
              <CoffeePacket className="drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* scroll indicator */}
      <motion.a
        href="#product"
        aria-label="Scroll to product"
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-faint"
      >
        Scroll
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-line">
          <motion.span
            className="mt-2 h-2 w-1 rounded-full bg-accent-soft"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}

function Stars() {
  return (
    <span className="inline-flex" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FF49C0">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      ))}
    </span>
  );
}
