"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { brand, navLinks } from "@/lib/data";
import { Container } from "@/components/ui/Container";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-base pt-20">
      <Container>
        {/* newsletter CTA */}
        <div className="grid gap-10 pb-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Get wellness tips & first dibs on new blends.
            </h2>
            <p className="mt-3 max-w-md text-muted">
              Join the newsletter. No spam, just good coffee &amp; calmer mornings.
            </p>
          </div>
          <Newsletter />
        </div>

        <div className="hairline" />

        {/* link columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-extrabold tracking-tight"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-sm font-black text-white">
                T
              </span>
              {brand.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm text-faint">{brand.tagline}</p>
          </div>

          <FooterCol
            title="Explore"
            links={navLinks.map((l) => ({ label: l.label, href: l.href }))}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "About", href: "#story" },
              { label: "Sustainability", href: "#story" },
              { label: "Careers", href: "#" },
              { label: "Press", href: "#" },
            ]}
          />
          <FooterCol
            title="Support"
            links={[
              { label: "FAQ", href: "#faq" },
              { label: "Shipping", href: "#faq" },
              { label: "Manage subscription", href: "#" },
              { label: "Contact", href: "#" },
            ]}
          />
        </div>

        <div className="hairline" />

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-faint md:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.name} Coffee. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Social label="Instagram" href={brand.social.instagram} />
            <Social label="Twitter" href={brand.social.twitter} />
            <Social label="TikTok" href={brand.social.tiktok} />
          </div>
        </div>
      </Container>
    </footer>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Client-side validation only — submission is mocked.
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="you@example.com"
            aria-invalid={status === "error"}
            aria-describedby="newsletter-msg"
            className="h-14 w-full rounded-full border border-line bg-white/5 px-6 text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <button
          type="submit"
          className="h-14 shrink-0 rounded-full bg-accent px-8 font-semibold text-white shadow-glow transition-all hover:bg-accent-soft hover:shadow-glow-strong"
        >
          Subscribe
        </button>
      </div>
      <p
        id="newsletter-msg"
        role="status"
        aria-live="polite"
        className={`mt-3 h-5 text-sm ${
          status === "error" ? "text-magenta" : "text-accent-soft"
        }`}
      >
        {status === "error" && "Please enter a valid email address."}
        {status === "success" && "You're in! Check your inbox to confirm. ☕"}
      </p>
    </form>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-faint">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Social({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="text-muted transition-colors hover:text-ink"
    >
      {label}
    </a>
  );
}
