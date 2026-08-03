import * as React from "react";
import { cn } from "../lib/utils";
import { DakiTabbarBagIcon } from "../icons/tabbar";

/**
 * NavigationBar — the Daki App's bottom tab bar ("Navigation bar", Figma
 * file "Daki App • Components — Design in Progress", node 40366:141533).
 * A rounded pill of `NavigationBarItem` tabs plus a `NavigationBarBagItem`
 * CTA slot that keeps its own dark background regardless of any tab's
 * `active` state. Controlled like the rest of Nemo (`active`/`onSelect`
 * per item) — no internal selection state.
 *
 * Figma's active tab color / bag slot background / count badge border
 * (`#001e6b`) is annotated `surface/decorative/surface-decorative-600` —
 * that role isn't in our Alias tree (`import-figma-tokens.mjs` only reads
 * `Alias colors /Value`, and this one isn't referenced there, same kind of
 * gap as the missing "On <Hue>" roles in CLAUDE.md's backlog). Rather than
 * hardcode that literal, this uses the real, already-existing
 * `interactive/accent/primary/active` alias instead (`primary-active` in
 * the preset — blue-10, `#001848`, same value in both themes): it's the
 * brand blue's own pressed/active shade, close in hue and *higher*
 * contrast everywhere this component uses it than the literal Figma value
 * (e.g. ~3.6:1 vs ~3.2:1 against `bg-primary`) — a real token stands in
 * for an unconfirmed one instead of inventing a new literal.
 *
 * The two-layer soft drop-shadow is Figma's named "Navbar" effect style,
 * also not yet a token — reproduced with its literal values, same
 * treatment as KanbanCard's shadow (framework-level default, not a token).
 *
 * The outer screen margin Figma shows around the bar (8px horizontal /
 * 16px from the bottom) is page chrome, not the component — left to the
 * consuming screen (e.g. `fixed inset-x-2 bottom-4`), same as other Nemo
 * components don't bake in their own screen-level positioning.
 *
 * Accessibility deviations from the Figma file (WCAG 2.1 AA):
 * - `primary-active` (`#001848`) on `bg-primary` (`#0069ff`) contrasts at
 *   ~3.6:1 — still fails the 4.5:1 normal-text minimum, and no dark color
 *   can reach 4.5:1 on this particular blue (even pure black only gets to
 *   ~4.46:1 — the background just isn't light enough for dark text to
 *   read as AA). The active *label* stays `text-primary-foreground`
 *   (white, ~4.7:1) instead of `primary-active`; the active *icon* and the
 *   underline indicator keep `primary-active` since graphical objects only
 *   need 3:1 (they clear it comfortably) — weight (`font-semibold`)
 *   carries the rest of the "active" signal on the label.
 * - Added `aria-current`, an `aria-label` landmark, and `aria-hidden`+
 *   `sr-only` pairing for the dot/count indicators — none of which a
 *   static Figma frame encodes.
 * - `NavigationBarItem`'s focus ring uses `ring-inverted-foreground`, not
 *   the usual `ring-ring` (`border-accent-primary`) — `ring-ring` resolves
 *   to the *same* blue as this bar's own `bg-primary`, so the ring would
 *   vanish into its own background. `inverted-foreground`
 *   (`text-neutral-inverted`) tonal-flips per theme same as Badge's solid
 *   variant does, so it tracks `bg-primary`'s own flip and stays visible in
 *   both themes.
 * - `NavigationBarBagItem`'s focus ring is a plain `ring-white`, not
 *   `ring-inverted-foreground` — its background (`primary-active`, when
 *   non-empty) is the *same* blue-10 value in both light and dark mode
 *   (unlike most Alias colors, this one doesn't tonal-flip), so pairing it
 *   with a ring color that does would go transparent-on-navy in dark mode
 *   (~1.1:1). A fixed light ring against this fixed-value background stays
 *   correct in both themes precisely because neither side moves.
 */

const NavigationBar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, "aria-label": ariaLabel = "Navegação principal", ...props }, ref) => (
    <nav
      ref={ref}
      data-slot="navigation-bar"
      aria-label={ariaLabel}
      className={cn(
        // bg-primary (interactive/accent/primary/main, #0069ff) — the Figma
        // node's own variable annotation says surface/accent/primary, but
        // that role is a pale tint in our Alias (blue-95); the rendered
        // fill matches the brand blue, same bg-primary pairing Badge's
        // `color="default" variant="filled"` already uses for this exact look.
        "flex w-full items-stretch overflow-hidden rounded-2xl bg-primary drop-shadow-[4px_4px_7.5px_rgba(24,39,75,0.15),-2px_-2px_7.5px_rgba(24,39,75,0.15)]",
        className
      )}
      {...props}
    >
      {children}
    </nav>
  )
);
NavigationBar.displayName = "NavigationBar";

