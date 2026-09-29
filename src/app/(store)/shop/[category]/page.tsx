import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getCategories, getCategoryBySlug, getProducts } from "@/data/catalog";

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = getCategoryBySlug(category);
  return { title: c?.name ?? "Shop" };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const current = getCategoryBySlug(category);
  if (!current) notFound();

  const products = getProducts(category);
  const categories = getCategories();
  const words = current.name.split(" ");
  const last = words.pop();

  return (
    <div className="paper min-h-screen px-6 pb-24 pt-32 lg:px-[5%]">
      <div className="mx-auto max-w-[1400px]">
        <p className="label text-ink/60">The shop</p>
        <h1 className="mt-2 font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-none">
          {words.join(" ")} <em className="text-vermilion">{last}.</em>
        </h1>
        <div className="my-8">
          <CategoryFilter categories={categories} active={category} />
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
