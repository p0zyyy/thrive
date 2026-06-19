"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { brand, navLinks } from "@/lib/data";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { EASE_SMOOTH } from "@/lib/theme";

export function Navbar() {
  const { count, toggleCart, hydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Condense + add a backdrop once the user scrolls past the hero fold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Restore scroll synchronously before Lenis handles the anchor scroll.
  const closeMenu = () => {
    document.body.style.overflow = "";
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_SMOOTH, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "mx-auto flex max-w-container items-center justify-between gap-6 px-6 transition-all duration-300 md:px-10",
            scrolled
              ? "my-3 rounded-full border border-line bg-base/70 py-3 backdrop-blur-md"
              : "py-5",
          )}
          // sit inside container padding when scrolled
          style={scrolled ? { marginLeft: "1.5rem", marginRight: "1.5rem" } : undefined}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-extrabold tracking-tight"
            aria-label={`${brand.name} home`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-sm font-black text-white shadow-glow">
              T
            </span>
            {brand.name}
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={toggleCart}
              className="group relative inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/10"
              aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
            >
              <CartIcon />
              <span className="hidden sm:inline">Cart</span>
              {hydrated && count > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-xs font-bold text-white">
                  {count}
                </span>
              )}
            </button>

            {/* mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/5 text-ink transition-colors hover:bg-white/10 md:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} count={count} hydrated={hydrated} />
    </>
  );
}

/* ----------------------------- mobile menu ----------------------------- */

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3, ease: EASE_SMOOTH, staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.25, ease: EASE_SMOOTH } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_SMOOTH } },
  exit: { opacity: 0, y: 12 },
};

function MobileMenu({
  open,
  onClose,
  count,
  hydrated,
}: {
  open: boolean;
  onClose: () => void;
  count: number;
  hydrated: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          variants={overlayVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-[100] flex flex-col bg-base/95 backdrop-blur-xl md:hidden"
        >
          {/* header row mirrors the navbar */}
          <div className="flex items-center justify-between px-6 py-5">
            <span className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-sm font-black text-white shadow-glow">
                T
              </span>
              {brand.name}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-white/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* links */}
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-6">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                variants={itemVariants}
                className="group flex items-center justify-between border-b border-line py-4 text-3xl font-bold tracking-tight transition-colors hover:text-accent-soft"
              >
                <span>{link.label}</span>
                <span className="font-mono text-sm text-faint">
                  0{i + 1}
                </span>
              </motion.a>
            ))}
          </nav>

          {/* footer actions */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3 px-6 pb-10">
            <a
              href="#plans"
              onClick={onClose}
              className="flex h-14 w-full items-center justify-center rounded-full bg-accent text-base font-semibold text-white shadow-glow transition-all hover:bg-accent-soft hover:shadow-glow-strong"
            >
              Start your subscription
            </a>
            <p className="text-center text-sm text-faint">
              {hydrated && count > 0
                ? `${count} item${count === 1 ? "" : "s"} in your cart`
                : "Free delivery across Singapore"}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .7h8.7a1 1 0 0 0 1-.8L21 8H6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}
