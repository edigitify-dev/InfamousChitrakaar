import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ArtImage } from "@/components/ui/ArtImage";
import { Badge } from "@/components/ui/Badge";
import { ProductArt } from "@/components/ui/ProductArt";
import type { ProductCardData } from "@/types/product";

/** Plain grid card used on shop, category and related-products lists. */
export function ShopProductCard({ product }: { product: ProductCardData }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2 shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
        <ArtImage
          src={product.image}
          alt={product.name}
          fallback="#e3d6bb"
          className="absolute inset-0"
          placeholder={
            <div className="grid h-full place-items-center p-8">
              <ProductArt kind={product.art} className="w-full transition-transform duration-500 group-hover:scale-105" />
            </div>
          }
        />
        {product.isNew && <Badge className="absolute left-2 top-2 z-10">New</Badge>}
      </div>
      <h3 className="mt-3 font-display text-[1.05rem] italic leading-tight">{product.name}</h3>
      <p className="label mt-1 text-[0.65rem] text-ink/70">{formatPrice(product.price)}</p>
    </Link>
  );
}
