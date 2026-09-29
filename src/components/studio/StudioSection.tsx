"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { clamp, cn, formatPrice } from "@/lib/utils";
import { useGSAP } from "@/hooks/useGSAP";
import { IMAGES } from "@/config/images";
import { ArtImage, FALLBACKS } from "@/components/ui/ArtImage";
import { ArtMotif, Sparkle } from "@/components/ui/Doodles";
import { ButtonLink } from "@/components/ui/Button";
import { TapeLabel } from "@/components/ui/TapeLabel";
import { TornEdge } from "@/components/ui/TornEdge";
import type { SectionContent, StudioHotspotData, StudioRoomData } from "@/types/homepage";
import type { ProductCardData } from "@/types/product";
import { RoomNavigation } from "./RoomNavigation";
import { StudioProductModal } from "./StudioProductModal";

interface StudioSectionProps {
  content: SectionContent;
  rooms: StudioRoomData[];
}

/** How far (in % of the stage) the wide photo is nudged for each room. */
const ROOM_OFFSETS = [-3.5, -1, 1.8, 4];
const MAX_OFFSET = 5.3;

/**
 * Homepage studio banner — 2D placeholder with the same data model as the 3D scene.
 * Drag to look around, switch rooms, click a "+" hotspot for the product.
 * The immersive R3F version lives at /studio.
 */
export function StudioSection({ content, rooms }: StudioSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(rooms[0]?.id ?? "");
  const [offset, setOffset] = useState(ROOM_OFFSETS[0]);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<ProductCardData | null>(null);
  const drag = useRef<{ startX: number; startOffset: number; width: number } | null>(null);

  useGSAP(({ gsap, reduced }) => {
    gsap.from("[data-studio='panel'] > *", {
      opacity: 0,
      y: reduced ? 0 : 28,
      duration: 0.8,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
    });
  }, ref);

  const room = rooms.find((r) => r.id === activeId) ?? rooms[0];
  if (!room) return null;

  const selectRoom = (id: string) => {
    setActiveId(id);
    const index = rooms.findIndex((r) => r.id === id);
    setOffset(ROOM_OFFSETS[index] ?? 0);
  };

  const onHotspot = (hotspot: StudioHotspotData) => setSelected(hotspot.product);

  return (
    <section ref={ref} aria-label="The Studio" className="relative isolate flex flex-col overflow-hidden bg-ink lg:block lg:h-[max(600px,min(92svh,44vw))]">
      {/* Draggable studio photo */}
      <div
        className="relative order-2 h-[440px] cursor-grab touch-pan-y select-none active:cursor-grabbing lg:absolute lg:inset-0 lg:h-auto"
        onPointerDown={(e) => {
          drag.current = { startX: e.clientX, startOffset: offset, width: e.currentTarget.clientWidth };
          setDragging(true);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const dx = ((e.clientX - drag.current.startX) / drag.current.width) * 100;
          setOffset(clamp(drag.current.startOffset + dx, -MAX_OFFSET, MAX_OFFSET));
        }}
        onPointerUp={() => {
          drag.current = null;
          setDragging(false);
        }}
        onPointerLeave={() => {
          drag.current = null;
          setDragging(false);
        }}
      >
        <div
          className={cn("absolute inset-y-0 -left-[6%] w-[112%] will-change-transform", !dragging && "transition-transform duration-700 ease-out")}
          style={{ transform: `translate3d(${offset}%,0,0)` }}
        >
          <ArtImage
            src={IMAGES.studio.main}
            alt="Inside the studio: framed art on the walls, a worktable, plants and a woven rug"
            fallback={FALLBACKS.studio}
            className="h-full w-full"
          />
          {room.hotspots.map((h, i) => (
            <motion.button
              key={`${room.id}-${h.id}`}
              type="button"
              aria-label={`${h.label}: ${h.product.name}`}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => onHotspot(h)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 320, damping: 18 }}
              className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-paper/40" />
              <span className="relative grid size-8 place-items-center rounded-full border border-paper/90 bg-ink/45 text-lg leading-none text-paper backdrop-blur-sm transition-colors group-hover:bg-vermilion">
                +
              </span>
              <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap bg-paper px-3 py-1.5 text-center opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                <span className="block font-display text-sm italic leading-none">{h.product.name}</span>
                <span className="label mt-1 block text-[0.52rem] text-vermilion">{formatPrice(h.product.price)}</span>
              </span>
            </motion.button>
          ))}
        </div>

        <RoomNavigation
          rooms={rooms}
          activeId={room.id}
          onSelect={selectRoom}
          className="absolute right-[4%] top-[10%] z-20 lg:top-[8%]"
        />

        <p className="label pointer-events-none absolute bottom-[5%] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.5rem] text-paper/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
          <span aria-hidden className="grid h-6 w-4 place-items-start justify-center rounded-full border border-paper/80 pt-1">
            <span className="h-1.5 w-px animate-bounce bg-paper" />
          </span>
          Drag to look around
        </p>
      </div>

      {/* Cream torn panel */}
      <TornEdge
        edges={["bottom", "right"]}
        seed={21}
        amp={16}
        shadow
        className="relative z-20 order-1 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[31%]"
      >
        <div data-studio="panel" className="paper flex h-full flex-col justify-center px-7 pb-14 pt-28 lg:px-[13%] lg:pb-10 lg:pt-24">
          <Sparkle aria-hidden className="mb-3 w-4 text-ink" />
          <p className="label text-[0.62rem] text-vermilion">{content.subheading}</p>
          <h2 className="mt-2 font-display text-[clamp(3rem,5.4vw,5.2rem)] leading-[0.95] tracking-tight">
            {content.heading}
          </h2>
          <p className="mt-4 max-w-[15rem] text-[0.82rem] leading-relaxed text-ink/75">{content.description}</p>
          <div className="mt-6">
            <ButtonLink href={content.ctaLink ?? "/studio"} arrow>
              {content.ctaText}
            </ButtonLink>
          </div>

          {/* Taped sketch */}
          <div className="relative mt-8 hidden w-[62%] -rotate-3 self-start bg-[#faf6ec] p-1.5 pb-5 shadow-[0_6px_14px_rgba(0,0,0,0.3)] lg:block">
            <TapeLabel className="-top-2 left-3 h-4 w-12" rotate={-8} />
            <ArtMotif kind="face" className="aspect-[4/3] w-full bg-paper-2 p-1" />
            <p className="absolute inset-x-1 bottom-0.5 text-center font-hand text-[11px] font-bold uppercase leading-none">
              Same chaos. Different walls.
            </p>
          </div>
        </div>
      </TornEdge>

      <StudioProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
