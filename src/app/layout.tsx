import type { Metadata, Viewport } from "next";
import {
  Caveat,
  Jost,
  Permanent_Marker,
  Playfair_Display,
} from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { siteConfig } from "@/config/site";
import "./globals.css";
import { Loader } from "@/components/ui/Loader";
import ImageKitProvider from "@/components/ImageKitProvider";

/*
 * Fonts. The plan names Kabel + Glacial Indifference; those aren't on Google Fonts,
 * so we use close open-license stand-ins that match the reference design's look:
 *  - Jost           → clean geometric sans (labels, body)
 *  - Playfair       → high-contrast serif headings ("The Studio.")
 *  - Permanent Marker → dry-brush hero title
 *  - Caveat         → handwritten notes
 * To use the real fonts later, drop the files in /public/fonts and swap to next/font/local.
 */
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
});
const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marker",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#14110e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${playfair.variable} ${marker.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen antialiased">
        {/* Shared SVG filter: roughens brush lettering edges */}
        <svg
          aria-hidden="true"
          width="0"
          height="0"
          className="pointer-events-none absolute"
        >
          <defs>
            <filter id="rough-brush" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04"
                numOctaves="3"
                seed="4"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3.5"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        <Loader />
        <ImageKitProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ImageKitProvider>
        <div className="site-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
