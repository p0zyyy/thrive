"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/hooks/useCart";
import { useLenis } from "@/hooks/useLenis";
import { Cursor } from "@/components/Cursor";

/** Runs the Lenis rAF loop; renders nothing. */
function SmoothScroll() {
  useLenis();
  return null;
}

/** Client-side app shell: cart context, smooth scroll, custom cursor. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <SmoothScroll />
      {children}
      <Cursor />
    </CartProvider>
  );
}
