import { cn } from "@/lib/utils";

/** Small uppercase kicker label used above section headings. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent-soft",
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-accent-soft/60" />
      {children}
    </span>
  );
}
