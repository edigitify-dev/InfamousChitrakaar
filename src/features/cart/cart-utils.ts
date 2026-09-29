import type { CartItem, CartItemInput } from "./cart-types";

export function makeLineId(item: Pick<CartItemInput, "productId" | "variantId">): string {
  return item.variantId ? `${item.productId}:${item.variantId}` : item.productId;
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

/** Returns paise. */
export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}
