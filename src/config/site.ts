export const siteConfig = {
  name: "The Infamous Chitrakar",
  shortName: "Chitrakar",
  tagline: "We create. You dominate.",
  description:
    "Illustrations, stories and chaos turned into things you can live with. Tees, totes, posters, playing cards and more from The Infamous Chitrakar.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { label: "Shop", href: "/shop" },
    { label: "Studio", href: "/studio" },
    { label: "Story", href: "/story" },
    { label: "Contact", href: "/story#contact" },
  ],
  footer: {
    shop: [
      { label: "All Products", href: "/shop" },
      { label: "T Shirts", href: "/shop/t-shirts" },
      { label: "Totes", href: "/shop/totes" },
      { label: "Posters", href: "/shop/poster-frames" },
      { label: "Bookmarks", href: "/shop/bookmarks" },
      { label: "Playing Cards", href: "/shop/playing-cards" },
      { label: "Stickers", href: "/shop/stickers" },
    ],
    info: [
      { label: "Our Story", href: "/story" },
      { label: "Shipping", href: "/story#shipping" },
      { label: "Returns", href: "/story#returns" },
      { label: "FAQ", href: "/story#faq" },
      { label: "Contact", href: "/story#contact" },
    ],
    follow: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Pinterest", href: "https://pinterest.com" },
      { label: "YouTube", href: "https://youtube.com" },
    ],
  },
  instagramUrl: "https://instagram.com",
} as const;
