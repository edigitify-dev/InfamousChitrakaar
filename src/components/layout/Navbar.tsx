"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/features/cart/cart-store";
import { cartCount } from "@/features/cart/cart-utils";
import { useHydrated } from "@/hooks/useHydrated";
import { BrandLogo } from "./BrandLogo";
import { MobileMenu } from "./MobileMenu";

/**
 * Where a search submit goes. Change this to your real shop/products route.
 * The query is sent as ?q=...
 */
const SEARCH_ROUTE = "/shop";

function SearchIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m4 4 12 12M16 4 4 16" />
    </svg>
  );
}

/* Text-roll hover: label slides up, a vermilion copy rolls in from below */
function RollLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="label group relative inline-block overflow-hidden py-1 text-ink"
    >
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[120%]">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="absolute left-0 top-1 block translate-y-[120%] text-vermilion transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
      >
        {label}
      </span>
    </Link>
  );
}

const iconBtn =
  "grid size-9 place-items-center rounded-full text-ink transition-all duration-300 ease-out hover:bg-vermilion/10 hover:text-vermilion active:scale-90";

function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  // Focus input on open, reset on close
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
    setQuery("");
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const q = query.trim().toLowerCase();

  const suggestions = useMemo(() => {
    if (!q) return siteConfig.nav;
    return siteConfig.nav.filter((item) =>
      item.label.toLowerCase().includes(q),
    );
  }, [q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;
    router.push(`${SEARCH_ROUTE}?q=${encodeURIComponent(value)}`);
    onClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] transition-[opacity,visibility] duration-300",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close search"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 bg-paper shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="mx-auto max-w-[900px] px-5 pb-10 pt-6 md:px-8 md:pt-8">
          <form
            onSubmit={submit}
            className="group flex items-center gap-4 border-b border-ink/20 pb-4 transition-colors duration-300 focus-within:border-vermilion"
          >
            <span className="text-ink/60 transition-colors group-focus-within:text-vermilion">
              <SearchIcon size={22} />
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, collections…"
              autoComplete="off"
              spellCheck={false}
              className="w-full bg-transparent text-xl text-ink outline-none placeholder:text-ink/40 md:text-3xl"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="text-ink/50 transition-colors hover:text-vermilion"
              >
                <CloseIcon />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="hidden rounded-full border border-ink/20 px-2.5 py-1 text-[11px] uppercase tracking-widest text-ink/60 transition-colors hover:border-vermilion hover:text-vermilion md:block"
            >
              Esc
            </button>
          </form>

          <div className="mt-6 min-h-[120px]">
            <p className="label mb-3 text-ink/50">
              {q ? "Pages" : "Quick links"}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {suggestions.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-vermilion hover:bg-vermilion hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {q && (
              <button
                type="button"
                onClick={() => {
                  router.push(
                    `${SEARCH_ROUTE}?q=${encodeURIComponent(query.trim())}`,
                  );
                  onClose();
                }}
                className="group/s mt-6 flex w-full items-center justify-between rounded-xl border border-ink/10 px-4 py-3.5 text-left text-ink transition-all duration-300 hover:border-vermilion hover:bg-vermilion/5"
              >
                <span>
                  Search for{" "}
                  <span className="font-medium text-vermilion">
                    “{query.trim()}”
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/s:translate-x-1"
                >
                  →
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const count = hydrated ? cartCount(items) : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ctrl/⌘ + K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
              <RollLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <div className="flex items-center gap-1 text-ink md:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={iconBtn}
            >
              <SearchIcon />
            </button>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open bag, ${count} items`}
              className="label group flex h-9 items-center gap-1.5 rounded-full px-3 text-ink transition-all duration-300 ease-out hover:bg-ink hover:text-paper active:scale-95"
            >
              <span className="md:hidden">
                <BagIcon />
              </span>
              <span className="hidden md:inline">Bag</span>
              <span
                className={cn(
                  "tabular-nums transition-transform duration-300",
                  count > 0 && "group-hover:scale-110",
                )}
              >
                ({count})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={cn(iconBtn, "md:hidden")}
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

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
