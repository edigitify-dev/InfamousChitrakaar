import type { Metadata } from "next";
import { StudioExperience } from "@/components/studio/StudioExperience";
import { rooms } from "@/data/mock-homepage";

export const metadata: Metadata = { title: "The Studio" };

export default function StudioPage() {
  return <StudioExperience rooms={rooms} />;
}
