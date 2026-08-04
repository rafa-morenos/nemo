import * as React from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  type ViewProps,
  type PressableProps,
} from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";
import { ChevronDownIcon } from "./icons";

/**
 * Accordion / AccordionItem / AccordionTrigger / AccordionContent — RN port
 * of `packages/web/src/components/accordion.tsx` (`@radix-ui/react-accordion`
 * + `border-b` between items + a chevron that rotates 180° when open +
 * `animate-accordion-down/up`). Same 4-part shape, same token choices as the
 * web version:
 * - item divider (web `border-b`) → `color-border-neutral-main` → `t.color.border.neutral.main`
 * - chevron (web `text-muted-foreground`) → `color-text-neutral-tertiary` → `t.color.text.neutral.tertiary`
 *
 * 100% controlled, no internal state — `Accordion` takes `value`/
 * `onValueChange` from the caller, same convention as the rest of this
 * package. `type="single"` uses a `string` value, `type="multiple"` uses a
 * `string[]`; kept as one loosely-typed prop pair (not a discriminated
 * union) to keep the surface simple — callers already know which shape they
 * passed in.
 *
 * Web's `collapsible` prop (only meaningful for `type="single"` — Radix
 * defaults to *not* letting you close the last open item) is ported as-is.
 *
 * Same height-animation approach as `Collapsible.tsx`: no manual height
 * measurement — `LayoutAnimation.configureNext` right before the value
 * changes, `AccordionContent` mounts/unmounts its children conditionally.
 */

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export type AccordionType = "single" | "multiple";
export type AccordionValue = string | string[];

interface AccordionContextValue {
  type: AccordionType;
  value: AccordionValue | undefined;
  onValueChange?: (value: AccordionValue) => void;
  collapsible?: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue>({
  type: "single",
  value: undefined,
});

export interface AccordionProps extends ViewProps {
  type?: AccordionType;
  /** `string` when `type="single"`, `string[]` when `type="multiple"`. */
  value?: AccordionValue;
  onValueChange?: (value: AccordionValue) => void;
  /** Only relevant for `type="single"` — allows closing the open item by pressing it again (Radix default: false). */
  collapsible?: boolean;
  children: React.ReactNode;
}

export function Accordion({
  type = "single",
  value,
  onValueChange,
  collapsible,
  children,
  style,
  ...props
}: AccordionProps) {
  return (
    <AccordionContext.Provider value={{ type, value, onValueChange, collapsible }}>
      <View style={style} {...props}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
}

interface AccordionItemContextValue {
  value: string;
  open: boolean;
  disabled?: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue>({
  value: "",
  open: false,
});

export interface AccordionItemProps extends ViewProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export function AccordionItem({ value, disabled, children, style, ...props }: AccordionItemProps) {
  const t = useNemoTheme();
  const accordionCtx = React.useContext(AccordionContext);
  const open =
    accordionCtx.type === "multiple"
      ? Array.isArray(accordionCtx.value) && accordionCtx.value.includes(value)
      : accordionCtx.value === value;

  return (
    <AccordionItemContext.Provider value={{ value, open, disabled }}>
      <View
        style={[
          { borderBottomWidth: t.borderWidth.sm, borderBottomColor: t.color.border.neutral.main },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps extends Omit<PressableProps, "onPress" | "disabled"> {
  children: React.ReactNode;
}

export function AccordionTrigger({ children, style, ...props }: AccordionTriggerProps) {
  const t = useNemoTheme();
  const s = styles(t);
  const accordionCtx = React.useContext(AccordionContext);
  const itemCtx = React.useContext(AccordionItemContext);
  const rotation = React.useRef(new Animated.Value(itemCtx.open ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(rotation, {
      toValue: itemCtx.open ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [itemCtx.open, rotation]);

  const handlePress = () => {
    if (itemCtx.disabled) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (accordionCtx.type === "multiple") {
      const current = Array.isArray(accordionCtx.value) ? accordionCtx.value : [];
      const next = itemCtx.open
        ? current.filter((v) => v !== itemCtx.value)
        : [...current, itemCtx.value];
      accordionCtx.onValueChange?.(next);
    } else {
      const next = itemCtx.open ? (accordionCtx.collapsible ? "" : itemCtx.value) : itemCtx.value;
      accordionCtx.onValueChange?.(next);
    }
  };

  const spin = rotation.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded: itemCtx.open, disabled: !!itemCtx.disabled }}
      onPress={handlePress}
      style={(state) => [s.trigger, typeof style === "function" ? style(state) : style]}
      {...props}
    >
      <View style={s.triggerLabel}>
        {typeof children === "string" ? <Text style={s.triggerText}>{children}</Text> : children}
      </View>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <ChevronDownIcon size={t.space["100"]} color={t.color.text.neutral.tertiary} />
      </Animated.View>
    </Pressable>
  );
}

export interface AccordionContentProps extends ViewProps {
  children: React.ReactNode;
  /** Keep mounted (just hidden) instead of unmounting when closed — mirrors Radix's `forceMount`, opt-in. */
  forceMount?: boolean;
}

export function AccordionContent({ children, forceMount, style, ...props }: AccordionContentProps) {
  const t = useNemoTheme();
  const s = styles(t);
  const { open } = React.useContext(AccordionItemContext);

  if (!open && !forceMount) return null;

  return (
    <View style={[!open && { display: "none" }, s.content, style]} {...props}>
      {children}
    </View>
  );
}

function styles(t: NemoTheme) {
  return StyleSheet.create({
    trigger: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: t.space["50"],
      paddingVertical: t.space["100"],
    },
    triggerLabel: { flex: 1 },
    triggerText: {
      fontSize: t.font.size["3"],
      fontWeight: String(t.font.weight.medium) as "500",
      color: t.color.text.neutral.primary,
    },
    content: {
      paddingBottom: t.space["100"],
    },
  });
}
