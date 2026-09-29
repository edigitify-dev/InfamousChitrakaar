"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

type Placement = {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  width?: number | string;
  height?: number | string; // omit to keep the aspect ratio below
  aspect?: number; // width / height, default 0.75
  rotate?: number; // degrees, e.g. -3 for a slight tilt
};

// Everything that describes a product (used by the popup)
type ProductInfo = {
  name: string;
  category: string;
  price: string;
  oldPrice?: string; // shows a strike-through price + discount badge
  rating: number; // 0-5, decimals allowed
  reviews: number;
  description: string;
  features: string[];
  specs: [label: string, value: string][];
  inStock: boolean;
  delivery: string;
  images: string[]; // images[0] is the one shown on the wall; all are shown in the popup gallery
  depth: number; // how far the image floats off the wall (px) - controls shadow size
};

// A product placed on a wall
type Product = ProductInfo & {
  pos?: Placement; // desktop / default placement
  posMobile?: Placement; // phones (< 640px); falls back to pos
};
type Wall = { title: string; image?: string; items: Product[] };

const gallery = (slug: string, count = 4) =>
  Array.from(
    { length: count },
    (_, i) => `/images/studio/${slug}_${i + 1}.png`,
  );

const FLORAL_BLOOM_DIARY: ProductInfo = {
  name: "Floral Bloom Diary",
  category: "Diaries",
  price: "$29",
  rating: 4.8,
  reviews: 136,
  description:
    "A premium hardcover diary covered in a hand-painted floral composition of white blossoms, lush green leaves, and delicate pink details. Made for everyday notes, sketches, thoughts, and ideas.",

  features: [
    "Hardcover with full-wrap artwork",
    "Lined premium writing pages",
    "Elastic closure band",
    "Ribbon bookmark",
  ],

  specs: [
    ["Cover", "Hardcover"],
    ["Size", "A5"],
    ["Pages", "192 lined pages"],
    ["Paper", "100 GSM acid-free paper"],
  ],

  inStock: true,
  delivery: "Ships in 1-2 days",
  images: gallery("floral-bloom-diary"),
  depth: 4,
};

const ABSTRACT_WAVES_DIARY: ProductInfo = {
  name: "Abstract Waves Diary",
  category: "Diaries",
  price: "$27",
  rating: 4.7,
  reviews: 94,
  description:
    "A contemporary hardcover diary featuring flowing abstract forms and layered colors inspired by movement, water, and modern art. A creative companion for writing and sketching.",

  features: [
    "Premium illustrated hardcover",
    "Smooth lined interior pages",
    "Elastic closure",
    "Built-in ribbon marker",
  ],

  specs: [
    ["Cover", "Illustrated hardcover"],
    ["Size", "A5"],
    ["Pages", "192 lined pages"],
    ["Paper", "100 GSM acid-free paper"],
  ],

  inStock: true,
  delivery: "Ships in 2-3 days",
  images: gallery("abstract-waves-diary"),
  depth: 4,
};

const MIDNIGHT_GARDEN_DIARY: ProductInfo = {
  name: "Midnight Garden Diary",
  category: "Diaries",
  price: "$31",
  rating: 4.9,
  reviews: 118,
  description:
    "A dark botanical diary featuring expressive flowers and foliage against a deep midnight background. Its rich artwork gives the notebook a moody, artistic character.",

  features: [
    "Textured hardcover",
    "Botanical cover artwork",
    "Cream-colored writing pages",
    "Elastic closure and ribbon marker",
  ],

  specs: [
    ["Cover", "Textured hardcover"],
    ["Size", "A5"],
    ["Pages", "200 lined pages"],
    ["Paper", "100 GSM cream paper"],
  ],

  inStock: true,
  delivery: "Ships in 1-2 days",
  images: gallery("midnight-garden-diary"),
  depth: 4,
};

const TERRACOTTA_ART_DIARY: ProductInfo = {
  name: "Terracotta Forms Diary",
  category: "Diaries",
  price: "$28",
  rating: 4.6,
  reviews: 71,
  description:
    "A modern art diary decorated with warm terracotta shapes, organic curves, and contrasting neutral tones. Designed for journaling, planning, and capturing creative ideas.",

  features: [
    "Premium matte hardcover",
    "Contemporary abstract artwork",
    "Lay-flat binding",
    "Elastic pen loop",
  ],

  specs: [
    ["Cover", "Matte hardcover"],
    ["Size", "A5"],
    ["Pages", "192 dotted pages"],
    ["Paper", "100 GSM smooth paper"],
  ],

  inStock: true,
  delivery: "Ships in 2-4 days",
  images: gallery("terracotta-art-diary"),
  depth: 4,
};

