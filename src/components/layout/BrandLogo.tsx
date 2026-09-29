import Link from "next/link";
import { cn } from "@/lib/utils";
import { Crown } from "@/components/ui/Doodles";

interface BrandLogoProps {
  className?: string;
  /** larger stacked lockup used in the footer */
  size?: "sm" | "lg";
}

/** Brush-lettered stacked wordmark. */
export function BrandLogo({ className, size = "sm" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="The Infamous Chitrakar — home"
      className={cn(
        "relative inline-block font-edo uppercase leading-[1] text-ink -rotate-6",
        className,
      )}
    >
      <span
        className={cn(
          "block -rotate-2",
          size === "sm" ? "text-[13px]" : "text-[22px]",
        )}
      >
        The
      </span>
      <span
        className={cn(
          "block -rotate-2",
          size === "sm" ? "text-[17px]" : "text-[30px]",
        )}
      >
        Infamous
      </span>
      <span
        className={cn(
          "block -rotate-2",
          size === "sm" ? "text-[22px]" : "text-[30px]",
        )}
      >
        Chitrakar
      </span>
    </Link>
  );
}
