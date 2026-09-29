"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Designed fallbacks shown until a real photo is dropped into /public/images. */
export const FALLBACKS = {
  studio:
    "radial-gradient(circle at 72% 28%, rgb(255 196 120 / .55), transparent 38%), radial-gradient(circle at 18% 62%, rgb(255 150 80 / .35), transparent 34%), radial-gradient(circle at 50% 100%, rgb(120 60 40 / .5), transparent 50%), linear-gradient(160deg, #54402f, #1d1611)",
  desk:
    "radial-gradient(circle at 62% 30%, rgb(255 200 130 / .5), transparent 34%), radial-gradient(circle at 20% 80%, rgb(90 110 70 / .5), transparent 40%), linear-gradient(150deg, #4b3b2c, #17120e)",
  wall:
    "radial-gradient(circle at 30% 30%, rgb(255 190 110 / .45), transparent 40%), linear-gradient(140deg, #3b2f25, #15110d)",
  table:
    "radial-gradient(circle at 80% 20%, rgb(255 180 100 / .35), transparent 40%), radial-gradient(circle at 10% 70%, rgb(70 100 60 / .45), transparent 42%), linear-gradient(170deg, #2c221a, #100c09)",
  cards:
    "radial-gradient(circle at 25% 20%, rgb(255 205 140 / .55), transparent 36%), radial-gradient(circle at 80% 70%, rgb(200 110 60 / .35), transparent 40%), linear-gradient(160deg, #3e2f23, #120e0b)",
  skyline:
    "linear-gradient(to top, #2b1c2c 0%, #8c3f3a 22%, #e0703f 46%, #f2a566 62%, #b7a3a0 78%, #7f93ab 100%)",
  photo: "linear-gradient(135deg, #cfc4ae, #9d927c)",
  mono: "linear-gradient(135deg, #b9b2a3, #6c665b)",
} as const;

interface ArtImageProps {
  src?: string;
  alt: string;
  /** CSS background used under the photo / when the photo is missing */
  fallback?: string;
  className?: string;
  /** Placeholder artwork (SVG etc.) — sits under the photo, visible only if the photo is absent */
  placeholder?: React.ReactNode;
  /** Overlay content (always visible, above the photo) */
  children?: React.ReactNode;
  objectPosition?: string;
}

/**
 * Photo slot that never shows a broken-image icon.
 * Renders a designed fallback until the real file exists at `src`.
 * (Phase 9 swaps <img> for next/image + blur placeholders.)
 */
export function ArtImage({
  src,
  alt,
  fallback = FALLBACKS.photo,
  className,
  placeholder,
  children,
  objectPosition = "center",
}: ArtImageProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Handles images that errored before React hydrated (onError would never fire).
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  return (
    <div role="img" aria-label={alt} className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0" style={{ background: fallback }} />
      {placeholder && <div className="absolute inset-0">{placeholder}</div>}
      {src && !failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition }}
        />
      )}
      {children}
    </div>
  );
}
