import { cn } from "@/lib/utils";

/**
 * Self-contained SVG illustration of the coffee packet (stand-up pouch).
 * No external image asset — pure gradients + paths so it stays crisp at any
 * size and ships zero bytes of imagery. Swap for a <Image/> later if desired.
 */
export function CoffeePacket({
  className,
  label = "THRIVE",
  sub = "MUSHROOM COFFEE",
}: {
  className?: string;
  label?: string;
  sub?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 440"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Thrive six-mushroom coffee packet"
    >
      <defs>
        <linearGradient id="bagBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3A1D63" />
          <stop offset="45%" stopColor="#241241" />
          <stop offset="100%" stopColor="#160826" />
        </linearGradient>
        <linearGradient id="bagSheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="80%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="foilTop" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C77DFF" />
          <stop offset="50%" stopColor="#A24BFF" />
          <stop offset="100%" stopColor="#FF49C0" />
        </linearGradient>
        <radialGradient id="emblem" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FF49C0" />
          <stop offset="100%" stopColor="#A24BFF" />
        </radialGradient>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="160" cy="420" rx="110" ry="16" fill="#000" opacity="0.35" />

      {/* crimped foil top */}
      <rect x="64" y="20" width="192" height="26" rx="4" fill="url(#foilTop)" />
      <g stroke="#160826" strokeWidth="3" opacity="0.5">
        <line x1="80" y1="20" x2="80" y2="46" />
        <line x1="100" y1="20" x2="100" y2="46" />
        <line x1="120" y1="20" x2="120" y2="46" />
        <line x1="140" y1="20" x2="140" y2="46" />
        <line x1="160" y1="20" x2="160" y2="46" />
        <line x1="180" y1="20" x2="180" y2="46" />
        <line x1="200" y1="20" x2="200" y2="46" />
        <line x1="220" y1="20" x2="220" y2="46" />
        <line x1="240" y1="20" x2="240" y2="46" />
      </g>

      {/* bag body */}
      <path
        d="M58 50 H262 a8 8 0 0 1 8 8 V392 a16 16 0 0 1 -16 16 H66 a16 16 0 0 1 -16 -16 V58 a8 8 0 0 1 8 -8 Z"
        fill="url(#bagBody)"
        stroke="#4A2A78"
        strokeWidth="1.5"
      />
      {/* sheen overlay */}
      <path
        d="M58 50 H262 a8 8 0 0 1 8 8 V392 a16 16 0 0 1 -16 16 H66 a16 16 0 0 1 -16 -16 V58 a8 8 0 0 1 8 -8 Z"
        fill="url(#bagSheen)"
      />

      {/* emblem */}
      <circle cx="160" cy="150" r="46" fill="url(#emblem)" opacity="0.95" />
      <circle cx="160" cy="150" r="46" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" />
      {/* simple steam/cup mark */}
      <g stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.95">
        <path d="M150 138 q-6 -10 0 -20" />
        <path d="M160 138 q-6 -10 0 -20" />
        <path d="M170 138 q-6 -10 0 -20" />
      </g>
      <rect x="138" y="146" width="44" height="26" rx="6" fill="none" stroke="#fff" strokeWidth="4" />
      <path d="M182 152 q12 2 0 14" stroke="#fff" strokeWidth="4" fill="none" />

      {/* wordmark */}
      <text
        x="160"
        y="244"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="800"
        fontSize="34"
        letterSpacing="2"
        fill="#fff"
      >
        {label}
      </text>
      <text
        x="160"
        y="274"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="500"
        fontSize="12"
        letterSpacing="3.5"
        fill="#C77DFF"
      >
        {sub}
      </text>

      {/* divider + meta */}
      <line x1="96" y1="300" x2="224" y2="300" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.5" />
      <text
        x="160"
        y="326"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="500"
        fontSize="11"
        letterSpacing="3"
        fill="#fff"
        opacity="0.7"
      >
        6 FUNCTIONAL MUSHROOMS
      </text>
      <text
        x="160"
        y="348"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="400"
        fontSize="11"
        letterSpacing="3"
        fill="#fff"
        opacity="0.55"
      >
        HALF THE CAFFEINE · 30 SERVINGS
      </text>

      {/* bottom valve dot */}
      <circle cx="160" cy="380" r="6" fill="#A24BFF" opacity="0.8" />
    </svg>
  );
}
