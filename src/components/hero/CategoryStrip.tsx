import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProductArt } from "@/components/ui/ProductArt";
import { ArrowCurve } from "@/components/ui/Doodles";
import type { CategoryItem } from "@/types/product";

interface CategoryStripProps {
  categories: CategoryItem[];
  className?: string;
}

/** "Totes · T Shirts · Poster Frames …" row along the bottom of the hero. */
export function CategoryStrip({ categories, className }: CategoryStripProps) {
  return (
    <nav aria-label="Shop by category" className={cn("paper", className)}>
      <ul className="no-scrollbar flex h-full items-end gap-1 overflow-x-auto px-5 pb-6 pt-8 lg:grid lg:grid-cols-7 lg:gap-0 lg:overflow-visible lg:px-[5%] lg:pb-[2.4%] lg:pt-[1.5%]">
        {categories.map((category, i) => (
          <li key={category.slug} data-hero="fade" className="relative min-w-[112px] flex-1 lg:min-w-0">
            <Link href={`/shop/${category.slug}`} className="group flex flex-col items-center gap-3">
              <ProductArt
                kind={category.art}
                className="size-[clamp(72px,8.4vw,124px)] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-3"
              />
              <span className="label text-[0.58rem] transition-colors group-hover:text-vermilion">
                {category.label}
              </span>
            </Link>
            {i === 0 && <ArrowCurve aria-hidden className="absolute -right-2 bottom-0 hidden w-9 text-ink/70 lg:block" />}
            {i < categories.length - 1 && (
              <span aria-hidden className="absolute right-0 top-[8%] hidden h-[78%] w-px rotate-[4deg] bg-ink/25 lg:block" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
