/**
 * Single place that maps every photo slot on the homepage to a file in /public.
 * Drop your real images at these paths (webp recommended) and they appear
 * automatically. Until then each slot shows a designed fallback.
 */
export const IMAGES = {
  hero: {
    artist: "/images/hero/hero-artist.jpg", // artist at desk, seen from behind
    polaroid: "/images/hero/hero-polaroid.jpg",
  },
  studio: {
    main: "/images/studio/studio-main.webp", // wide studio interior
    sketch: "/images/studio/wall-sketch.webp",
  },
  exhibition: {
    background: "/images/products/exhibition-bg.webp", // blurred dark desk scene
    tee: "/images/products/tee.webp",
    tote: "/images/products/tote.webp",
    frame: "/images/products/frame.webp",
    cards: "/images/products/card-deck.webp",
  },
  posters: {
    wall: "/images/products/posters-wall.webp", // framed wave poster on a wall
    polaroids: [
      "/images/gallery/polaroid-1.webp",
      "/images/gallery/polaroid-2.webp",
      "/images/gallery/polaroid-3.webp",
    ],
  },
  sketchbook: {
    desk: "/images/sketchbook/desk.webp",
  },
  cards: {
    background: "/images/cards/cards-bg.webp",
  },
  signature: {
    artist: "/images/gallery/signature-artist.webp",
    polaroids: [
      "/images/gallery/signature-1.webp",
      "/images/gallery/signature-2.webp",
      "/images/gallery/signature-3.webp",
      "/images/gallery/signature-4.webp",
    ],
  },
  gallery: [
    "/images/gallery/g1.webp",
    "/images/gallery/g2.webp",
    "/images/gallery/g3.webp",
    "/images/gallery/g4.webp",
    "/images/gallery/g5.webp",
    "/images/gallery/g6.webp",
    "/images/gallery/g7.webp",
  ],
  newsletter: {
    skyline: "/images/hero/skyline.webp", // dusk city skyline + rooftop silhouette
  },
} as const;