const WILD_MEADOW_DIARY: ProductInfo = {
  name: "Wild Meadow Diary",
  category: "Diaries",
  price: "$30",
  rating: 4.8,
  reviews: 103,
  description:
    "A colorful illustrated diary inspired by wild meadows, featuring expressive flowers, leaves, and playful organic details across the cover.",

  features: [
    "Full-cover floral illustration",
    "Stitched hardcover binding",
    "Lined writing pages",
    "Ribbon bookmark and elastic band",
  ],

  specs: [
    ["Cover", "Illustrated hardcover"],
    ["Size", "A5"],
    ["Pages", "192 lined pages"],
    ["Paper", "100 GSM acid-free paper"],
  ],

  inStock: true,
  delivery: "Ships in 1-3 days",
  images: gallery("wild-meadow-diary"),
  depth: 4,
};

const SUNSET_BOTANICAL_DIARY: ProductInfo = {
  name: "Sunset Botanical Diary",
  category: "Diaries",
  price: "$32",
  rating: 4.9,
  reviews: 87,
  description:
    "A richly illustrated diary combining warm sunset tones with botanical forms and expressive painted details. A distinctive notebook for personal writing, creative work, and daily reflections.",

  features: [
    "Premium art-paper hardcover",
    "Original botanical-inspired artwork",
    "Lay-flat binding",
    "Expandable inner pocket",
  ],

  specs: [
    ["Cover", "Art-paper hardcover"],
    ["Size", "A5"],
    ["Pages", "208 lined pages"],
    ["Paper", "100 GSM archival paper"],
  ],

  inStock: true,
  delivery: "Ships in 2-3 days",
  images: gallery("sunset-botanical-diary"),
  depth: 4,
};

const ABSTRACT_SUNSET_PAINTING: ProductInfo = {
  name: "Abstract Sunset",
  category: "Paintings",
  price: "$129",
  rating: 4.8,
  reviews: 86,
  description:
    "A vibrant abstract painting inspired by the warmth of a setting sun, built with expressive brushstrokes, layered color, and energetic movement.",
  features: [
    "Original hand-painted artwork",
    "Textured acrylic layers",
    "Gallery-quality canvas",
    "Hand-finished edges",
  ],
  specs: [
    ["Medium", "Acrylic on canvas"],
    ["Dimensions", "60 x 80 cm"],
    ["Orientation", "Portrait"],
    ["Finish", "Textured matte"],
  ],
  inStock: true,
  delivery: "Ships in 3-5 days",
  images: gallery("abstract-sunset-painting"),
  depth: 2,
};

const BOTANICAL_DREAM_PAINTING: ProductInfo = {
  name: "Botanical Dream",
  category: "Paintings",
  price: "$149",
  rating: 4.6,
  reviews: 64,
  description:
    "A dreamy botanical composition filled with organic shapes, expressive leaves, and earthy tones that create a calm and natural visual rhythm.",
  features: [
    "Original botanical artwork",
    "Mixed-media painted details",
    "Premium cotton canvas",
    "Archival protective coating",
  ],
  specs: [
    ["Medium", "Acrylic and mixed media"],
    ["Dimensions", "70 x 70 cm"],
    ["Orientation", "Square"],
    ["Finish", "Satin coating"],
  ],
  inStock: true,
  delivery: "Ships in 3-5 days",
  images: gallery("botanical-dream-painting"),
  depth: 2,
};

const QUIET_FIGURE_PAINTING: ProductInfo = {
  name: "Quiet Figure",
  category: "Paintings",
  price: "$179",
  rating: 4.9,
  reviews: 118,
  description:
    "A contemporary figurative artwork exploring the human form through simplified silhouettes, expressive lines, and carefully balanced tones.",
  features: [
    "Hand-painted original",
    "Expressive layered brushwork",
    "Museum-quality canvas",
    "Ready-to-display finish",
  ],
  specs: [
    ["Medium", "Oil and acrylic on canvas"],
    ["Dimensions", "80 x 100 cm"],
    ["Orientation", "Portrait"],
    ["Finish", "Semi-matte"],
  ],
  inStock: true,
  delivery: "Ships in 4-6 days",
  images: gallery("quiet-figure-painting"),
  depth: 12,
};

const OCEAN_INK_DIARY: ProductInfo = {
  name: "Ocean Ink Diary",
  category: "Diaries",
  price: "$29",
  rating: 4.7,
  reviews: 68,
  description:
    "A deep blue artistic diary inspired by ocean waves and flowing ink. The expressive cover artwork gives it a calm yet striking character, perfect for everyday writing and creative thoughts.",

  features: [
    "Premium illustrated hardcover",
    "Smooth lined writing pages",
    "Elastic closure band",
    "Ribbon bookmark",
  ],

  specs: [
    ["Cover", "Illustrated hardcover"],
    ["Size", "A5"],
    ["Pages", "192 lined pages"],
    ["Paper", "100 GSM acid-free paper"],
  ],

  inStock: true,
  delivery: "Ships in 1-2 days",
  images: gallery("ocean-ink-diary"),
  depth: 4,
};

