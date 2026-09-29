import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CategoryItem } from "@/types/product";

export function CategoryFilter({ categories, active }: { categories: CategoryItem[]; active?: string }) {
  const base = "label whitespace-nowrap border px-4 py-2 transition-colors";
  return (
    <nav aria-label="Categories" className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:px-0">
      <Link href="/shop" className={cn(base, !active ? "border-ink bg-ink text-paper" : "border-ink/30 hover:border-ink")}>
        All
      </Link>
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/shop/${c.slug}`}
          className={cn(base, active === c.slug ? "border-ink bg-ink text-paper" : "border-ink/30 hover:border-ink")}
        >
          {c.label}
        </Link>
      ))}
    </nav>
  );
}
