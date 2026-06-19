"use client";

import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { faqs } from "@/lib/data";

export function FAQ() {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-display-sm font-extrabold">
              Questions, answered.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-muted">
              Everything you need to know about shipping, pausing and canceling.
              Still stuck?
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Button href="#" variant="secondary" className="mt-6">
              Contact support
            </Button>
          </Reveal>
        </div>

        <Reveal>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </Section>
  );
}
