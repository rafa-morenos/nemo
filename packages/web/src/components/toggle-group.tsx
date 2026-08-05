import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "../lib/utils";
import { toggleVariants, type ToggleVariant, type ToggleSize } from "./toggle";

/** Public contract (§2.1/§3.3a): same `"normal"` boundary as `Toggle` — `toggleVariants` itself (imported, untouched) still expects `"default"` internally. */
interface ToggleGroupVariantProps {
  variant?: ToggleVariant;
  size?: ToggleSize;
}

const ToggleGroupContext = React.createContext<ToggleGroupVariantProps>({
  size: "normal",
  variant: "normal",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & ToggleGroupVariantProps
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & ToggleGroupVariantProps
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);
  const effVariant = context.variant ?? variant ?? "normal";
  const effSize = context.size ?? size ?? "normal";
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: effVariant === "normal" ? "default" : effVariant,
          size: effSize === "normal" ? "default" : effSize,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
