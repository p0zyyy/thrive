import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Centered max-width wrapper with responsive horizontal padding. */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-container px-6 md:px-10", className)}>
      {children}
    </Tag>
  );
}
