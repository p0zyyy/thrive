import { Hero } from "@/sections/Hero";
import { BenefitsMarquee } from "@/components/BenefitsMarquee";
import { ProductShowcase } from "@/sections/ProductShowcase";
import { TheBlend } from "@/sections/TheBlend";
import { Timeline } from "@/sections/Timeline";
import { HowItWorks } from "@/sections/HowItWorks";
import { Plans } from "@/sections/Plans";
import { Story } from "@/sections/Story";
import { Testimonials } from "@/sections/Testimonials";
import { FAQ } from "@/sections/FAQ";
import { Footer } from "@/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BenefitsMarquee />
      <ProductShowcase />
      <TheBlend />
      <Timeline />
      <HowItWorks />
      <Plans />
      <Story />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
