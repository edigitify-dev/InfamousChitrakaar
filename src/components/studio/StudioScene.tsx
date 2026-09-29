"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { StudioHotspotData, StudioRoomData } from "@/types/homepage";
import { StudioRoom } from "./StudioRoom";

interface StudioSceneProps {
  room: StudioRoomData;
  onSelect: (hotspot: StudioHotspotData) => void;
}

/**
 * R3F Canvas — Phase 3 prototype: room → hotspot → hover label → click → product modal.
 * Phase 8 adds room-to-room camera transitions, post-processing and touch tuning.
 */
export function StudioScene({ room, onSelect }: StudioSceneProps) {
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 1.9, 5.6], fov: 52 }}>
      <color attach="background" args={["#1b1611"]} />
      <fog attach="fog" args={["#1b1611", 9, 20]} />

      <ambientLight intensity={0.6} color="#ffd9a8" />
      <directionalLight position={[3, 5, 3]} intensity={1.1} color="#ffcf99" castShadow />
      <pointLight position={[-3, 3, -2]} intensity={14} distance={10} color="#ff9a4d" />

      <Suspense fallback={null}>
        <StudioRoom room={room} onSelect={onSelect} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableDamping
        minDistance={2.5}
        maxDistance={6.8}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.9}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        target={[0, 1.6, -1]}
      />
    </Canvas>
  );
}
