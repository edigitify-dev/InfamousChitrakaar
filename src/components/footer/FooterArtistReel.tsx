"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type FooterArtist = {
  image: string;
};

// Add / remove artists here. Images go in /public/artists/
const ARTISTS: readonly FooterArtist[] = [
  { image: "/images/artist_img_1.png" },
  { image: "/images/artist_img_2.jpg" },
  { image: "/images/artist_img_3.jpg" },
  { image: "/images/artist_img_4.jpg" },
];

export function FooterArtistReel({ className = "" }: { className?: string }) {
  // Start empty so server and client HTML match; pick randomly after mount.
  const [artist, setArtist] = useState<FooterArtist | null>(null);

  useEffect(() => {
    setArtist(ARTISTS[Math.floor(Math.random() * ARTISTS.length)]);
  }, []);

  return (
    <div
      aria-hidden={!artist}
      className={`pointer-events-none absolute bottom-6 right-[3%] hidden w-44 rotate-[7deg] lg:block xl:w-48 ${className}`}
    >
      <div
        className={`relative aspect-[756/1086] w-full transition-opacity duration-700 ${
          artist ? "opacity-100" : "opacity-0"
        }`}
      >
        {artist && (
          <>
            {/* Artwork sits behind the reel, visible through its window */}
            <div
              className="absolute overflow-hidden"
              style={{
                left: "13.1%",
                right: "13.2%",
                top: "5.9%",
                bottom: "5.3%",
              }}
            >
              <Image
                src={artist.image}
                alt={""}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>

            {/* Reel frame on top */}
            <Image
              src="/images/reel.png"
              alt=""
              fill
              sizes="192px"
              aria-hidden
              className="pointer-events-none select-none object-contain"
            />

            {/* Tape + artist name */}
            <div className="absolute bottom-[6%] left-10 w-[60%] -translate-x-1/2">
              <Image
                src="/images/tape_2.png"
                alt=""
                width={500}
                height={200}
                aria-hidden
                className="h-auto w-full select-none drop-shadow-md"
              />
              <span className="absolute inset-0 flex items-center justify-center px-4 text-center font-hand font-bold text-[1.15rem] leading-none text-ink">
                Thanks For Visiting!
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
