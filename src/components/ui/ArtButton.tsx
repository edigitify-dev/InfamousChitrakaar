import type { ButtonHTMLAttributes, CSSProperties } from "react";

interface ArtButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  text: string;

  mobileWidth?: CSSProperties["width"];
  desktopWidth?: CSSProperties["width"];

  mobileHeight?: CSSProperties["height"];
  desktopHeight?: CSSProperties["height"];

  textClassName?: string;
}

export function ArtButton({
  text,

  mobileWidth = "200px",
  desktopWidth = "280px",

  mobileHeight = "55px",
  desktopHeight = "70px",

  textClassName = "",
  className = "",

  ...props
}: ArtButtonProps) {
  const style = {
    "--mobile-width": mobileWidth,
    "--desktop-width": desktopWidth,
    "--mobile-height": mobileHeight,
    "--desktop-height": desktopHeight,
  } as CSSProperties;

  return (
    <button
      {...props}
      type={props.type ?? "button"}
      style={style}
      className={`art-button ${className}`}
    >
      {/* Background artwork */}
      <img
        src="/images/button_bg.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain"
      />

      {/* Text */}
      <span
        className={`relative z-10 flex h-full w-full items-center justify-center ${textClassName}`}
      >
        {text}
      </span>
    </button>
  );
}
