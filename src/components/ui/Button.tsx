import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "dark" | "light" | "outline" | "red";

const base =
  "label group/btn inline-flex items-center justify-center gap-3 whitespace-nowrap transition-[background-color,color,transform] duration-300 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermilion";

const variants: Record<Variant, string> = {
  dark: "bg-ink text-paper hover:bg-vermilion",
  light: "bg-paper text-ink hover:bg-ink hover:text-paper",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  red: "bg-vermilion text-paper hover:bg-ink",
};

const sizes = { sm: "h-9 px-4", md: "h-11 px-6" } as const;

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="10"
      viewBox="0 0 22 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={cn("transition-transform duration-300 group-hover/btn:translate-x-1", className)}
    >
      <path d="M0 5h20M16 1l4 4-4 4" />
    </svg>
  );
}

interface CommonProps {
  variant?: Variant;
  size?: keyof typeof sizes;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "dark",
  size = "md",
  arrow = false,
  className,
  children,
  ...rest
}: CommonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow && <ArrowIcon />}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "dark",
  size = "md",
  arrow = false,
  className,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
      {arrow && <ArrowIcon />}
    </Link>
  );
}
