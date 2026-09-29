import {
  ArrowCurve,
  Cross,
  Crown,
  Sparkle,
  Squiggle,
} from "@/components/ui/Doodles";

/**
 * Loose marker-pen doodles scattered around the hero.
 * Decorative only — intentionally imperfect placement.
 */
export function HeroDoodles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
    >
      {/* Stars / sparkles */}
      <Sparkle
        data-hero="doodle"
        className="absolute left-[11%] top-[17%] w-5 text-ink"
        style={{ transform: "rotate(12deg)" }}
      />
      <Sparkle
        data-hero="doodle"
        className="absolute left-[28%] top-[22%] w-3.5 text-ink/80"
        style={{ transform: "rotate(-8deg)" }}
      />
      <Sparkle
        data-hero="doodle"
        className="absolute left-[38%] top-[52%] w-3 text-ink/60"
      />

      {/* Crown above heading */}
      <Crown
        data-hero="doodle"
        className="absolute left-[30%] top-[14%] w-10 text-ink"
        style={{ transform: "rotate(8deg)" }}
      />

      {/* X marks */}
      <Cross
        data-hero="doodle"
        className="absolute left-[39%] top-[35%] w-5 text-vermilion"
        style={{ transform: "rotate(5deg)" }}
      />
      <Cross
        data-hero="doodle"
        className="absolute left-[8%] top-[62%] w-4 text-ink/50"
        style={{ transform: "rotate(-12deg)" }}
      />

      {/* Squiggle line */}
      <Squiggle
        data-hero="doodle"
        className="absolute bottom-[24%] left-[5%] w-20 text-ink/60"
        style={{ transform: "rotate(-6deg)" }}
      />

      {/* Curved arrows */}
      <ArrowCurve
        data-hero="doodle"
        className="absolute bottom-[20%] left-[14%] w-10 text-ink/65"
        style={{ transform: "rotate(4deg)" }}
      />
      <ArrowCurve
        data-hero="doodle"
        className="absolute right-[48%] top-[56%] w-8 text-ink/50"
        style={{ transform: "rotate(-15deg) scaleX(-1)" }}
      />

      {/* Rough circles — hand-drawn imperfect */}
      <svg
        data-hero="doodle"
        className="absolute left-[37%] top-[18%] w-6 text-ink/40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M12 2c5 0 10 3 10 10s-5 10-10 10S2 19 2 12 7 2 12 2Z" />
      </svg>

      {/* Small ink dots */}
      <svg
        data-hero="doodle"
        className="absolute left-[25%] top-[58%] w-2 text-ink"
        viewBox="0 0 8 8"
        aria-hidden="true"
      >
        <circle cx="4" cy="4" r="3" fill="currentColor" />
      </svg>
      <svg
        data-hero="doodle"
        className="absolute left-[42%] top-[68%] w-1.5 text-ink/60"
        viewBox="0 0 8 8"
        aria-hidden="true"
      >
        <circle cx="4" cy="4" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}
