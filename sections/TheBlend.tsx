"use client";

import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { mushrooms } from "@/lib/data";

/**
 * Showcases the six functional mushrooms in the blend — the core selling
 * point. Each mushroom is a card with its headline benefit and a one-liner.
 */
export function TheBlend() {
  return (
    <Section id="blend" className="bg-elevated/40">
      <div className="mb-14 max-w-2xl">
        <Reveal>
          <Eyebrow>The blend</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 text-display-sm font-extrabold">
            Six functional mushrooms. One smooth cup.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg text-muted">
            Every serving is dual-extracted for potency, then blended into smooth
            arabica, so you get the benefits without any earthy aftertaste.
          </p>
        </Reveal>
      </div>

      <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mushrooms.map((m, i) => (
          <RevealItem key={m.id}>
            <article className="group relative h-full overflow-hidden rounded-3xl border border-line bg-base/60 p-7 transition-colors hover:border-accent/40">
              {/* index watermark */}
              <span className="pointer-events-none absolute -right-1 -top-5 text-[6rem] font-extrabold leading-none text-white/[0.04]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent-soft transition-colors group-hover:bg-accent group-hover:text-white">
                <MushroomIcon />
              </span>
              <h3 className="relative mt-5 text-xl font-bold">{m.name}</h3>
              <p className="relative mt-1 text-sm font-semibold text-accent-soft">
                {m.benefit}
              </p>
              <p className="relative mt-3 text-sm text-muted">{m.note}</p>
            </article>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}

function MushroomIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      {/* cap */}
      <path
        d="M4 11a8 8 0 0 1 16 0c0 1-.9 1.6-2 1.6H6c-1.1 0-2-.6-2-1.6z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* stem */}
      <path
        d="M10 12.6c0 2.5-.3 4.6-1 6.4h6c-.7-1.8-1-3.9-1-6.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="9" r="1" fill="currentColor" />
      <circle cx="14.5" cy="8.4" r="0.8" fill="currentColor" />
    </svg>
  );
}
