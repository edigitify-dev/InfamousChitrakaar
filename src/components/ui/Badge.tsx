import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "new" | "tag" | "red";
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "new", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "label inline-block px-1.5 py-[3px] text-[0.55rem] leading-none tracking-[0.18em]",
        variant === "new" && "bg-ink text-paper",
        variant === "tag" && "border border-ink/70 text-ink",
        variant === "red" && "bg-vermilion text-paper",
        className,
      )}
    >
      {children}
    </span>
  );
}
