import type { CategoryItem, ProductCardData } from "./product";

/** Mirrors the HomepageSection table: admin edits content, never design. */
export interface SectionContent {
  heading: string;
  subheading?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface StudioHotspotData {
  id: string;
  label: string;
  /** 3D position for the R3F scene */
  position: [number, number, number];
  rotationY: number;
  /** Position (in %) on the 2D homepage banner */
  x: number;
  y: number;
  product: ProductCardData;
}

export interface StudioRoomData {
  id: string;
  /** "01", "02"... shown in the room navigation */
  code: string;
  name: string;
  subtitle: string;
  theme: { wall: string; floor: string; accent: string };
  hotspots: StudioHotspotData[];
}

export interface GalleryThumb {
  id: string;
  caption: string;
  src?: string;
  /** CSS gradient used until a real photo exists */
  tone: string;
}

export interface HomepageData {
  hero: SectionContent;
  studio: SectionContent;
  exhibition: SectionContent;
  posters: SectionContent;
  sketchbook: SectionContent;
  cards: SectionContent;
  signature: SectionContent;
  gallery: SectionContent;
  newsletter: SectionContent;
  categories: CategoryItem[];
  rooms: StudioRoomData[];
  featuredProducts: ProductCardData[];
  galleryItems: GalleryThumb[];
}
