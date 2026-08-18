import * as React from "react";
import { cn } from "../lib/utils";

/**
 * a11y: uses `border-input-strong` (Border/Neutral/Hover), not the default
 * `border-input` (Border/Neutral/Main) — Main measures ~1.23:1 (light) /
 * ~2.66:1 (dark) against the background, below WCAG 1.4.11's 3:1 minimum for
 * UI component boundaries. Strong measures 4.27:1 / 7.45:1.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input-strong bg-background px-3 py-2 text-sm text-foreground",
        "placeholder:text-muted-foreground ring-offset-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
