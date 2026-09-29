"use client";

import type { StudioHotspotData, StudioRoomData } from "@/types/homepage";
import { StudioHotspot } from "./StudioHotspot";

function Frame({
  position,
  size,
  accent,
}: {
  position: [number, number, number];
  size: [number, number];
  accent: string;
}) {
  const [w, h] = size;
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[w, h, 0.06]} />
        <meshStandardMaterial color="#1b1611" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[w - 0.14, h - 0.14]} />
        <meshStandardMaterial color="#efe4cc" roughness={0.9} />
      </mesh>
      <mesh position={[0, h * 0.08, 0.04]}>
        <circleGeometry args={[Math.min(w, h) * 0.26, 40]} />
        <meshBasicMaterial color={accent} />
      </mesh>
    </group>
  );
}

function Table({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.08, 1.1]} />
        <meshStandardMaterial color="#6b4a30" roughness={0.8} />
      </mesh>
      {[
        [-1.1, 0.4, -0.45],
        [1.1, 0.4, -0.45],
        [-1.1, 0.4, 0.45],
        [1.1, 0.4, 0.45],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.08, 0.8, 0.08]} />
          <meshStandardMaterial color="#4a3320" />
        </mesh>
      ))}
    </group>
  );
}

function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.22, 0.6, 20]} />
        <meshStandardMaterial color="#a4553a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshStandardMaterial color="#3f6a3a" roughness={1} />
      </mesh>
      <mesh position={[0.25, 1.35, 0.05]} castShadow>
        <sphereGeometry args={[0.32, 20, 20]} />
        <meshStandardMaterial color="#4e7b45" roughness={1} />
      </mesh>
    </group>
  );
}

interface StudioRoomProps {
  room: StudioRoomData;
  onSelect: (hotspot: StudioHotspotData) => void;
}

/**
 * Procedural room (walls, floor, rug, frames, table, plant) — no GLB files needed yet.
 * Architecture is ready to swap this group for a real GLTF later:
 * hotspots are rendered from data, independent of the room geometry.
 */
export function StudioRoom({ room, onSelect }: StudioRoomProps) {
  const { wall, floor, accent } = room.theme;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color={floor} roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <planeGeometry args={[14, 5]} />
        <meshStandardMaterial color={wall} roughness={1} />
      </mesh>
      <mesh position={[-6, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[14, 5]} />
        <meshStandardMaterial color={wall} roughness={1} />
      </mesh>
      <mesh position={[6, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[14, 5]} />
        <meshStandardMaterial color={wall} roughness={1} />
      </mesh>

      {/* Window glow */}
      <mesh position={[-3.4, 2.7, -4.98]}>
        <planeGeometry args={[2.2, 2.7]} />
        <meshBasicMaterial color="#ffd9a0" />
      </mesh>

      {/* Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.4, 0.01, 0.4]} receiveShadow>
        <circleGeometry args={[2.2, 48]} />
        <meshStandardMaterial color={accent} roughness={1} />
      </mesh>

      <Frame position={[0.2, 2.5, -4.94]} size={[1.2, 1.6]} accent="#d8432a" />
      <Frame position={[1.8, 2.7, -4.94]} size={[0.9, 1.2]} accent="#e9a23b" />
      <Frame position={[3.3, 2.4, -4.94]} size={[1.3, 1.7]} accent="#d8432a" />
      <Frame position={[-5.94, 2.5, -1]} size={[1.2, 1.6]} accent="#e9a23b" />

      <Table position={[0.4, 0, -3.4]} />
      <Plant position={[-5, 0, -3.6]} />
      <Plant position={[4.9, 0, -3.2]} />

      {room.hotspots.map((h) => (
        <StudioHotspot key={h.id} hotspot={h} onSelect={onSelect} />
      ))}
    </group>
  );
}
