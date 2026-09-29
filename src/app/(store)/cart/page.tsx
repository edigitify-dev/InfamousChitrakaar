"use client";

import Link from "next/link";
import { useCartStore } from "@/features/cart/cart-store";
import { cartSubtotal } from "@/features/cart/cart-utils";
import { useHydrated } from "@/hooks/useHydrated";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function CartPage() {
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const list = hydrated ? items : [];
  const subtotal = cartSubtotal(list);

  return (
    <div className="paper min-h-screen px-6 pb-24 pt-32 lg:px-[5%]">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-[clamp(2.2rem,4.4vw,3.4rem)] leading-none">
          Your <em className="text-vermilion">Bag.</em>
        </h1>

        {hydrated && list.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="font-hand text-2xl text-ink/60">Empty for now.</p>
            <ButtonLink href="/shop" className="mt-6 inline-flex" arrow>
              Start shopping
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
            <ul className="divide-y divide-ink/10">
              {list.map((item) => (
                <CartItem key={item.lineId} item={item} />
              ))}
            </ul>
            <div className="h-fit border border-ink/15 p-5">
              <CartSummary subtotal={subtotal} />
              <Button variant="red" disabled className="mt-5 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50">
                Checkout coming soon
              </Button>
              <Link href="/shop" className="label mt-4 block text-center text-[0.7rem] text-ink/60 hover:text-vermilion">
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
