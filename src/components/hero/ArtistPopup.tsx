"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArtButton } from "../ui/ArtButton";
import { Image } from "@imagekit/next";

/* ---------- EDIT YOUR ARTIST DETAILS HERE ---------- */
const ARTISTS = [
  {
    name: "Shravya",
    eyebrow: "Meet the artist",
    image: "/artist/artist_img_1.png",
    bio: "Aanya creates dreamy, nature-inspired illustrations that capture quiet moments and everyday magic. Her work is rooted in nostalgia, slow living and a deep love for colour.",
    stats: [
      { icon: "bag", value: "320+", label: "items sold" },
      { icon: "heart", value: "1.2K", label: "happy customers" },
      { icon: "star", value: "4.9", label: "artist rating" },
    ],
    aboutHref: "/artists/aanya-mehta",
  },
];

const SHOW_DELAY_MS = 500;

const INK = "#2b2622";
const GREEN = "#2f4a3a";
const SERIF = { fontFamily: 'Georgia, "Times New Roman", serif' };

/* ---------- small doodles ---------- */
function StatIcon({ type }: { type: string }) {
  const p = {
    width: 25,
    height: 25,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: INK,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (type === "bag")
    return (
      <svg {...p}>
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    );
  if (type === "heart")
    return (
      <svg {...p}>
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
      </svg>
    );
  return (
    <svg {...p}>
      <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    </svg>
  );
}

export function ArtistPopup() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [artist, setArtist] = useState<(typeof ARTISTS)[number] | null>(null);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => setOpen(false), 300);
  }, []);

  // Open automatically on every load
  useEffect(() => {
    const timer = setTimeout(() => {
      const randomArtist = ARTISTS[Math.floor(Math.random() * ARTISTS.length)];

      setArtist(randomArtist);
      setOpen(true);

      requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true)),
      );
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // Esc to close + lock page scroll while open
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  if (!open || !artist) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="artist-popup-title"
    >
      {/* Backdrop */}
      <div
        onClick={close}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-[780px] transition-all duration-300 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(24px) scale(0.96)",
          filter: "drop-shadow(0 18px 30px rgba(0,0,0,.45))",
        }}
      >
        <div
          className="relative max-h-[92vh] overflow-y-auto overflow-x-hidden rounded-[4px]"
          style={{
            backgroundColor: "#f4ebdc",
            backgroundImage:
              "radial-gradient(circle at 20% 15%, rgba(255,255,255,.55), transparent 55%), radial-gradient(circle at 85% 90%, rgba(190,160,120,.18), transparent 50%)",
          }}
        >
          <div className="relative grid gap-8 px-8 pb-12 pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-10 md:px-12 md:pb-14 md:pt-12">
            {/* ---------- PHOTO ---------- */}
            <div className="relative mx-auto w-full max-w-[330px]">
              <div className="relative aspect-[0.72/1] w-full">
                {/* tape */}
                <Image
                  src="tape_1.png"
                  width={500}
                  height={200}
                  className="relative z-20 w-25 -rotate-[30deg] -left-5 top-5"
                  alt=""
                />
                {/* Polaroid */}
                <Image
                  src="pollaroid.png"
                  alt=""
                  width={826}
                  height={1080}
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-fill"
                />

                {/* Artist image */}
                <div
                  className="absolute z-10 overflow-hidden"
                  style={{
                    left: "7%",
                    top: "8.5%",
                    width: "80%",
                    height: "75%",
                    clipPath: "polygon(3% 2%, 96% 0%, 100% 96%, 6% 100%)",
                    transform: "rotate(-3deg)",
                  }}
                >
                  <Image
                    src={artist.image}
                    width={735}
                    height={860}
                    alt={artist.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* ---------- DETAILS ---------- */}
            <div
              className="flex flex-col justify-center"
              style={{ color: INK }}
            >
              <p className="font-edu-qld inline-block self-start border-b border-current pb-1 text-[12px] font-semibold uppercase tracking-[0.18em]">
                {artist.eyebrow}
              </p>

              <h2
                id="artist-popup-title"
                className="font-sketch relative mt-5 inline-block self-start text-[clamp(2.6rem,5vw,2rem)] leading-[1.05]"
              >
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0 left-0 right-0 -z-0 h-[10px] -rotate-1 rounded-sm"
                  style={{ backgroundColor: "rgba(232,150,150,.45)" }}
                />
                <span className="relative">{artist.name}</span>
              </h2>

              {/* Stats */}
              <dl className="mt-10 grid grid-cols-3 gap-2">
                {artist.stats.map((s) => (
                  <div key={s.label} className="flex items-start gap-2">
                    <StatIcon type={s.icon} />
                    <div>
                      <dd
                        className="text-[20px] font-bold leading-none"
                        style={SERIF}
                      >
                        {s.value}
                      </dd>
                      <dt
                        className="mt-1 text-[11px] leading-tight opacity-70"
                        style={SERIF}
                      >
                        {s.label}
                      </dt>
                    </div>
                  </div>
                ))}
              </dl>

              <p
                className="mt-6 text-[15px] leading-[1.6] opacity-90"
                style={SERIF}
              >
                {artist.bio}
              </p>

              {/* Actions */}
              <div className="mt-7 flex flex-col items-center gap-4 md:items-start">
                <div data-hero="button" className="mt-6 mx-auto w-fit">
                  <ArtButton
                    text="Know more about the artist →"
                    textClassName="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={close}
                  className="self-center mx-auto text-[18px] underline decoration-1 underline-offset-4 text-vermilion transition-opacity hover:opacity-60 md:self-start"
                  style={SERIF}
                >
                  CONTINUE TO SHOP
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={close}
          aria-label="Close popup"
          className="absolute right-4 top-3 z-10 flex h-8 w-8 items-center justify-center text-2xl leading-none transition-transform hover:rotate-90"
          style={{ color: INK }}
        >
          ✕
        </button>
      </div>
    </div>,
    document.body,
  );
}
