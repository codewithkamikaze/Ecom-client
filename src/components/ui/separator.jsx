import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

/**
 * Separator Component
 * A visual divider to separate content sections vertically or horizontally.
 */
const Separator = React.forwardRef(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-gray-100",
        orientation === "horizontal"
          ? "h-[1px] w-full my-4"
          : "h-full w-[1px] mx-4",
        className,
      )}
      {...props}
    />
  ),
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
