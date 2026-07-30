import * as React from "react";
import { Minus, Package, Plus } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * ProductCard — compound, slot-based product card family. Every piece is pure layout
 * with no business meaning; compose whatever content you need inside each slot.
 * `ProductCardWithBadges` is a convenience wrapper for the common case — see its own
 * doc comment below.
 */

const ProductCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="product-card"
      className={cn("flex w-full flex-col overflow-clip rounded-lg shadow-sm", className)}
      {...props}
    />
  )
);
ProductCard.displayName = "ProductCard";

/** Padded content region — used for the main body and, after a `ProductCardSeparator`, for secondary sections like a stepper. */
const ProductCardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="product-card-body"
      className={cn("flex w-full flex-col items-center gap-4 bg-background p-2", className)}
      {...props}
    />
  )
);
ProductCardBody.displayName = "ProductCardBody";

/** Media slot (defaults to a 160×160 box). Falls back to a placeholder icon when empty. */
const ProductCardMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="product-card-media"
      className={cn(
        "flex size-[160px] shrink-0 items-center justify-center overflow-clip rounded-md",
        !children && "bg-secondary text-muted-foreground",
        className
      )}
      {...props}
    >
      {children ?? <Package className="size-8" />}
    </div>
  )
);
ProductCardMedia.displayName = "ProductCardMedia";

const ProductCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="product-card-title"
      className={cn("w-full text-center text-lg font-semibold leading-7 text-foreground", className)}
      {...props}
    />
  )
);
ProductCardTitle.displayName = "ProductCardTitle";

export interface ProductCardTagsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Figma: variant "Badge horizontal" (`row`, wraps) vs "Badge vertical" (`column`,
   * stacked) — purely a layout choice, same tags either way.
   */
  layout?: "row" | "column";
}

/** Row (or column) of arbitrary pills/badges — reusable above or below the media. */
const ProductCardTags = React.forwardRef<HTMLDivElement, ProductCardTagsProps>(
  ({ className, layout = "row", ...props }, ref) => (
    <div
      ref={ref}
      data-slot="product-card-tags"
      className={cn(
        "flex w-full items-center justify-center gap-2",
        layout === "row" ? "flex-wrap" : "flex-col",
        className
      )}
      {...props}
    />
  )
);
ProductCardTags.displayName = "ProductCardTags";

export interface ProductCardPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Leading glyph, same slot convention as `Badge`'s `icon`. */
  icon?: React.ReactNode;
  /** Status dot before the label, same convention as `Badge`'s `dot`. */
  dot?: boolean;
}

/**
 * Neutral gray pill (`bg-secondary`/`text-foreground`) — same look `KanbanCard`'s local
 * `Pill` uses. Kept scoped to the ProductCard family rather than promoted to `Badge`,
 * since `Badge` `color="default"` is intentionally the brand-strong fill, not a neutral
 * chip. `icon`/`dot` mirror `Badge`'s own props/rendering so a neutral pill can still
 * show the icon-dot-label anatomy Figma's tags use.
 */
const ProductCardPill = React.forwardRef<HTMLSpanElement, ProductCardPillProps>(
  ({ className, icon, dot, children, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="product-card-pill"
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-sm font-semibold text-foreground",
        className
      )}
      {...props}
    >
      {icon != null && (
        <span className="shrink-0 [&_svg]:size-3" aria-hidden>
          {icon}
        </span>
      )}
      {dot && <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  )
);
ProductCardPill.displayName = "ProductCardPill";

/** Divider-flanked pill — e.g. a location/slot badge. Content is whatever the caller passes as children. */
const ProductCardLocation = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="product-card-location"
      className={cn("flex w-full items-center justify-center gap-2", className)}
      {...props}
    >
      <div className="h-px flex-1 rounded bg-border" />
      <ProductCardPill>{children}</ProductCardPill>
      <div className="h-px flex-1 rounded bg-border" />
    </div>
  )
);
ProductCardLocation.displayName = "ProductCardLocation";

export interface ProductCardTextProps extends React.HTMLAttributes<HTMLDivElement> {
  primary: React.ReactNode;
  secondary?: React.ReactNode;
}

/**
 * Generic two-line, centered, muted text block ("Content"/"text-secondary" in Figma) —
 * no business meaning baked in. Replaces the old `ProductCardCode` (which hardcoded a
 * "Cód. `<value><highlight>`" format specific to HUBR's scanning flow): callers that still
 * need that exact look pass it as `primary`, e.g.
 * `primary={<>Cód. <b>404040404040</b><span className="text-primary-strong">0404</span></>}`.
 */
