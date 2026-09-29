import { cn } from "@/lib/utils";

interface AccentHeadingProps {
  text: string;
  /** colour the last word vermilion, like "Exhibition." / "Frames." / "Card." */
  accent?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

/** Serif section heading; optionally sets the final word in brand red. */
export function AccentHeading({ text, accent = true, as: Tag = "h2", className }: AccentHeadingProps) {
  const cut = text.lastIndexOf(" ");
  const head = accent && cut > 0 ? text.slice(0, cut) : text;
  const tail = accent && cut > 0 ? text.slice(cut + 1) : "";

  return (
    <Tag className={cn("font-display text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.98] tracking-tight", className)}>
      {head}
      {tail && (
        <>
          {" "}
          <em className="text-vermilion">{tail}</em>
        </>
      )}
    </Tag>
  );
}
