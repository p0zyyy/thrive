"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { plans } from "@/lib/data";
import { formatPrice, getFrequency, pricePerDelivery } from "@/lib/format";
import { EASE_SMOOTH } from "@/lib/theme";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 *  Mock multi-step checkout. No real payment — all validation is
 *  client-side and the final submit is simulated.
 * ------------------------------------------------------------------ */

type Fields = Record<string, string>;
type Errors = Record<string, string>;

const STEPS = ["Contact", "Shipping", "Payment", "Review"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CheckoutPage() {
  const { items, subtotal, hydrated, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState<Fields>({});
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState(false);

  const set = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFields((f) => ({ ...f, [name]: e.target.value }));
    setErrors((er) => (er[name] ? { ...er, [name]: "" } : er));
  };

  // Per-step required-field validation.
  function validateStep(current: number): boolean {
    const e: Errors = {};
    const req = (name: string, label: string) => {
      if (!fields[name]?.trim()) e[name] = `${label} is required`;
    };

    if (current === 0) {
      req("firstName", "First name");
      req("lastName", "Last name");
      if (!fields.email?.trim()) e.email = "Email is required";
      else if (!EMAIL_RE.test(fields.email)) e.email = "Enter a valid email";
    }
    if (current === 1) {
      req("address1", "Address");
      req("city", "City");
      req("state", "State");
      if (!fields.zip?.trim()) e.zip = "ZIP is required";
      else if (!/^\d{4,10}$/.test(fields.zip.trim())) e.zip = "Enter a valid ZIP";
    }
    if (current === 2) {
      req("cardName", "Name on card");
      const digits = (fields.cardNumber || "").replace(/\s/g, "");
      if (!digits) e.cardNumber = "Card number is required";
      else if (!/^\d{15,16}$/.test(digits)) e.cardNumber = "Enter a 15–16 digit number";
      if (!fields.expiry?.trim()) e.expiry = "Expiry is required";
      else if (!/^\d{2}\/\d{2}$/.test(fields.expiry.trim())) e.expiry = "Use MM/YY";
      if (!fields.cvc?.trim()) e.cvc = "CVC is required";
      else if (!/^\d{3,4}$/.test(fields.cvc.trim())) e.cvc = "3–4 digits";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function placeOrder(e: FormEvent) {
    e.preventDefault();
    // Final guard across payment step, then simulate success.
    if (!validateStep(2)) {
      setStep(2);
      return;
    }
    setPlaced(true);
    clearCart();
  }

  // Empty cart guard (after hydration to avoid flash).
  if (hydrated && items.length === 0 && !placed) {
    return (
      <CheckoutShell>
        <div className="mx-auto max-w-md rounded-3xl border border-line bg-elevated/60 p-10 text-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-3 text-muted">
            Add a subscription plan before heading to checkout.
          </p>
          <Button href="/#plans" className="mt-8">
            Browse plans
          </Button>
        </div>
      </CheckoutShell>
    );
  }

  if (placed) {
    return (
      <CheckoutShell>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_SMOOTH }}
          className="mx-auto max-w-lg rounded-3xl border border-line bg-elevated/60 p-10 text-center"
        >
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-white shadow-glow">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 12l4 4L19 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-extrabold">Order confirmed!</h1>
          <p className="mt-3 text-muted">
            Thanks{fields.firstName ? `, ${fields.firstName}` : ""}. Your first pouch
            is on its way and a confirmation is heading to your inbox.
          </p>
          <p className="mt-1 text-sm text-faint">
            (This is a demo. No payment was processed.)
          </p>
          <Button href="/" className="mt-8">
            Back to home
          </Button>
        </motion.div>
      </CheckoutShell>
    );
  }

  return (
    <CheckoutShell>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
        {/* form column */}
        <div>
          <Stepper step={step} />

          <form onSubmit={placeOrder} noValidate className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: EASE_SMOOTH }}
              >
                {step === 0 && (
                  <Fieldset legend="Contact details">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field name="firstName" label="First name" value={fields.firstName} onChange={set("firstName")} error={errors.firstName} autoComplete="given-name" />
                      <Field name="lastName" label="Last name" value={fields.lastName} onChange={set("lastName")} error={errors.lastName} autoComplete="family-name" />
                    </div>
                    <Field name="email" type="email" label="Email" value={fields.email} onChange={set("email")} error={errors.email} autoComplete="email" />
                    <Field name="phone" label="Phone (optional)" value={fields.phone} onChange={set("phone")} autoComplete="tel" optional />
                  </Fieldset>
                )}

                {step === 1 && (
                  <Fieldset legend="Shipping address">
                    <Field name="address1" label="Street address" value={fields.address1} onChange={set("address1")} error={errors.address1} autoComplete="address-line1" />
                    <Field name="address2" label="Apartment, suite (optional)" value={fields.address2} onChange={set("address2")} autoComplete="address-line2" optional />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field name="city" label="City" value={fields.city} onChange={set("city")} error={errors.city} autoComplete="address-level2" />
                      <Field name="state" label="State / Region" value={fields.state} onChange={set("state")} error={errors.state} autoComplete="address-level1" />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field name="zip" label="ZIP / Postal code" value={fields.zip} onChange={set("zip")} error={errors.zip} autoComplete="postal-code" inputMode="numeric" />
                      <Field name="country" label="Country" value={fields.country ?? "United States"} onChange={set("country")} autoComplete="country-name" optional />
                    </div>
                  </Fieldset>
                )}

                {step === 2 && (
                  <Fieldset legend="Payment" hint="Demo only. Do not enter real card details.">
                    <Field name="cardName" label="Name on card" value={fields.cardName} onChange={set("cardName")} error={errors.cardName} autoComplete="cc-name" />
                    <Field name="cardNumber" label="Card number" value={fields.cardNumber} onChange={set("cardNumber")} error={errors.cardNumber} placeholder="4242 4242 4242 4242" inputMode="numeric" autoComplete="cc-number" />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field name="expiry" label="Expiry (MM/YY)" value={fields.expiry} onChange={set("expiry")} error={errors.expiry} placeholder="04/28" inputMode="numeric" autoComplete="cc-exp" />
                      <Field name="cvc" label="CVC" value={fields.cvc} onChange={set("cvc")} error={errors.cvc} placeholder="123" inputMode="numeric" autoComplete="cc-csc" />
                    </div>
                  </Fieldset>
                )}

                {step === 3 && (
                  <ReviewStep fields={fields} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* nav buttons */}
            <div className="mt-10 flex items-center justify-between gap-4">
              {step > 0 ? (
                <Button type="button" variant="ghost" onClick={back}>
                  ← Back
                </Button>
              ) : (
                <Link href="/" className="text-sm text-muted hover:text-ink">
                  ← Continue shopping
                </Link>
              )}

              {step < STEPS.length - 1 ? (
                <Button type="button" onClick={next}>
                  Continue
                </Button>
              ) : (
                <Button type="submit">Place order · {formatPrice(subtotal)}</Button>
              )}
            </div>
          </form>
        </div>

        {/* order summary */}
        <OrderSummary />
      </div>
    </CheckoutShell>
  );
}

