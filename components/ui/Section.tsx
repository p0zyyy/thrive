import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Container } from "./Container";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Render without the inner Container (for full-bleed sections). */
  bleed?: boolean;
  children: ReactNode;
  "aria-label"?: string;
}

/** Consistent vertical rhythm + scroll anchor for every page section. */
export function Section({
  id,
  className,
  containerClassName,
  bleed = false,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      // scroll-mt offsets the sticky nav when jumping via anchor links
      className={cn("relative scroll-mt-24 py-24 md:py-32", className)}
      {...rest}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
