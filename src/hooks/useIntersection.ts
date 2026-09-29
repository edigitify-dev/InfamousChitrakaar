"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface Options {
  /** Stop observing after the first time the element is seen (default true). */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

/** Returns [ref, isVisible]. Used to lazy-mount heavy things (like the 3D studio). */
export function useIntersection<T extends Element>({
  once = true,
  rootMargin = "0px",
  threshold = 0,
}: Options = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, visible];
}