/* ----------------------------- layout ----------------------------- */

function CheckoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-24 pt-32">
      <Container>
        <h1 className="mb-2 text-display-sm font-extrabold">Checkout</h1>
        <p className="mb-10 text-muted">Secure, flexible, cancel anytime.</p>
        {children}
      </Container>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex items-center gap-2">
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm font-bold transition-colors",
                active && "border-accent bg-accent text-white",
                done && "border-accent bg-accent/20 text-accent-soft",
                !active && !done && "border-line text-faint",
              )}
            >
              {done ? "✓" : i + 1}
            </span>
            <span
              className={cn(
                "hidden text-sm font-medium sm:inline",
                active ? "text-ink" : "text-faint",
              )}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "mx-1 hidden h-px flex-1 sm:block",
                  done ? "bg-accent/50" : "bg-line",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Fieldset({
  legend,
  hint,
  children,
}: {
  legend: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-5">
      <legend className="text-xl font-bold">{legend}</legend>
      {hint && <p className="-mt-2 text-sm text-magenta">{hint}</p>}
      {children}
    </fieldset>
  );
}

function Field({
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  optional,
}: {
  name: string;
  label: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "email" | "text" | "tel";
  optional?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        aria-required={!optional}
        className={cn(
          "h-12 w-full rounded-xl border bg-white/5 px-4 text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-accent",
          error ? "border-magenta" : "border-line focus:border-accent",
        )}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-magenta">
          {error}
        </p>
      )}
    </div>
  );
}

function ReviewStep({ fields }: { fields: Fields }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Review &amp; confirm</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <ReviewCard title="Contact">
          <p>
            {fields.firstName} {fields.lastName}
          </p>
          <p className="text-muted">{fields.email}</p>
          {fields.phone && <p className="text-muted">{fields.phone}</p>}
        </ReviewCard>
        <ReviewCard title="Shipping to">
          <p>{fields.address1}</p>
          {fields.address2 && <p>{fields.address2}</p>}
          <p className="text-muted">
            {fields.city}, {fields.state} {fields.zip}
          </p>
          <p className="text-muted">{fields.country || "United States"}</p>
        </ReviewCard>
        <ReviewCard title="Payment">
          <p>{fields.cardName}</p>
          <p className="text-muted">
            •••• •••• ••••{" "}
            {(fields.cardNumber || "").replace(/\s/g, "").slice(-4) || "––––"}
          </p>
        </ReviewCard>
      </div>
      <p className="text-sm text-faint">
        By placing this order you agree to our subscription terms. You can pause or
        cancel anytime, with no commitment.
      </p>
    </div>
  );
}

function ReviewCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white/5 p-5 text-sm">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-faint">
        {title}
      </p>
      {children}
    </div>
  );
}

function OrderSummary() {
  const { items, subtotal } = useCart();

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const plan = plans.find((p) => p.id === item.planId);
          if (!plan) return null;
          const freq = getFrequency(item.frequency);
          return {
            id: item.planId,
            name: `${plan.name} plan`,
            meta: `${plan.packets} × 30 servings · ${freq.label.toLowerCase()} · ×${item.quantity}`,
            price: pricePerDelivery(item.planId, item.frequency, item.quantity),
          };
        })
        .filter(Boolean) as { id: string; name: string; meta: string; price: number }[],
    [items],
  );

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-3xl border border-line bg-elevated/60 p-7">
        <h2 className="text-lg font-bold">Order summary</h2>
        <ul className="mt-5 space-y-4">
          {lines.map((l) => (
            <li key={l.id} className="flex justify-between gap-4 text-sm">
              <span>
                <span className="block font-semibold">{l.name}</span>
                <span className="block text-faint">{l.meta}</span>
              </span>
              <span className="font-semibold">{formatPrice(l.price)}</span>
            </li>
          ))}
        </ul>

        <div className="my-5 hairline" />

        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Shipping</dt>
            <dd className="text-accent-soft">Free</dd>
          </div>
        </dl>

        <div className="my-5 hairline" />

        <div className="flex items-end justify-between">
          <span className="text-muted">Due today</span>
          <span className="text-2xl font-extrabold">{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-2 text-xs text-faint">
          Recurring per delivery. Pause, skip or cancel anytime.
        </p>
      </div>
    </aside>
  );
}
