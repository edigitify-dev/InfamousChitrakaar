import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

/** Hand-drawn crown. Inherits colour via `currentColor`. */
export function Crown(props: P) {
  return (
    <svg viewBox="0 0 40 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M4 26 8 8l8 10 4-14 4 14 8-10 4 18Z" />
      <path d="M6 26h28" />
    </svg>
  );
}

/** Four-point sparkle. */
export function Sparkle(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0c1 8 4 11 12 12-8 1-11 4-12 12-1-8-4-11-12-12 8-1 11-4 12-12Z" />
    </svg>
  );
}

/** Scratchy x-mark used as a marker-pen accent. */
export function Cross(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M3 4c6 5 12 10 18 16M20 3C14 9 8 15 3 21" />
    </svg>
  );
}

export function Squiggle(props: P) {
  return (
    <svg viewBox="0 0 80 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M2 10c6-10 10 8 16-2s10 8 16-2 10 8 16-2 10 6 26-2" />
    </svg>
  );
}

/** Curly hand-drawn arrow. */
export function ArrowCurve(props: P) {
  return (
    <svg viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 30C18 6 42 4 58 24M46 22l12 3 0-12" />
    </svg>
  );
}

/** Brush underline swoosh for the hero title. */
export function Swoosh(props: P) {
  return (
    <svg viewBox="0 0 320 24" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" preserveAspectRatio="none" aria-hidden="true" {...props}>
      <path d="M6 16C60 6 150 4 250 10c30 2 50 4 64 2" />
      <path d="M40 21c70-6 150-7 230-3" strokeWidth="3" />
    </svg>
  );
}

const INK = "#14110e";
const CREAM = "#f2e6cf";
const RED = "#d8432a";

export type MotifKind = "face" | "skull" | "eye" | "heart";

/**
 * Ink-line illustrations used inside cards, film strips and the sketchbook.
 * Stand-ins for the artist's real drawings.
 */
export function ArtMotif({
  kind,
  accent = "#e9a23b",
  className,
}: {
  kind: MotifKind;
  accent?: string;
  className?: string;
}) {
  const common = { stroke: INK, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

  return (
    <svg viewBox="0 0 100 120" className={className} role="img" aria-label={`${kind} illustration`}>
      {kind === "face" && (
        <g {...common}>
          <path d="M34 96c-4 12-6 20-8 24h48c-2-4-4-12-8-24Z" fill={accent} />
          <path d="M30 44c0-22 40-22 40 0v18c0 20-10 32-20 32S30 82 30 62Z" fill={CREAM} />
          <path d="M22 66C10 26 40 6 62 12c24 6 22 44 14 72-2-18-4-34-8-44-12 6-28 2-34-8-2 12-2 26-12 34Z" fill={INK} />
          <path d="M36 54q6-4 12 0M52 54q6-4 12 0" fill="none" />
          <circle cx="42" cy="58" r="2.2" fill={INK} />
          <circle cx="58" cy="58" r="2.2" fill={INK} />
          <path d="M50 60l-3 12h5" fill="none" strokeWidth="1.5" />
          <path d="M42 80q8 6 16 0-8-2-16 0Z" fill={RED} />
          <circle cx="36" cy="70" r="4" fill={RED} opacity=".35" stroke="none" />
        </g>
      )}
      {kind === "skull" && (
        <g {...common}>
          <path d="M30 100h40v20H30Z" fill={accent} />
          <path d="M28 60C22 20 78 20 72 60c0 10-6 14-8 20v16H36V80c-2-6-8-10-8-20Z" fill={CREAM} />
          <ellipse cx="40" cy="56" rx="8" ry="10" fill={INK} />
          <ellipse cx="60" cy="56" rx="8" ry="10" fill={INK} />
          <path d="M50 68l-4 10h8Z" fill={INK} />
          <path d="M38 88h24M44 82v14M50 82v14M56 82v14" fill="none" />
          <path d="M56 26l-4 12 6 6" fill="none" stroke={RED} />
        </g>
      )}
      {kind === "eye" && (
        <g {...common}>
          <path d="M8 62C28 30 72 30 92 62 72 92 28 92 8 62Z" fill={CREAM} />
          <circle cx="50" cy="62" r="17" fill={accent} />
          <circle cx="50" cy="62" r="8" fill={INK} />
          <circle cx="45" cy="57" r="3" fill="#fff" stroke="none" />
          <path d="M50 24V10M30 30 24 16M70 30l6-14M14 42 6 34M86 42l8-8" fill="none" />
        </g>
      )}
      {kind === "heart" && (
        <g {...common}>
          <path d="M50 104C8 72 10 34 34 34c10 0 16 8 16 12 0-4 6-12 16-12 24 0 26 38-16 70Z" fill={RED} />
          <path d="M42 34C40 20 34 14 28 8M58 34c2-14 8-20 14-26" fill="none" />
          <path d="M30 46c-4 6-4 14 0 20" fill="none" stroke={CREAM} />
        </g>
      )}
    </svg>
  );
}
