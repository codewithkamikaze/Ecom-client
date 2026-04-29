import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md",

        "bg-gray-300 dark:bg-gray-700",

        "before:absolute before:inset-0",
        "before:bg-gradient-to-r",
        "before:from-transparent",
        "before:via-white/30 dark:before:via-white/10",
        "before:to-transparent",
        "before:translate-x-[-100%]",
        "before:animate-shimmer",

        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
