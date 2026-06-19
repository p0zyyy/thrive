"use client";

import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { frequencies, plans, DEFAULT_FREQUENCY } from "@/lib/data";
import {
  formatPrice,
  getFrequency,
  pricePerPacket,
  pricePerDelivery,
  savingsPercent,
} from "@/lib/format";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import type { FrequencyId } from "@/lib/types";

export function Plans() {
  const [frequency, setFrequency] = useState<FrequencyId>(DEFAULT_FREQUENCY);
  const { addToCart, items } = useCart();
  const freq = getFrequency(frequency);
  const savings = savingsPercent(frequency);

  return (
    <Section id="plans">
      <div className="mb-12 flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow>Subscription plans</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-display-sm font-extrabold">
            Pick your pace. Change it anytime.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-md text-lg text-muted">
            The longer your cycle, the more you save. All plans ship free.
          </p>
        </Reveal>

        {/* frequency toggle */}
        <Reveal delay={0.15}>
          <LayoutGroup>
            <div
              role="radiogroup"
              aria-label="Delivery frequency"
              className="mt-9 inline-flex rounded-full border border-line bg-white/5 p-1.5 backdrop-blur-sm"
            >
              {frequencies.map((f) => {
                const active = f.id === frequency;
                return (
                  <button
                    key={f.id}
                    role="radio"
                    aria-checked={active}
                    onClick={() => setFrequency(f.id as FrequencyId)}
                    className={cn(
                      "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                      active ? "text-white" : "text-muted hover:text-ink",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="freq-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-accent shadow-glow"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {f.label}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-4 h-5 text-sm text-accent-soft">
            {savings > 0
              ? `Save ${savings}% vs. monthly · ${freq.cadence}`
              : `Standard price · ${freq.cadence}`}
          </p>
        </Reveal>
      </div>

      {/* pricing cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan, i) => {
          const perPacket = pricePerPacket(plan.id, frequency);
          const perDelivery = pricePerDelivery(plan.id, frequency, 1);
          const inCart = items.some((it) => it.planId === plan.id);
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative flex flex-col rounded-3xl border p-8",
                plan.popular
                  ? "border-accent/60 bg-gradient-to-b from-accent/15 to-elevated shadow-glow"
                  : "border-line bg-elevated/60",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-glow">
                  Most popular
                </span>
              )}

              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="mt-2 min-h-[3rem] text-sm text-muted">{plan.description}</p>

              {/* price — recomputed live from the frequency toggle */}
              <div className="mt-6 flex items-end gap-1">
                <span className="text-5xl font-extrabold tracking-tight">
                  {formatPrice(perPacket)}
                </span>
                <span className="mb-2 text-muted">/ packet</span>
              </div>
              <p className="mt-1 text-sm text-faint">
                {formatPrice(perDelivery)} per delivery · {plan.packets} × 30 servings
              </p>

              <ul className="mt-7 space-y-3">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 text-accent-soft" aria-hidden>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12l4 4L19 6"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-muted">{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-2">
                <Button
                  variant={plan.popular ? "primary" : "secondary"}
                  className="w-full"
                  onClick={() =>
                    addToCart({ planId: plan.id, frequency, quantity: 1 })
                  }
                >
                  {inCart ? "Add another" : "Start subscription"}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-faint">
        Prices update instantly with your chosen frequency. Cancel anytime.
      </p>
    </Section>
  );
}
