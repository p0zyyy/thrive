"use client";

import { benefitTicker } from "@/lib/data";

/**
 * Infinite benefit ticker placed directly beneath the hero packet.
 *
 * The track is the benefit list rendered twice; the `marquee` keyframe
 * (defined in tailwind.config.ts) translates it -50%, so the second copy
 * lands exactly where the first started — a seamless loop. The animation
 * pauses on hover and is frozen by the global reduced-motion CSS rule.
 *
 * For screen readers the benefits are listed once in an sr-only list and the
 * animated, duplicated track is hidden via aria-hidden.
 */
export function BenefitsMarquee() {
  const row = [...benefitTicker, ...benefitTicker];

  return (
    <section aria-label="Key benefits" className="relative border-y border-line bg-elevated/40">
      {/* accessible, non-animated copy */}
      <ul className="sr-only">
        {benefitTicker.map((b) => (
          <li key={b.id}>{b.label}</li>
        ))}
      </ul>

      {/* animated visual ticker */}
      <div
        aria-hidden
        className="group flex overflow-hidden py-5 md:py-6"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <ul
          className="flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "32s" }}
        >
          {row.map((b, i) => (
            <li key={`${b.id}-${i}`} className="flex items-center gap-3 px-7 md:px-9">
              <span className="text-accent-soft">{icons[b.id]}</span>
              <span className="whitespace-nowrap text-lg font-semibold uppercase tracking-tight md:text-2xl">
                {b.label}
              </span>
              <Sparkle />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Small magenta separator between benefits. */
function Sparkle() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className="ml-4 text-magenta" aria-hidden>
      <path
        d="M12 2c.6 4.8 2.6 6.8 7.4 7.4-4.8.6-6.8 2.6-7.4 7.4-.6-4.8-2.6-6.8-7.4-7.4C9.4 8.8 11.4 6.8 12 2z"
        fill="currentColor"
      />
    </svg>
  );
}

/* 24×24 stroke icons, keyed by benefit id. */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const icons: Record<string, JSX.Element> = {
  // gut health — leaf (digestive / natural wellness)
  "gut-health": (
    <svg width="26" height="26" viewBox="0 0 24 24" {...stroke}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  ),
  // sharp focus — target / bullseye
  focus: (
    <svg width="26" height="26" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  // better sleep — crescent moon + star
  sleep: (
    <svg width="26" height="26" viewBox="0 0 24 24" {...stroke}>
      <path d="M20 13.4A7.5 7.5 0 1 1 10.6 4 6 6 0 0 0 20 13.4z" />
      <path
        d="M17.6 3.9l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
  // boosts energy — lightning bolt
  energy: (
    <svg width="26" height="26" viewBox="0 0 24 24" {...stroke}>
      <path d="M13 2.5 5 13.5h5l-1 8 8.5-11.5H13l1-7.5z" />
    </svg>
  ),
  // stronger immunity — shield with check
  immunity: (
    <svg width="26" height="26" viewBox="0 0 24 24" {...stroke}>
      <path d="M12 3l7 2.6v5.1c0 4.4-3 7.5-7 8.8-4-1.3-7-4.4-7-8.8V5.6L12 3z" />
      <path d="M9 12l2.2 2.2L15.3 10" />
    </svg>
  ),
};
