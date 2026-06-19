import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/data";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { GrainOverlay } from "@/components/GrainOverlay";

// Poppins across the full weight range used by the design tokens.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name}: ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Thrive mushroom coffee is smooth arabica blended with six functional mushrooms and half the caffeine. Calm, all-day focus, delivered across Singapore. Pause or cancel anytime.",
  openGraph: {
    title: `${brand.name}: ${brand.tagline}`,
    description:
      "Mushroom coffee with half the caffeine and six functional mushrooms. Delivered across Singapore on your schedule.",
    type: "website",
  },
  metadataBase: new URL("https://thrive.sg"),
};

export const viewport: Viewport = {
  themeColor: "#1A0B2E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Providers>
          {/* skip link for keyboard users */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <CartDrawer />
        </Providers>
        <GrainOverlay />
      </body>
    </html>
  );
}
