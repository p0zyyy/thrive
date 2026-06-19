import { frequencies, plans } from "./data";
import type { FrequencyId } from "./types";

/** Format a number as SGD currency, e.g. "S$39.90" / "S$108". */
export function formatPrice(value: number): string {
  const formatted = new Intl.NumberFormat("en-SG", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
  // Prefix with "S$" so SGD is never confused with USD.
  return `S$${formatted}`;
}

export function getPlan(planId: string) {
  return plans.find((p) => p.id === planId);
}

export function getFrequency(frequencyId: FrequencyId) {
  return frequencies.find((f) => f.id === frequencyId) ?? frequencies[0];
}

/** Discounted price for a single packet at a given frequency. */
export function pricePerPacket(planId: string, frequencyId: FrequencyId): number {
  const plan = getPlan(planId);
  const freq = getFrequency(frequencyId);
  if (!plan) return 0;
  return plan.basePricePerPacket * freq.priceMultiplier;
}

/** Total charged per delivery for a plan at a given frequency and quantity. */
export function pricePerDelivery(
  planId: string,
  frequencyId: FrequencyId,
  quantity = 1,
): number {
  const plan = getPlan(planId);
  if (!plan) return 0;
  return pricePerPacket(planId, frequencyId) * plan.packets * quantity;
}

/** Percentage saved vs. the full (monthly) per-packet reference price. */
export function savingsPercent(frequencyId: FrequencyId): number {
  const freq = getFrequency(frequencyId);
  return Math.round((1 - freq.priceMultiplier) * 100);
}

/** Round a currency value to 2 dp for safe arithmetic/display. */
export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