const ProductCardText = React.forwardRef<HTMLDivElement, ProductCardTextProps>(
  ({ className, primary, secondary, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="product-card-text"
      className={cn("flex w-full flex-col items-center gap-1 text-muted-foreground", className)}
      {...props}
    >
      <p className="w-full text-center text-md leading-6">{primary}</p>
      {secondary && <p className="w-full text-center text-xs leading-4">{secondary}</p>}
    </div>
  )
);
ProductCardText.displayName = "ProductCardText";

const ProductCardSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="product-card-separator"
      className={cn("h-px w-full shrink-0 rounded bg-border", className)}
      {...props}
    />
  )
);
ProductCardSeparator.displayName = "ProductCardSeparator";

/** Colored-band footer (`bg-secondary`) with a white pill wrapping whatever content is passed. */
const ProductCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="product-card-footer"
      className={cn("flex w-full items-center justify-center bg-secondary p-2", className)}
      {...props}
    >
      <span className="inline-flex items-center justify-center rounded-full bg-background px-2 py-1 text-md font-semibold text-foreground">
        {children}
      </span>
    </div>
  )
);
ProductCardFooter.displayName = "ProductCardFooter";

export interface ProductCardStepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number;
  onDecrease?: () => void;
  onIncrease?: () => void;
  label?: React.ReactNode;
}

/** Generic labeled +/- stepper — no assumption about what's being counted. */
const ProductCardStepper = React.forwardRef<HTMLDivElement, ProductCardStepperProps>(
  ({ className, value, onDecrease, onIncrease, label, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="product-card-stepper"
      className={cn("flex w-full flex-col items-center gap-2", className)}
      {...props}
    >
      {label && <p className="w-full text-center text-lg font-semibold leading-7 text-foreground">{label}</p>}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDecrease}
          aria-label="Diminuir quantidade"
          className="flex size-12 shrink-0 items-center justify-center rounded-md text-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Minus className="size-6" />
        </button>
        <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-border bg-background px-4">
          <p className="text-center text-lg text-foreground">{value}</p>
        </div>
        <button
          type="button"
          onClick={onIncrease}
          aria-label="Aumentar quantidade"
          className="flex size-12 shrink-0 items-center justify-center rounded-md text-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Plus className="size-6" />
        </button>
      </div>
    </div>
  )
);
ProductCardStepper.displayName = "ProductCardStepper";

export interface ProductCardWithBadgesProps {
  /** Figma: variant "Badge horizontal" | "Badge vertical" — layout of `topBadges` only. */
  variant?: "horizontal" | "vertical";
  /** Figma: `bagdeSuperior` — tags above the media. Omit to hide. */
  topBadges?: React.ReactNode;
  /** Figma: `ProductPicture`'s `imageBadge` — small pill above the media. Omit to hide. */
  imageBadge?: React.ReactNode;
  /** Passed straight to `ProductCardMedia`; omit for the default placeholder icon. */
  media?: React.ReactNode;
  title: React.ReactNode;
  /** Figma: "location" divider-pill row. Omit to hide. */
  location?: React.ReactNode;
  /** Figma: "scan"/`content` text block — typically a `ProductCardText`. Omit to hide. */
  content?: React.ReactNode;
  /** Figma: `badgeInferior` — tags below the content, non-wrapping. Omit to hide. */
  bottomBadges?: React.ReactNode;
  /** Figma: `status` — footer band. Omit to hide. */
  footer?: React.ReactNode;
  className?: string;
}

/** Convenience wrapper composing the primitives above — each prop is a section, present/omitted = shown/hidden. */
const ProductCardWithBadges = React.forwardRef<HTMLDivElement, ProductCardWithBadgesProps>(
  (
    { variant = "horizontal", topBadges, imageBadge, media, title, location, content, bottomBadges, footer, className },
    ref
  ) => (
    <ProductCard ref={ref} className={className}>
      <ProductCardBody>
        {topBadges && <ProductCardTags layout={variant === "horizontal" ? "row" : "column"}>{topBadges}</ProductCardTags>}
        {imageBadge}
        <ProductCardMedia>{media}</ProductCardMedia>
        <ProductCardTitle>{title}</ProductCardTitle>
        {location && <ProductCardLocation>{location}</ProductCardLocation>}
        {content}
        {bottomBadges && <ProductCardTags className="flex-nowrap gap-1">{bottomBadges}</ProductCardTags>}
      </ProductCardBody>
      {footer && <ProductCardFooter>{footer}</ProductCardFooter>}
    </ProductCard>
  )
);
ProductCardWithBadges.displayName = "ProductCardWithBadges";

export {
  ProductCard,
  ProductCardBody,
  ProductCardMedia,
  ProductCardTitle,
  ProductCardTags,
  ProductCardPill,
  ProductCardLocation,
  ProductCardText,
  ProductCardSeparator,
  ProductCardFooter,
  ProductCardStepper,
  ProductCardWithBadges,
};
