"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/features/cart/cart-store";
import { cartSubtotal } from "@/features/cart/cart-utils";
import { useHydrated } from "@/hooks/useHydrated";
import { ProductArt } from "@/components/ui/ProductArt";
import { Button, ButtonLink } from "@/components/ui/Button";

/**
 * Cart drawer SHELL (Phase 2). Slide-out on desktop, full-screen on mobile.
 * Full line-item components (CartItem, QuantitySelector, CartSummary) arrive in Phase 6.
 */
export function CartDrawer() {
  const hydrated = useHydrated();
  const { items, isOpen, closeCart, removeItem, setQuantity } = useCartStore();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  const list = hydrated ? items : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close bag"
            onClick={closeCart}
            className="fixed inset-0 z-[65] cursor-default bg-ink/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            className="paper fixed inset-y-0 right-0 z-[66] flex w-full flex-col shadow-2xl md:w-[420px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
          >
            <div className="flex items-center justify-between border-b border-ink/15 px-6 py-5">
              <h2 className="font-display text-3xl italic">Your Bag</h2>
              <button type="button" onClick={closeCart} aria-label="Close bag" className="label hover:text-vermilion">
                Close
              </button>
            </div>

            <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 py-4">
              {list.length === 0 ? (
                <div className="mt-16 text-center">
                  <p className="font-hand text-3xl font-bold uppercase text-vermilion">Nothing here. Yet.</p>
                  <p className="mt-2 text-sm text-ink/70">Go make some chaos.</p>
                  <ButtonLink href="/shop" arrow className="mt-6" >
                    Visit the shop
                  </ButtonLink>
                </div>
              ) : (
                <ul className="divide-y divide-ink/15">
                  {list.map((item) => (
                    <li key={item.lineId} className="flex gap-4 py-4">
                      <div className="grid size-20 shrink-0 place-items-center bg-paper-2 p-2">
                        <ProductArt kind="tshirt" className="size-full opacity-80" />
                      </div>
                      <div className="flex-1">
                        <Link href={`/product/${item.slug}`} onClick={closeCart} className="font-display text-lg leading-tight hover:text-vermilion">
                          {item.name}
                        </Link>
                        {item.variantLabel && <p className="label mt-0.5 text-[0.6rem] text-ink/60">{item.variantLabel}</p>}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center border border-ink/30">
                            <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(item.lineId, item.quantity - 1)} className="size-7 hover:bg-ink hover:text-paper">−</button>
                            <span className="w-7 text-center text-sm">{item.quantity}</span>
                            <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(item.lineId, item.quantity + 1)} className="size-7 hover:bg-ink hover:text-paper">+</button>
                          </div>
                          <span className="text-sm font-medium">{formatPrice(item.unitPrice * item.quantity)}</span>
                        </div>
                        <button type="button" onClick={() => removeItem(item.lineId)} className="label mt-2 text-[0.6rem] text-ink/50 hover:text-vermilion">
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {list.length > 0 && (
              <div className="border-t border-ink/15 px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="label">Subtotal</span>
                  <span className="font-display text-2xl">{formatPrice(cartSubtotal(list))}</span>
                </div>
                <p className="mt-1 text-xs text-ink/60">Online checkout is coming soon.</p>
                <Button disabled className="mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50">
                  Checkout coming soon
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
