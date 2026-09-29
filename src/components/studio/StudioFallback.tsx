import { cn } from "@/lib/utils";

/** Shown while the 3D scene loads, or when WebGL isn't available. */
export function StudioFallback({ className, message = "Opening the studio…" }: { className?: string; message?: string }) {
  return (
    <div
      className={cn(
        "relative grid h-full w-full place-items-center bg-[radial-gradient(circle_at_60%_35%,rgb(255_190_110/0.35),transparent_45%),linear-gradient(160deg,#3b2c20,#120e0a)]",
        className,
      )}
    >
      <div className="text-center">
        <p className="font-hand text-3xl font-bold uppercase text-paper">{message}</p>
        <div className="mx-auto mt-4 h-[3px] w-40 overflow-hidden bg-paper/20">
          <div className="h-full w-1/2 animate-pulse bg-vermilion" />
        </div>
      </div>
    </div>
  );
}
