import { categories as categoryConfig } from "@/config/categories";
import type { CategoryItem, ProductArtKind, ProductCardData } from "@/types/product";

/**
 * Static catalog — the single source of truth for products now that there is no database.
 * To add / edit / remove a product, edit the `PRODUCTS` array below.
 *
 * - `price` and `compareAtPrice` are in PAISE (₹1 = 100 paise). 149900 → ₹1,499.
 * - `category` must match a slug in src/config/categories.ts.
 * - `images` are paths inside /public (e.g. "/images/products/chaos-tee.webp").
 *   Leave it empty to show the built-in illustration for the category instead.
 */
interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  shortDescription?: string;
  description?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  stock: number;
  images?: { url: string; alt?: string }[];
}

const PRODUCTS: CatalogProduct[] = [
  {
    id: "p1",
    slug: "chaos-tee",
    name: "Chaos Tee",
    category: "t-shirts",
    price: 149900,
    isNew: true,
    isFeatured: true,
    shortDescription: "Heavy cotton, hand-drawn print.",
    stock: 50,
  },
  {
    id: "p2",
    slug: "midnight-tote",
    name: "Midnight Tote",
    category: "totes",
    price: 89900,
    isFeatured: true,
    shortDescription: "Canvas tote, screen printed.",
    stock: 50,
  },
  {
    id: "p3",
    slug: "wave-poster",
    name: "The Wave Poster",
    category: "poster-frames",
    price: 119900,
    isNew: true,
    isFeatured: true,
    shortDescription: "A3 print on textured paper.",
    stock: 50,
  },
  {
    id: "p4",
    slug: "pick-a-card-deck",
    name: "Pick A Card Deck",
    category: "playing-cards",
    price: 199900,
    isFeatured: true,
    shortDescription: "52 illustrations, 1 story.",
    stock: 50,
  },
];

/* ───────────────────────── helpers ───────────────────────── */

const artBySlug = new Map<string, ProductArtKind>(categoryConfig.map((c) => [c.slug, c.art]));
const categoryBySlug = new Map(categoryConfig.map((c) => [c.slug, c]));

function toCardData(p: CatalogProduct): ProductCardData {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    image: p.images?.[0]?.url,
    art: artBySlug.get(p.category) ?? "sticker",
    isNew: p.isNew,
    blurb: p.shortDescription,
  };
}

/* ───────────────────────── categories ───────────────────────── */

export function getCategories(): CategoryItem[] {
  return categoryConfig;
}

export function getCategoryBySlug(slug: string): { slug: string; name: string } | null {
  const c = categoryBySlug.get(slug);
  return c ? { slug: c.slug, name: c.label } : null;
}

/* ───────────────────────── products ───────────────────────── */

export function getProducts(categorySlug?: string): ProductCardData[] {
  return PRODUCTS.filter((p) => !categorySlug || p.category === categorySlug).map(toCardData);
}

export function getFeaturedProducts(limit = 6): ProductCardData[] {
  return PRODUCTS.filter((p) => p.isFeatured).slice(0, limit).map(toCardData);
}

export function getRelatedProducts(productId: string, categorySlug: string, limit = 4): ProductCardData[] {
  return PRODUCTS.filter((p) => p.id !== productId && p.category === categorySlug)
    .slice(0, limit)
    .map(toCardData);
}

export function getAllProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}

export function getProductBySlug(slug: string) {
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) return null;
  const cat = categoryBySlug.get(p.category);
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description ?? "",
    shortDescription: p.shortDescription ?? null,
    price: p.price,
    compareAtPrice: p.compareAtPrice ?? null,
    stock: p.stock,
    isNew: p.isNew ?? false,
    art: artBySlug.get(p.category) ?? ("sticker" as ProductArtKind),
    category: { slug: p.category, name: cat?.label ?? p.category },
    images: (p.images ?? []).map((i) => ({ url: i.url, alt: i.alt ?? p.name })),
  };
}

export type ProductDetail = NonNullable<ReturnType<typeof getProductBySlug>>;
