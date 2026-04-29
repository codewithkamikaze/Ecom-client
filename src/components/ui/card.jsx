import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Card Component
 * The main container with smooth shadows and rounded corners.
 */
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[2rem] border border-gray-100 bg-white text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-300",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

/**
 * CardHeader Component
 * Container for titles and descriptions with improved padding.
 */
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-8", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * CardTitle Component
 * Bold, high-contrast typography for headers.
 */
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-black leading-tight tracking-tight text-gray-900",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * CardDescription Component
 */
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-medium text-gray-500", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * CardContent Component
 * Main body of the card.
 */
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-8 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * CardFooter Component
 * Bottom section for actions like buttons.
 */
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-8 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
