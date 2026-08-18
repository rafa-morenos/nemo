import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Nemo Input — shadcn/ui structure, Nemo tokens.
 * border-input, bg-background, ring-ring, radius-md all resolve to Nemo vars.
 *
 * a11y: uses `border-input-strong` (Border/Neutral/Hover), not the default
 * `border-input` (Border/Neutral/Main) — Main measures ~1.23:1 (light) /
 * ~2.66:1 (dark) against the background, below WCAG 1.4.11's 3:1 minimum for
 * UI component boundaries. Strong measures 4.27:1 / 7.45:1.
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-input-strong bg-background px-3 py-2 text-sm text-foreground",
        "placeholder:text-muted-foreground",
        "ring-offset-background transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
