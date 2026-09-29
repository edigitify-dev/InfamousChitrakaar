"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArtMotif, type MotifKind } from "@/components/ui/Doodles";

interface PageArt {
  kind: MotifKind;
  accent?: string;
  note?: string;
}

/** Placeholder spreads — swap for real scans by editing `SPREADS` or feeding CMS data later. */
const SPREADS: [PageArt[], PageArt[]][] = [
  [
    [{ kind: "face", note: "study 01" }, { kind: "eye", accent: "#d8432a" }],
    [{ kind: "skull", note: "bad idea" }, { kind: "face", accent: "#d8432a" }],
  ],
  [
    [{ kind: "heart", note: "keep this one" }, { kind: "face" }],
    [{ kind: "eye" }, { kind: "skull", accent: "#d8432a", note: "ink test" }],
  ],
  [
    [{ kind: "skull" }, { kind: "heart", note: "reds only" }],
    [{ kind: "face", accent: "#d8432a", note: "portrait" }, { kind: "eye" }],
  ],
  [
    [{ kind: "eye", note: "watching" }, { kind: "face" }],
    [{ kind: "heart" }, { kind: "skull", note: "final?" }],
  ],
];

function Page({ items, side }: { items: PageArt[]; side: "left" | "right" }) {
  return (
    <div
      className={cn(
        "paper relative grid grid-rows-2 gap-1 p-[6%]",
        side === "left" ? "rounded-l-[3px] pr-[9%]" : "rounded-r-[3px] pl-[9%]",
      )}
    >
      {items.map((item, i) => (
        <figure key={i} className="relative flex items-center justify-center">
          <ArtMotif kind={item.kind} accent={item.accent} className="h-full max-h-full w-auto" />
          {item.note && (
            <figcaption className="absolute bottom-0 right-1 -rotate-3 font-hand text-[13px] font-bold text-ink/60">
              {item.note}
            </figcaption>
          )}
        </figure>
      ))}
      {/* spine shading */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 w-[14%] from-black/25 to-transparent",
          side === "left" ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r",
        )}
      />
    </div>
  );
}

export function SketchbookViewer({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const total = SPREADS.length;

  const go = (d: 1 | -1) => {
    setDir(d);
    setIndex((i) => (i + d + total) % total);
  };

  const [left, right] = SPREADS[index];

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative aspect-[16/10] h-full max-h-[340px] min-h-[210px] [perspective:1600px]">
        <div className="absolute -inset-[3%] rounded-[4px] bg-[#2b2018] shadow-[0_24px_40px_rgba(0,0,0,0.6)]" />
        <AnimatePresence mode="popLayout" custom={dir} initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={{
              enter: (d: number) => ({ rotateY: d > 0 ? -55 : 55, opacity: 0 }),
              center: { rotateY: 0, opacity: 1 },
              exit: (d: number) => ({ rotateY: d > 0 ? 55 : -55, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 grid grid-cols-2 gap-px bg-black/40"
          >
            <Page items={left} side="left" />
            <Page items={right} side="right" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4 text-paper">
        <button type="button" onClick={() => go(-1)} aria-label="Previous pages" className="grid size-8 place-items-center rounded-full border border-paper/60 hover:bg-paper hover:text-ink">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M14 5H1M5 1 1 5l4 4" /></svg>
        </button>
        <span className="label text-[0.6rem] tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button type="button" onClick={() => go(1)} aria-label="Next pages" className="grid size-8 place-items-center rounded-full border border-paper/60 hover:bg-paper hover:text-ink">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M0 5h13M9 1l4 4-4 4" /></svg>
        </button>
      </div>
    </div>
  );
}
