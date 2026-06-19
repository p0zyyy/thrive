"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { frequencies, plans } from "@/lib/data";
import { formatPrice, getFrequency, pricePerDelivery } from "@/lib/format";
import { EASE_SMOOTH } from "@/lib/theme";
import type { FrequencyId } from "@/lib/types";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    removeFromCart,
    setQuantity,
    setItemFrequency,
  } = useCart();

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-hidden
          />

          {/* panel */}
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            className="fixed inset-y-0 right-0 z-[95] flex w-full max-w-md flex-col border-l border-line bg-elevated shadow-card"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE_SMOOTH }}
          >
            <header className="flex items-center justify-between border-b border-line px-6 py-5">
              <div>
                <h2 className="text-xl font-bold">Your subscription</h2>
                <p className="text-sm text-faint">Adjust before checkout</p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <EmptyState onClose={closeCart} />
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => {
                    const plan = plans.find((p) => p.id === item.planId);
                    if (!plan) return null;
                    const freq = getFrequency(item.frequency);
                    const linePrice = pricePerDelivery(
                      item.planId,
                      item.frequency,
                      item.quantity,
                    );
                    return (
                      <li
                        key={item.planId}
                        className="rounded-2xl border border-line bg-white/5 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold">{plan.name} plan</p>
                            <p className="text-sm text-faint">
                              {plan.packets} × 30 servings · {freq.label.toLowerCase()}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.planId)}
                            className="text-sm text-faint underline-offset-2 hover:text-magenta hover:underline"
                          >
                            Remove
                          </button>
                        </div>

                        {/* frequency selector */}
                        <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-faint">
                          Delivery frequency
                        </label>
                        <div className="mt-2 flex gap-2">
                          {frequencies.map((f) => (
                            <button
                              key={f.id}
                              type="button"
                              onClick={() =>
                                setItemFrequency(item.planId, f.id as FrequencyId)
                              }
                              className={`flex-1 rounded-full px-2 py-1.5 text-xs font-semibold transition-colors ${
                                item.frequency === f.id
                                  ? "bg-accent text-white"
                                  : "border border-line text-muted hover:text-ink"
                              }`}
                            >
                              {f.label}
                            </button>
                          ))}
                        </div>

                        {/* quantity + price */}
                        <div className="mt-4 flex items-center justify-between">
                          <QtyStepper
                            value={item.quantity}
                            onChange={(q) => setQuantity(item.planId, q)}
                          />
                          <span className="font-bold">{formatPrice(linePrice)}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-line px-6 py-6">
                <div className="mb-4 flex items-center justify-between text-lg">
                  <span className="text-muted">Subtotal / delivery</span>
                  <span className="font-extrabold">{formatPrice(subtotal)}</span>
                </div>
                <p className="mb-4 text-xs text-faint">
                  Free delivery across Singapore · Pause or cancel anytime
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex h-14 w-full items-center justify-center rounded-full bg-accent text-base font-semibold text-white shadow-glow transition-all hover:bg-accent-soft hover:shadow-glow-strong"
                >
                  Checkout
                </Link>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function QtyStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-line">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        aria-label="Decrease quantity"
        className="grid h-9 w-9 place-items-center text-muted transition-colors hover:text-ink"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
        className="grid h-9 w-9 place-items-center text-muted transition-colors hover:text-ink"
      >
        +
      </button>
    </div>
  );
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center py-20 text-center">
      <div className="mb-5 grid h-16 w-16 place-items-center rounded-full border border-line text-faint">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .7h8.7a1 1 0 0 0 1-.8L21 8H6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="text-lg font-semibold">Your cart is empty</p>
      <p className="mt-1 max-w-xs text-sm text-faint">
        Choose a plan to start your mushroom coffee subscription.
      </p>
      <a
        href="#plans"
        onClick={onClose}
        className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-accent-soft"
      >
        Browse plans
      </a>
    </div>
  );
}
