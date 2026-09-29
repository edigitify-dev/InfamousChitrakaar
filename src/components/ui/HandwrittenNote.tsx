import { cn } from "@/lib/utils";
import { TapeLabel } from "./TapeLabel";

interface HandwrittenNoteProps {
  variant?: "sticky" | "plain";
  rotate?: number;
  tape?: boolean;
  className?: string;
  children: React.ReactNode;
}

/** Angled marker-pen text. `sticky` is a yellow note, `plain` is loose writing. */
export function HandwrittenNote({
  variant = "sticky",
  rotate = -3,
  tape = false,
  className,
  children,
}: HandwrittenNoteProps) {
  return (
    <div
      className={cn(
        "font-hand font-bold uppercase leading-[1.05] tracking-wide text-ink",
        variant === "sticky" &&
          "relative bg-sticky px-3.5 py-3 text-[15px] shadow-[0_6px_14px_rgba(0,0,0,0.35)]",
        variant === "plain" && "text-[clamp(1rem,1.5vw,1.35rem)]",
        className,
      )}
      style={{ rotate: `${rotate}deg` }}
    >
      {tape && <TapeLabel className="-top-3 left-1/2 -translate-x-1/2" rotate={2} />}
      {children}
    </div>
  );
}
