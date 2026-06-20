import type {
  Faq,
  Frequency,
  Mushroom,
  Plan,
  ProductDetail,
  Step,
  Testimonial,
  TimelinePhase,
} from "./types";

/* ------------------------------------------------------------------ *
 *  SINGLE SOURCE OF TRUTH FOR ALL CONTENT
 *  Edit this file to re-brand the store: product copy, pricing,
 *  plans, mushrooms, testimonials and FAQ all live here.
 * ------------------------------------------------------------------ */

export const brand = {
  name: "Thrive",
  tagline: "Mushroom coffee for calmer, sharper mornings.",
  product: "Six-Mushroom Coffee",
  location: "Singapore",
  domain: "thrive.sg",
  social: {
    instagram: "#",
    twitter: "#",
    tiktok: "#",
  },
} as const;

export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "The blend", href: "#blend" },
  { label: "How it works", href: "#how" },
  { label: "Plans", href: "#plans" },
  { label: "FAQ", href: "#faq" },
] as const;

export const product = {
  name: "Six-Mushroom Coffee",
  kicker: "Functional · Half the caffeine",
  blurb:
    "Smooth medium-roast arabica blended with six functional mushrooms. All the warmth and ritual of coffee, with half the caffeine and none of the jitters, just clean all-day focus.",
  details: <ProductDetail[]>[
    { label: "Caffeine", value: "Half of regular" },
    { label: "Servings", value: "30 per packet" },
    { label: "Blend", value: "6 mushrooms" },
    { label: "Format", value: "Instant powder" },
    { label: "Base", value: "Medium-roast arabica" },
    { label: "Made in", value: "Singapore" },
  ],
  // Top-level reasons to switch, shown as a checklist in the showcase.
  benefits: [
    {
      title: "Half the caffeine",
      body: "All the ritual of a real cup, without the jitters or the afternoon crash.",
    },
    {
      title: "Six functional mushrooms",
      body: "Lion's mane, cordyceps, reishi, chaga, turkey's tail and shiitake in every serving.",
    },
    {
      title: "Smooth, never bitter",
      body: "Medium-roast arabica keeps it rich and easy to drink. Just add hot water.",
    },
  ],
  // Sensory descriptors shown as chips beside the packet.
  tastingNotes: ["Smooth", "Earthy", "Chocolatey"],
} as const;

/** The six functional mushrooms in the blend (the core selling point). */
export const mushrooms: Mushroom[] = [
  {
    id: "lions-mane",
    name: "Lion's Mane",
    benefit: "Focus & mental clarity",
    note: "The 'thinker's mushroom' that supports concentration and a calm, sharp mind.",
    image: "/mushrooms/lions-mane.webp",
  },
  {
    id: "cordyceps",
    name: "Cordyceps",
    benefit: "Natural, steady energy",
    note: "Helps power your morning without the spike-and-crash of a double espresso.",
    image: "/mushrooms/cordyceps.webp",
  },
  {
    id: "reishi",
    name: "Reishi",
    benefit: "Calm & balance",
    note: "The 'mushroom of immortality', long used to take the edge off stress.",
    image: "/mushrooms/reishi.webp",
  },
  {
    id: "chaga",
    name: "Chaga",
    benefit: "Antioxidant support",
    note: "Rich in antioxidants to help your body handle whatever the day brings.",
    image: "/mushrooms/chaga.webp",
  },
  {
    id: "turkey-tail",
    name: "Turkey's Tail",
    benefit: "Gut & immunity",
    note: "A prebiotic-rich classic that supports a healthy gut and immune system.",
    image: "/mushrooms/turkey-tail.webp",
  },
  {
    id: "shiitake",
    name: "Shiitake",
    benefit: "Everyday wellness",
    note: "Packed with nutrients and a savoury depth that rounds out the blend.",
  },
];

/** Scrolling benefit ticker shown directly beneath the hero. Icons for each
 *  id live in components/BenefitsMarquee.tsx. */
export const benefitTicker = [
  { id: "gut-health", label: "Gut health" },
  { id: "focus", label: "Sharp focus" },
  { id: "sleep", label: "Better sleep" },
  { id: "energy", label: "Boosts energy" },
  { id: "immunity", label: "Stronger immunity" },
];

/** What changes over time on Thrive — drives the scroll-lit Timeline section. */
export const timeline: TimelinePhase[] = [
  {
    id: "week-1",
    marker: "Week 1",
    title: "Feel smoother energy & improved focus",
    body: "Your energy feels smoother with fewer jitters and crashes. Digestion improves, mental fog starts to clear, and sleep becomes more restful as your body adjusts to lower caffeine.",
  },
  {
    id: "month-1",
    marker: "Month 1",
    title: "Better sleep, fewer crashes & stable mood",
    body: "You experience steady, long-lasting energy, sharper focus, and a balanced mood. Stress feels easier to manage, sleep deepens, and your immune system starts to strengthen.",
  },
  {
    id: "month-3",
    marker: "Month 3",
    title: "Stronger mental clarity & improved gut health",
    body: "Energy and mental clarity are at their peak, daily stamina improves, and sleep is consistently restorative. You feel more resilient, vibrant, and naturally in sync with your body.",
  },
  {
    id: "month-6",
    marker: "Month 6",
    title: "Calm, consistent energy with long-term wellness gains",
    body: "Coffee dependency is a thing of the past. You're thriving with sustained energy, mental sharpness, and balanced well-being. Functional mushrooms are now a key part of your healthiest, happiest routine.",
  },
];

