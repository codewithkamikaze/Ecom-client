import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Input Component
 * A highly reusable input field with custom styling for focus, hover, and disabled states.
 */
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        // Base structure & Typography
        "flex h-12 w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-2 text-sm font-medium transition-all",
        // Spacing & File Input styling
        "file:border-0 file:bg-transparent file:text-sm file:font-bold file:text-blue-600",
        // Placeholder & Colors
        "placeholder:text-gray-400 text-gray-900",
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

Input.displayName = "Input";

export { Input };
