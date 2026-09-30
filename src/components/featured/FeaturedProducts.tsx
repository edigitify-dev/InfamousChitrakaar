"use client";

import { Image } from "@imagekit/next";
import Link from "next/link";
import { useState } from "react";
import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";

const display = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-display",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-mono",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  /** Piece of tape stuck on the card corner */
  tape?: "left" | "right";
};

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "great-wave",
    name: "The Great Wave",
    category: "Art Print",
    price: 799,
    image: "/product/product_1.png",
    tape: "left",
  },
  {
    id: "faces-tote",
    name: "Faces Tote",
    category: "Tote Bag",
    price: 899,
    image: "/product/product_2.png",
  },
  {
    id: "chitrakar-tee",
    name: "Chitrakar Tee",
    category: "T-Shirt",
    price: 1299,
    image: "/product/product_3.png",
  },
  {
    id: "skyline-postcards",
    name: "Skyline Postcard Set",
    category: "Postcards (Set of 5)",
    price: 299,
    image: "/category/category_7.png",
    tape: "right",
  },
];

/* Torn / rough paper edges (clip-path can't be expressed cleanly as a utility) */
const CARD_EDGE =
  "polygon(0 1%, 3% 0, 12% 0.6%, 30% 0, 52% 0.5%, 74% 0, 92% 0.6%, 100% 0.2%, 99.6% 30%, 100% 62%, 99.5% 92%, 100% 100%, 82% 99.4%, 60% 100%, 38% 99.5%, 15% 100%, 0 99.6%, 0.4% 70%, 0 40%)";

const PHOTO_EDGE =
  "polygon(0 0, 100% 0, 100% 96%, 93% 98.5%, 85% 95.5%, 76% 98.5%, 66% 96%, 56% 99%, 46% 96.5%, 36% 98.5%, 25% 95.5%, 14% 98.5%, 6% 96%, 0 98%)";

const TAPE_EDGE =
  "polygon(0 8%, 4% 0, 10% 10%, 16% 0, 100% 0, 96% 25%, 100% 50%, 96% 75%, 100% 100%, 16% 100%, 10% 90%, 4% 100%, 0 92%, 3% 50%)";

const STROKE_EDGE =
  "polygon(0 40%, 25% 0, 60% 35%, 100% 10%, 98% 80%, 55% 100%, 20% 70%, 0 100%)";

