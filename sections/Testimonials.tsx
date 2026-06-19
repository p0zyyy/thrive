"use client";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/lib/data";
import type { Testimonial } from "@/lib/types";

export function Testimonials() {
  // Duplicate the list so the marquee can loop seamlessly (translateX -50%).
  const row = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      aria-label="Customer testimonials"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <Container>
        <div className="mb-12 flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>Loved by thousands</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-2xl text-display-sm font-extrabold">
              People don&apos;t go back to regular coffee.
            </h2>
          </Reveal>
        </div>
      </Container>

      {/* marquee — pauses on hover; CSS animation respects reduced-motion */}
      <div
        className="group relative flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <ul className="flex shrink-0 animate-marquee gap-6 pr-6 group-hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <QuoteCard key={`${t.id}-${i}`} t={t} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function QuoteCard({ t }: { t: Testimonial }) {
  return (
    <li className="w-[340px] shrink-0 rounded-3xl border border-line bg-elevated/60 p-7 backdrop-blur-sm sm:w-[400px]">
      <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FF49C0" aria-hidden>
            <path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7L12 2z" />
          </svg>
        ))}
      </div>
      <blockquote className="mt-4 text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/20 font-bold text-accent-soft">
          {t.author.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold">{t.author}</span>
          <span className="block text-xs text-faint">{t.role}</span>
        </span>
      </figcaption>
    </li>
  );
}
