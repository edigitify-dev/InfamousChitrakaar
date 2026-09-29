"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { IMAGES } from "@/config/images";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ArtMotif, type MotifKind } from "@/components/ui/Doodles";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { Polaroid } from "@/components/ui/Polaroid";
import { TornEdge } from "@/components/ui/TornEdge";
import type { SectionContent } from "@/types/homepage";

const KINDS: MotifKind[] = ["face", "skull", "eye", "heart"];
const ROT = [-5, 3, -2, 5];
const POS = ["left-[2%] top-[4%]", "right-[4%] top-[0%]", "left-[14%] top-[46%]", "right-[10%] top-[44%]"];

export function SignatureSection({ content }: { content: SectionContent }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(({ gsap, reduced }) => {
    gsap.from("[data-sig]", {
      opacity: 0,
      y: reduced ? 0 : 40,
      rotate: reduced ? 0 : 3,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
    });
  }, ref);

  return (
    <section ref={ref} aria-label="Signature collection" className="paper relative overflow-hidden">
      <TornEdge edges={["bottom"]} seed={21} amp={12}>
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_44%] lg:px-[5%] lg:py-20">
          <div className="max-w-md">
            <p data-sig className="label mb-4 text-ink/60">{content.subheading ?? "Signature collection"}</p>
            <div data-sig>
              <AccentHeading text={content.heading} />
            </div>
            <p data-sig className="mt-5 text-[0.9rem] leading-relaxed text-ink/75">{content.description}</p>
            <div data-sig className="mt-7">
              <ButtonLink href={content.ctaLink ?? "/shop"} arrow>
                {content.ctaText ?? "Explore collection"}
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto h-[26rem] w-full max-w-[34rem] sm:h-[32rem]">
            {IMAGES.signature.polaroids.map((src, i) => (
              <div key={src} data-sig className={`absolute w-[46%] ${POS[i]}`}>
                <Polaroid
                  src={src}
                  alt={`Signature piece ${i + 1}`}
                  caption={["Chapter I", "Chapter II", "Chapter III", "Chapter IV"][i]}
                  rotate={ROT[i]}
                  placeholder={<ArtMotif kind={KINDS[i]} className="mx-auto h-full w-4/5 p-3" />}
                />
              </div>
            ))}
            <HandwrittenNote rotate={6} tape className="absolute -bottom-2 right-0 w-[9rem] text-[13px]">
              Made by hand. Worn by you.
            </HandwrittenNote>
          </div>
        </div>
      </TornEdge>
    </section>
  );
}
