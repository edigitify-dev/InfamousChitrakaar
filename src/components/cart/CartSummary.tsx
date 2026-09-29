import { formatPrice } from "@/lib/utils";

interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
  className?: string;
}

export function CartSummary({ subtotal, shipping, className }: CartSummaryProps) {
  const total = subtotal + (shipping ?? 0);
  return (
    <dl className={className}>
      <div className="flex justify-between py-1.5 text-sm">
        <dt className="text-ink/70">Subtotal</dt>
        <dd>{formatPrice(subtotal)}</dd>
      </div>
      <div className="flex justify-between py-1.5 text-sm">
        <dt className="text-ink/70">Shipping</dt>
        <dd>{shipping === undefined ? "Calculated at checkout" : shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
      </div>
      <div className="mt-2 flex justify-between border-t border-ink/15 pt-3 font-display text-lg">
        <dt>Total</dt>
        <dd>{formatPrice(total)}</dd>
      </div>
    </dl>
  );
}
