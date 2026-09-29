import { categories } from "@/config/categories";
import type { HomepageData, StudioRoomData } from "@/types/homepage";
import type { ProductCardData } from "@/types/product";

/**
 * Sample content that matches the shape the database queries will return.
 * Replace with `getHomepageData()` once server/queries exist (Phase 4+).
 */
export const featuredProducts: ProductCardData[] = [
  { id: "p1", slug: "chaos-tee", name: "Chaos Tee", price: 149900, art: "tshirt", isNew: true, blurb: "Heavy cotton, hand-drawn print." },
  { id: "p2", slug: "midnight-tote", name: "Midnight Tote", price: 89900, art: "tote", blurb: "Canvas tote, screen printed." },
  { id: "p3", slug: "wave-poster", name: "The Wave Poster", price: 119900, art: "poster", isNew: true, blurb: "A3 print on textured paper." },
  { id: "p4", slug: "pick-a-card-deck", name: "Pick A Card Deck", price: 199900, art: "cards", blurb: "52 illustrations, 1 story." },
];

const theme = { wall: "#d9c9a8", floor: "#7a5a3a", accent: "#d8432a" };

export const rooms: StudioRoomData[] = [
  {
    id: "r1", code: "01", name: "The Desk", subtitle: "Where every drawing starts", theme,
    hotspots: [
      { id: "h1", label: "Chaos Tee", position: [-1.6, 1.2, -2], rotationY: 0.2, x: 30, y: 46, product: featuredProducts[0] },
      { id: "h2", label: "Midnight Tote", position: [1.4, 1.1, -2], rotationY: -0.2, x: 62, y: 58, product: featuredProducts[1] },
    ],
  },
  {
    id: "r2", code: "02", name: "The Wall", subtitle: "Posters, frames, loose ideas", theme,
    hotspots: [{ id: "h3", label: "The Wave Poster", position: [0, 1.5, -2.2], rotationY: 0, x: 48, y: 40, product: featuredProducts[2] }],
  },
  {
    id: "r3", code: "03", name: "The Table", subtitle: "Cards, prints, small things", theme,
    hotspots: [{ id: "h4", label: "Pick A Card Deck", position: [0.6, 0.9, -1.6], rotationY: 0.1, x: 55, y: 62, product: featuredProducts[3] }],
  },
  {
    id: "r4", code: "04", name: "The Window", subtitle: "Golden hour, finished pieces", theme,
    hotspots: [{ id: "h5", label: "Midnight Tote", position: [-0.8, 1.2, -2], rotationY: 0, x: 40, y: 50, product: featuredProducts[1] }],
  },
];

const tones = [
  "linear-gradient(135deg,#3a2a1e,#8a5a3a)", "linear-gradient(135deg,#d8c9a8,#a88a5a)",
  "linear-gradient(135deg,#1d1915,#4a3a2a)", "linear-gradient(135deg,#c9673f,#5a3a4a)",
  "linear-gradient(135deg,#e9dcc0,#b8a888)", "linear-gradient(135deg,#2a2036,#5a3a4a)",
  "linear-gradient(135deg,#7a5a3a,#d8c9a8)",
];

export const homepageData: HomepageData = {
  hero: {
    heading: "The Infamous Chitrakar",
    subheading: "We create. You dominate.",
    description: "Illustrations, stories and chaos turned into things you can live with.",
    ctaText: "Explore the Studio",
    ctaLink: "/studio",
  },
  studio: {
    heading: "The Studio",
    description: "Step inside. Drag to look around, tap a + to meet what lives there.",
    ctaText: "Enter the studio",
    ctaLink: "/studio",
  },
  exhibition: {
    heading: "Current Exhibition.",
    description: "A small, limited run of pieces straight off the desk.",
    ctaText: "View all",
    ctaLink: "/shop",
  },
  posters: {
    heading: "Posters & Frames.",
    description: "Turn blank walls into stories. Printed on textured paper, ready to frame.",
    ctaText: "Shop posters",
    ctaLink: "/shop/poster-frames",
  },
  sketchbook: {
    heading: "Inside the sketchbook",
    description: "Flip through the pages where ideas begin, messy and unfiltered.",
    ctaText: "Read the story",
    ctaLink: "/story",
  },
  cards: {
    heading: "Pick a Card.",
    subheading: "52 illustrations. 1 story.",
    description: "A full deck where every card is a drawing, and together they tell one story.",
    ctaText: "Shop the deck",
    ctaLink: "/shop/playing-cards",
  },
  signature: {
    heading: "Signature Collection.",
    subheading: "Signature collection",
    description: "The pieces that started it all, made by hand and printed in small batches.",
    ctaText: "Explore collection",
    ctaLink: "/shop",
  },
  gallery: {
    heading: "From The Studio.",
    ctaText: "Follow on Instagram",
  },
  newsletter: {
    heading: "Join the chaos.",
    subheading: "The newsletter",
    description: "New drops, sketches and stories. No spam, ever.",
    ctaText: "Subscribe",
  },
  categories,
  rooms,
  featuredProducts,
  galleryItems: tones.map((tone, i) => ({ id: `g${i + 1}`, caption: `Studio photo ${i + 1}`, tone })),
};
