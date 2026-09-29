import type { Metadata } from "next";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getCategories, getProducts } from "@/data/catalog";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  const products = getProducts();
  const categories = getCategories();
  return (
    <div className="paper min-h-screen px-6 pb-24 pt-32 lg:px-[5%]">
      <div className="mx-auto max-w-[1400px]">
        <p className="label text-ink/60">The shop</p>
        <h1 className="mt-2 font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-none">
          All <em className="text-vermilion">Pieces.</em>
        </h1>
        <div className="my-8">
          <CategoryFilter categories={categories} />
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
