import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Nemo Button — shadcn/ui structure, Nemo tokens.
 * Colors/radii/spacing come from the Tailwind preset (→ Nemo CSS vars),
 * so this component is identical to what `npx shadcn add button` produces
 * and needs no per-brand edits.
 *
 * a11y: `outline` uses `border-border-strong` (Border/Neutral/Hover), not the
 * default `border-border` (Border/Neutral/Main) — Main measures ~1.23:1 (light)
 * / ~2.66:1 (dark) against the background, below WCAG 1.4.11's 3:1 minimum for
 * UI component boundaries. Strong measures 4.27:1 / 7.45:1.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "bg-card text-info-foreground hover:bg-secondary",
        outline:
          "border border-border-strong bg-background hover:bg-secondary hover:text-foreground",
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, pill, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, pill, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
