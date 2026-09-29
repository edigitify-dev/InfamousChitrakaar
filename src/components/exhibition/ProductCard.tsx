"use client";

import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/features/cart/cart-store";
import { ArtImage } from "@/components/ui/ArtImage";
import { Badge } from "@/components/ui/Badge";
import { ProductArt } from "@/components/ui/ProductArt";
import type { ProductCardData } from "@/types/product";

interface ProductCardProps {
  product: ProductCardData;
  rotate?: number;
  className?: string;
}

/** Editorial product card used in "The Current Exhibition". */
export function ProductCard({ product, rotate = 0, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <article
      data-float
      className={cn(
        "group relative bg-[#f6f0e2] p-2 shadow-[0_20px_34px_rgba(0,0,0,0.55)] transition-[translate] duration-500 hover:-translate-y-2",
        className,
      )}
      style={{ rotate: `${rotate}deg` }}
    >
      <Link href={`/product/${product.slug}`} className="block" aria-label={`${product.name}, ${formatPrice(product.price)}`}>
        <div className="relative aspect-[4/5] overflow-hidden">
          <ArtImage
            src={product.image}
            alt={product.name}
            fallback="#e3d6bb"
            className="absolute inset-0"
            placeholder={
              <div className="grid h-full place-items-center p-5">
                <ProductArt kind={product.art} className="max-h-full w-full transition-transform duration-500 group-hover:scale-105" />
              </div>
            }
          />
          {product.isNew && <Badge className="absolute left-2 top-2 z-10">New</Badge>}
        </div>
        <h3 className="mt-3 pr-9 font-display text-[0.95rem] italic leading-tight">{product.name}</h3>
        <p className="label mt-1 text-[0.6rem] text-ink/70">{formatPrice(product.price)}</p>
      </Link>
      <button
        type="button"
        aria-label={`Add ${product.name} to bag`}
        onClick={() =>
          addItem({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: product.image,
            unitPrice: product.price,
          })
        }
        className="absolute bottom-3 right-3 grid size-8 place-items-center rounded-full bg-ink text-paper transition-colors hover:bg-vermilion"
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
          <path d="M3.5 6.5h13l-1 11h-11Z" />
          <path d="M7 6.5V5a3 3 0 0 1 6 0v1.5" />
        </svg>
      </button>
    </article>
  );
}
