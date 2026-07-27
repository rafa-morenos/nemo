import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

/**
 * Nemo Badge — pill-shaped tag with an optional leading icon and status dot.
 * `color` × `type` cover the full Figma matrix (HUBR Components, node 727:28091):
 * default/success/warning/critical/info/disabled/inverted × filled/outline/ghost.
 * Icon and dot inherit the variant's text color via `currentColor`, so they
 * never need their own color mapping.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      color: {
        default: "",
        success: "",
        warning: "",
        critical: "",
        info: "",
        disabled: "",
        inverted: "",
      },
      type: {
        filled: "",
        outline: "",
        ghost: "",
      },
    },
    compoundVariants: [
      { color: "default", type: "filled", className: "bg-primary text-primary-foreground" },
      { color: "default", type: "outline", className: "border-accent-border bg-transparent text-accent-foreground" },
      { color: "default", type: "ghost", className: "bg-transparent text-accent-foreground" },

      { color: "success", type: "filled", className: "bg-success-soft text-success-soft-foreground" },
      { color: "success", type: "outline", className: "border-success-border bg-transparent text-success-soft-foreground" },
      { color: "success", type: "ghost", className: "bg-transparent text-success-soft-foreground" },

      { color: "warning", type: "filled", className: "bg-warning-soft text-warning-soft-foreground" },
      { color: "warning", type: "outline", className: "border-warning-border bg-transparent text-warning-soft-foreground" },
      { color: "warning", type: "ghost", className: "bg-transparent text-warning-soft-foreground" },

      { color: "critical", type: "filled", className: "bg-destructive-soft text-destructive-soft-foreground" },
      { color: "critical", type: "outline", className: "border-destructive-border bg-transparent text-destructive-soft-foreground" },
      { color: "critical", type: "ghost", className: "bg-transparent text-destructive-soft-foreground" },

      { color: "info", type: "filled", className: "bg-info text-info-foreground" },
      { color: "info", type: "outline", className: "border-info-border bg-transparent text-info-foreground" },
      { color: "info", type: "ghost", className: "bg-transparent text-info-foreground" },

      { color: "disabled", type: "filled", className: "bg-disabled text-disabled-foreground" },
      { color: "disabled", type: "outline", className: "border-disabled-border bg-transparent text-disabled-foreground" },
      { color: "disabled", type: "ghost", className: "bg-transparent text-disabled-foreground" },

      { color: "inverted", type: "filled", className: "bg-inverted text-inverted-foreground" },
      { color: "inverted", type: "outline", className: "border-inverted bg-transparent text-inverted" },
      { color: "inverted", type: "ghost", className: "bg-transparent text-inverted" },
    ],
    defaultVariants: { color: "default", type: "filled" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Leading glyph (e.g. a lucide icon). Sized to fit the badge and colored via currentColor. */
  icon?: React.ReactNode;
  /** Status dot before the label, colored via currentColor. */
  dot?: boolean;
}

function Badge({ className, color, type, icon, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ color, type }), className)} {...props}>
      {icon != null && (
        <span className="[&_svg]:size-3 [&_svg]:shrink-0" aria-hidden>
          {icon}
        </span>
      )}
      {dot && <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden />}
      {children}
    </div>
  );
}
Badge.displayName = "Badge";

export { Badge, badgeVariants };
