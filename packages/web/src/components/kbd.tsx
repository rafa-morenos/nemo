import * as React from "react";

import { cn } from "../lib/utils";

/**
 * Nemo Kbd — follows the shadcn/ui Kbd API (Kbd, KbdGroup). Renders a <kbd>
 * keyboard-key badge and an inline group wrapper. Token-driven, Nemo variables.
 */
const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-muted px-1 text-xs font-medium text-muted-foreground",
        "[&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
);
Kbd.displayName = "Kbd";

const KbdGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
);
KbdGroup.displayName = "KbdGroup";

export { Kbd, KbdGroup };
