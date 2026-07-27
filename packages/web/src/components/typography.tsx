import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Nemo Text — the single text primitive. Every size/weight/tone is a token,
 * so type stays consistent across the product (and mirrors RN/Flutter).
 *
 *   <Text variant="h1">Título</Text>
 *   <Text variant="body" tone="secondary">Descrição</Text>
 *   <Text asChild variant="label"><label htmlFor="x">Email</label></Text>
 */
const textVariants = cva("", {
  variants: {
    variant: {
      display: "font-display text-3xl font-bold leading-tight tracking-tight",
      h1: "font-heading text-2xl font-medium leading-tight tracking-tight",
      h2: "font-heading text-xl font-medium leading-tight",
      h3: "font-heading text-lg font-medium leading-normal",
      body: "text-md font-regular leading-normal",
      bodySm: "text-sm font-regular leading-normal",
      label: "text-sm font-medium leading-normal",
      caption: "text-xs font-regular leading-normal",
    },
    tone: {
      default: "text-foreground",
      secondary: "text-muted-foreground",
      muted: "text-muted-foreground",
      brand: "text-primary",
      decorative: "text-[color:var(--nemo-color-text-accent-primary)]",
      danger: "text-destructive",
      success: "text-success",
      onBrand: "text-primary-foreground",
    },
  },
  defaultVariants: { variant: "body", tone: "default" },
});

// Sensible default element per variant (overridable via `as` / `asChild`).
const defaultTag: Record<string, React.ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  bodySm: "p",
  label: "span",
  caption: "span",
};

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
  asChild?: boolean;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, variant, tone, as, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : as ?? defaultTag[variant ?? "body"] ?? "span";
    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ variant, tone, className }))}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, textVariants };