const SUNFLOWER_STORIES_DIARY: ProductInfo = {
  name: "Sunflower Stories Diary",
  category: "Diaries",
  price: "$33",
  rating: 4.9,
  reviews: 112,
  description:
    "A cheerful illustrated diary featuring expressive sunflowers, warm yellow tones, and hand-painted green foliage. Designed to make everyday journaling feel bright and personal.",

  features: [
    "Hand-painted floral artwork",
    "Premium fabric-textured cover",
    "Lay-flat binding",
    "Elastic closure and ribbon marker",
  ],

  specs: [
    ["Cover", "Fabric-textured hardcover"],
    ["Size", "A5"],
    ["Pages", "208 lined pages"],
    ["Paper", "100 GSM cream paper"],
  ],

  inStock: true,
  delivery: "Ships in 2-3 days",
  images: gallery("sunflower-stories-diary"),
  depth: 4,
};

const BLUE_HORIZON_PAINTING: ProductInfo = {
  name: "Blue Horizon",
  category: "Paintings",
  price: "$159",
  rating: 4.7,
  reviews: 91,
  description:
    "A serene contemporary landscape built around deep blue tones, soft atmospheric layers, and an open horizon. Designed to bring a sense of depth and calm to modern interiors.",
  features: [
    "Original landscape artwork",
    "Layered acrylic pigments",
    "Stretched heavyweight canvas",
    "UV-resistant archival finish",
  ],
  specs: [
    ["Medium", "Acrylic on canvas"],
    ["Dimensions", "90 x 60 cm"],
    ["Orientation", "Landscape"],
    ["Finish", "Soft satin"],
  ],
  inStock: true,
  delivery: "Ships in 3-5 days",
  images: gallery("blue-horizon-painting"),
  depth: 12,
};

const TERRACOTTA_FORMS_PAINTING: ProductInfo = {
  name: "Terracotta Forms",
  category: "Paintings",
  price: "$139",
  rating: 4.5,
  reviews: 57,
  description:
    "A bold geometric composition combining warm terracotta, muted cream, and charcoal forms. Its structured shapes create a striking contemporary focal point.",
  features: [
    "Original geometric composition",
    "Hand-painted color blocks",
    "Heavyweight artist canvas",
    "Natural wood stretcher frame",
  ],
  specs: [
    ["Medium", "Acrylic and texture paste"],
    ["Dimensions", "70 x 90 cm"],
    ["Orientation", "Landscape"],
    ["Finish", "Textured matte"],
  ],
  inStock: true,
  delivery: "Ships in 2-4 days",
  images: gallery("terracotta-forms-painting"),
  depth: 12,
};

const MOONLIT_GARDEN_PAINTING: ProductInfo = {
  name: "Moonlit Garden",
  category: "Paintings",
  price: "$189",
  rating: 4.9,
  reviews: 103,
  description:
    "A moody night-time garden scene painted with deep indigo tones, subtle botanical silhouettes, and luminous highlights that create an atmospheric dreamlike quality.",
  features: [
    "Original hand-painted artwork",
    "Multi-layered tonal composition",
    "Premium artist-grade canvas",
    "Archival protective varnish",
  ],
  specs: [
    ["Medium", "Oil and acrylic on canvas"],
    ["Dimensions", "75 x 100 cm"],
    ["Orientation", "Portrait"],
    ["Finish", "Low-gloss varnish"],
  ],
  inStock: true,
  delivery: "Ships in 4-6 days",
  images: gallery("moonlit-garden-painting"),
  depth: 12,
};

const TOTE_BAG_1: ProductInfo = {
  name: "Ceramic Tote Bag",
  category: "Tote Bags",
  price: "$39",
  rating: 4.7,
  reviews: 141,
  description:
    "A premium canvas tote featuring a hand-crafted ceramic vase inspired artwork. Spacious, durable, and designed to bring an artistic touch to everyday carrying.",

  features: [
    "Premium cotton canvas",
    "Hand-printed artwork",
    "Reinforced shoulder handles",
    "Lightweight and reusable",
  ],

  specs: [
    ["Material", "Heavyweight cotton canvas"],
    ["Dimensions", "42 x 38 cm"],
    ["Handle Drop", "30 cm"],
    ["Care", "Spot clean / hand wash"],
  ],

  inStock: true,
  delivery: "Ships in 2-3 days",
  images: gallery("ceramic_tote"),
  depth: 8,
};

