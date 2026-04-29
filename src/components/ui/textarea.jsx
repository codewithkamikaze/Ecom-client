import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Textarea Component
 * A multi-line input field styled to match the modern, rounded UI system.
 */
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        // Base structure & Typography
        "flex min-h-[120px] w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-3 text-sm font-medium transition-all",
        // Placeholder & Text Colors
        "placeholder:text-gray-400 text-gray-900 resize-none",
        // Interactive States: Focus & Hover
        "hover:border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        // Disabled State
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
