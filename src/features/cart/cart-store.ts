import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartItemInput } from "./cart-types";
import { makeLineId } from "./cart-utils";

const MAX_QTY = 10;

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItemInput, quantity?: number) => void;
  removeItem: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (input, quantity = 1) =>
        set((state) => {
          const lineId = makeLineId(input);
          const existing = state.items.find((i) => i.lineId === lineId);
          if (existing) {
            return {
              isOpen: true,
              items: state.items.map((i) =>
                i.lineId === lineId
                  ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + quantity) }
                  : i,
              ),
            };
          }
          return {
            isOpen: true,
            items: [...state.items, { ...input, lineId, quantity: Math.min(MAX_QTY, quantity) }],
          };
        }),
      removeItem: (lineId) =>
        set((state) => ({ items: state.items.filter((i) => i.lineId !== lineId) })),
      setQuantity: (lineId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.lineId !== lineId)
              : state.items.map((i) =>
                  i.lineId === lineId ? { ...i, quantity: Math.min(MAX_QTY, quantity) } : i,
                ),
        })),
      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "tic-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
