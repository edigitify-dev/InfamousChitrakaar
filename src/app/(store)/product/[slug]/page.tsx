import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductInfo } from "@/components/products/ProductInfo";
import { getAllProductSlugs, getProductBySlug, getRelatedProducts } from "@/data/catalog";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  return p ? { title: p.name, description: p.shortDescription ?? undefined } : { title: "Product" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.id, product.category.slug);

  return (
    <div className="paper min-h-screen px-6 pb-24 pt-28 lg:px-[5%]">
      <div className="mx-auto max-w-[1200px]">
        <nav aria-label="Breadcrumb" className="label mb-8 text-ink/60">
          <Link href="/shop" className="hover:text-vermilion">Shop</Link> /{" "}
          <Link href={`/shop/${product.category.slug}`} className="hover:text-vermilion">{product.category.name}</Link>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} art={product.art} name={product.name} />
          <ProductInfo product={product} />
        </div>

        {related.length > 0 && (
          <section className="mt-24" aria-label="Related products">
            <h2 className="mb-8 font-display text-3xl">
              More from <em className="text-vermilion">{product.category.name}.</em>
            </h2>
            <ProductGrid products={related} />
          </section>
        )}
      </div>
    </div>
  );
}
