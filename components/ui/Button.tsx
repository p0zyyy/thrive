import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-glow hover:bg-accent-soft hover:shadow-glow-strong active:scale-[0.98]",
  secondary:
    "border border-line bg-white/5 text-ink backdrop-blur-sm hover:bg-white/10 active:scale-[0.98]",
  ghost: "text-ink hover:text-accent-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-base",
  lg: "h-14 px-9 text-base md:text-lg",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: never;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  /** Open external links in a new tab. */
  external?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Reusable pill button. Renders an <a>/<Link> when `href` is provided. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, children, ...props },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props as ButtonAsLink;
    const isHash = href.startsWith("#");
    if (external || isHash) {
      return (
        <a
          href={href}
          className={classes}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(rest as Record<string, unknown>)}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
});
