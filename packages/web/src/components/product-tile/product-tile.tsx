import * as React from "react";
import { Heart, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { AddToCartButton } from "../add-to-cart";

/**
 * ProductTile — the Figma "Product Tile" component set (node 38835:30351):
 * a shelf/grid card (`layout="vertical"`) and a list row (`layout="horizontal"`),
 * each with an `unavailable` (out-of-stock) state, plus a read-only
 * `type="orderDetail"` row used in order history/refund screens. Reuses
 * `AddToCartButton` for the cart stepper — same component, same behavior.
 */

function FavoriteChip({
  active,
  onToggle,
}: {
  active?: boolean;
  onToggle?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={!!active}
      aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className="absolute right-1 top-1 flex size-7 items-center justify-center rounded-md bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Heart className="size-3.5" fill={active ? "currentColor" : "none"} />
    </button>
  );
}

function RemoveButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Remover da lista"
      className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <X className="size-3.5" />
    </button>
  );
}

/** The "Volto logo" (back soon) tag pinned over an unavailable product's image. */
function BackSoonTag() {
  return (
    <span className="absolute bottom-1 right-1 rounded-full bg-background px-2 py-1 text-2xs font-medium text-destructive-soft-foreground">
      Volto logo
    </span>
  );
}

function RefundBadge({ count, unit = "un." }: { count: number; unit?: string }) {
  return (
    <span className="absolute -top-2 right-2 z-[1] whitespace-nowrap rounded-full bg-card px-2 py-1 text-2xs font-medium text-muted-foreground">
      Reembolso • {count} {unit}
    </span>
  );
}

function ProductImage({
  image,
  imageAlt,
  unavailable,
  className,
  children,
}: {
  image: string;
  imageAlt?: string;
  unavailable?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative shrink-0 overflow-hidden bg-secondary", className)}>
      <img
        src={image}
        alt={imageAlt ?? ""}
        className={cn(
          "absolute inset-0 size-full",
          unavailable ? "object-cover opacity-50" : "object-contain"
        )}
      />
      {unavailable && <BackSoonTag />}
      {children}
    </div>
  );
}

function Price({
  originalPrice,
  price,
  priceMultiplier,
}: {
  originalPrice?: string;
  price: string;
  priceMultiplier?: string;
}) {
  return (
    <div className="flex w-full flex-col">
      {originalPrice && (
        <p className="text-sm text-muted-foreground line-through">{originalPrice}</p>
      )}
      <p className="text-md font-semibold text-accent-foreground">
        {priceMultiplier && <span>{priceMultiplier} </span>}
        {price}
      </p>
    </div>
  );
}

export interface ProductTileProps {
  layout?: "vertical" | "horizontal";
  /** "orderDetail" is a read-only row used in order history/refund screens (horizontal only). */
  type?: "default" | "orderDetail";
  /** Out of stock — fades the image/description and disables the cart button. */
  unavailable?: boolean;
  image: string;
  imageAlt?: string;
  name: string;
  /** Weight/size line, e.g. "115g". */
  size: string;
  /** Struck-through price shown when the item is discounted. */
  originalPrice?: string;
  price: string;
  /** Bold prefix before the price, e.g. "2x" (orderDetail quantity billed). */
  priceMultiplier?: string;
  /** AddToCartButton wiring — see add-to-cart.tsx. */
  quantity?: number;
  onAdd?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  /** Vertical layout and horizontal "default": favorite heart toggle. */
  favorite?: boolean;
  onToggleFavorite?: () => void;
  /** Horizontal "default" only: the "x" remove-from-list button. */
  onRemove?: () => void;
  /** Horizontal "orderDetail" only: the floating refund badge. */
  refund?: { count: number; unit?: string };
  className?: string;
}

const ProductTile = React.forwardRef<HTMLDivElement, ProductTileProps>(
  (
    {
      layout = "vertical",
      type = "default",
      unavailable = false,
      image,
      imageAlt,
      name,
      size,
      originalPrice,
      price,
      priceMultiplier,
      quantity = 0,
      onAdd,
      onIncrement,
      onDecrement,
      favorite,
      onToggleFavorite,
      onRemove,
      refund,
      className,
    },
    ref
  ) => {
    const isOrderDetail = type === "orderDetail";

    if (layout === "horizontal") {
      const row = (
        <div
          ref={isOrderDetail ? undefined : ref}
          className={cn(
            "flex w-full items-center gap-2 overflow-hidden rounded-md border border-border pr-2",
            isOrderDetail && "relative z-[1]",
            !isOrderDetail && className
          )}
        >
          <ProductImage
            image={image}
            imageAlt={imageAlt}
            unavailable={unavailable}
            className="size-[105px]"
          >
            {!isOrderDetail && !unavailable && favorite !== undefined && (
              <FavoriteChip active={favorite} onToggle={onToggleFavorite} />
            )}
          </ProductImage>
          <div className={cn("flex min-w-0 flex-1 flex-col gap-2", unavailable && "opacity-50")}>
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-accent-foreground">{name}</p>
                <p className="truncate text-sm text-muted-foreground">{size}</p>
              </div>
              {!isOrderDetail && onRemove && <RemoveButton onClick={onRemove} />}
            </div>
            <div className="flex items-center justify-between gap-2">
              <Price originalPrice={originalPrice} price={price} priceMultiplier={priceMultiplier} />
              <AddToCartButton
                quantity={isOrderDetail ? 0 : quantity}
                disabled={unavailable || isOrderDetail}
                onAdd={onAdd}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
              />
            </div>
          </div>
        </div>
      );

      if (!isOrderDetail) return row;

      return (
        <div ref={ref} className={cn("relative", className)}>
          {refund && <RefundBadge count={refund.count} unit={refund.unit} />}
          {row}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 overflow-hidden rounded-md border border-border bg-background pb-2",
          className
        )}
      >
        <ProductImage image={image} imageAlt={imageAlt} unavailable={unavailable} className="h-[105px] w-full">
          {favorite !== undefined && <FavoriteChip active={favorite} onToggle={onToggleFavorite} />}
        </ProductImage>
        <div className={cn("flex flex-col gap-2 px-2", unavailable && "opacity-50")}>
          <div>
            <p className="truncate text-sm font-medium text-accent-foreground">{name}</p>
            <p className="truncate text-sm text-muted-foreground">{size}</p>
          </div>
          <Price originalPrice={originalPrice} price={price} priceMultiplier={priceMultiplier} />
          <AddToCartButton
            className="w-full"
            quantity={quantity}
            disabled={unavailable}
            onAdd={onAdd}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        </div>
      </div>
    );
  }
);
ProductTile.displayName = "ProductTile";

export { ProductTile };
