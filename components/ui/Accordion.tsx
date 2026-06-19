"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/theme";
import { cn } from "@/lib/utils";
import type { Faq } from "@/lib/types";

/**
 * Accessible single-open accordion for the FAQ.
 * - Header is a real <button> toggling aria-expanded.
 * - Panel is linked via aria-controls / aria-labelledby.
 * - Height animates; content fades. Respects reduced motion via global CSS.
 */
export function Accordion({ items }: { items: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <AccordionRow
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
        />
      ))}
    </div>
  );
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const uid = useId();
  const panelId = `faq-panel-${uid}`;
  const buttonId = `faq-button-${uid}`;

  return (
    <div>
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span
            className={cn(
              "text-lg font-medium transition-colors md:text-xl",
              isOpen ? "text-ink" : "text-muted group-hover:text-ink",
            )}
          >
            {item.question}
          </span>
          <span
            aria-hidden
            className={cn(
              "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line transition-colors",
              isOpen ? "bg-accent text-white" : "text-muted group-hover:text-ink",
            )}
          >
            <motion.span
              className="absolute h-[2px] w-3.5 rounded bg-current"
              animate={{ rotate: isOpen ? 0 : 0 }}
            />
            <motion.span
              className="absolute h-[2px] w-3.5 rounded bg-current"
              animate={{ rotate: isOpen ? 0 : 90 }}
              transition={{ duration: 0.3, ease: EASE_SMOOTH }}
            />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_SMOOTH }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 text-muted">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
