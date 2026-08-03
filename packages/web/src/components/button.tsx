import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Nemo Button — shadcn/ui structure, Nemo tokens.
 * Colors/radii/spacing come from the Tailwind preset (→ Nemo CSS vars),
 * so this component is identical to what `npx shadcn add button` produces
 * and needs no per-brand edits.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "bg-card text-info-foreground hover:bg-secondary",
        outline:
          "border border-border bg-background hover:bg-secondary hover:text-foreground",
        ghost: "hover:bg-secondary hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-6 text-md",
        icon: "h-10 w-10",
      },
      pill: {
        true: "rounded-full",
      },
    },
    defaultVariants: { variant: "default", size: "md", pill: false },
  }
);

/**
 * Public contract (§2.1/§3.3a/§4.3): the `cva` block above stays exactly
 * what `npx shadcn add button` generates — `"default"` is shadcn's own
 * vocabulary, never edited there. `Button` below is the public boundary —
 * it exposes `"normal"` instead (translated right before the `cva` call)
 * and restricts `children` to text with a dedicated `icon` slot. Button is
 * an atomic component with a fixed visual envelope (§4.3), so free
 * `ReactNode` children — and `asChild`, an even bigger escape hatch —
 * aren't part of the public API; icon-only buttons pass `icon` + a native
 * `aria-label` instead of a visible `children` string.
 */
export type ButtonVariant = "normal" | "secondary" | "outline" | "ghost" | "destructive" | "link";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    Omit<VariantProps<typeof buttonVariants>, "variant"> {
  variant?: ButtonVariant;
  /** Button label. Optional only for icon-only buttons (pair with `aria-label`). */
  children?: string;
  /** Leading glyph (e.g. a lucide icon). Sized to fit the button and colored via currentColor. */
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "normal", size, pill, icon, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant: variant === "normal" ? "default" : variant, size, pill, className })
        )}
        ref={ref}
        {...props}
      >
        {icon != null && (
          <span className="shrink-0 [&_svg]:size-4" aria-hidden>
            {icon}
          </span>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