const TOTE_BAG_2: ProductInfo = {
  name: "Mirror Tote Bag",
  category: "Tote Bags",
  price: "$42",
  oldPrice: "$49",
  rating: 4.5,
  reviews: 109,
  description:
    "A stylish everyday tote featuring an artistic mirror-inspired print. Made from durable canvas with a spacious interior for carrying your daily essentials.",

  features: [
    "Premium cotton canvas",
    "High-quality printed artwork",
    "Reinforced shoulder handles",
    "Durable and reusable",
  ],

  specs: [
    ["Material", "Heavyweight cotton canvas"],
    ["Dimensions", "42 x 38 cm"],
    ["Handle Drop", "30 cm"],
    ["Care", "Spot clean / hand wash"],
  ],

  inStock: true,
  delivery: "Free delivery in 4-6 days",
  images: gallery("mirror_tote"),
  depth: 8,
};

const TOTE_BAG_3: ProductInfo = {
  name: "Print Tote Bag",
  category: "Tote Bags",
  price: "$45",
  rating: 4.4,
  reviews: 72,
  description:
    "A contemporary canvas tote featuring a curated abstract print inspired by gallery wall art. Designed for everyday use while keeping a bold artistic character.",

  features: [
    "Premium cotton canvas",
    "Archival-quality artwork print",
    "Reinforced shoulder handles",
    "Spacious everyday design",
  ],

  specs: [
    ["Material", "Heavyweight cotton canvas"],
    ["Dimensions", "42 x 38 cm"],
    ["Handle Drop", "30 cm"],
    ["Care", "Spot clean / hand wash"],
  ],

  inStock: true,
  delivery: "Ships in 1-2 days",
  images: gallery("print_tote"),
  depth: 8,
};

const ABSTRACT_ART_TSHIRT: ProductInfo = {
  name: "Abstract Art T-Shirt",
  category: "T-Shirts",
  price: "$35",
  rating: 4.8,
  reviews: 124,
  description:
    "A relaxed-fit everyday T-shirt featuring an expressive abstract artwork across the front. Made for people who like their wardrobe with a little more character.",

  features: [
    "100% heavyweight cotton",
    "Original front artwork",
    "Relaxed unisex fit",
    "Soft garment-washed finish",
  ],

  specs: [
    ["Material", "100% cotton"],
    ["Fit", "Relaxed unisex"],
    ["Weight", "240 GSM"],
    ["Sizes", "XS - XXL"],
  ],

  inStock: true,
  delivery: "Ships in 1-3 days",
  images: gallery("abstract-art-tshirt"),
  depth: 4,
};

const BOTANICAL_TSHIRT: ProductInfo = {
  name: "Botanical Sketch T-Shirt",
  category: "T-Shirts",
  price: "$32",
  rating: 4.6,
  reviews: 89,
  description:
    "A minimal cotton T-shirt decorated with a hand-drawn botanical illustration. The understated artwork gives it an artistic look without overpowering the outfit.",

  features: [
    "Premium combed cotton",
    "Hand-drawn botanical graphic",
    "Unisex regular fit",
    "Ribbed crew neckline",
  ],

  specs: [
    ["Material", "100% combed cotton"],
    ["Fit", "Regular unisex"],
    ["Weight", "220 GSM"],
    ["Sizes", "XS - XXL"],
  ],

  inStock: true,
  delivery: "Ships in 2-4 days",
  images: gallery("botanical-sketch-tshirt"),
  depth: 4,
};

const TYPOGRAPHY_TSHIRT: ProductInfo = {
  name: "Gallery Type T-Shirt",
  category: "T-Shirts",
  price: "$38",
  rating: 4.7,
  reviews: 76,
  description:
    "A contemporary oversized T-shirt featuring bold gallery-inspired typography and a carefully balanced graphic composition. Designed as a statement piece for creative wardrobes.",

  features: [
    "Heavyweight premium cotton",
    "Oversized silhouette",
    "Screen-printed typography",
    "Drop-shoulder construction",
  ],

  specs: [
    ["Material", "100% heavyweight cotton"],
    ["Fit", "Oversized"],
    ["Weight", "260 GSM"],
    ["Sizes", "S - XXL"],
  ],

  inStock: true,
  delivery: "Ships in 1-3 days",
  images: gallery("gallery-type-tshirt"),
  depth: 5,
};

