"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArtMotif, type MotifKind } from "@/components/ui/Doodles";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const CARDS: { rank: string; suit: string; kind: MotifKind; red: boolean }[] = [
  { rank: "A", suit: "♠", kind: "skull", red: false },
  { rank: "K", suit: "♥", kind: "face", red: true },
  { rank: "Q", suit: "♦", kind: "eye", red: true },
  { rank: "J", suit: "♣", kind: "heart", red: false },
  { rank: "10", suit: "♥", kind: "eye", red: true },
  { rank: "7", suit: "♠", kind: "face", red: false },
];

/** Fanned deck. Cards lift and spread away from the cursor; click to pick one. */
export function CardDeck({ onPick }: { onPick?: (i: number) => void }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const mid = (CARDS.length - 1) / 2;

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto h-[19rem] w-full max-w-[36rem] sm:h-[24rem]"
      onPointerLeave={() => setHover(null)}
    >
      {CARDS.map((c, i) => {
        const offset = i - mid;
        const active = hover === i || picked === i;
        // cards to the right of the hovered card slide right, left slide left
        const push = hover === null || reduced ? 0 : Math.sign(i - hover) * 26;
        return (
          <motion.button
            key={i}
            type="button"
            aria-label={`Pick card ${c.rank}${c.suit}`}
            onPointerEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onClick={() => {
              setPicked(i);
              onPick?.(i);
            }}
            animate={{
              x: offset * 56 + push,
              y: active ? -34 : Math.abs(offset) * 6,
              rotate: active ? 0 : offset * 7,
              scale: active ? 1.08 : 1,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{ zIndex: active ? 20 : i }}
            className="absolute left-1/2 top-8 -ml-[4.2rem] h-[13.5rem] w-[8.4rem] origin-bottom rounded-md border border-ink/70 bg-[#f7f0e0] shadow-[0_10px_22px_rgba(0,0,0,0.45)] sm:-ml-[5rem] sm:h-[16rem] sm:w-[10rem]"
          >
            <span className={cn("absolute left-2 top-1.5 text-left font-display text-lg leading-none", c.red ? "text-vermilion" : "text-ink")}>
              {c.rank}
              <br />
              {c.suit}
            </span>
            <span className={cn("absolute bottom-1.5 right-2 rotate-180 text-left font-display text-lg leading-none", c.red ? "text-vermilion" : "text-ink")}>
              {c.rank}
              <br />
              {c.suit}
            </span>
            <ArtMotif kind={c.kind} accent={c.red ? "#d8432a" : "#e9a23b"} className="absolute inset-x-4 inset-y-7 h-[calc(100%-3.5rem)] w-[calc(100%-2rem)]" />
          </motion.button>
        );
      })}
    </div>
  );
}
