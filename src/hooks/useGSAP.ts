"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function registerGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface GsapSetupContext {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  /** visitor prefers reduced motion — keep to simple fades */
  reduced: boolean;
  /** viewport >= 768px — heavy parallax / pins allowed */
  desktop: boolean;
}

/**
 * Scoped GSAP setup with automatic cleanup.
 * - selectors inside `setup` are scoped to `scope`
 * - respects prefers-reduced-motion, and passes `desktop` so mobile can skip heavy effects
 */
export function useGSAP(
  setup: (ctx: GsapSetupContext) => void,
  scope: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  useIsoLayoutEffect(() => {
    registerGsap();
    const el = scope.current;
    if (!el) return;

    const mm = gsap.matchMedia(el);
    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 768px)",
      },
      (context) => {
        const conditions = (context.conditions ?? {}) as Record<string, boolean>;
        setup({
          gsap,
          ScrollTrigger,
          reduced: Boolean(conditions.reduce),
          desktop: Boolean(conditions.desktop),
        });
      },
    );

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Standard section reveal: any element with `data-reveal` inside `scope`
 * fades/rises in once as it enters the viewport.
 * Optional `data-reveal-delay="0.2"` (seconds).
 */
export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(({ gsap, reduced }) => {
    const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    items.forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        y: reduced ? 0 : 36,
        duration: reduced ? 0.4 : 0.9,
        ease: "power3.out",
        delay: Number(item.dataset.revealDelay ?? 0),
        scrollTrigger: { trigger: item, start: "top 88%", once: true },
      });
    });
  }, scope);
}
