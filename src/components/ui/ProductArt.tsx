import type { ProductArtKind } from "@/types/product";

const INK = "#14110e";
const CREAM = "#efe4cc";
const RED = "#d8432a";
const SUN = "#e9a23b";

/**
 * Small illustrated stand-ins for each product type — used in the hero
 * category strip and on product cards until real product photos exist.
 */
export function ProductArt({ kind, className }: { kind: ProductArtKind; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === "tote" && (
        <g stroke={INK} strokeWidth="2.5">
          <path d="M32 34C32 10 68 10 68 34" />
          <path d="M22 34h56l6 58H16Z" fill={CREAM} />
          <circle cx="50" cy="64" r="17" fill={INK} />
          <circle cx="44" cy="60" r="3" fill={CREAM} stroke="none" />
          <circle cx="56" cy="60" r="3" fill={CREAM} stroke="none" />
          <path d="M42 70q8 7 16 0" stroke={RED} />
        </g>
      )}
      {kind === "tshirt" && (
        <g stroke="#000" strokeWidth="2">
          <path d="M34 12 12 28l10 20 10-6v48h36V42l10 6 10-20L66 12c-4 8-28 8-32 0Z" fill={INK} />
          <path d="M40 46h20v26H40Z" fill={RED} stroke="none" />
          <circle cx="50" cy="54" r="6" fill={CREAM} stroke="none" />
          <path d="M42 68h16" stroke={CREAM} />
        </g>
      )}
      {kind === "poster" && (
        <g strokeWidth="3">
          <rect x="22" y="6" width="56" height="88" fill="#1a1512" stroke="#c9a15b" />
          <rect x="28" y="12" width="44" height="76" fill={RED} stroke="none" />
          <path d="M34 88c0-30 6-46 16-46s16 16 16 46Z" fill={INK} stroke="none" />
          <circle cx="50" cy="34" r="10" fill={CREAM} stroke={INK} strokeWidth="2" />
          <circle cx="46" cy="33" r="1.8" fill={INK} stroke="none" />
          <circle cx="54" cy="33" r="1.8" fill={INK} stroke="none" />
        </g>
      )}
      {kind === "postcard" && (
        <g transform="rotate(-7 50 52)" stroke={INK} strokeWidth="2">
          <rect x="12" y="22" width="76" height="58" fill={CREAM} />
          <rect x="18" y="28" width="64" height="46" fill="#1f3b57" stroke="none" />
          <circle cx="62" cy="42" r="8" fill={RED} stroke="none" />
          <path d="M18 62c12-20 22 4 34-10s18 8 30-4v26H18Z" fill="#e9dcc0" stroke="none" />
        </g>
      )}
      {kind === "bookmark" && (
        <g stroke={INK} strokeWidth="2.5">
          <rect x="36" y="4" width="28" height="82" rx="2" fill={CREAM} />
          <path d="M36 4h28v14L50 26 36 18Z" fill={INK} />
          <path d="M42 40h16M42 48h16M42 56h10" stroke={RED} strokeWidth="2" />
          <path d="M50 86v8" />
          <circle cx="50" cy="96" r="3" fill={RED} />
        </g>
      )}
      {kind === "cards" && (
        <g stroke={INK} strokeWidth="2">
          <g transform="rotate(-20 40 80)"><rect x="14" y="18" width="38" height="58" rx="3" fill={CREAM} /></g>
          <g transform="rotate(-4 50 80)">
            <rect x="30" y="14" width="38" height="58" rx="3" fill={CREAM} />
            <circle cx="49" cy="43" r="9" fill={SUN} />
          </g>
          <g transform="rotate(14 60 80)">
            <rect x="46" y="18" width="38" height="58" rx="3" fill={CREAM} />
            <path d="M65 56c-14-10-14-22-6-22 4 0 6 3 6 5 0-2 2-5 6-5 8 0 8 12-6 22Z" fill={RED} stroke="none" />
          </g>
        </g>
      )}
      {kind === "sticker" && (
        <g stroke={INK} strokeWidth="2.5">
          <path d="M50 8l7 10 12-4 2 12 12 2-4 12 10 7-10 7 4 12-12 2-2 12-12-4-7 10-7-10-12 4-2-12-12-2 4-12L8 50l10-7-4-12 12-2 2-12 12 4Z" fill={SUN} />
          <circle cx="50" cy="52" r="22" fill={INK} />
          <circle cx="42" cy="48" r="4" fill={CREAM} stroke="none" />
          <circle cx="58" cy="48" r="4" fill={CREAM} stroke="none" />
          <path d="M46 60h8l-4 7Z" fill={RED} stroke="none" />
        </g>
      )}
    </svg>
  );
}
