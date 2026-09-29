"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArtImage } from "@/components/ui/ArtImage";
import { ProductArt } from "@/components/ui/ProductArt";
import type { ProductArtKind } from "@/types/product";

interface ProductGalleryProps {
  images: { url: string; alt: string }[];
  art: ProductArtKind;
  name: string;
}

export function ProductGallery({ images, art, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2 shadow-[0_14px_30px_rgba(0,0,0,0.22)]">
        <ArtImage
          src={current?.url}
          alt={current?.alt ?? name}
          fallback="#e3d6bb"
          className="absolute inset-0"
          placeholder={
            <div className="grid h-full place-items-center p-12">
              <ProductArt kind={art} className="w-full" />
            </div>
          }
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 flex gap-2">
          {images.map((img, i) => (
            <li key={img.url}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                className={cn("block h-16 w-14 overflow-hidden border-2", i === active ? "border-ink" : "border-transparent opacity-70 hover:opacity-100")}
              >
                <ArtImage src={img.url} alt="" fallback="#e3d6bb" className="h-full w-full" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
