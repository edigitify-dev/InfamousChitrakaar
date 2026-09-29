import { cn } from "@/lib/utils";
import { ArtImage, FALLBACKS } from "./ArtImage";
import { TapeLabel } from "./TapeLabel";

interface PolaroidProps {
  src?: string;
  alt: string;
  caption?: string;
  rotate?: number;
  tape?: boolean;
  grayscale?: boolean;
  fallback?: string;
  placeholder?: React.ReactNode;
  className?: string;
}

/** Photo in a white polaroid frame, slightly rotated, optionally taped. */
export function Polaroid({
  src,
  alt,
  caption,
  rotate = 0,
  tape = true,
  grayscale = false,
  fallback = FALLBACKS.photo,
  placeholder,
  className,
}: PolaroidProps) {
  return (
    <figure
      className={cn("relative bg-[#faf6ec] p-[6px] pb-[24px] shadow-[0_8px_18px_rgba(0,0,0,0.38)]", className)}
      style={{ rotate: `${rotate}deg` }}
    >
      {tape && <TapeLabel className="-top-3 left-1/2 h-5 w-14 -translate-x-1/2" rotate={-4} />}
      <ArtImage
        src={src}
        alt={alt}
        fallback={fallback}
        placeholder={placeholder}
        className={cn("aspect-[4/5] w-full", grayscale && "grayscale")}
      />
      {caption && (
        <figcaption className="absolute inset-x-2 bottom-1 text-center font-hand text-[13px] leading-none text-ink/80">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
