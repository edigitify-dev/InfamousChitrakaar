import type { ProductCardData } from "@/types/product";
import { ShopProductCard } from "./ShopProductCard";

export function ProductGrid({ products }: { products: ProductCardData[] }) {
  if (!products.length) {
    return <p className="py-20 text-center font-hand text-2xl text-ink/60">Nothing here yet. Check back soon.</p>;
  }
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <li key={p.id}>
          <ShopProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}
