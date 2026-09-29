import { cn } from "@/lib/utils";

interface PaperTextureProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "cream" | "dark";
}

/** Cream (or charcoal) paper surface with generated grain — no texture files needed. */
export function PaperTexture({ tone = "cream", className, children, ...rest }: PaperTextureProps) {
  return (
    <div className={cn(tone === "cream" ? "paper" : "paper-dark", className)} {...rest}>
      {children}
    </div>
  );
}
