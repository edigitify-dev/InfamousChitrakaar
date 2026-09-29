import RoomShowcase from "@/components/3dShowcase/Roomshowcase";
import PaperStripShowcase from "@/components/category/Paperstripshowcase";
import Collections from "@/components/collections/CollectionSection";
import { ExhibitionSection } from "@/components/exhibition/ExhibitionSection";
import FeaturedProducts from "@/components/featured/FeaturedProducts";
import { FromTheStudio } from "@/components/gallery/FromTheStudio";
import { CategoryStrip } from "@/components/hero/CategoryStrip";
import { HeroSection } from "@/components/hero/HeroSection";
import { NewsletterSection } from "@/components/newsletter/NewsletterSection";
import { PickACardSection } from "@/components/playing-cards/PickACardSection";
import { PostersSection } from "@/components/posters/PostersSection";
import { SignatureSection } from "@/components/signature/SignatureSection";
import { StudioSection } from "@/components/studio/StudioSection";
import { homepageData as d } from "@/data/mock-homepage";

export default function HomePage() {
  return (
    <>
      <HeroSection content={d.hero} categories={d.categories} />
      <PaperStripShowcase />
      <FeaturedProducts />
      <Collections />
      <RoomShowcase />
      {/* <StudioSection content={d.studio} rooms={d.rooms} /> */}
      {/* <ExhibitionSection content={d.exhibition} products={d.featuredProducts} /> */}
      {/* <PostersSection posters={d.posters} sketchbook={d.sketchbook} /> */}
      {/* <PickACardSection content={d.cards} /> */}
      {/* <SignatureSection content={d.signature} /> */}
      {/* <FromTheStudio content={d.gallery} items={d.galleryItems} /> */}
      {/* <NewsletterSection content={d.newsletter} /> */}
    </>
  );
}
