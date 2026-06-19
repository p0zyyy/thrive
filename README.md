# Thrive — Single-Product Mushroom Coffee Subscription

A modern, production-ready, single-page e-commerce site for **Thrive**, a
Singapore mushroom-coffee brand. Built for an Awwwards-caliber feel: deep
dark-purple palette, oversized Poppins typography, scroll-triggered motion,
smooth scrolling, a custom cursor, a localStorage-backed cart drawer, and a
mock multi-step checkout.

> Single product — **Six-Mushroom Coffee** (30 servings per packet, SGD $39.90),
> sold by subscription. Smooth arabica blended with six functional mushrooms
> (lion's mane, cordyceps, reishi, chaga, turkey's tail, shiitake) and half the
> caffeine of regular coffee. No backend — all data is mocked and the cart
> persists in `localStorage`.

## Tech stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| Framework      | Next.js 14 (App Router) + TypeScript     |
| Styling        | Tailwind CSS v3.4 (centralized tokens)   |
| Animation      | Framer Motion                            |
| Smooth scroll  | Lenis                                    |
| Fonts          | Poppins via `next/font`                  |
| State          | React Context + `localStorage`           |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build + type-check + lint
npm run start    # serve the production build
npm run lint     # eslint
```

## Project structure

```
app/
  layout.tsx          # fonts, metadata, global chrome, providers
  page.tsx            # single-page scroll — composes every section
  providers.tsx       # cart context + Lenis + custom cursor (client)
  globals.css         # Tailwind layers, CSS-var tokens, grain, reduced-motion
  checkout/page.tsx   # mock multi-step checkout (Contact → Shipping → Payment → Review)
components/
  ui/                 # reusable primitives: Button, Section, Container,
                      #   Reveal, SplitText, MagneticButton, Accordion, Eyebrow
  Navbar.tsx          # sticky nav + cart button with live count
  CartDrawer.tsx      # slide-in cart: frequency, quantity, subtotal, checkout
  Cursor.tsx          # custom animated cursor (desktop, reduced-motion aware)
  GrainOverlay.tsx    # film-grain texture overlay
  ScrollProgress.tsx  # top scroll-progress bar
  CoffeePacket.tsx    # self-contained SVG product illustration
sections/             # Hero, ProductShowcase, TheBlend, HowItWorks, Plans,
                      #   Story, Testimonials, FAQ, Footer
lib/
  data.ts             # ★ all content: product, mushrooms, plans, frequencies, FAQ
  types.ts            # shared domain types
  theme.ts            # JS mirror of design tokens (colors, easing, durations)
  format.ts           # pricing / currency helpers
  utils.ts            # `cn()` class-merge helper
hooks/
  useCart.tsx         # cart context + localStorage persistence + subtotal
  useLenis.ts         # smooth scroll + smooth in-page anchor links
  usePrefersReducedMotion.ts
  useMediaQuery.ts
```

## Customizing

### Content, product, plans & pricing — `lib/data.ts`

This is the single source of truth. Edit it to re-brand the store:

- **`brand`** — name, tagline, location, socials.
- **`product`** — name, copy, detail rows, benefits, tasting notes.
- **`mushrooms`** — the six functional mushrooms shown in the "The blend" section.
- **`plans`** — id, name, `packets` per delivery, `basePricePerPacket`, perks, and
  which plan is flagged `popular`.
- **`frequencies`** — each cadence's `priceMultiplier` (monthly = 1.0 standard;
  longer cycles discount). Per-packet price = `basePricePerPacket × priceMultiplier`;
  all pricing math lives in `lib/format.ts` (currency is SGD — see `formatPrice`).
- **`testimonials`**, **`faqs`**, **`steps`**, **`navLinks`**.

No pricing is hard-coded in components — change the numbers here and every
card, the cart and checkout update automatically.

### Colors & design tokens — `tailwind.config.ts`

All brand colors, the fluid display type scale, radii, shadows (the purple
glow), and motion easing live under `theme.extend`. Change `colors.base`,
`colors.accent`, `colors.magenta`, etc. to re-skin the whole site. A JS mirror
of the key values is in `lib/theme.ts` for use inside Framer Motion / SVG.

CSS-variable equivalents (for non-Tailwind usage) are defined at the top of
`app/globals.css`.

### Fonts — `app/layout.tsx`

Poppins is loaded via `next/font` and exposed as the `--font-poppins` CSS
variable, wired to Tailwind's `font-sans` / `font-display`. Swap the import to
change typefaces.

## Functionality

- **Plan selection** adds a subscription line and opens the slide-in cart.
- **Frequency toggle** (Monthly / Every 2 months / Every 3 months) recomputes the
  per-packet price and savings live, in both the Plans grid and the cart.
- **Cart drawer** — adjust frequency & quantity, remove, see subtotal, checkout.
- **Cart persistence** — survives reload via `localStorage` (`thrive-cart-v1`).
- **Checkout** — 4-step form with per-step client-side validation and a mocked
  submission + confirmation screen. No real payment is processed.
- **Newsletter** — footer signup with email validation (mocked submit).

## Accessibility & motion

- Semantic landmarks (`header`/`main`/`footer`/`nav`), a skip link, and visible
  `:focus-visible` rings.
- Accordion, cart dialog and forms use proper ARIA (`aria-expanded`,
  `aria-modal`, `aria-invalid`, `aria-describedby`, live regions).
- **Reduced motion** is fully respected: a global CSS rule neutralizes
  animations, Lenis and the custom cursor disable themselves, and the grain
  overlay hides under `prefers-reduced-motion: reduce`.
- The custom cursor is desktop-only (fine pointer) and never replaces the
  native cursor on touch devices.

## Notes

- Imagery is intentionally dependency-free: the product packet is a hand-built
  SVG (`components/CoffeePacket.tsx`) and backgrounds use CSS gradients. Swap in
  real photography via `next/image` whenever you like.
- This is a front-end demo: there is no server, database or payment processing.
