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
            <article className="group relative flex h-full min-h-[19rem] flex-col justify-end overflow-hidden rounded-3xl border border-line bg-base/60 p-7 transition-colors [text-shadow:0_2px_16px_rgba(5,2,15,0.95)] hover:border-accent/40">
              {/* mushroom photo background (prominent) + legibility scrim. The
                  scrim is bottom-heavy so the photo reads clearly up top while
                  the copy stays legible over the darkened lower half. */}
              {m.image && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  {/* faint purple tint to keep photos on-brand */}
                  <div className="pointer-events-none absolute inset-0 bg-accent-deep/10 mix-blend-multiply" />
                  {/* darkening scrim for legibility (solid at the base) */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base via-base/75 to-base/10" />
                </>
              )}
              {/* index watermark */}
              <span className="pointer-events-none absolute -right-1 -top-5 text-[6rem] font-extrabold leading-none text-white/[0.04]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <h3 className="text-xl font-bold">{m.name}</h3>
                <p className="mt-1 text-sm font-semibold text-accent-soft">
                  {m.benefit}
                </p>
                <p className="mt-3 text-sm text-muted">{m.note}</p>
              </div>
            </article>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
