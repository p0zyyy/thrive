/** Shared domain types for the storefront. */

export type FrequencyId = "monthly" | "bimonthly" | "quarterly";

export interface Frequency {
  id: FrequencyId;
  label: string;
  /** Short helper shown under the toggle, e.g. "Every 7 days". */
  cadence: string;
  /** Multiplier applied to the base per-bag price (loyalty discount). */
  priceMultiplier: number;
  /** Approx. deliveries per month — used to estimate monthly spend. */
  deliveriesPerMonth: number;
}

export interface Plan {
  id: string;
  name: string;
  /** Packets shipped per delivery. */
  packets: number;
  /** Base price PER PACKET before frequency discount, in SGD. */
  basePricePerPacket: number;
  description: string;
  perks: string[];
  popular?: boolean;
}

/** A functional mushroom in the blend. */
export interface Mushroom {
  id: string;
  name: string;
  /** Short headline benefit, e.g. "Focus & clarity". */
  benefit: string;
  /** One-line description. */
  note: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Step {
  id: string;
  /** Path to the looping demo clip (animated webp) in /public. */
  image: string;
  /** Alt text describing what the clip shows. */
  alt: string;
  /** Instruction copy for the step. */
  description: string;
}

export interface ProductDetail {
  label: string;
  value: string;
}

/** One phase in the "what you'll experience over time" timeline. */
export interface TimelinePhase {
  id: string;
  /** Time marker, e.g. "Week 1", "Month 3". */
  marker: string;
  /** Short headline benefit for the phase. */
  title: string;
  /** Fuller description of what changes in this phase. */
  body: string;
}

/** A line in the cart. For this single-product store there is at most one. */
export interface CartItem {
  planId: string;
  frequency: FrequencyId;
  quantity: number;
}
