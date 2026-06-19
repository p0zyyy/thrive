/**
 * JS-accessible mirror of the design tokens defined in tailwind.config.ts.
 * Use these when you need a raw value in TypeScript (e.g. Framer Motion,
 * inline SVG fills) rather than a Tailwind class.
 */
export const colors = {
  base: "#1A0B2E",
  elevated: "#2D1B4E",
  surface: "#241241",
  accent: "#A24BFF",
  accentSoft: "#C77DFF",
  accentDeep: "#7B2FE0",
  magenta: "#FF49C0",
  ink: "#FFFFFF",
} as const;

/** Shared easing curve used across all motion (matches Tailwind `ease-smooth`). */
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export const motionDurations = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
} as const;

/** Default stagger between children in revealed groups. */
export const STAGGER = 0.08;
