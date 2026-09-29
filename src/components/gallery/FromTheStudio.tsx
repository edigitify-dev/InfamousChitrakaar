"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { siteConfig } from "@/config/site";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { ArtImage } from "@/components/ui/ArtImage";
import { ArrowIcon } from "@/components/ui/Button";
import type { GalleryThumb, SectionContent } from "@/types/homepage";

export function FromTheStudio({ content, items }: { content: SectionContent; items: GalleryThumb[] }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(({ gsap, reduced }) => {
    gsap.from("[data-tile]", {
      opacity: 0,
      scale: reduced ? 1 : 0.94,
      duration: 0.7,
      stagger: 0.06,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
    });
  }, ref);

  return (
    <section ref={ref} aria-label="From the studio" className="paper-dark px-6 py-14 lg:px-[5%]">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <AccentHeading text={content.heading} className="text-paper !text-[clamp(2rem,3.6vw,3.2rem)]" />
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label group/btn inline-flex items-center gap-3 text-paper hover:text-vermilion"
          >
            {content.ctaText ?? "Follow on Instagram"} <ArrowIcon />
          </a>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {items.map((g, i) => (
            <li key={g.id} data-tile>
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden">
                <ArtImage
                  src={g.src}
                  alt={g.caption}
                  fallback={g.tone}
                  className={`aspect-square w-full transition-transform duration-500 group-hover:scale-105 ${i % 2 ? "grayscale" : ""}`}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
