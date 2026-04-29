import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * badgeVariants Configuration
 * Defines the styling logic for different badge types using Tailwind CSS.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        // The default dark/primary look
        default:
          "border-transparent bg-gray-900 text-white shadow-sm hover:bg-gray-800",

        // Soft blue variant (Great for general info or "Pending" states)
        secondary:
          "border-transparent bg-blue-50 text-blue-700 hover:bg-blue-100",

        // Red variant (Used for "Rejected" or "Out of Stock")
        destructive:
          "border-transparent bg-red-100 text-red-700 hover:bg-red-200",

        // Green variant (Perfect for "Confirmed" or "Delivered")
        success:
          "border-transparent bg-green-100 text-green-700 hover:bg-green-200",

        // Amber variant (Ideal for "Low Stock" warnings)
        warning:
          "border-transparent bg-amber-100 text-amber-700 hover:bg-amber-200",

        // Classic outline for a minimal look
        outline:
          "text-gray-600 border-gray-200 bg-transparent hover:bg-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Badge Component
 * A small UI element for status indicators, categories, or labels.
 */
function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
