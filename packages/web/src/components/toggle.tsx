import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3 min-w-10",
        sm: "h-9 px-2.5 min-w-9",
        lg: "h-11 px-5 min-w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

/** Public contract (§2.1/§3.3a): `cva` above stays shadcn's own `"default"`; `Toggle` exposes `"normal"` instead, translated right before the `cva` call. */
export type ToggleVariant = "normal" | "outline";
export type ToggleSize = "normal" | "sm" | "lg";

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  Omit<React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>, keyof VariantProps<typeof toggleVariants>> & {
    variant?: ToggleVariant;
    size?: ToggleSize;
  }
>(({ className, variant = "normal", size = "normal", ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      toggleVariants({
        variant: variant === "normal" ? "default" : variant,
        size: size === "normal" ? "default" : size,
        className,
      })
    )}
    {...props}
  />
));
Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
