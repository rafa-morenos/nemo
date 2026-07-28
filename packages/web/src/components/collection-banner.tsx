import * as React from "react";

import { cn } from "../lib/utils";

/**
 * Interpretation — not a canonical shadcn component.
 *
 * Matches the Figma "CollectionBanner" component (Daki App · Components,
 * node 41674:10448): a brand tile — circular logo + name, and up to 4
 * product thumbnails in a 2×2 grid. Used in horizontal "shop by brand"
 * collection rows.
 */
export interface CollectionProduct {
  image: string;
  alt?: string;
  /** Some product renders (e.g. cans/bottles) read better with "contain" than the default "cover". */
  fit?: "cover" | "contain";
}

export interface CollectionBannerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  brandName: string;
  /** Circular brand logo shown next to the name. Omit for a text-only header. */
  brandLogo?: string;
  /** Up to 4 product thumbnails, shown in a 2×2 grid. */
  products: CollectionProduct[];
}

const CollectionBanner = React.forwardRef<HTMLDivElement, CollectionBannerProps>(
  ({ className, brandName, brandLogo, products, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-[164px] shrink-0 flex-col gap-2 rounded-2xl border border-border bg-background p-2",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-1">
          {brandLogo != null && (
            <span className="size-6 shrink-0 overflow-hidden rounded-full border border-border">
              <img src={brandLogo} alt="" className="size-full object-cover" />
            </span>
          )}
          <span className="min-w-0 flex-1 truncate text-xs font-bold text-foreground">
            {brandName}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {products.slice(0, 4).map((product, i) => (
            <div
              key={i}
              // bg-card (alias surface/neutral/tertiary): darkens in dark
              // mode like the rest of the UI. Product photography uses
              // mix-blend-darken to sit cleanly on the tile, which reads
              // darker/lower-contrast here in dark mode as a tradeoff for
              // staying on real alias tokens (no fixed/primitive backdrop).
              className="flex size-16 items-center justify-center rounded-lg bg-card p-1"
            >
              <img
                src={product.image}
                alt={product.alt ?? ""}
                className={cn(
                  "size-full mix-blend-darken",
                  product.fit === "contain" ? "object-contain" : "object-cover"
                )}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);
CollectionBanner.displayName = "CollectionBanner";

export { CollectionBanner };
