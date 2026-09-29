"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useIntersection } from "@/hooks/useIntersection";
import type { StudioHotspotData, StudioRoomData } from "@/types/homepage";
import type { ProductCardData } from "@/types/product";
import { RoomNavigation } from "./RoomNavigation";
import { StudioFallback } from "./StudioFallback";
import { StudioProductModal } from "./StudioProductModal";

// three.js is heavy: load it only in the browser, and only when the section is near the viewport.
const StudioScene = dynamic(() => import("./StudioScene").then((m) => m.StudioScene), {
  ssr: false,
  loading: () => <StudioFallback />,
});

/** Full-screen 3D studio used by the /studio route. */
export function StudioExperience({ rooms }: { rooms: StudioRoomData[] }) {
  const [activeId, setActiveId] = useState(rooms[0]?.id ?? "");
  const [selected, setSelected] = useState<ProductCardData | null>(null);
  const [ref, near] = useIntersection<HTMLDivElement>({ rootMargin: "300px" });

  const room = rooms.find((r) => r.id === activeId) ?? rooms[0];
  if (!room) return null;

  const handleSelect = (hotspot: StudioHotspotData) => setSelected(hotspot.product);

  return (
    <div ref={ref} className="relative h-[calc(100svh-72px)] min-h-[520px] w-full bg-ink">
      {near ? <StudioScene room={room} onSelect={handleSelect} /> : <StudioFallback />}

      <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-6 md:p-10">
        <div className="max-w-xs text-paper [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]">
          <p className="label text-vermilion">Room {room.code}</p>
          <h1 className="mt-1 font-display text-5xl italic leading-none md:text-6xl">{room.name}</h1>
          <p className="mt-3 text-sm text-paper/85">{room.subtitle}</p>
        </div>
        <RoomNavigation
          rooms={rooms}
          activeId={room.id}
          onSelect={setActiveId}
          className="pointer-events-auto"
        />
      </div>

      <p className="label pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-[0.55rem] text-paper/70 md:block">
        Drag to look around · Click + to explore
      </p>

      <StudioProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
