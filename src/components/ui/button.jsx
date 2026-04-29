import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * buttonVariants Configuration
 * Using CVA to manage different states, sizes, and styles of buttons.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        // Modern Blue Primary Button
        default:
          "bg-blue-600 text-white shadow-md shadow-blue-100 hover:bg-blue-700",

        // Red Destructive Button for critical actions
        destructive:
          "bg-red-500 text-white shadow-md shadow-red-100 hover:bg-red-600",

        // Clean Outline Button
        outline:
          "border-2 border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200 text-gray-700",

        // Light Blue Secondary Button
        secondary: "bg-blue-50 text-blue-700 hover:bg-blue-100",

        // Ghost variant for subtle actions
        ghost: "hover:bg-gray-100 text-gray-600 hover:text-gray-900",

        // Navigation link style
        link: "text-blue-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-14 rounded-3xl px-10 text-lg",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Button Component
 * Supports standard button features plus the "asChild" prop for Radix UI integration.
 */
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
