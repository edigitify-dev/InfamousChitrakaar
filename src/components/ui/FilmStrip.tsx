import { cn } from "@/lib/utils";

interface FilmStripProps {
  frames: React.ReactNode[];
  rotate?: number;
  className?: string;
}

const HOLES =
  "repeating-linear-gradient(to bottom, transparent 0 6px, rgb(240 231 212 / 0.9) 6px 12px, transparent 12px 18px)";

/** Vertical film strip with sprocket holes; each frame is any node (illustration or photo). */
export function FilmStrip({ frames, rotate = 0, className }: FilmStripProps) {
  return (
    <div
      className={cn("relative bg-ink px-[9px] py-2 shadow-[0_8px_18px_rgba(0,0,0,0.4)]", className)}
      style={{ rotate: `${rotate}deg` }}
    >
      <div aria-hidden className="absolute inset-y-0 left-[2px] w-[4px]" style={{ backgroundImage: HOLES }} />
      <div aria-hidden className="absolute inset-y-0 right-[2px] w-[4px]" style={{ backgroundImage: HOLES }} />
      <div className="flex flex-col gap-1.5">
        {frames.map((frame, i) => (
          <div key={i} className="aspect-[4/5] overflow-hidden bg-paper">
            {frame}
          </div>
        ))}
      </div>
    </div>
  );
}
