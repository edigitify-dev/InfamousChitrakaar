"use client";

import { useSyncExternalStore } from "react";
import type Lenis from "lenis";

/** Tiny module store so any component can reach the Lenis instance (e.g. to stop scroll under a modal). */
let instance: Lenis | null = null;
const listeners = new Set<() => void>();

export function setLenisInstance(next: Lenis | null) {
  instance = next;
  listeners.forEach((l) => l());
}

export function useLenis(): Lenis | null {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => instance,
    () => null,
  );
}
