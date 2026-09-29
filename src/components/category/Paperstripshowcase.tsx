const PAPER_TEAR = "/images/brown_paper_tear_7.png";
const SCRIBBLE_ARROW = "/images/scribble_arrow.png";
const HEARTS = "/images/hearts.png";
const BUTTERFLY = "/images/pen_scribble_butterfly.png";
const ARROW = "/images/scribble_arrow.png";

type Item = {
  label: string;
  image: string | null;

  /**
   * Size of the product relative to its category cell.
   * Keep roughly between 0.55 and 0.9.
   */
  size?: number;

  /**
   * Small positional adjustments.
   */
  x?: number;
  y?: number;

  arrow?: boolean;
};

const ITEMS: Item[] = [
  {
    label: "Tote Bags",
    image: "/images/category_1.png",
    size: 0.85,
    y: 3,
  },
  {
    label: "T-Shirts",
    image: "/images/category_2.png",
    size: 0.78,
    y: 2,
    arrow: true,
  },
  {
    label: "Art Prints",
    image: "/images/category_3.png",
    size: 0.76,
    y: 1,
  },
  {
    label: "Postcards",
    image: "/images/category_4.png",
    size: 0.72,
    y: 2,
  },
  {
    label: "Notebooks",
    image: "/images/category_5.png",
    size: 0.78,
    y: 0,
  },
  {
    label: "Stickers",
    image: "/images/category_6.png",
    size: 0.72,
    y: 3,
  },
  {
    label: "Playing Cards",
    image: "/images/category_7.png",
    size: 0.72,
    y: 2,
  },
];

const DOODLES = [
  {
    src: BUTTERFLY,
    left: "17%",
    top: "7%",
    width: "2.5%",
    rotate: 15,
    flip: false,
  },
  {
    src: HEARTS,
    left: "57%",
    top: "20%",
    width: "3.5%",
    rotate: 12,
    flip: false,
  },
  {
    src: BUTTERFLY,
    left: "88%",
    top: "2%",
    width: "1.9%",
    rotate: -25,
    flip: true,
  },
  {
    src: ARROW,
    left: "12%",
    top: "80%",
    width: "1.9%",
    rotate: -90,
    flip: true,
  },
];

export default function PaperStripShowcase({
  items = ITEMS,
}: {
  items?: Item[];
}) {
  return (
    <section className="w-full">
      {/* Keyframes used by the hover effects */}
      <style>{`
        @keyframes strip-arrow-wiggle {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25%      { transform: translateX(3px) rotate(8deg); }
          75%      { transform: translateX(-1px) rotate(-6deg); }
        }
        @keyframes strip-label-pop {
          0%   { transform: rotate(-6deg) scale(1); }
          45%  { transform: rotate(-1deg) scale(1.16); }
          100% { transform: rotate(-3deg) scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .strip-anim { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div
        className="
          relative
          w-full
          overflow-hidden
        "
        style={{
          aspectRatio: "1002 / 250",
          backgroundImage: `url(${PAPER_TEAR})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* =====================================================
            DOODLES
            Lowest visual layer
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 z-0">
          {DOODLES.map((d, index) => (
            <img
              key={index}
              src={d.src}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute select-none opacity-80"
              style={{
                left: d.left,
                top: d.top,
                width: d.width,
                transform: `
                  rotate(${d.rotate}deg)
                  scaleX(${d.flip ? -1 : 1})
                `,
              }}
            />
          ))}
        </div>

        {/* =====================================================
            CATEGORY GRID

            Every category owns its own small coordinate system.
            The grid is a named group ("grid") so hovering any
            category can gently push the others back.
        ===================================================== */}

        <div
          className="
            group/grid
            absolute
            inset-0
            z-10
            grid
            grid-cols-7
          "
        >
          {items.map((item, index) => {
            const size = item.size ?? 0.75;

            // Alternate the tilt direction so neighbours never lean the same way
            const hoverTilt = index % 2 === 0 ? -5 : 5;

            return (
              <div
                key={item.label}
                className="
                  strip-anim
                  group/cell
                  relative
                  h-full
                  min-w-0
                  cursor-pointer
                  transition-[opacity,filter]
                  duration-500
                  ease-out
                  group-hover/grid:[&:not(:hover)]:opacity-55
                  group-hover/grid:[&:not(:hover)]:saturate-50
                "
              >
                {/* =============================================
                    PRODUCT
                    Controlled middle zone
                ============================================= */}

                {item.image && (
                  <div
                    className="
                      absolute
                      left-1/2
                      -top-6
                      flex
                      h-[100%]
                      w-[100%]
                      -translate-x-1/2
                      items-center
                      justify-center
                    "
                  >
                    {/* Hover wrapper: lifts, tilts and pops the product
                        like a sticker peeling off the paper. Kept separate
                        from the <img> so the size/x/y transform stays intact. */}
                    <div
                      className="
                        strip-anim
                        h-full
                        w-full
                        origin-bottom
                        transition-transform
                        duration-500
                        ease-[cubic-bezier(0.34,1.56,0.64,1)]
                        will-change-transform
                        group-hover/cell:[transform:translateY(-5%)_rotate(var(--tilt))_scale(1.1)]
                      "
                      style={
                        { "--tilt": `${hoverTilt}deg` } as React.CSSProperties
                      }
                    >
                      <img
                        src={item.image}
                        alt={item.label}
                        draggable={false}
                        className="
                          block
                          h-full
                          w-full
                          select-none
                          object-contain
                          drop-shadow-[0_3px_4px_rgba(0,0,0,0.18)]
                          transition-[filter]
                          duration-500
                          group-hover/cell:drop-shadow-[0_12px_10px_rgba(0,0,0,0.28)]
                        "
                        style={{
                          transform: `
                            translate(
                              ${item.x ?? 0}%,
                              ${item.y ?? 0}%
                            )
                            scale(${size})
                          `,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* =============================================
                    LABEL
                    Completely independent from product.
                    On hover the red underline "fills" like a
                    highlighter swipe, the text flips to cream,
                    and the label pops up with a little bounce.
                ============================================= */}

                <div
                  className="
                    strip-anim
                    absolute
                    bottom-[20%]
                    left-1/2
                    z-30
                    flex
                    -translate-x-1/2
                    items-center
                    justify-center
                    gap-[0.25vw]
                    whitespace-nowrap
                    transition-transform
                    duration-500
                    ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    group-hover/cell:-translate-y-[35%]
                  "
                >
                  <span
                    className="
                      strip-anim
                      bg-[length:100%_1.5px]
                      bg-left-bottom
                      bg-no-repeat
                      px-[0.25em]
                      pb-[1px]
                      text-[clamp(7px,1.2vw,15px)]
                      -rotate-6
                      font-bold
                      uppercase
                      italic
                      leading-none
                      tracking-wide
                      text-[#1c1a17]
                      transition-[background-size,color]
                      duration-[450ms]
                      ease-out
                      group-hover/cell:bg-[length:100%_100%]
                      group-hover/cell:text-[#fbf3e6]
                      group-hover/cell:[animation:strip-label-pop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_forwards]
                    "
                    style={{
                      fontFamily: "'Kalam', cursive",
                      backgroundImage: "linear-gradient(#C84B2D, #C84B2D)",
                    }}
                  >
                    {item.label}
                  </span>

                  {item.arrow && (
                    <img
                      src={SCRIBBLE_ARROW}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      className="
                        strip-anim
                        h-auto
                        w-[clamp(8px,1vw,15px)]
                        shrink-0
                        group-hover/cell:[animation:strip-arrow-wiggle_0.7s_ease-in-out_infinite]
                      "
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
