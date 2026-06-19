"use client";

import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { steps } from "@/lib/data";

export function HowItWorks() {
  return (
    <Section id="how">
      <div className="mb-14 max-w-2xl">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 text-display-sm font-extrabold">
            Three steps to better mornings.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg text-muted">
            No barista required. Set it once and let fresh coffee find you.
          </p>
        </Reveal>
      </div>

      <Reveal stagger className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <RevealItem key={step.id}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-base/60 transition-colors hover:border-accent/40">
              {/* looping demo clip */}
              <div className="relative aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* dark gradient anchors the step number */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-accent text-lg font-extrabold text-white shadow-glow">
                  {i + 1}
                </span>
              </div>
              <p className="relative p-7 text-muted">{step.description}</p>
            </article>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
