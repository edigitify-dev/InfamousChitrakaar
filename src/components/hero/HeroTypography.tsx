import { ButtonLink } from "@/components/ui/Button";
import { Crown, Swoosh } from "@/components/ui/Doodles";
import type { SectionContent } from "@/types/homepage";

/** The big dry-brush title lockup + tagline + intro copy + CTA. */
export function HeroTypography({ content }: { content: SectionContent }) {
  return (
    <div>
      {/* Eyebrow */}
      <p
        data-hero="fade"
        className="mb-4 flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-vermilion sm:mb-5"
      >
        <Crown className="w-4" />
        {content.subheading ?? "We create. You dominate."}
      </p>

      {/* Giant headline — uses RUSTY ATTACK font */}
      <h1
        className="hero-rusty brush-rough uppercase leading-[0.82] tracking-tight"
        aria-label={content.heading ?? "The Infamous Chitrakar"}
      >
        <span
          data-hero="line"
          aria-hidden
          className="block text-[clamp(3.2rem,8.8vw,8.8rem)] text-ink"
          style={{ transform: "rotate(-1.5deg)" }}
        >
          The
        </span>
        <span
          data-hero="line"
          aria-hidden
          className="block text-[clamp(3.2rem,8.8vw,8.8rem)] text-ink"
          style={{ transform: "rotate(-1.5deg)" }}
        >
          Infamous
        </span>
        <span
          data-hero="line"
          aria-hidden
          className="relative mt-1 block text-[clamp(2.8rem,7.8vw,7.8rem)] text-vermilion"
          style={{ transform: "rotate(-1.5deg)" }}
        >
          Chitrakar
          <Swoosh className="absolute -bottom-2 left-0 h-4 w-[92%] text-vermilion" />
        </span>
      </h1>

      {/* Description */}
      <p
        data-hero="fade"
        className="mt-7 max-w-[18rem] text-[0.82rem] leading-relaxed text-ink/75 sm:mt-9"
      >
        {content.description ??
          "Illustrations, stories and chaos turned into things you can live with."}
      </p>

      {/* CTA */}
      <div data-hero="fade" className="mt-5 sm:mt-6">
        <ButtonLink
          href={content.ctaLink ?? "/studio"}
          arrow
          className="px-8 py-3 text-[0.68rem]"
        >
          {content.ctaText ?? "Explore the Studio"}
        </ButtonLink>
      </div>
    </div>
  );
}