type Props = {
  products?: Product[];
  shopAllHref?: string;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product, wishlisted: boolean) => void;
};

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-9.4-9.2C1.3 8.2 3.1 4.9 6.4 4.9c2 0 3.5 1.1 4.3 2.5.3.5.6.5.6.5s.3 0 .6-.5c.8-1.4 2.3-2.5 4.3-2.5 3.3 0 5.1 3.3 3.8 6.4-1.9 4.6-9.4 9.2-9.4 9.2z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M2.5 3.5h2.7l2.2 11.2h10.4l2-8.2H6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="19.3" r="1.5" fill="currentColor" />
      <circle cx="17" cy="19.3" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M3 12h17M14 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FeaturedProducts({
  products = DEFAULT_PRODUCTS,
  shopAllHref = "/shop",
  onAddToCart,
  onToggleWishlist,
}: Props) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const toggleWishlist = (product: Product) => {
    const next = new Set(wishlist);
    const willBeWishlisted = !next.has(product.id);
    if (willBeWishlisted) next.add(product.id);
    else next.delete(product.id);
    setWishlist(next);
    onToggleWishlist?.(product, willBeWishlisted);
  };

  return (
    <section
      aria-labelledby="featured-heading"
      /* Swap the texture path below for your green image in /public/textures */
      className={`${display.variable} ${mono.variable} ${sans.variable} relative w-full bg-[url('/textures/green-paper.jpg')] bg-cover bg-center px-4 py-11 text-[#f7f0e2] min-[481px]:px-7 min-[481px]:py-14 min-[1101px]:px-10 min-[1101px]:py-[98px]`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 min-[1101px]:grid-cols-[minmax(280px,380px)_1fr] min-[1101px]:gap-12">
        {/* Left: copy */}
        <div className="flex flex-col items-start">
          <p className="mb-3.5 flex items-center gap-3.5 font-[family-name:var(--font-mono)] text-[15px] font-semibold uppercase italic tracking-[0.06em] text-[#c8501e]">
            <span>Featured</span>
            <span
              aria-hidden="true"
              className="h-px w-[26px] bg-[#f7f0e2]/45"
            />
          </p>

          <h2
            id="featured-heading"
            className="m-0 font-[family-name:var(--font-display)] text-[clamp(44px,4.6vw,62px)] font-light leading-[1.02] tracking-[-0.015em] text-[#f7f0e2]"
          >
            <span className="relative inline-block pb-1.5">
              Art That
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[3px] w-full origin-left -rotate-[0.6deg] rounded-[3px] bg-gradient-to-r from-[#d4831f] to-[#c8501e]"
                style={{ clipPath: STROKE_EDGE }}
              />
            </span>
            <br />
            Comes Home
          </h2>

          <p className="mb-[34px] mt-[26px] max-w-[340px] font-[family-name:var(--font-mono)] text-[15px] leading-[1.6] text-[#f7f0e2]/90">
            A few favorites from the studio. Prints, apparel and more — made to
            bring a little chaos, color and calm to your space.
          </p>

          <Link
            href={shopAllHref}
            className="inline-flex items-center justify-center gap-4 rounded-[3px] bg-[#f7f0e2] px-9 py-[18px] font-[family-name:var(--font-mono)] text-sm font-medium uppercase tracking-[0.1em] text-[#1a1a18] no-underline shadow-[0_6px_16px_rgba(0,0,0,0.3)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(0,0,0,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7f0e2] motion-reduce:transition-none"
          >
            <span>Shop all products</span>
            <ArrowIcon />
          </Link>
        </div>

        {/* Right: cards */}
        <ul className="m-0 grid list-none grid-cols-2 gap-x-3.5 gap-y-6 p-0 min-[481px]:gap-x-[22px] min-[481px]:gap-y-7 min-[1101px]:grid-cols-4 min-[1101px]:gap-[26px]">
          {products.map((product) => {
            const wishlisted = wishlist.has(product.id);
            return (
              <li
                key={product.id}
                className="relative drop-shadow-[0_10px_14px_rgba(0,0,0,0.4)]"
              >
                {product.tape && (
                  <Image
                    src="tape_1.png"
                    width={500}
                    height={200}
                    className={`pointer-events-none absolute z-30 h-[34px] w-[88px] ${
                      product.tape === "left"
                        ? "-left-5 top-1 -rotate-[25deg]"
                        : "-right-5 -top-1 rotate-[25deg]"
                    }`}
                    alt=""
                  />
                )}

                <div
                  className="flex h-full flex-col rounded bg-[#f7f0e2] px-[9px] pt-[9px] text-[#1a1a18]"
                  style={{ clipPath: CARD_EDGE }}
                >
                  <div
                    className="relative aspect-[1/1.02] overflow-hidden bg-[#fff]"
                    style={{ clipPath: PHOTO_EDGE }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1100px) 25vw, 220px"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      aria-pressed={wishlisted}
                      aria-label={
                        wishlisted
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                      onClick={() => toggleWishlist(product)}
                      className={`absolute right-2.5 top-2.5 z-20 grid size-8 place-items-center rounded-full border-0 bg-transparent p-0 transition duration-200 hover:text-[#c8501e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a18] motion-reduce:transition-none ${
                        wishlisted
                          ? "scale-110 text-[#c8501e]"
                          : "text-[#4a4a45]"
                      }`}
                    >
                      <HeartIcon filled={wishlisted} />
                    </button>
                  </div>

                  <div className="flex flex-1 items-end justify-between gap-2.5 py-3 pl-2 pr-1">
                    <div className="min-w-0">
                      <h3 className="m-0 font-[family-name:var(--font-sans)] text-[15px] font-medium leading-tight text-[#1a1a18]">
                        {product.name}
                      </h3>
                      <p className="mb-0 mt-[3px] font-[family-name:var(--font-sans)] text-[11px] text-[#77736a]">
                        {product.category}
                      </p>
                      <p className="mb-0 mt-3.5 font-[family-name:var(--font-mono)] text-sm font-medium text-[#1a1a18] min-[481px]:text-[15px]">
                        ₹ {product.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Add ${product.name} to cart`}
                      onClick={() => onAddToCart?.(product)}
                      className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-md border-0 bg-[#141412] p-0 text-[#f7f0e2] transition duration-150 hover:bg-[#c8501e] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#1a1a18] motion-reduce:transition-none min-[481px]:size-[46px]"
                    >
                      <CartIcon />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
