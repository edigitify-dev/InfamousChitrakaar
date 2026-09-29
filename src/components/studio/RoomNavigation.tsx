"use client";

import { cn } from "@/lib/utils";
import type { StudioRoomData } from "@/types/homepage";

interface RoomNavigationProps {
  rooms: StudioRoomData[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

/** Vertical timeline: ROOM 01 · ROOM 02 · … */
export function RoomNavigation({ rooms, activeId, onSelect, className }: RoomNavigationProps) {
  return (
    <nav aria-label="Studio rooms" className={className}>
      <ol className="relative space-y-5 pl-6 [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]">
        <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-paper/50" />
        {rooms.map((room) => {
          const active = room.id === activeId;
          return (
            <li key={room.id}>
              <button
                type="button"
                onClick={() => onSelect(room.id)}
                aria-current={active ? "true" : undefined}
                className="group relative block text-left"
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-6 top-[3px] size-[11px] rounded-full border transition-all duration-300",
                    active ? "scale-110 border-vermilion bg-vermilion" : "border-paper bg-ink/60 group-hover:bg-paper",
                  )}
                />
                <span className={cn("label block text-[0.52rem]", active ? "text-vermilion" : "text-paper/70")}>
                  Room {room.code}
                </span>
                <span
                  className={cn(
                    "label block text-[0.62rem] transition-colors",
                    active ? "text-paper" : "text-paper/75 group-hover:text-paper",
                  )}
                >
                  {room.name}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
