"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/features/cart/cart-store";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { ProductDetail } from "@/data/catalog";

export function ProductInfo({ product }: { product: ProductDetail }) {
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const soldOut = product.stock <= 0;
  const maxQty = Math.min(10, Math.max(1, product.stock));

  function add() {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0]?.url,
        unitPrice: product.price,
      },
      qty,
    );
  }

  return (
    <div className="max-w-md">
      <p className="label text-ink/60">{product.category.name}</p>
      <div className="mt-3 flex items-start gap-3">
        <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] italic leading-tight">{product.name}</h1>
        {product.isNew && <Badge className="mt-3">New</Badge>}
      </div>

      <p className="mt-4 flex items-baseline gap-3">
        <span className="font-display text-2xl">{formatPrice(product.price)}</span>
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <span className="text-sm text-ink/50 line-through">{formatPrice(product.compareAtPrice)}</span>
        )}
      </p>

      {(product.description || product.shortDescription) && (
        <p className="mt-6 text-[0.92rem] leading-relaxed text-ink/80">{product.description || product.shortDescription}</p>
      )}

      <div className="mt-8 flex items-center gap-4">
        <div className="flex h-11 items-center border border-ink">
          <button type="button" aria-label="Decrease quantity" className="h-full w-10 hover:bg-ink hover:text-paper" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            −
          </button>
          <span aria-live="polite" className="w-8 text-center text-sm">{qty}</span>
          <button type="button" aria-label="Increase quantity" className="h-full w-10 hover:bg-ink hover:text-paper" onClick={() => setQty((q) => Math.min(maxQty, q + 1))}>
            +
          </button>
        </div>
        <Button onClick={add} disabled={soldOut} arrow className="flex-1 disabled:opacity-50">
          {soldOut ? "Sold out" : "Add to bag"}
        </Button>
      </div>

      <ul className="mt-8 space-y-2 border-t border-ink/15 pt-6 text-[0.8rem] text-ink/70">
        <li>Printed in small batches</li>
        <li>Ships across India in 5–7 days</li>
        <li>Easy returns on unused items</li>
      </ul>
    </div>
  );
}
