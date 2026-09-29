"use client";

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/features/cart/cart-store";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ProductArt } from "@/components/ui/ProductArt";
import type { ProductCardData } from "@/types/product";

interface StudioProductModalProps {
  product: ProductCardData | null;
  onClose: () => void;
}

/** Quick view opened when a visitor clicks a hotspot in the studio. */
export function StudioProductModal({ product, onClose }: StudioProductModalProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Modal open={Boolean(product)} onClose={onClose} title={product?.name ?? "Product"}>
      {product && (
        <div>
          <div className="grid aspect-[4/3] place-items-center bg-paper-2 p-6">
            <ProductArt kind={product.art} className="h-full" />
          </div>
          <p className="label mt-5 text-vermilion">From the studio</p>
          <h3 className="mt-1 font-display text-3xl italic leading-tight">{product.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/75">{product.blurb}</p>
          <p className="mt-4 font-display text-2xl">{formatPrice(product.price)}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              variant="red"
              onClick={() => {
                addItem({
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  image: product.image,
                  unitPrice: product.price,
                });
                onClose();
              }}
            >
              Add to bag
            </Button>
            <ButtonLink href={`/product/${product.slug}`} variant="outline" arrow>
              View piece
            </ButtonLink>
          </div>
        </div>
      )}
    </Modal>
  );
}
