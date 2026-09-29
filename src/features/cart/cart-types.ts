export interface CartItem {
  /** productId + optional variantId — unique per purchasable line */
  lineId: string;
  productId: string;
  variantId?: string;
  slug: string;
  name: string;
  variantLabel?: string;
  image?: string;
  /** paise */
  unitPrice: number;
  quantity: number;
}

export type CartItemInput = Omit<CartItem, "lineId" | "quantity">;
