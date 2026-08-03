import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

/**
 * Nemo Badge — the unified Tag/Chip. `color` × `variant` cover the full Figma
 * matrix (HUBR Components, node 727:28091): default/success/warning/critical/
 * info/disabled/inverted × filled/outline/ghost/solid. This is the single
 * agnostic Tag proposed to replace the ~15 per-product tag components
 * (SuperDakiTag, StatusTag, DiscountTag, ModalityTag, CounterTag...) —
 * `variant="filled"` is the semantic-color "soft" look (tonal bg). `variant="solid"`
 * is a real strong bg for every color except `info`: `default`/`inverted`/
 * `disabled` are backed by Figma's aliased Primary/On Primary pair;
 * `success`/`warning`/`critical` pair the icon-tone bg (`bg-success` etc,
 * same as `button.tsx`'s `destructive`) with `text-neutral-inverted` as the
 * foreground — Figma never promoted an "On <Hue>" role for these, but
 * `text-neutral-inverted` tonal-flips in the matching direction (near-white
 * in light mode, near-black in dark mode) as the icon tone does, so contrast
 * holds in both themes with only real aliases, no pinned primitive needed.
 * `info` has no strong tone to pair it with and stays == `filled`.
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
      variant: {
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
      { color: "default", variant: "filled", className: "bg-primary text-primary-foreground" },
      { color: "default", variant: "outline", className: "border-accent-border bg-transparent text-accent-foreground" },
      { color: "default", variant: "ghost", className: "bg-transparent text-accent-foreground" },
      // "default" has no soft token, so filled is already a strong bg — solid reuses it.
      { color: "default", variant: "solid", className: "bg-primary text-primary-foreground" },

      { color: "success", variant: "filled", className: "bg-success-soft text-success-soft-foreground" },
      { color: "success", variant: "outline", className: "border-success-border bg-transparent text-success-soft-foreground" },
      { color: "success", variant: "ghost", className: "bg-transparent text-success-soft-foreground" },
      // No aliased "On Success" role, so pair the icon-tone bg with
      // text-neutral-inverted (see top-of-file comment) instead of pinning.
      { color: "success", variant: "solid", className: "bg-success text-success-foreground" },

      { color: "warning", variant: "filled", className: "bg-warning-soft text-warning-soft-foreground" },
      { color: "warning", variant: "outline", className: "border-warning-border bg-transparent text-warning-soft-foreground" },
      { color: "warning", variant: "ghost", className: "bg-transparent text-warning-soft-foreground" },
      // Same story as success — see above.
      { color: "warning", variant: "solid", className: "bg-warning text-warning-foreground" },

      { color: "critical", variant: "filled", className: "bg-destructive-soft text-destructive-soft-foreground" },
      { color: "critical", variant: "outline", className: "border-destructive-border bg-transparent text-destructive-soft-foreground" },
      { color: "critical", variant: "ghost", className: "bg-transparent text-destructive-soft-foreground" },
      // Same story as success — see above (button.tsx's destructive variant
      // already uses this exact pairing).
      { color: "critical", variant: "solid", className: "bg-destructive text-destructive-foreground" },

      { color: "info", variant: "filled", className: "bg-info text-info-foreground" },
      { color: "info", variant: "outline", className: "border-info-border bg-transparent text-info-foreground" },
      { color: "info", variant: "ghost", className: "bg-transparent text-info-foreground" },
      // No dedicated "info" strong tone in the preset (its DEFAULT is already
      // the tonal surface) — solid intentionally renders identical to filled.
      { color: "info", variant: "solid", className: "bg-info text-info-foreground" },

      { color: "disabled", variant: "filled", className: "bg-disabled text-disabled-foreground" },
      { color: "disabled", variant: "outline", className: "border-disabled-border bg-transparent text-disabled-foreground" },
      { color: "disabled", variant: "ghost", className: "bg-transparent text-disabled-foreground" },
      { color: "disabled", variant: "solid", className: "bg-disabled text-disabled-foreground" },

      { color: "inverted", variant: "filled", className: "bg-inverted text-inverted-foreground" },
      { color: "inverted", variant: "outline", className: "border-inverted bg-transparent text-inverted" },
      { color: "inverted", variant: "ghost", className: "bg-transparent text-inverted" },
      { color: "inverted", variant: "solid", className: "bg-inverted text-inverted-foreground" },
    ],
    defaultVariants: { color: "default", variant: "filled", size: "md", shape: "pill" },
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

function Badge({ className, color, variant, size, shape, icon, dot, count, children, ...props }: BadgeProps) {
  const counterOnly = count != null && children == null;
  const effSize = size ?? (counterOnly ? "sm" : "md");

  return (
    <div
      className={cn(
        badgeVariants({ color, variant, size: effSize, shape }),
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
