import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full bg-paper px-4 font-sans text-sm text-ink placeholder:text-ink/50 focus:outline-2 focus:outline-offset-2 focus:outline-vermilion",
        className,
      )}
      {...props}
    />
  );
}
