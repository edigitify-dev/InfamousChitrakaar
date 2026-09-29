"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { IMAGES } from "@/config/images";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { ArtImage, FALLBACKS } from "@/components/ui/ArtImage";
import { ButtonLink } from "@/components/ui/Button";
import { Sparkle } from "@/components/ui/Doodles";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { TornEdge } from "@/components/ui/TornEdge";
import type { SectionContent } from "@/types/homepage";
import type { ProductCardData } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ExhibitionSectionProps {
  content: SectionContent;
  products: ProductCardData[];
}

const ROTATIONS = [-2, 1.5, -1, 2.5, -1.5, 1];
const OFFSETS = ["lg:mt-6", "lg:mt-1", "lg:mt-9", "lg:mt-4", "lg:mt-7", "lg:mt-2"];

export function ExhibitionSection({ content, products }: ExhibitionSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(({ gsap, reduced, desktop }) => {
    gsap.from("[data-card]", {
      opacity: 0,
      y: reduced ? 0 : 90,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 65%", once: true },
    });
    gsap.from("[data-exhibit='panel'] > *", {
      opacity: 0,
      y: reduced ? 0 : 24,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
    });
    // gentle floating on the cards (desktop, motion allowed)
    if (desktop && !reduced) {
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
        gsap.to(el, { y: "+=8", duration: 2.4 + i * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });
    }
  }, ref);

  const scrollList = (dir: 1 | -1) => {
    const el = listRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <section ref={ref} aria-label="The Current Exhibition" className="relative isolate overflow-hidden bg-ink lg:h-[max(600px,min(86svh,43vw))]">
      <ArtImage
        src={IMAGES.exhibition.background}
        alt="A dark studio desk scattered with art, softly out of focus"
        fallback={FALLBACKS.table}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/30" />
      </ArtImage>

      {/* Cream panel with a red torn strip along the bottom */}
      <TornEdge
        edges={["right", "top"]}
        seed={33}
        amp={14}
        shadow
        className="relative z-20 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[34%]"
      >
        <div data-exhibit="panel" className="paper relative flex h-full flex-col justify-center px-7 pb-28 pt-24 lg:px-[13%] lg:pb-[26%] lg:pt-24">
          <p className="label text-[0.62rem] text-vermilion">{content.subheading}</p>
          <AccentHeading text={content.heading} className="mt-2" />
          <p className="mt-4 max-w-[15rem] text-[0.82rem] leading-relaxed text-ink/75">{content.description}</p>
          <div className="mt-6">
            <ButtonLink href={content.ctaLink ?? "/shop"} arrow>
              {content.ctaText}
            </ButtonLink>
          </div>

          <TornEdge edges={["top"]} seed={5} amp={12} className="absolute inset-x-0 bottom-0 h-[24%] bg-vermilion">
            <div className="relative h-full">
              <HandwrittenNote variant="plain" rotate={-4} className="absolute bottom-[26%] left-[13%] w-28 !text-paper">
                Art that lives with you
              </HandwrittenNote>
              <Sparkle aria-hidden className="absolute bottom-[34%] left-[46%] w-4 text-paper" />
            </div>
          </TornEdge>
        </div>
      </TornEdge>

      {/* Product row */}
      <div className="relative z-10 lg:absolute lg:inset-y-0 lg:left-[34%] lg:right-0">
        <div className="absolute right-[4%] top-[6%] z-20 hidden items-center gap-3 lg:flex">
          <span className="label -rotate-6 rounded-full border border-paper/80 px-3.5 py-2 text-[0.52rem] text-paper">
            Limited run
          </span>
          <button type="button" aria-label="Previous products" onClick={() => scrollList(-1)} className="grid size-8 place-items-center rounded-full border border-paper/70 text-paper hover:bg-paper hover:text-ink">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M14 5H1M5 1 1 5l4 4" /></svg>
          </button>
          <button type="button" aria-label="Next products" onClick={() => scrollList(1)} className="grid size-8 place-items-center rounded-full border border-paper/70 text-paper hover:bg-paper hover:text-ink">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M0 5h13M9 1l4 4-4 4" /></svg>
          </button>
        </div>

        <ul
          ref={listRef}
          data-lenis-prevent-wheel
          className="no-scrollbar flex snap-x gap-5 overflow-x-auto px-6 pb-12 pt-10 lg:h-full lg:items-start lg:gap-[2%] lg:px-[4%] lg:pb-0 lg:pt-[15%]"
        >
          {products.map((product, i) => (
            <li
              key={product.id}
              data-card
              className={`w-[62%] shrink-0 snap-start sm:w-[38%] lg:w-[23.5%] ${OFFSETS[i % OFFSETS.length]}`}
            >
              <ProductCard product={product} rotate={ROTATIONS[i % ROTATIONS.length]} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
