/**
 * Handwritten editorial annotations placed around the hero section.
 * These look like notes an artist would scribble into a sketchbook.
 */
export function HeroAnnotations() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
    >
      {/* Vertical side annotation — "SKETCH" */}
      <span
        data-hero="doodle"
        className="vertical-text absolute left-[7.8%] top-[46%] font-hand text-[11px] font-bold uppercase tracking-[0.3em] text-ink/40"
        style={{ transform: "rotate(180deg)" }}
      >
        — Sketch —
      </span>

      {/* "ART GOES EVERYWHERE." — bottom left */}
      <span
        data-hero="doodle"
        className="absolute bottom-[16%] left-[2.5%] font-hand text-[clamp(0.9rem,1.3vw,1.25rem)] font-bold uppercase leading-[1.05] tracking-wide text-ink/85"
        style={{ transform: "rotate(-3deg)" }}
      >
        Art
        <br />
        goes
        <br />
        everywhere.
      </span>

      {/* Small underline mark near bottom text */}
      <svg
        data-hero="doodle"
        className="absolute bottom-[14.5%] left-[2.5%] w-16 text-ink/40"
        viewBox="0 0 60 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M2 4c12-3 28-3 56 0" />
      </svg>

      {/* Small hash / line marks */}
      <svg
        data-hero="doodle"
        className="absolute left-[10%] top-[14%] w-4 text-ink/50"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M2 2l12 12M14 2L2 14" />
      </svg>
    </div>
  );
}
