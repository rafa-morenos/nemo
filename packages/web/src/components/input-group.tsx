import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

/**
 * Nemo InputGroup — follows the shadcn/ui Input Group API (InputGroup,
 * InputGroupInput, InputGroupAddon, InputGroupButton, InputGroupText).
 * Wraps an input with leading/trailing addons. Token-driven, Nemo variables.
 */
const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      data-slot="input-group"
      className={cn(
        "relative flex w-full items-center rounded-md border border-input bg-background transition-[color,box-shadow]",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        "has-[[data-slot=input-group-input]:disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
);
InputGroup.displayName = "InputGroup";

const InputGroupInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      data-slot="input-group-input"
      className={cn(
        "flex h-10 w-full min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-foreground",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none",
        "disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
);
InputGroupInput.displayName = "InputGroupInput";

const inputGroupAddonVariants = cva(
  "flex items-center justify-center gap-2 text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      align: {
        "inline-start": "pl-3",
        "inline-end": "pr-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
);

export interface InputGroupAddonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputGroupAddonVariants> {}

const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, align = "inline-start", ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      {...props}
    />
  )
);
InputGroupAddon.displayName = "InputGroupAddon";

const InputGroupButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    data-slot="input-group-button"
    className={cn(
      "inline-flex h-7 items-center justify-center gap-1.5 rounded-sm px-2 text-sm font-medium text-foreground transition-colors",
      "hover:bg-accent hover:text-accent-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:pointer-events-none disabled:opacity-50",
      "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
));
InputGroupButton.displayName = "InputGroupButton";

const InputGroupText = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="input-group-text"
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
);
InputGroupText.displayName = "InputGroupText";

export {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  inputGroupAddonVariants,
};
