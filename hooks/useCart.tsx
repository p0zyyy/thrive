"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_FREQUENCY } from "@/lib/data";
import { pricePerDelivery } from "@/lib/format";
import type { CartItem, FrequencyId } from "@/lib/types";

const STORAGE_KEY = "thrive-cart-v1";

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  subtotal: number;
  /** Hydrated from localStorage yet? Avoids SSR/client flash. */
  hydrated: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  /** Add or replace the subscription line for a plan. */
  addToCart: (item: CartItem) => void;
  removeFromCart: (planId: string) => void;
  setQuantity: (planId: string, quantity: number) => void;
  setItemFrequency: (planId: string, frequency: FrequencyId) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart once on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // Corrupt storage — start clean.
    }
    setHydrated(true);
  }, []);

  // Persist on every change (after hydration so we don't clobber storage).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full / unavailable — non-fatal.
    }
  }, [items, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((o) => !o), []);

  const addToCart = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.planId === item.planId);
      if (existing) {
        // Same plan already in cart — update freq and bump quantity.
        return prev.map((i) =>
          i.planId === item.planId
            ? { ...i, frequency: item.frequency, quantity: i.quantity + item.quantity }
            : i,
        );
      }
      return [...prev, item];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((planId: string) => {
    setItems((prev) => prev.filter((i) => i.planId !== planId));
  }, []);

  const setQuantity = useCallback((planId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.planId === planId ? { ...i, quantity: Math.max(0, quantity) } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const setItemFrequency = useCallback((planId: string, frequency: FrequencyId) => {
    setItems((prev) =>
      prev.map((i) => (i.planId === planId ? { ...i, frequency } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, i) => sum + pricePerDelivery(i.planId, i.frequency, i.quantity),
        0,
      ),
    [items],
  );

  const value: CartContextValue = {
    items,
    isOpen,
    count,
    subtotal,
    hydrated,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    removeFromCart,
    setQuantity,
    setItemFrequency,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export { DEFAULT_FREQUENCY };
