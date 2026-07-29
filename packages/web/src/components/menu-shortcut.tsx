import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/utils";

/**
 * MenuShortcutItem / MenuShortcutList — home-screen quick actions ("Pedir
 * novamente", "Favoritos"): a circular icon chip with a 2-line label below,
 * several side by side in a horizontal scroller. Same leading-icon-chip
 * convention as `MenuItem` (surface-accent-primary bg + text-accent-primary
 * icon), vertical layout instead of a full-width row.
 */

const MenuShortcutList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn("flex w-full gap-4 overflow-x-auto pb-1", className)}
      {...props}
    />
  )
);
MenuShortcutList.displayName = "MenuShortcutList";

export interface MenuShortcutItemProps extends React.HTMLAttributes<HTMLElement> {
  /** Glyph rendered inside the circular chip (e.g. a lucide icon). */
  icon: React.ReactNode;
  label: React.ReactNode;
  /** Render as a child element (e.g. an <a> or router Link). */
  asChild?: boolean;
}

const MenuShortcutItem = React.forwardRef<HTMLElement, MenuShortcutItemProps>(
  ({ className, icon, label, asChild = false, children, ...props }, ref) => {
    const Comp: React.ElementType = asChild ? Slot : "button";
    const inner = (
      <>
        <span
          aria-hidden
          className="flex size-16 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground [&_svg]:size-6 [&_svg]:shrink-0"
        >
          {icon}
        </span>
        <span className="line-clamp-2 text-sm font-medium leading-tight text-foreground">
          {label}
        </span>
      </>
    );
    return (
      <Comp
        ref={ref as never}
        type={asChild ? undefined : "button"}
        data-slot="menu-shortcut-item"
        className={cn(
          "group flex w-20 shrink-0 flex-col items-center gap-2 rounded-lg text-center transition-opacity",
          "hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {asChild && React.isValidElement(children)
          ? React.cloneElement(children, undefined, inner)
          : inner}
      </Comp>
    );
  }
);
MenuShortcutItem.displayName = "MenuShortcutItem";

export { MenuShortcutList, MenuShortcutItem };
