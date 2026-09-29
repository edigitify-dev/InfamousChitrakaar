/** Which built-in illustration to draw when no product photo exists yet. */
export type ProductArtKind =
  | "tote"
  | "tshirt"
  | "poster"
  | "postcard"
  | "bookmark"
  | "cards"
  | "sticker";

/** Lightweight product shape used by cards, hotspots and the cart. Price in paise. */
export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
  art: ProductArtKind;
  isNew?: boolean;
  blurb?: string;
}

export interface CategoryItem {
  slug: string;
  label: string;
  art: ProductArtKind;
}
