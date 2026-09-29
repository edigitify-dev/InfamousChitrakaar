import { cn } from "@/lib/utils";

interface TapeLabelProps {
  rotate?: number;
  className?: string;
  children?: React.ReactNode;
}

/** A strip of translucent scotch tape with zig-zag cut ends. Position it with `className`. */
export function TapeLabel({ rotate = -3, className, children }: TapeLabelProps) {
  return (
    <span
      aria-hidden={children ? undefined : true}
      className={cn(
        "absolute z-20 block h-6 w-20 bg-[rgb(228_212_168/0.8)] text-center font-hand text-[13px] leading-6 text-ink/70 shadow-[0_1px_2px_rgba(0,0,0,0.18)]",
        className,
      )}
      style={{
        rotate: `${rotate}deg`,
        clipPath:
          "polygon(0 0,100% 0,97% 25%,100% 50%,97% 75%,100% 100%,0 100%,3% 75%,0 50%,3% 25%)",
      }}
    >
      {children}
    </span>
  );
}
