import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * MenuItem / MenuSection / MenuList — settings/menu list rows, built on the
 * shadcn `Item` row pattern and tailored for app menu screens (leading icon
 * chip, label, optional badge + unread dot, trailing chevron), grouped under
 * section headings. All colors come from Nemo tokens.
 */

const MenuList = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} className={cn("flex w-full flex-col", className)} {...props} />
  )
);
MenuList.displayName = "MenuList";

export interface MenuSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section heading, e.g. "Pagamentos". Omit for an unlabeled group. */
  label?: React.ReactNode;
}

const MenuSection = React.forwardRef<HTMLDivElement, MenuSectionProps>(
  ({ className, label, children, ...props }, ref) => (
    <div ref={ref} className={cn("py-2", className)} {...props}>
      {label != null && (
        <h3 className="px-2 pb-1 text-lg font-bold text-primary">{label}</h3>
      )}
      <div role="group" className="flex flex-col">
        {children}
      </div>
    </div>
  )
);
MenuSection.displayName = "MenuSection";

export interface MenuItemProps extends React.HTMLAttributes<HTMLElement> {
  /** Leading glyph, rendered inside the circular chip (e.g. a lucide icon). */
  icon?: React.ReactNode;
  label: React.ReactNode;
  /** Inline badge after the label (e.g. <Badge>Novo</Badge>). */
  badge?: React.ReactNode;
  /** Unread dot after the label. */
  dot?: boolean;
  /** Trailing content; defaults to a chevron. Pass null to hide. */
  trailing?: React.ReactNode;
  /** Render as a child element (e.g. an <a> or router Link). */
  asChild?: boolean;
}

const MenuItem = React.forwardRef<HTMLElement, MenuItemProps>(
  ({ className, icon, label, badge, dot, trailing, asChild = false, children, ...props }, ref) => {
    const Comp: React.ElementType = asChild ? Slot : "button";
    const inner = (
      <>
        {icon != null && (
          <span
            aria-hidden
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full",
              "[&_svg]:size-5 [&_svg]:shrink-0"
            )}
            style={{
              background: "var(--nemo-color-surface-accent-primary)",
              color: "var(--nemo-color-text-accent-primary)",
            }}
          >
            {icon}
          </span>
        )}
        <span className="flex min-w-0 flex-1 items-center gap-2">
          <span className="truncate text-md font-medium text-foreground">{label}</span>
          {badge}
          {dot && <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden />}
        </span>
        {trailing === undefined ? (
          <ChevronRight className="ml-auto size-5 shrink-0 text-muted-foreground" aria-hidden />
        ) : (
          trailing && <span className="ml-auto shrink-0 text-muted-foreground">{trailing}</span>
        )}
      </>
    );
    return (
      <Comp
        ref={ref as never}
        type={asChild ? undefined : "button"}
        data-slot="menu-item"
        className={cn(
          "group flex w-full items-center gap-4 rounded-lg px-2 py-2.5 text-left transition-colors",
          "hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
MenuItem.displayName = "MenuItem";

export { MenuList, MenuSection, MenuItem };
