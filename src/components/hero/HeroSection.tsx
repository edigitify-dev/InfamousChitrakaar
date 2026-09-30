"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { ArtButton } from "../ui/ArtButton";
import { ArtistPopup } from "./ArtistPopup";
import { Image } from "@imagekit/next";

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
      <Image
        data-hero="image"
        src="temp_bg.png"
        alt="The Infamous Chitrakar studio"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        width={1774}
        height={887}
      />
      <div className="absolute top-0 -left-2 w-[70%] h-25">
        <Image
          src="brown_paper_tear_5.png"
          alt=""
          className="w-full"
          width={1200}
          height={900}
        />
      </div>
      <div className="absolute top-0 -right-2 w-[25%] h-25">
        <Image
          src="brown_paper_tear_6.png"
          alt=""
          className="w-full"
          width={500}
          height={150}
        />
      </div>

      {/* LEFT — TORN PAPER CARD */}
      <div
        data-hero="card"
        className="absolute left-2 top-[14%] z-20 w-[92%] sm:left-4 sm:w-[60%] md:w-[46%] lg:left-0 lg:top-[13%] lg:w-[36%] xl:w-[34%]"
        style={{ filter: "drop-shadow(0 10px 18px rgba(0,0,0,.35))" }}
      >
        <div className="relative px-8 pb-12 pt-14 sm:px-10 lg:px-12 lg:pb-14 lg:pt-16">
          <Image
            src="crown.png"
            alt=""
            aria-hidden="true"
            width={500}
            height={500}
            className="absolute right-8 top-16 h-17 w-17 -rotate-6 object-contain sm:right-10"
          />
          <Image
            src="or_star.png"
            alt=""
            aria-hidden="true"
            width={1080}
            height={1080}
            className="absolute left-60 top-16 h-7 w-7 -rotate-6 object-contain sm:right-10"
          />
          <Image
            src="or_star.png"
            alt=""
            aria-hidden="true"
            width={1080}
            height={1080}
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
        <Image
          src="brown_paper_tear_3.png"
          alt=""
          aria-hidden="true"
          width={1080}
          height={1080}
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
