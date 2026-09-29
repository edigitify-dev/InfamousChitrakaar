import { cn, seededRandom } from "@/lib/utils";

export type Edge = "top" | "right" | "bottom" | "left";

/**
 * Builds a jagged, hand-torn clip-path. Deterministic per `seed`,
 * so server and client render the exact same edge (no hydration mismatch).
 * `amp` is the maximum tear depth in px.
 */
export function tornClipPath(seed: number, edges: Edge[], amp = 14): string {
  const rand = seededRandom(seed);
  let prev = amp * 0.4;
  // Smoothed random walk + occasional bigger "rips" reads as real paper fibre
  const jitter = () => {
    prev = prev * 0.5 + rand() * amp * 0.55;
    if (rand() > 0.93) prev += amp * 0.35;
    return Math.round(Math.min(amp, Math.max(0, prev)) * 10) / 10;
  };
  const has = (e: Edge) => edges.includes(e);
  const NX = 38;
  const NY = 22;
  const pts: string[] = [];

  for (let i = 0; i <= NX; i++) pts.push(`${((i / NX) * 100).toFixed(2)}% ${has("top") ? jitter() : 0}px`);
  for (let i = 1; i <= NY; i++)
    pts.push(`calc(100% - ${has("right") ? jitter() : 0}px) ${((i / NY) * 100).toFixed(2)}%`);
  for (let i = NX - 1; i >= 0; i--)
    pts.push(`${((i / NX) * 100).toFixed(2)}% calc(100% - ${has("bottom") ? jitter() : 0}px)`);
  for (let i = NY - 1; i >= 1; i--) pts.push(`${has("left") ? jitter() : 0}px ${((i / NY) * 100).toFixed(2)}%`);

  return `polygon(${pts.join(",")})`;
}

interface TornEdgeProps {
  edges?: Edge[];
  seed?: number;
  amp?: number;
  /** adds a soft shadow that follows the torn outline */
  shadow?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Wrapper that gives its box a torn-paper outline.
 * Put layout/positioning classes in `className` — they apply to the outer box.
 */
export function TornEdge({
  edges = ["bottom"],
  seed = 1,
  amp = 14,
  shadow = false,
  className,
  style,
  children,
}: TornEdgeProps) {
  const clipPath = tornClipPath(seed, edges, amp);

  if (shadow) {
    return (
      <div className={cn("drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]", className)} style={style}>
        <div className="h-full w-full" style={{ clipPath }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={{ clipPath, ...style }}>
      {children}
    </div>
  );
}
