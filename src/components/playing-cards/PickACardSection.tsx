"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { IMAGES } from "@/config/images";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { ArtImage } from "@/components/ui/ArtImage";
import { ButtonLink } from "@/components/ui/Button";
import { Sparkle } from "@/components/ui/Doodles";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import type { SectionContent } from "@/types/homepage";
import { CardDeck } from "./CardDeck";

const PICKED_LINES = [
  "The skull. Bold. Nothing to lose.",
  "The king. You already knew.",
  "The queen. She sees everything.",
  "The jack. Trouble, with good taste.",
  "Ten of hearts. Soft, but dangerous.",
  "Seven of spades. Luck is a choice.",
];

export function PickACardSection({ content }: { content: SectionContent }) {
  const ref = useRef<HTMLElement>(null);
  const [line, setLine] = useState<string | null>(null);

  useGSAP(({ gsap, reduced }) => {
    gsap.from("[data-cards] > *", {
      opacity: 0,
      y: reduced ? 0 : 30,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
    });
  }, ref);

  return (
    <section ref={ref} aria-label="Pick a card" className="relative isolate overflow-hidden bg-charcoal text-paper">
      <ArtImage
        src={IMAGES.cards.background}
        alt=""
        fallback="radial-gradient(ellipse at 70% 50%, #3a2a1e 0%, #1d1915 60%, #100d0a 100%)"
        className="absolute inset-0 -z-10 opacity-70"
      />
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-6 py-16 lg:grid-cols-[38%_1fr] lg:px-[5%] lg:py-20">
        <div data-cards className="max-w-md">
          <p className="label mb-4 text-paper/60">{content.subheading ?? "52 illustrations. 1 story."}</p>
          <AccentHeading text={content.heading} className="text-paper" />
          <p className="mt-5 text-[0.9rem] leading-relaxed text-paper/75">{content.description}</p>
          <div className="mt-7">
            <ButtonLink href={content.ctaLink ?? "/shop/playing-cards"} variant="light" arrow>
              {content.ctaText ?? "Shop the deck"}
            </ButtonLink>
          </div>
          <Sparkle aria-hidden className="mt-8 w-8 text-sun" />
        </div>

        <div data-cards className="relative">
          <CardDeck onPick={(i) => setLine(PICKED_LINES[i])} />
          <HandwrittenNote rotate={-4} className="mx-auto mt-4 w-[15rem] text-center text-[14px]">
            {line ?? "Go on. Pick one."}
          </HandwrittenNote>
        </div>
      </div>
    </section>
  );
}
