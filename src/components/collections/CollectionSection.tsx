/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Playfair_Display, Space_Mono } from "next/font/google";
import { Image } from "@imagekit/next";

const serif = Playfair_Display({ subsets: ["latin"], weight: ["400", "500"] });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

/* ---------- 👇 PUT YOUR IMAGE PATHS HERE ---------- */
const ASSETS = {
  paper: "brown_paper_tear_9.png",
  crown: "crown.png",
  tape: "tape_2.png",
  plantLeft: "plant-left.png",
  plantBottom: "plant-bottom.png",
  plantRight: "plant-right.png",
};

const COLLECTIONS = [
  {
    label: "Landscapes",
    href: "/collections/landscapes",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5bh7RrLLMLaCbvJiPYRRPtPtE7Mxe6GKRATZAdmVjYNOC9Qk_P10symg&s=10",
  },
  {
    label: "Portraits",
    href: "/collections/portraits",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB6NgL_8fpCfz9qVklPtG2bT5yaqyWul9N3H2qlCGzgxGQn4ogSjqDD0L5&s=10",
  },
  {
    label: "Cityscapes",
    href: "/collections/cityscapes",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTazz9J4sfg49L0ttlxfDQjjOElGTpdyZPXPxeRadL-UNT_cpziiCD7asZT&s=10",
  },
  {
    label: "Sketches",
    href: "/collections/sketches",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcqCaED0RdqDOrekkegLl-s3rAVDLEmCZY_N7OBZkqW9ClB24elP28CMnS&s=10",
  },
];

export default function Collections() {
  return (
    <section className="relative w-full overflow-hidden z-10">
      {/* Paper background (torn edges are baked into the PNG) */}
      <Image
        src={ASSETS.paper}
        width={2500}
        height={600}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill"
      />

      {/* Content */}
      <div className="relative px-6 pb-30 pt-38 sm:px-10 lg:px-14">
        {/* Plants */}
        <Image
          src={ASSETS.plantLeft}
          width={500}
          height={500}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-5 top-10 hidden h-40 w-auto select-none sm:block"
        />
        <Image
          src={ASSETS.plantBottom}
          width={500}
          height={500}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-10 rotate-45 left-[14%] hidden h-24 w-auto select-none lg:block"
        />
        <Image
          src={ASSETS.plantRight}
          alt=""
          width={500}
          height={500}
          aria-hidden
          className="pointer-events-none absolute -right-2 bottom-10 hidden h-42 w-auto select-none sm:block"
        />

        <div className="relative mx-auto flex max-w-[1500px] flex-col gap-10 lg:flex-row lg:items-center lg:gap-8">
          {/* ---------- Left: heading ---------- */}
          <div className="relative shrink-0 lg:w-[30%] lg:pl-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold uppercase italic tracking-wider text-[#f26b3a]">
                Explore
              </span>
              <span className="h-px w-10 bg-[#f26b3a]/60" />
            </div>

            {/* Title */}
            <h2
              className={`${serif.className} mt-1 text-6xl leading-none tracking-tight text-[#141414] sm:text-7xl`}
            >
              Collections
            </h2>

            {/* Brush underline */}
            <svg
              viewBox="0 0 260 14"
              className="mt-1 h-3 w-64 text-[#f26b3a]"
              fill="none"
              aria-hidden
            >
              <path
                d="M2 9 C 50 3, 120 4, 258 5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {/* Description */}
            <p
              className={`${mono.className} mt-6 max-w-xs text-[13px] leading-relaxed text-[#3b3b3b]`}
            >
              Different moods. Different stories.
              <br />
              Find what speaks to you.
            </p>

            {/* Crown doodle */}
            <Image
              src={ASSETS.crown}
              width={500}
              height={500}
              alt=""
              aria-hidden
              className="pointer-events-none absolute top-0 right-16 hidden h-12 w-auto select-none lg:block"
            />
          </div>

          {/* ---------- Right: cards ---------- */}
          <ul className="grid flex-1 grid-cols-2 gap-3 lg:grid-cols-4">
            {COLLECTIONS.map((c) => (
              <li key={c.label}>
                <Link
                  href={c.href}
                  className="group relative block h-[20rem] overflow-hidden rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f26b3a]"
                >
                  <Image
                    src={c.img}
                    width={500}
                    height={650}
                    alt={`${c.label} collection`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Tape label */}
                  <span className="absolute bottom-0 left-0 flex h-14 w-[78%] items-center px-4">
                    <Image
                      src={ASSETS.tape}
                      width={500}
                      height={200}
                      alt=""
                      aria-hidden
                      className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill"
                    />
                    <span
                      className={`${mono.className} relative flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#141414]`}
                    >
                      {c.label}
                      <span
                        aria-hidden
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