export const frequencies: Frequency[] = [
  {
    id: "monthly",
    label: "Monthly",
    cadence: "Every 30 days",
    priceMultiplier: 1, // standard price reference — one packet ≈ one month
    deliveriesPerMonth: 1,
  },
  {
    id: "bimonthly",
    label: "Every 2 months",
    cadence: "Every 60 days",
    priceMultiplier: 0.92,
    deliveriesPerMonth: 0.5,
  },
  {
    id: "quarterly",
    label: "Every 3 months",
    cadence: "Every 90 days",
    priceMultiplier: 0.85, // commit to a longer cycle, save the most
    deliveriesPerMonth: 0.34,
  },
];

export const DEFAULT_FREQUENCY = "monthly";

export const plans: Plan[] = [
  {
    id: "solo",
    name: "Solo",
    packets: 1,
    basePricePerPacket: 39.9,
    description: "One packet, 30 cups. Perfect for a single daily ritual.",
    perks: [
      "1 × 30-serving packet",
      "Free local delivery",
      "Pause or cancel anytime",
    ],
  },
  {
    id: "duo",
    name: "Duo",
    packets: 2,
    basePricePerPacket: 37.9,
    description: "Two packets per delivery. For couples or two-a-day drinkers.",
    perks: [
      "2 × 30-serving packets",
      "Free priority delivery",
      "Pause or cancel anytime",
      "5% bundle saving",
    ],
    popular: true,
  },
  {
    id: "household",
    name: "Household",
    packets: 3,
    basePricePerPacket: 35.9,
    description: "Three packets per delivery. Built for families and offices.",
    perks: [
      "3 × 30-serving packets",
      "Free priority delivery",
      "Pause or cancel anytime",
      "10% bundle saving",
      "Free Thrive ceramic mug",
    ],
  },
];

export const steps: Step[] = [
  {
    id: "scoop",
    image: "/steps/step1.webp",
    alt: "A spoonful of Thrive powder held over a mug",
    description:
      "Scoop a spoonful of Thrive and drop it into your favourite mug. Add some hot water to dissolve the powder.",
  },
  {
    id: "pour",
    image: "/steps/step2.webp",
    alt: "Pouring milk into a mug of dissolved Thrive",
    description:
      "Pour in hot water or your milk of choice. Add oat, almond, soy, or even coconut if you're feeling fancy.",
  },
  {
    id: "stir",
    image: "/steps/step3.webp",
    alt: "Frothing and stirring Thrive coffee in a mug",
    description:
      "Stir it up, take a deep breath, and enjoy. You're now one sip closer to calm energy, clear focus, and feeling like your best self.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Same coffee ritual every morning, but I've stopped getting the 3pm crash. Genuinely calmer, focused energy.",
    author: "Maya R.",
    role: "Subscriber since 2024",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "I was skeptical mushroom coffee would taste good. It's smooth and chocolatey, and my flat white is jealous.",
    author: "Daniel K.",
    role: "Duo plan",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Half the caffeine means I can have a cup after lunch and still sleep. Lion's mane focus is real.",
    author: "Priya S.",
    role: "Household plan",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "No more coffee jitters before meetings. It's become the easiest healthy habit I've ever kept.",
    author: "Wei Jie T.",
    role: "Solo plan",
    rating: 5,
  },
  {
    id: "t5",
    quote:
      "Easy on my stomach, delivered across Singapore in two days, and pausing took one tap. Hooked.",
    author: "Elena M.",
    role: "Subscriber since 2023",
    rating: 5,
  },
];

export const faqs: Faq[] = [
  {
    id: "f1",
    question: "How much caffeine is in Thrive?",
    answer:
      "Each cup has roughly half the caffeine of a regular cup of coffee. You get the warmth and lift you love, with a much gentler, longer-lasting energy and no jitters or crash.",
  },
  {
    id: "f2",
    question: "What's actually in the blend?",
    answer:
      "Smooth medium-roast arabica coffee blended with six functional mushrooms: lion's mane, cordyceps, reishi, chaga, turkey's tail and shiitake. That's it, with no artificial flavours or fillers.",
  },
  {
    id: "f3",
    question: "Does it taste like mushrooms?",
    answer:
      "No. It tastes like smooth, slightly chocolatey coffee. The mushrooms are dual-extracted into a fine powder, so you get the benefits without any earthy mushroom flavour.",
  },
  {
    id: "f4",
    question: "How do I make it, and how many servings do I get?",
    answer:
      "Just stir one scoop into hot water or your milk of choice, with no machine needed. Each packet contains 30 servings, about a month of one cup a day.",
  },
  {
    id: "f5",
    question: "How fast is delivery, and is it free?",
    answer:
      "We ship across Singapore, and every subscription includes free local delivery (priority shipping on Duo and Household plans). Most orders arrive within 1–3 business days.",
  },
  {
    id: "f6",
    question: "Can I pause, skip or cancel?",
    answer:
      "Anytime, with no fees. Pause, skip or reschedule a delivery, or cancel entirely, in a couple of taps from your account. Your plan stays active until the end of the current cycle.",
  },
];