export interface NavigationBarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  /** Small unread dot above the icon (e.g. "Pedidos" has new status updates). */
  dot?: boolean;
}

const NavigationBarItem = React.forwardRef<HTMLButtonElement, NavigationBarItemProps>(
  ({ icon, label, active, dot, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      data-slot="navigation-bar-item"
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-1 py-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverted-foreground focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "relative flex size-6 items-center justify-center [&_svg]:size-6",
          active ? "text-primary-active" : "text-primary-foreground"
        )}
      >
        {dot && (
          <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-background" />
        )}
        {icon}
      </span>
      <span className="flex flex-col items-center gap-0.5">
        <span
          className={cn(
            "text-2xs leading-none",
            active ? "font-semibold text-primary-active" : "font-medium text-primary-foreground"
          )}
        >
          {label}
          {dot && <span className="sr-only"> — novidade</span>}
        </span>
        {active && <span className="h-px w-2 rounded-full bg-primary-active" aria-hidden />}
      </span>
    </button>
  )
);
NavigationBarItem.displayName = "NavigationBarItem";

export interface NavigationBarBagItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: string;
  count?: number;
  /**
   * Whether the cart screen is the current one. Figma's sample frame never
   * showed this slot as "active" (it only ever showed the fixed dark bg
   * with items in it), so there's no confirmed darker shade to reference —
   * darkens `bg-primary-active` a step further via `brightness-90` rather
   * than guessing a new literal hex, and reuses the same underline
   * indicator `NavigationBarItem` shows when `active`. Revisit once design
   * has an actual "Sacola active" state.
   */
  active?: boolean;
}

/** Caps the same way `CartCountBadge`/`Badge`'s `count` prop does. */
function formatCount(count: number) {
  return count > 99 ? "99+" : String(count);
}

/**
 * Empty (no `count`) drops the fixed dark CTA background entirely and
 * looks like a plain `NavigationBarItem` instead — the dark slot is meant
 * to draw the eye *because there's something in the cart*; an empty bag
 * has nothing to call attention to, so it shouldn't stand out from the
 * rest of the bar. Non-empty keeps the original always-dark treatment.
 */
const NavigationBarBagItem = React.forwardRef<HTMLButtonElement, NavigationBarBagItemProps>(
  ({ icon, label, count, active, className, ...props }, ref) => {
    const isEmpty = count == null;
    return (
      <button
        ref={ref}
        type="button"
        data-slot="navigation-bar-bag-item"
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex flex-1 flex-col items-center justify-center gap-1 py-2",
          isEmpty ? "bg-primary" : cn("bg-primary-active", active && "brightness-90"),
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          isEmpty ? "focus-visible:ring-inverted-foreground" : "focus-visible:ring-white",
          className
        )}
        {...props}
      >
        <span
          aria-hidden
          className={cn(
            "relative flex size-6 items-center justify-center [&_svg]:size-6",
            isEmpty ? (active ? "text-primary-active" : "text-primary-foreground") : "text-primary"
          )}
        >
          {icon ?? <DakiTabbarBagIcon />}
          {count != null && (
            <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-sm border border-primary-active bg-background px-1 text-[10px] font-medium leading-none text-foreground">
              {formatCount(count)}
            </span>
          )}
        </span>
        <span className="flex flex-col items-center gap-0.5">
          <span
            className={cn(
              "text-2xs leading-none",
              isEmpty && active
                ? "font-semibold text-primary-active"
                : "font-medium text-primary-foreground"
            )}
          >
            {label}
            {count != null && <span className="sr-only"> — {formatCount(count)} itens</span>}
          </span>
          {active && (
            <span
              className={cn("h-px w-2 rounded-full", isEmpty ? "bg-primary-active" : "bg-white")}
              aria-hidden
            />
          )}
        </span>
      </button>
    );
  }
);
NavigationBarBagItem.displayName = "NavigationBarBagItem";

export { NavigationBar, NavigationBarItem, NavigationBarBagItem };
