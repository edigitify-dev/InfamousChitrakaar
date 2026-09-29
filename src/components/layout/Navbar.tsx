"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/features/cart/cart-store";
import { cartCount } from "@/features/cart/cart-utils";
import { useHydrated } from "@/hooks/useHydrated";
import { BrandLogo } from "./BrandLogo";
import { MobileMenu } from "./MobileMenu";

function SearchIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="8.5" cy="8.5" r="6" />
      <path d="m13 13 5 5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 6.5h13l-1 11h-11Z" />
      <path d="M7 6.5V5a3 3 0 0 1 6 0v1.5" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const count = hydrated ? cartCount(items) : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
          scrolled
            ? "bg-paper/90 shadow-[0_2px_18px_rgba(0,0,0,0.25)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 md:px-[3.2%]">
          <BrandLogo />

          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label relative py-1 text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-vermilion after:transition-transform after:duration-300 hover:text-vermilion hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-ink md:gap-5">
            <button
              type="button"
              aria-label="Search"
              className="hidden transition-colors text-white hover:text-vermilion md:block"
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open bag, ${count} items`}
              className="label flex items-center gap-1.5 transition-colors hover:text-vermilion"
            >
              <span className="md:hidden">
                <BagIcon />
              </span>
              <span className="hidden md:inline">Bag</span>
              <span>({count})</span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid size-9 place-items-center md:hidden"
            >
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M1 1h18M1 7h18M1 13h12" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
