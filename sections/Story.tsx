"use client";

import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

const stats = [
  { value: "6", label: "Functional mushrooms per blend" },
  { value: "50%", label: "Less caffeine than regular coffee" },
  { value: "30", label: "Servings in every packet" },
  { value: "SG", label: "Proudly blended in Singapore" },
];

export function Story() {
  return (
    <Section id="story">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        {/* narrative */}
        <div>
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-display-sm font-extrabold">
              Born in Singapore, built for balance.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-5 text-lg text-muted">
              <p>
                Thrive started with a simple frustration: we loved the ritual of
                coffee, but not the jitters, the crash or the 2am wide-awake stares.
                So here in Singapore, we set out to build a better cup.
              </p>
              <p>
                We blend smooth arabica with six functional mushrooms (lion&apos;s
                mane, cordyceps, reishi, chaga, turkey&apos;s tail and shiitake) and
                cut the caffeine in half. The result is calm, steady focus you can
                feel good about, morning to afternoon.
              </p>
            </div>
          </Reveal>
        </div>

        {/* stat grid */}
        <Reveal stagger className="grid grid-cols-2 gap-px self-center overflow-hidden rounded-3xl border border-line bg-line">
          {stats.map((s) => (
            <RevealItem
              key={s.label}
              className="bg-elevated p-8 transition-colors hover:bg-surface"
            >
              <div className="text-4xl font-extrabold text-gradient md:text-5xl">
                {s.value}
              </div>
              <p className="mt-3 text-sm text-muted">{s.label}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>

      {/* sustainability strip */}
      <Reveal>
        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-gradient-to-r from-accent/15 to-magenta/10 p-8 md:flex-row md:items-center">
          <p className="max-w-xl text-lg font-medium">
            No artificial flavours or fillers, just coffee and dual-extracted
            mushrooms, in recyclable packaging delivered carbon-neutral.
          </p>
          <span className="rounded-full border border-line bg-base/40 px-5 py-2 text-sm font-semibold text-accent-soft">
            🍄 Clean &amp; functional
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
