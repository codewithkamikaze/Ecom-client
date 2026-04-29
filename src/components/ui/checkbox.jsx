import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Checkbox Component
 * A stylized checkbox built on Radix UI for accessible and interactive selection.
 */
const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Base styles: size, rounded corners, and border
      "peer h-5 w-5 shrink-0 rounded-md border-2 border-gray-200 ring-offset-background transition-all",
      // Focus & Interactive states
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      // Disabled & Checked states
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "flex items-center justify-center text-current animate-in zoom-in-75 duration-200",
      )}
    >
      <Check className="h-3.5 w-3.5 stroke-[3px]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
