"use client";

import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (qty: number) => void;
  max?: number;
  className?: string;
}

export function QuantitySelector({ quantity, onChange, max = 10, className }: QuantitySelectorProps) {
  return (
    <div className={cn("flex h-9 items-center border border-ink/40", className)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        className="h-full w-8 text-sm hover:bg-ink hover:text-paper disabled:opacity-30"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
      >
        −
      </button>
      <span aria-live="polite" className="w-7 text-center text-xs">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="h-full w-8 text-sm hover:bg-ink hover:text-paper disabled:opacity-30"
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= max}
      >
        +
      </button>
    </div>
  );
}
