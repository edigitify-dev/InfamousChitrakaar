"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { ArtButton } from "../ui/ArtButton";
import { ArtistPopup } from "./ArtistPopup";

interface HeroSectionProps {
  content: {
    title?: string;
    description?: string;
  };
  categories?: unknown[];
}

/* Handwritten font for annotations. Load "Caveat" (or set --font-hand). */
const HAND = {
  fontFamily: 'var(--font-hand, "Caveat", "Segoe Print", cursive)',
};

const STRIP_CLIP =
  "polygon(0% 14%,4% 8%,9% 13%,15% 6%,21% 12%,28% 5%,35% 11%,42% 4%,50% 10%,57% 5%,64% 12%,71% 6%,78% 11%,85% 4%,92% 10%,97% 6%,100% 11%,100% 100%,0% 100%)";

const NOTE_CLIP =
  "polygon(2% 3%,30% 0%,60% 2%,100% 0%,98% 35%,100% 70%,97% 100%,60% 98%,30% 100%,0% 97%,2% 65%,0% 30%)";

const CATEGORIES = [
  { label: "Tote Bags", src: "/images/categories/tote-bag.png" },
  { label: "T-Shirts", src: "/images/categories/t-shirt.png" },
  { label: "Art Prints", src: "/images/categories/art-print.png" },
  { label: "Postcards", src: "/images/categories/postcards.png" },
  { label: "Notebooks", src: "/images/categories/notebook.png" },
  { label: "Stickers", src: "/images/categories/stickers.png" },
  { label: "Playing Cards", src: "/images/categories/playing-cards.png" },
];

export function HeroSection({ content }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(({ gsap, reduced }) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from("[data-hero='image']", {
      opacity: 0,
      scale: reduced ? 1 : 1.06,
      duration: 1.2,
    })
      .from(
        "[data-hero='card']",
        { opacity: 0, x: reduced ? 0 : -40, duration: 0.8 },
        "-=0.8",
      )
      .from(
        "[data-hero='title']",
        { opacity: 0, y: reduced ? 0 : 30, duration: 0.7 },
        "-=0.5",
      )
      .from(
        "[data-hero='description']",
        { opacity: 0, y: reduced ? 0 : 15, duration: 0.5, stagger: 0.1 },
        "-=0.4",
      )
      .from(
        "[data-hero='button']",
        { opacity: 0, y: reduced ? 0 : 12, duration: 0.4 },
        "-=0.3",
      )
      .from(
        "[data-hero='note']",
        { opacity: 0, y: reduced ? 0 : 20, duration: 0.5, stagger: 0.12 },
        "-=0.2",
      )
      .from(
        "[data-hero='strip']",
        { opacity: 0, y: reduced ? 0 : 40, duration: 0.7 },
        "-=0.6",
      );
  }, ref);

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative isolate h-[100vh] min-h-[650px] max-h-[900px] overflow-hidden bg-paper"
    >
      {/* FULL-BLEED BACKGROUND IMAGE */}
      <img
        data-hero="image"
        src="/images/temp_bg.png"
        alt="The Infamous Chitrakar studio"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
      <div className="absolute top-0 -left-2 w-[70%] h-25">
        <img src="/images/brown_paper_tear_5.png" alt="" className="w-full" />
      </div>
      <div className="absolute top-0 -right-2 w-[25%] h-25">
        <img src="/images/brown_paper_tear_6.png" alt="" className="w-full" />
      </div>

      {/* LEFT — TORN PAPER CARD */}
      <div
        data-hero="card"
        className="absolute left-2 top-[14%] z-20 w-[92%] sm:left-4 sm:w-[60%] md:w-[46%] lg:left-0 lg:top-[13%] lg:w-[36%] xl:w-[34%]"
        style={{ filter: "drop-shadow(0 10px 18px rgba(0,0,0,.35))" }}
      >
        <div className="relative px-8 pb-12 pt-14 sm:px-10 lg:px-12 lg:pb-14 lg:pt-16">
          <img
            src="/images/crown.png"
            alt=""
            aria-hidden="true"
            className="absolute right-8 top-16 h-17 w-17 -rotate-6 object-contain sm:right-10"
          />
          <img
            src="/images/or_star.png"
            alt=""
            aria-hidden="true"
            className="absolute left-60 top-16 h-7 w-7 -rotate-6 object-contain sm:right-10"
          />
          <img
            src="/images/or_star.png"
            alt=""
            aria-hidden="true"
            className="absolute  bottom-50 h-10 w-10 -rotate-6 object-contain sm:right-10"
          />

          {/* Handwritten tagline */}
          <p
            data-hero="description"
            className="absolute font-edu-qld left-9 top-6 -rotate-8 text-[15px] font-semibold uppercase leading-[1] text-ink sm:left-11 sm:text-[16px]"
          >
            Art that
            <br /> feels real.
          </p>

          {/* Main Heading */}
          <h1
            data-hero="title"
            className="relative mt-4 -rotate-8 font-medium uppercase text-ink"
          >
            <span className="block font-nelyx text-[clamp(3.2rem,5.4vw,6rem)] leading-[1] tracking-[-.05em]">
              The
            </span>
            <span className="block font-nelyx text-[clamp(3.2rem,5.4vw,6rem)] leading-[1.2] tracking-[-.05em]">
              Infamous
            </span>
            <span className="block font-sketch text-[clamp(3rem,5.1vw,5.6rem)] leading-[2] text-[#d8432a]">
              Chitrakar
            </span>
          </h1>

          {/* Description */}
          <p
            data-hero="description"
            className="mt-6 ml-2 max-w-[320px] text-[16px] leading-[1.15] text-ink/90"
          >
            {content.description ??
              "Original art, prints and stories from my studio to your walls."}
          </p>

          {/* CTA */}
          <div data-hero="button" className="mt-6 w-fit">
            <ArtButton
              text="Explore Collection"
              textClassName="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white"
            />
          </div>
        </div>
      </div>

      {/* RIGHT — STICKY NOTE */}
      <div
        data-hero="note"
        className="absolute left-[35%] bottom-[5%] z-10 hidden w-[12%] min-w-[110px] -rotate-6 lg:block"
        style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,.3))" }}
      >
        {/* Paper background behind the note */}
        <img
          src="/images/brown_paper_tear_3.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-fill"
        />

        <div className="relative px-7 pb-10 pt-12 text-center">
          <p
            style={HAND}
            className="text-[19px] font-semibold uppercase leading-[1.1] text-ink"
          >
            Good art makes a quieter world.
          </p>
          <span className="mt-2 block text-4xl leading-none" aria-hidden="true">
            ☺
          </span>
        </div>
      </div>

      <ArtistPopup />
    </section>
  );
}
