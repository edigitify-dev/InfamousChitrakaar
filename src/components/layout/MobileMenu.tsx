"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "./BrandLogo";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="paper fixed inset-0 z-[60] flex flex-col px-6 py-5 md:hidden"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-start justify-between">
            <BrandLogo />
            <button type="button" onClick={onClose} aria-label="Close menu" className="grid size-10 place-items-center">
              <svg width="18" height="18" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.6" fill="none">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-6">
            {siteConfig.nav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i + 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="font-display text-5xl italic text-ink hover:text-vermilion"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <p className="mt-auto font-hand text-2xl font-bold uppercase text-vermilion">
            {siteConfig.tagline}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
