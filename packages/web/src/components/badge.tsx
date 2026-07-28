import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

/**
 * Nemo Badge — the unified Tag/Chip. `color` × `type` cover the full Figma
 * matrix (HUBR Components, node 727:28091): default/success/warning/critical/
 * info/disabled/inverted × filled/outline/ghost/solid. This is the single
 * agnostic Tag proposed to replace the ~15 per-product tag components
 * (SuperDakiTag, StatusTag, DiscountTag, ModalityTag, CounterTag...) —
 * `type="filled"` is the semantic-color "soft" look (tonal bg). `type="solid"`
 * is a real strong bg for every color except `info`: `default`/`inverted`/
 * `disabled` are backed by Figma's aliased Primary/On Primary pair;
 * `success`/`warning`/`critical` use the same "-fixed" pin as `button.tsx`
 * (`destructive-fixed`/`primary-fixed`) — Figma's alias set never promoted
 * an "On <Hue>" role (the real white-on-strong-color foreground) for those,
 * only the "Container" pair `filled` uses, so `-fixed` pins to the light-mode
 * primitive instead of tonal-flipping to a too-pale tone in dark mode. `info`
 * has no such pin (no precedent in `button.tsx` either) and stays == `filled`.
 * `size` and `shape` cover the remaining spec (sm/md, pill/square). `count`
 * covers the numeric-counter use case (counter-tag, picking-amount).
 * Icon and dot inherit the variant's text color via `currentColor`, so they
 * never need their own color mapping.
 */
const badgeVariants = cva(
  "inline-flex items-center whitespace-nowrap border border-transparent font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
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
        solid: "",
      },
      size: {
        md: "gap-1 px-2.5 py-0.5 text-xs",
        sm: "gap-0.5 px-2 py-0.5 text-2xs",
      },
      shape: {
        pill: "rounded-full",
        square: "rounded-md",
      },
    },
    compoundVariants: [
      { color: "default", type: "filled", className: "bg-primary text-primary-foreground" },
      { color: "default", type: "outline", className: "border-accent-border bg-transparent text-accent-foreground" },
      { color: "default", type: "ghost", className: "bg-transparent text-accent-foreground" },
      // "default" has no soft token, so filled is already a strong bg — solid reuses it.
      { color: "default", type: "solid", className: "bg-primary text-primary-foreground" },

      { color: "success", type: "filled", className: "bg-success-soft text-success-soft-foreground" },
      { color: "success", type: "outline", className: "border-success-border bg-transparent text-success-soft-foreground" },
      { color: "success", type: "ghost", className: "bg-transparent text-success-soft-foreground" },
      // Figma never promoted "On Success" (the real white-on-strong-green
      // foreground) to the alias set, so pin to the light-mode primitive
      // instead — same "-fixed" pattern button.tsx already uses for
      // default/destructive. Revisit once Figma adds the real alias.
      { color: "success", type: "solid", className: "bg-success-fixed text-success-fixed-foreground" },

      { color: "warning", type: "filled", className: "bg-warning-soft text-warning-soft-foreground" },
      { color: "warning", type: "outline", className: "border-warning-border bg-transparent text-warning-soft-foreground" },
      { color: "warning", type: "ghost", className: "bg-transparent text-warning-soft-foreground" },
      // Same gap as success — no aliased "On Warning" role. See above.
      { color: "warning", type: "solid", className: "bg-warning-fixed text-warning-fixed-foreground" },

      { color: "critical", type: "filled", className: "bg-destructive-soft text-destructive-soft-foreground" },
      { color: "critical", type: "outline", className: "border-destructive-border bg-transparent text-destructive-soft-foreground" },
      { color: "critical", type: "ghost", className: "bg-transparent text-destructive-soft-foreground" },
      // Same gap as success — reuses the pre-existing destructive-fixed
      // (button.tsx already pins critical this way for the same reason).
      { color: "critical", type: "solid", className: "bg-destructive-fixed text-destructive-fixed-foreground" },

      { color: "info", type: "filled", className: "bg-info text-info-foreground" },
      { color: "info", type: "outline", className: "border-info-border bg-transparent text-info-foreground" },
      { color: "info", type: "ghost", className: "bg-transparent text-info-foreground" },
      // No dedicated "info" strong tone in the preset (its DEFAULT is already
      // the tonal surface) — solid intentionally renders identical to filled.
      { color: "info", type: "solid", className: "bg-info text-info-foreground" },

      { color: "disabled", type: "filled", className: "bg-disabled text-disabled-foreground" },
      { color: "disabled", type: "outline", className: "border-disabled-border bg-transparent text-disabled-foreground" },
      { color: "disabled", type: "ghost", className: "bg-transparent text-disabled-foreground" },
      { color: "disabled", type: "solid", className: "bg-disabled text-disabled-foreground" },

      { color: "inverted", type: "filled", className: "bg-inverted text-inverted-foreground" },
      { color: "inverted", type: "outline", className: "border-inverted bg-transparent text-inverted" },
      { color: "inverted", type: "ghost", className: "bg-transparent text-inverted" },
      { color: "inverted", type: "solid", className: "bg-inverted text-inverted-foreground" },
    ],
    defaultVariants: { color: "default", type: "filled", size: "md", shape: "pill" },
  }
);

/** Caps a numeric badge count the way notification badges conventionally do. */
function formatCount(count: number) {
  return count > 99 ? "99+" : String(count);
}

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof badgeVariants> {
  /** Leading glyph (e.g. a lucide icon). Sized to fit the badge and colored via currentColor. */
  icon?: React.ReactNode;
  /** Status dot before the label, colored via currentColor. */
  dot?: boolean;
  /**
   * Numeric counter (counter-tag / picking-amount). Without `children`, the
   * badge renders as a standalone counter (defaults to `size="sm"`). With
   * `children`, the count appears as a trailing value. Caps at "99+".
   */
  count?: number;
}

function Badge({ className, color, type, size, shape, icon, dot, count, children, ...props }: BadgeProps) {
  const counterOnly = count != null && children == null;
  const effSize = size ?? (counterOnly ? "sm" : "md");

  return (
    <div
      className={cn(
        badgeVariants({ color, type, size: effSize, shape }),
        counterOnly && "min-w-[1.25rem] justify-center px-1",
        className
      )}
      {...props}
    >
      {icon != null && !counterOnly && (
        <span className={cn("shrink-0", effSize === "sm" ? "[&_svg]:size-2.5" : "[&_svg]:size-3")} aria-hidden>
          {icon}
        </span>
      )}
      {dot && !counterOnly && (
        <span className={cn("shrink-0 rounded-full bg-current", effSize === "sm" ? "size-1" : "size-1.5")} aria-hidden />
      )}
      {counterOnly ? formatCount(count) : children}
      {count != null && children != null && <span className="font-bold">{formatCount(count)}</span>}
    </div>
  );
}
Badge.displayName = "Badge";

export { Badge, badgeVariants };
