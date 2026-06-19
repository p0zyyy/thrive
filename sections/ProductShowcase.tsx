"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { CoffeePacket } from "@/components/CoffeePacket";
import { product } from "@/lib/data";

export function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Gentle parallax drift on the packet as the section passes through view.
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <Section id="product">
      <div ref={ref} className="relative grid items-center gap-14 lg:grid-cols-2">
        {/* visual */}
        <motion.div style={{ y: imgY }} className="relative order-2 lg:order-1">
          <div className="absolute inset-0 -z-10 scale-75 rounded-full bg-magenta/20 blur-[100px]" />
          <div className="relative mx-auto max-w-sm">
            <CoffeePacket className="drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" />
          </div>

          {/* floating tasting-note chips */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {product.tastingNotes.map((note, i) => (
              <motion.span
                key={note}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="rounded-full border border-line bg-white/5 px-4 py-2 text-sm font-medium text-muted backdrop-blur-sm"
              >
                {note}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>{product.kicker}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-display-sm font-extrabold">{product.name}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg text-muted">{product.blurb}</p>
          </Reveal>

          {/* details grid */}
          <Reveal stagger className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {product.details.map((d) => (
              <RevealItem key={d.label} className="bg-elevated p-4">
                <dt className="text-xs uppercase tracking-wider text-faint">{d.label}</dt>
                <dd className="mt-1 font-semibold">{d.value}</dd>
              </RevealItem>
            ))}
          </Reveal>

          {/* benefits */}
          <Reveal stagger className="mt-10 space-y-5">
            {product.benefits.map((b) => (
              <RevealItem key={b.title} className="flex gap-4">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-soft">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M5 12l4 4L19 6"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="text-sm text-muted">{b.body}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