// Example: give any product its own spot on the wall
//   { ...ARC_LAMP, pos: { left: 6, top: 20, width: 24 },
//     posMobile: { left: 4, top: 16, width: 44 } }
//   { ...WALL_SCONCE, pos: { right: 5, bottom: 18, width: 18, rotate: -3 } }
const WALLS: Wall[] = [
  {
    title: "",
    image: "/images/wall_1.png",
    items: [
      { ...ABSTRACT_SUNSET_PAINTING, pos: { left: -10, top: 20, width: 18 } },
      { ...BOTANICAL_DREAM_PAINTING, pos: { left: 12, top: 20, width: 18 } },
      { ...FLORAL_BLOOM_DIARY, pos: { left: 52, top: 7, width: 10 } },
      { ...ABSTRACT_WAVES_DIARY, pos: { left: 70, top: 7, width: 10 } },
      { ...MIDNIGHT_GARDEN_DIARY, pos: { left: 88, top: 7, width: 10 } },
      { ...TERRACOTTA_ART_DIARY, pos: { left: 105, top: 7, width: 10 } },
      { ...WILD_MEADOW_DIARY, pos: { left: 52, top: 41, width: 10 } },
      { ...SUNSET_BOTANICAL_DIARY, pos: { left: 70, top: 41, width: 10 } },
      { ...OCEAN_INK_DIARY, pos: { left: 88, top: 41, width: 10 } },
      { ...SUNFLOWER_STORIES_DIARY, pos: { left: 105, top: 41, width: 10 } },
    ],
  },
  {
    title: "",
    image: "/images/wall_2.png",
    items: [
      { ...ABSTRACT_SUNSET_PAINTING, pos: { left: 15, top: 22, width: 14 } },
      { ...BOTANICAL_DREAM_PAINTING, pos: { left: 43, top: 22, width: 14 } },
      { ...QUIET_FIGURE_PAINTING, pos: { left: 71, top: 22, width: 14 } },
      { ...BLUE_HORIZON_PAINTING, pos: { left: 15, top: 62, width: 14 } },
      { ...TERRACOTTA_FORMS_PAINTING, pos: { left: 43, top: 62, width: 14 } },
      { ...MOONLIT_GARDEN_PAINTING, pos: { left: 71, top: 62, width: 14 } },
    ],
  },
  {
    title: "",
    image: "/images/wall_3.png",
    items: [
      { ...TOTE_BAG_1 },
      { ...TOTE_BAG_2, pos: { left: 36, top: 12, width: 28 } },
      { ...TOTE_BAG_3, pos: { left: 69, top: 23, width: 29 } },
    ],
  },
  {
    title: "",
    image: "/images/wall_4.png",
    items: [
      { ...ABSTRACT_ART_TSHIRT },
      { ...BOTANICAL_TSHIRT },
      { ...TYPOGRAPHY_TSHIRT },
    ],
  },
];

/* ---------- Style constants (values that depend on --W / --H / --t or use long gradients) ---------- */

// Wall height as a share of the section height. Higher = taller walls, thinner ceiling/floor strips
// (0.90 leaves ~5% of the screen for each; 0.74 was ~13%). Keep it between 0.8 and 0.95.
const WALL_HEIGHT = 0.9;

// One image for the ceiling (file in /public). Square works best. Set to "" for the plain gradient.
const CEILING_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMFa5-Y10Zmp_s91O65Z2Weo3Zxvo8tUMnZpR2RDMKMw&s";

const PLANE = "calc(var(--W) + 2px)"; // +2px overlap hides hairline seams at the corners

const wallStyle = (i: number, image: string): CSSProperties => ({
  width: PLANE,
  height: "var(--H)",
  margin: `calc(var(--H) / -2) 0 0 calc(${PLANE} / -2)`,
  // wall i sits W/2 away from the camera, facing inward, 90deg apart
  transform: `rotateY(${i * -90}deg) translateZ(calc(var(--W) / -2))`,
  background:
    "linear-gradient(90deg,rgba(0,0,0,.30),transparent 6%,transparent 94%,rgba(0,0,0,.30))," + // corner occlusion
    "linear-gradient(180deg,rgba(0,0,0,.22),transparent 9%,transparent 86%,rgba(0,0,0,.28))," + // ceiling / floor occlusion
    (image ? `url(${image}) center / cover no-repeat, ` : "") +
    "linear-gradient(#e6dfd2,#d8cebd)",
});

const planeBase: CSSProperties = {
  width: PLANE,
  height: PLANE,
  margin: `calc(${PLANE} / -2) 0 0 calc(${PLANE} / -2)`,
};

const floorStyle: CSSProperties = {
  ...planeBase,
  transform: "translateY(calc(var(--H) / 2)) rotateX(90deg)",
  background:
    "radial-gradient(circle,rgba(255,235,190,.22),transparent 62%)," +
    "repeating-linear-gradient(90deg,#6a4a30 0 88px,#4a3120 88px 90px)",
  boxShadow: "inset 0 0 calc(var(--W) * .09) rgba(0,0,0,.7)", // contact shading along the wall/floor line
};

const ceilStyle: CSSProperties = {
  ...planeBase,
  transform: "translateY(calc(var(--H) / -2)) rotateX(-90deg)",
  background:
    (CEILING_IMAGE ? `url(${CEILING_IMAGE}) center / cover no-repeat, ` : "") +
    "radial-gradient(circle,#f1ebe0,#c9bfae)",
  boxShadow: "inset 0 0 calc(var(--W) * .1) rgba(0,0,0,.4)",
};

// Used for any product that has no pos / posMobile, in wall order
const DEFAULT_POS: Placement[] = [
  { left: 3, top: 22, width: 28 },
  { left: 36, top: 22, width: 28 },
  { right: 3, top: 22, width: 28 },
];
const DEFAULT_POS_MOBILE: Placement[] = [
  { left: 4, top: 18, width: 44 },
  { right: 4, top: 18, width: 44 },
  { left: 28, bottom: 14, width: 44 },
];

