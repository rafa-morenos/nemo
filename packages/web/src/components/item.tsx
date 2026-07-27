import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

/**
 * Nemo Item — follows the shadcn/ui Item API (Item, ItemGroup, ItemMedia,
 * ItemContent, ItemTitle, ItemDescription, ItemActions, ItemHeader,
 * ItemFooter, ItemSeparator). A list-row primitive, token-driven with Nemo
 * variables.
 */
const itemVariants = cva(
  "group/item flex flex-wrap items-center gap-3 rounded-md border p-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "border-transparent bg-card",
        outline: "border-border",
        muted: "border-transparent bg-muted",
      },
      size: {
        default: "p-3",
        sm: "gap-2.5 p-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Item.displayName = "Item";

const ItemGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="list"
      data-slot="item-group"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
);
ItemGroup.displayName = "ItemGroup";

const ItemMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-media"
      className={cn(
        "flex shrink-0 items-center justify-center text-muted-foreground",
        "[&_svg:not([class*='size-'])]:size-5 [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
);
ItemMedia.displayName = "ItemMedia";

const ItemContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-0.5 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
);
ItemContent.displayName = "ItemContent";

const ItemTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium leading-snug",
        className
      )}
      {...props}
    />
  )
);
ItemTitle.displayName = "ItemTitle";

const ItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="item-description"
    className={cn(
      "line-clamp-2 text-sm font-normal leading-normal text-muted-foreground text-balance",
      "[&>a]:underline [&>a]:underline-offset-4",
      className
    )}
    {...props}
  />
));
ItemDescription.displayName = "ItemDescription";

const ItemActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-actions"
      className={cn("ml-auto flex items-center gap-2", className)}
      {...props}
    />
  )
);
ItemActions.displayName = "ItemActions";

const ItemHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
);
ItemHeader.displayName = "ItemHeader";

const ItemFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
);
ItemFooter.displayName = "ItemFooter";

const ItemSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      data-slot="item-separator"
      className={cn("my-0 border-t", className)}
      {...props}
    />
  )
);
ItemSeparator.displayName = "ItemSeparator";

export {
  Item,
  ItemGroup,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemHeader,
  ItemFooter,
  ItemSeparator,
  itemVariants,
};
