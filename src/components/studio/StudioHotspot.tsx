"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Html } from "@react-three/drei";
import type { Group } from "three";
import { formatPrice } from "@/lib/utils";
import type { StudioHotspotData } from "@/types/homepage";

interface StudioHotspotProps {
  hotspot: StudioHotspotData;
  onSelect: (hotspot: StudioHotspotData) => void;
}

/** Pulsing "+" marker in 3D space. Hover → label, click → product modal. */
export function StudioHotspot({ hotspot, onSelect }: StudioHotspotProps) {
  const marker = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!marker.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 3) * 0.1;
    marker.current.scale.setScalar(hovered ? 1.3 : pulse);
  });

  return (
    <group position={hotspot.position} rotation={[0, hotspot.rotationY, 0]}>
      <Billboard>
        <group
          ref={marker}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "";
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(hotspot);
          }}
        >
          <mesh>
            <ringGeometry args={[0.16, 0.2, 40]} />
            <meshBasicMaterial color="#f0e7d4" transparent opacity={0.95} />
          </mesh>
          <mesh position={[0, 0, -0.001]}>
            <circleGeometry args={[0.16, 32]} />
            <meshBasicMaterial color={hovered ? "#d8432a" : "#14110e"} transparent opacity={0.78} />
          </mesh>
          <mesh position={[0, 0, 0.001]}>
            <planeGeometry args={[0.13, 0.022]} />
            <meshBasicMaterial color="#f0e7d4" />
          </mesh>
          <mesh position={[0, 0, 0.001]}>
            <planeGeometry args={[0.022, 0.13]} />
            <meshBasicMaterial color="#f0e7d4" />
          </mesh>
        </group>
      </Billboard>

      {hovered && (
        <Html center position={[0, 0.4, 0]} distanceFactor={7} style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap bg-paper px-3 py-1.5 text-center shadow-lg">
            <p className="font-display text-sm italic leading-none text-ink">{hotspot.product.name}</p>
            <p className="label mt-1 text-[0.55rem] text-vermilion">{formatPrice(hotspot.product.price)}</p>
          </div>
        </Html>
      )}
    </group>
  );
}