const unit = (v?: number | string) => (typeof v === "number" ? `${v}%` : v);

const placementStyle = (p: Placement): CSSProperties => ({
  position: "absolute",
  top: unit(p.top),
  right: unit(p.right),
  bottom: unit(p.bottom),
  left: unit(p.left),
  width: unit(p.width),
  height: unit(p.height),
  aspectRatio: p.height === undefined ? (p.aspect ?? 0.75) : undefined,
  transform: p.rotate ? `rotate(${p.rotate}deg)` : undefined,
});

/* ---------- Product popup ---------- */

function Stars({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(5, value)) * 20;
  return (
    <span
      className="relative inline-block text-[17px] leading-none tracking-[2px]"
      aria-label={`${value} out of 5 stars`}
      role="img"
    >
      <span className="text-[#d9cfbf]">★★★★★</span>
      <span
        className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-[#d9932b]"
        style={{ width: `${pct}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}

const toNumber = (s: string) => Number(s.replace(/[^0-9.]/g, "")) || 0;

function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const count = product.images.length;

  const step = useCallback(
    (d: number) => setImgIdx((i) => (i + d + count) % count),
    [count],
  );

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, step]);

  // Smooth-scroll libraries (Lenis etc.) listen for wheel / touch on the window and scroll the page
  // themselves. Stopping these events from bubbling past the overlay keeps them away from the library,
  // while the browser's own scrolling inside the popup keeps working (we never call preventDefault).
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const stop = (e: Event) => e.stopPropagation();
    el.addEventListener("wheel", stop, { passive: true });
    el.addEventListener("touchmove", stop, { passive: true });
    return () => {
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, []);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(t);
  }, [added]);

  const discount =
    product.oldPrice && toNumber(product.oldPrice) > 0
      ? Math.round(
          (1 - toNumber(product.price) / toNumber(product.oldPrice)) * 100,
        )
      : 0;

  return (
    <div
      ref={overlayRef}
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      className="fixed inset-0 z-[100] flex items-center justify-center overscroll-contain bg-black/60 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      {/* Dialog frame: never scrolls itself, so the close button stays put.
          Desktop: fixed height, and the two columns are independent (left fixed, right scrolls).
          Mobile: single column, the inner wrapper scrolls (button still stays fixed). */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[960px] overflow-hidden rounded-2xl bg-[#faf6ef] text-[#2a1c12] shadow-2xl md:h-[min(92vh,720px)]"
      >
        {/* Close button lives outside the scrolling areas */}
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl leading-none text-[#2a1c12] shadow transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2a1c12]"
        >
          ×
        </button>

        <div
          data-lenis-prevent
          className="max-h-[92vh] overflow-y-auto overscroll-contain md:grid md:h-full md:max-h-none md:grid-cols-2 md:overflow-hidden"
        >
          {/* Gallery (fixed on desktop, does not scroll) */}
          <div className="flex flex-col gap-3 bg-[#efe7da] p-4 sm:p-6 md:h-full md:min-h-0 md:overflow-hidden">
            <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-[#e6dccb] md:aspect-auto md:min-h-0 md:flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={imgIdx}
                src={product.images[imgIdx]}
                alt={`${product.name} - view ${imgIdx + 1}`}
                className="h-full w-full object-contain p-4"
                draggable={false}
              />
              {count > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() => step(-1)}
                    className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-xl shadow transition hover:bg-white"
                  >
                    &#8249;
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => step(1)}
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-xl shadow transition hover:bg-white"
                  >
                    &#8250;
                  </button>
                  <span className="absolute bottom-2 right-3 rounded-full bg-black/50 px-2 py-0.5 text-[11px] text-white">
                    {imgIdx + 1} / {count}
                  </span>
                </>
              )}
            </div>

            {count > 1 && (
              <div className="flex shrink-0 gap-2 overflow-x-auto pb-1">
                {product.images.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    aria-label={`Show image ${i + 1}`}
                    onClick={() => setImgIdx(i)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#e6dccb] transition sm:h-[72px] sm:w-[72px] ${
                      i === imgIdx
                        ? "ring-2 ring-[#2a1c12]"
                        : "opacity-70 ring-1 ring-black/10 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-contain p-1"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details (this is the only part that scrolls on desktop) */}
          <div
            data-lenis-prevent
            className="flex flex-col gap-4 p-5 sm:p-7 md:h-full md:overflow-y-auto md:overscroll-contain"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[.14em] text-[#8a6d4b]">
                {product.category}
              </p>
              <h3 className="mt-1 pr-10 text-2xl font-semibold leading-tight sm:text-[28px]">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Stars value={product.rating} />
              <span className="font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-[#7a6650]">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-semibold">{product.price}</span>
              {product.oldPrice && (
                <span className="text-lg text-[#8a7a68] line-through">
                  {product.oldPrice}
                </span>
              )}
              {discount > 0 && (
                <span className="rounded-full bg-[#2f6b3f] px-2 py-0.5 text-xs font-semibold text-white">
                  {discount}% OFF
                </span>
              )}
            </div>
            <p className="-mt-2 text-xs text-[#7a6650]">
              Inclusive of all taxes
            </p>

            <p className="text-[15px] leading-relaxed text-[#4a3a2a]">
              {product.description}
            </p>

            <ul className="grid gap-1.5 text-sm text-[#4a3a2a]">
              {product.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-[#2f6b3f]">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div>
              <h4 className="mb-2 text-sm font-semibold">Specifications</h4>
              <dl className="divide-y divide-black/10 overflow-hidden rounded-lg border border-black/10 text-sm">
                {product.specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[110px_1fr] gap-2 px-3 py-2 odd:bg-white/50"
                  >
                    <dt className="text-[#7a6650]">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <span
                className={`font-semibold ${product.inStock ? "text-[#2f6b3f]" : "text-[#a33a2a]"}`}
              >
                {product.inStock ? "In stock" : "Out of stock"}
              </span>
              <span className="text-[#7a6650]">{product.delivery}</span>
              <span className="text-[#7a6650]">
                30-day returns · 2-year warranty
              </span>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center overflow-hidden rounded-full border border-black/15 bg-white">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-10 w-10 text-lg transition hover:bg-black/5"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="h-10 w-10 text-lg transition hover:bg-black/5"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                disabled={!product.inStock}
                onClick={() => setAdded(true)}
                className="h-10 flex-1 rounded-full bg-[#2a1c12] px-5 text-sm font-semibold text-white transition hover:bg-[#3d2a1b] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {added ? "Added ✓" : "Add to cart"}
              </button>

              <button
                type="button"
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wished}
                onClick={() => setWished((w) => !w)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg transition ${
                  wished
                    ? "border-[#c0392b] bg-[#c0392b] text-white"
                    : "border-black/15 bg-white text-[#2a1c12] hover:bg-black/5"
                }`}
              >
                {wished ? "♥" : "♡"}
              </button>
            </div>

            <button
              type="button"
              disabled={!product.inStock}
              className="h-10 shrink-0 rounded-full border border-[#2a1c12] text-sm font-semibold text-[#2a1c12] transition hover:bg-[#2a1c12] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Component ---------- */

export default function RoomShowcase({ walls = WALLS }: { walls?: Wall[] }) {
  const [idx, setIdx] = useState(0); // unbounded: the room always turns the short way, never spins back
  const [dims, setDims] = useState({ P: 800, W: 1600, H: 600, lw: 900 });
  const [selected, setSelected] = useState<Product | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const inView = useRef(false);
  const roomRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const dragged = useRef(false); // true when the pointer moved far enough to count as a swipe, not a click
  const modalOpen = useRef(false);
  const active = ((idx % 4) + 4) % 4;
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    modalOpen.current = selected !== null;
  }, [selected]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const place = (p: Product, k: number): Placement =>
    (mobile ? (p.posMobile ?? p.pos) : p.pos) ??
    (mobile ? DEFAULT_POS_MOBILE : DEFAULT_POS)[k] ??
    DEFAULT_POS[0];

  const go = useCallback((d: number) => setIdx((i) => i + d), []);
  const closeModal = useCallback(() => setSelected(null), []);

  // Room geometry from the section's own size. Camera sits at the room center; wall width = 2P so the
  // front wall projects 1:1 at rest and the floor/ceiling stay visible as strips.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const fit = () => {
      const vw = root.clientWidth;
      const vh = root.clientHeight;
      const H = vh * WALL_HEIGHT;
      const P = Math.max(vw * 0.56, Math.min(H, vw));
      const room = roomRef.current;
      if (room) room.style.transition = "none"; // don't animate a resize
      setDims({ P, W: 2 * P, H, lw: Math.min(vw * 0.9, 1040) });
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (roomRef.current) roomRef.current.style.transition = "";
        }),
      );
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(root);
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.5 },
    );
    io.observe(root);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        !inView.current ||
        modalOpen.current ||
        t?.closest("input, textarea, select, [contenteditable]")
      )
        return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const rootVars = {
    "--P": `${dims.P}px`,
    "--W": `${dims.W}px`,
    "--H": `${dims.H}px`,
    "--lw": `${dims.lw}px`,
  } as CSSProperties;

  return (
    <>
      <section
        ref={rootRef}
        aria-label="Room showcase"
        className="relative -top-12 isolate h-[100svh] min-h-[560px] w-full touch-pan-y overflow-hidden bg-[#120c07] [--dur:820ms] [--ease:cubic-bezier(.65,0,.25,1)] motion-reduce:[--dur:1ms]"
        style={rootVars}
        onPointerDown={(e) => {
          startX.current = e.clientX;
          dragged.current = false;
        }}
        onPointerUp={(e) => {
          if (startX.current !== null) {
            const dx = e.clientX - startX.current;
            dragged.current = Math.abs(dx) > 10;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }
          startX.current = null;
        }}
        onPointerCancel={() => {
          startX.current = null;
        }}
      >
        {/* Scene = camera lens */}
        <div className="absolute inset-0 [perspective-origin:50%_50%] [perspective:var(--P)]">
          {/* Room origin sits exactly at the eye (translateZ(P)); rotating it turns the walls around the camera */}
          <div
            ref={roomRef}
            className="absolute left-1/2 top-1/2 h-0 w-0 will-change-transform [transform-style:preserve-3d] [transform:translateZ(var(--P))_rotateY(var(--ry))] [transition:transform_var(--dur)_var(--ease)]"
            style={{ "--ry": `${idx * 90}deg` } as CSSProperties}
          >
            {walls.slice(0, 4).map((wall, i) => {
              const on = i === active;
              return (
                <section
                  key={i}
                  className="absolute left-1/2 top-1/2 flex items-center justify-center [backface-visibility:hidden] [transform-style:preserve-3d] object-bottom"
                  style={wallStyle(i, wall.image ?? "")}
                >
                  <div className="absolute left-1/2 top-0 h-full w-[var(--lw)] -translate-x-1/2 [transform-style:preserve-3d]">
                    {wall.title && (
                      <h2 className="absolute inset-x-0 top-[4%] text-center font-semibold tracking-[.06em] text-[#4a3a2a] text-[length:max(12px,calc(var(--H)*.04))]">
                        {wall.title}
                      </h2>
                    )}

                    {wall.items.map((p, k) => (
                      <button
                        key={`${p.name}-${k}`}
                        type="button"
                        aria-label={`View ${p.name}`}
                        tabIndex={on ? 0 : -1}
                        // only the wall facing the camera is interactive
                        onClick={() => {
                          if (!on || dragged.current) return;
                          setSelected(p);
                        }}
                        className={`group [transform-style:preserve-3d] focus-visible:outline-none ${on ? "cursor-pointer" : "pointer-events-none"}`}
                        style={
                          {
                            ...placementStyle(place(p, k)),
                            "--t": `${p.depth}px`,
                          } as CSSProperties
                        }
                      >
                        {/* soft shadow cast onto the wall (light from top-left) */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.images[0]}
                          alt=""
                          aria-hidden
                          draggable={false}
                          className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain opacity-40 [transform:translate(calc(var(--t)*.7),calc(var(--t)*1.1))_translateZ(.5px)]"
                          style={{
                            filter: "brightness(0) blur(calc(var(--t) * .7))",
                          }}
                        />
                        {/* product image, floating slightly off the wall */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          draggable={false}
                          className="absolute inset-0 h-full w-full select-none object-contain transition-[transform,filter] duration-300 ease-out [transform:translateZ(var(--t))] group-hover:[transform:translateZ(var(--t))_scale(1.08)] group-focus-visible:[transform:translateZ(var(--t))_scale(1.08)]"
                          style={{
                            filter: on
                              ? "drop-shadow(0 2px 3px rgba(0,0,0,.35))"
                              : "brightness(.72)",
                          }}
                        />
                      </button>
                    ))}
                  </div>

                  {/* walls turned away from the camera get darker */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-[#0b0704] transition-opacity duration-[var(--dur)] ${on ? "opacity-0" : "opacity-40"}`}
                  />
                </section>
              );
            })}

            <div
              className="absolute left-1/2 top-1/2 [backface-visibility:hidden]"
              style={floorStyle}
            />
            <div
              className="absolute left-1/2 top-1/2 [backface-visibility:hidden]"
              style={ceilStyle}
            />
          </div>
        </div>

        {/* Controls */}
        <nav className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3.5 rounded-full bg-[rgba(20,13,8,.6)] px-3.5 py-2 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Previous wall"
            onClick={() => go(-1)}
            className="px-2 text-[22px] leading-none text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            &#8249;
          </button>
          <div className="flex gap-2">
            {walls.slice(0, 4).map((_, i) => (
              <i
                key={i}
                className={`h-2 w-2 rounded-full transition ${i === active ? "scale-125 bg-white" : "bg-white/35"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next wall"
            onClick={() => go(1)}
            className="px-2 text-[22px] leading-none text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            &#8250;
          </button>
        </nav>
      </section>

      {/* Popup is rendered outside the section so swipe handling and 3D transforms don't affect it */}
      {selected &&
        createPortal(
          <ProductModal
            key={selected.name}
            product={selected}
            onClose={closeModal}
          />,
          document.body,
        )}
    </>
  );
}
