import type { Config } from "tailwindcss";

/**
 * Build a fluid font size: a clamp() that scales LINEARLY with the viewport
 * width from `minPx` at 360px up to `maxPx` at 1280px, then holds steady
 * outside that range. Every size in the scale shares the same 360→1280 window,
 * so the whole type system grows/shrinks by the same percentage together.
 *
 * Anchor: the smallest body text (`text-sm`) is exactly 14px at 360px.
 */
function fluid(minPx: number, maxPx: number, minVw = 360, maxVw = 1280): string {
  const slope = (maxPx - minPx) / (maxVw - minVw); // px of size per px of viewport
  const intercept = minPx - slope * minVw; // px at 0 viewport width
  const vw = (slope * 100).toFixed(4); // slope expressed in vw units
  return `clamp(${minPx}px, calc(${intercept.toFixed(3)}px + ${vw}vw), ${maxPx}px)`;
}

/**
 * Centralized design tokens for the whole site.
 * Colors, type scale, spacing rhythm, radii, shadows and motion easing
 * all live here so the brand can be re-skinned from a single file.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep dark-purple foundation
        base: "#1A0B2E",
        elevated: "#2D1B4E",
        surface: "#241241",
        line: "rgba(255,255,255,0.08)",
        // Accents (use sparingly for CTAs / highlights)
        accent: {
          DEFAULT: "#A24BFF",
          soft: "#C77DFF",
          deep: "#7B2FE0",
        },
        magenta: "#FF49C0",
        // Text
        ink: "#FFFFFF",
        muted: "rgba(255,255,255,0.70)",
        faint: "rgba(255,255,255,0.50)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid type scale. Body / paragraph text bottoms out at 14px @ 360px
        // and scales up to a comfortable reading size at 1280px. Headings keep
        // their larger fluid curve. [minPx @ 360px → maxPx @ 1280px]
        xs: [fluid(12, 14), { lineHeight: "1.5" }], //        12 → 14 (labels/eyebrows)
        sm: [fluid(14, 16), { lineHeight: "1.5" }], //        14 → 16 (small body)
        base: [fluid(14, 17), { lineHeight: "1.6" }], //      14 → 17 (paragraph)
        lg: [fluid(14, 18), { lineHeight: "1.6" }], //        14 → 18 (lead paragraph)
        // Headings shrink markedly on narrow screens: the 360px end is ~40%
        // smaller than the 1280px end so big headers don't overflow on phones,
        // while desktop sizes are unchanged. The whole heading range scales
        // together to keep the hierarchy intact.
        xl: [fluid(15, 25), { lineHeight: "1.45" }], //       15 → 25 (small heading)
        "2xl": [fluid(17, 30), { lineHeight: "1.3" }], //     17 → 30
        "3xl": [fluid(19, 37.5), { lineHeight: "1.25" }], //  19 → 37.5
        "4xl": [fluid(22, 45), { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "5xl": [fluid(26, 55), { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        // Oversized display headings (~40% smaller at 360px).
        "display-sm": [fluid(28, 57.5), { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        display: [fluid(34, 70), { lineHeight: "1.0", letterSpacing: "-0.04em" }],
        "display-lg": [fluid(36, 75), { lineHeight: "0.95", letterSpacing: "-0.05em" }],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(162,75,255,0.55)",
        "glow-strong": "0 0 80px -10px rgba(162,75,255,0.75)",
        card: "0 20px 60px -30px rgba(0,0,0,0.8)",
      },
      maxWidth: {
        container: "80rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
