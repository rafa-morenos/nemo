import * as React from "react";
import {
  View,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
  type ViewProps,
  type PressableProps,
} from "react-native";

/**
 * Collapsible — RN port of `packages/web/src/components/collapsible.tsx`
 * (itself just a thin re-export of `@radix-ui/react-collapsible`, no styling
 * of its own). Same 3-part shape: `Collapsible` (root), `CollapsibleTrigger`,
 * `CollapsibleContent`.
 *
 * 100% controlled, no internal state — same convention as the rest of this
 * package (`open`/`onOpenChange`, caller owns the value).
 *
 * Radix's web version animates height via CSS (`data-state` + a measured
 * `--radix-collapsible-content-height` custom property). RN has no
 * equivalent cheap layout-measurement primitive, so this uses
 * `LayoutAnimation.configureNext` (built-in, no new dependency) right before
 * `onOpenChange` flips the value, and `CollapsibleContent` mounts/unmounts
 * its children conditionally rather than animating an explicit height — the
 * simplest approach that still yields an animated expand/collapse.
 */

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CollapsibleContextValue {
  open: boolean;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue>({ open: false });

export interface CollapsibleProps extends ViewProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function Collapsible({ open, onOpenChange, disabled, children, style, ...props }: CollapsibleProps) {
  return (
    <CollapsibleContext.Provider value={{ open, disabled, onOpenChange }}>
      <View style={style} {...props}>
        {children}
      </View>
    </CollapsibleContext.Provider>
  );
}

export interface CollapsibleTriggerProps extends Omit<PressableProps, "onPress" | "disabled"> {
  children: React.ReactNode;
}

export function CollapsibleTrigger({ children, ...props }: CollapsibleTriggerProps) {
  const { open, disabled, onOpenChange } = React.useContext(CollapsibleContext);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded: open, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        onOpenChange?.(!open);
      }}
      {...props}
    >
      {children}
    </Pressable>
  );
}

export interface CollapsibleContentProps extends ViewProps {
  children: React.ReactNode;
  /** Keep mounted (just hidden) instead of unmounting when closed — mirrors Radix's `forceMount`, opt-in. */
  forceMount?: boolean;
}

export function CollapsibleContent({ children, forceMount, style, ...props }: CollapsibleContentProps) {
  const { open } = React.useContext(CollapsibleContext);

  if (!open && !forceMount) return null;

  return (
    <View style={[!open && { display: "none" }, style]} {...props}>
      {children}
    </View>
  );
}
