"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { IMAGES } from "@/config/images";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { ArtImage, FALLBACKS } from "@/components/ui/ArtImage";
import { ButtonLink } from "@/components/ui/Button";
import { Cross } from "@/components/ui/Doodles";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { Polaroid } from "@/components/ui/Polaroid";
import { TornEdge } from "@/components/ui/TornEdge";
import type { SectionContent } from "@/types/homepage";
import { SketchbookViewer } from "./SketchbookViewer";

interface PostersSectionProps {
  posters: SectionContent;
  sketchbook: SectionContent;
}

/** Stand-in for the framed wave poster until a real wall photo is dropped in. */
function FramedWave() {
  return (
    <div className="absolute left-[16%] top-[12%] h-[62%] w-[32%] rotate-[-1deg] border-[10px] border-[#1a1310] bg-[#e9dcc0] p-2 shadow-[0_18px_30px_rgba(0,0,0,0.6)]">
      <svg viewBox="0 0 100 130" className="size-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="100" height="130" fill="#efe4cc" />
        <circle cx="50" cy="38" r="20" fill="#d8432a" />
        <path d="M0 96c14-28 30-8 44-30 8 14 2 26 18 22s22-20 38-14v56H0Z" fill="#1f3b57" />
        <path d="M0 108c20-18 34 2 52-12 14-10 30 4 48-6v40H0Z" fill="#2c5679" />
        <path d="M6 100c8-6 14-4 22 0M52 92c8-6 16-4 22 0" stroke="#efe4cc" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function PostersSection({ posters, sketchbook }: PostersSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(({ gsap, reduced, desktop }) => {
    gsap.from("[data-posters='copy'] > *", {
      opacity: 0,
      y: reduced ? 0 : 26,
      duration: 0.8,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
    });
    gsap.from("[data-polaroid]", {
      opacity: 0,
      y: reduced ? 0 : 60,
      rotate: reduced ? 0 : 8,
      duration: 0.9,
      stagger: 0.14,
      ease: "back.out(1.4)",
      scrollTrigger: { trigger: ref.current, start: "top 60%", once: true },
    });
    gsap.from("[data-sketchbook]", {
      opacity: 0,
      y: reduced ? 0 : 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: "[data-sketchbook]", start: "top 85%", once: true },
    });
    if (desktop && !reduced) {
      gsap.to("[data-wall]", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }
  }, ref);

  return (
    <section ref={ref} aria-label="Posters and sketchbook" className="relative isolate overflow-hidden bg-ink">
      {/* Row 1: wall photo + cream panel */}
      <div className="relative lg:h-[max(460px,min(64svh,31vw))]">
        <div className="h-[320px] lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[55%]">
          <div data-wall className="h-[110%] w-full">
            <ArtImage
              src={IMAGES.posters.wall}
              alt="A framed wave illustration hanging on a warm, lamp-lit wall"
              fallback={FALLBACKS.wall}
              placeholder={<FramedWave />}
              className="h-full w-full"
            />
          </div>
        </div>

        <TornEdge
          edges={["left", "bottom"]}
          seed={52}
          amp={18}
          shadow
          className="relative z-10 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[52%]"
        >
          <div className="paper relative h-full px-7 pb-16 pt-14 lg:px-[6%] lg:pb-10 lg:pt-[7%]">
            <div data-posters="copy" className="max-w-[17rem]">
              <p className="label text-[0.62rem] text-ink/60">— {posters.subheading} —</p>
              <AccentHeading text={posters.heading} className="mt-3" />
              <p className="mt-4 text-[0.82rem] leading-relaxed text-ink/75">{posters.description}</p>
              <div className="mt-6">
                <ButtonLink href={posters.ctaLink ?? "/shop/poster-frames"} arrow>
                  {posters.ctaText}
                </ButtonLink>
              </div>
            </div>

            {/* Polaroid collage */}
            <div className="relative mt-12 h-[300px] lg:absolute lg:right-[3%] lg:top-[6%] lg:mt-0 lg:h-[82%] lg:w-[42%]">
              {IMAGES.posters.polaroids.map((src, i) => (
                <Polaroid
                  key={src}
                  data-polaroid
                  src={src}
                  alt={`Studio polaroid ${i + 1}`}
                  grayscale
                  fallback={FALLBACKS.mono}
                  rotate={[-6, 5, -3][i]}
                  className={["absolute left-[4%] top-[2%] w-[42%]", "absolute right-[2%] top-[10%] w-[40%]", "absolute left-[22%] top-[44%] w-[44%]"][i]}
                />
              ))}
              <HandwrittenNote rotate={5} tape className="absolute right-0 top-[52%] w-[9rem] text-[13px]">
                Turns blank walls into stories.
              </HandwrittenNote>
              <Cross aria-hidden className="absolute bottom-[4%] left-[2%] w-5 text-vermilion" />
            </div>
          </div>
        </TornEdge>
      </div>

      {/* Row 2: sketchbook */}
      <div className="paper-dark relative grid items-center gap-8 px-6 py-12 lg:h-[max(360px,min(46svh,22vw))] lg:grid-cols-[30%_1fr] lg:px-[5%] lg:py-0">
        <div data-sketchbook className="max-w-xs">
          <h3 className="font-brush text-[clamp(2rem,3.4vw,3.2rem)] uppercase leading-none tracking-tight text-paper">
            {sketchbook.heading}
          </h3>
          <p className="mt-4 text-[0.82rem] leading-relaxed text-paper/75">{sketchbook.description}</p>
          <div className="mt-6">
            <ButtonLink href={sketchbook.ctaLink ?? "/story"} variant="light" arrow size="sm">
              {sketchbook.ctaText}
            </ButtonLink>
          </div>
        </div>

        <div data-sketchbook className="flex justify-center lg:justify-start lg:pl-[6%]">
          <SketchbookViewer />
        </div>

        <HandwrittenNote rotate={7} className="absolute bottom-[8%] right-[3%] hidden w-[9.5rem] text-[13px] lg:block">
          Ideal people. Places. Everything in between.
        </HandwrittenNote>
      </div>
    </section>
  );
}
