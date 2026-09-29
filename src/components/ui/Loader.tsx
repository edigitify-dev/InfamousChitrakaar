"use client";

import { useEffect, useState } from "react";

const DURATION_MS = 2200; // how long the count takes (if the page is already loaded)
const FADE_MS = 600;

const PAPER = "#efe3cf";
const INK = "#1c1917";
const RED = "#d8432a";

export function Loader() {
  const [show, setShow] = useState(true); // in the DOM
  const [fade, setFade] = useState(false); // fading out
  const [count, setCount] = useState(0); // 0 - 100

  // Lock page scroll while the loader is visible
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  // Count up, hold at 99 until the page has loaded, then fade out
  useEffect(() => {
    let raf = 0;
    let removeTimer: ReturnType<typeof setTimeout> | undefined;
    let loaded = document.readyState === "complete";
    const start = performance.now();

    const onLoad = () => {
      loaded = true;
    };
    if (!loaded) window.addEventListener("load", onLoad);

    const tick = (now: number) => {
      let value = Math.min((now - start) / DURATION_MS, 1) * 100;
      if (!loaded) value = Math.min(value, 99);
      const rounded = Math.floor(value);
      setCount(rounded);

      if (rounded >= 100) {
        setFade(true);
        removeTimer = setTimeout(() => setShow(false), FADE_MS);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (removeTimer) clearTimeout(removeTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      role="status"
      aria-label={`Loading ${count} percent`}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{
        backgroundColor: PAPER,
        backgroundImage:
          "radial-gradient(circle at 20% 15%, rgba(255,255,255,.55), transparent 55%), radial-gradient(circle at 85% 90%, rgba(190,160,120,.25), transparent 50%)",
        color: INK,
        opacity: fade ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: fade ? "none" : "auto",
      }}
    >
      {/* Small label */}
      <p className="font-edu-qld -rotate-3 text-[15px] font-semibold uppercase tracking-[0.2em] sm:text-[18px]">
        Art that feels real.
      </p>

      <h2 className="mt-4 text-4xl font-bold uppercase tracking-[0.3em] opacity-60">
        The Infamous Chitrakar
      </h2>

      {/* Progress bar */}
      <div
        className="mt-6 h-[6px] w-[min(70vw,340px)] overflow-hidden rounded-full"
        style={{ backgroundColor: "rgba(28,25,23,.15)" }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${count}%`, backgroundColor: RED }}
        />
      </div>
      {/* Timer */}
      <div className="mt-4 flex items-start leading-none">
        <span
          className="font-sans font-bold text-[clamp(3rem,5vw,6rem)] tracking-[-.05em]"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {count}
        </span>
        <span
          className="font-sans mt-3 font-bold text-[clamp(3rem,4vw,5rem)]"
          style={{ color: RED }}
        >
          %
        </span>
      </div>
    </div>
  );
}
