"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/features/cart/cart-store";
import type { CartItem as CartItemType } from "@/features/cart/cart-types";
import { ArtImage } from "@/components/ui/ArtImage";
import { QuantitySelector } from "./QuantitySelector";

export function CartItem({ item, compact = false }: { item: CartItemType; compact?: boolean }) {
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <li className="flex gap-4 py-4">
      <Link href={`/product/${item.slug}`} className="shrink-0">
        <ArtImage
          src={item.image}
          alt={item.name}
          fallback="#e3d6bb"
          className={compact ? "h-16 w-14" : "h-24 w-20"}
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/product/${item.slug}`} className="font-display text-sm italic leading-tight hover:text-vermilion">
              {item.name}
            </Link>
            {item.variantLabel && <p className="mt-0.5 text-[0.7rem] text-ink/60">{item.variantLabel}</p>}
          </div>
          <p className="whitespace-nowrap text-sm">{formatPrice(item.unitPrice * item.quantity)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <QuantitySelector quantity={item.quantity} onChange={(q) => setQuantity(item.lineId, q)} />
          <button type="button" onClick={() => removeItem(item.lineId)} className="label text-[0.65rem] text-ink/50 hover:text-vermilion">
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
