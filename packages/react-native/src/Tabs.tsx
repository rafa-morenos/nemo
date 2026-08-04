import * as React from "react";
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { useNemoTheme, nemoCardShadow } from "./theme";

/**
 * Nemo Tabs — RN port of the web Tabs (`packages/web/src/components/tabs.tsx`,
 * Radix `@radix-ui/react-tabs` + shadcn classes). RN has no Radix, so this is
 * a from-scratch implementation of the same visual/behavioral contract:
 * `TabsList` is a pill (`bg-muted`/`surface.neutral.secondary`) holding the
 * triggers; the active `TabsTrigger` gets `bg-background`+`shadow-sm`
 * (`surface.neutral.primary` + a subtle elevation); `TabsContent` renders
 * only the panel matching the active value (no hidden-but-mounted panels —
 * there's no scroll/animation state worth keeping alive across tabs in this
 * scope).
 *
 * Fully controlled, same pattern as KanbanCard/ProductCard/AddToCartButton/
 * NavigationBar (see CLAUDE.md): `Tabs` takes `value`/`onValueChange` and
 * shares them via Context to `TabsList`'s `TabsTrigger`s and to
 * `TabsContent` — no internal state, no uncontrolled/`defaultValue` mode
 * (unlike Radix, which supports both).
 *
 * Known, intentionally-replicated contrast gap (CLAUDE.md backlog item 9):
 * the inactive trigger's label (`text.neutral.tertiary` on
 * `surface.neutral.secondary`, i.e. web's `text-muted-foreground` on
 * `bg-muted`) measures ~3.21:1 in light mode — below the WCAG 4.5:1 text
 * minimum. This is a pending design decision on web, not a port bug; fixing
 * it only here would create a cross-platform inconsistency, so it's
 * reproduced as-is.
 */

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string): TabsContextValue {
  const ctx = React.useContext(TabsContext);
  if (!ctx) {
    throw new Error(`<${componentName}> must be rendered inside <Tabs>.`);
  }
  return ctx;
}

export interface TabsProps {
  /** Currently active tab value. Controlled — no `defaultValue`/internal state. */
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Tabs({ value, onValueChange, children, style }: TabsProps) {
  const ctx = React.useMemo(() => ({ value, onValueChange }), [value, onValueChange]);
  return (
    <TabsContext.Provider value={ctx}>
      <View style={style}>{children}</View>
    </TabsContext.Provider>
  );
}

export interface TabsListProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** `inline-flex h-10 items-center justify-center rounded-md bg-muted p-1`. */
export function TabsList({ children, style }: TabsListProps) {
  const t = useNemoTheme();
  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.list,
        {
          height: 40,
          borderRadius: t.radius.md,
          backgroundColor: t.color.surface.neutral.secondary,
          padding: t.space["25"],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * `inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm
 * font-medium ... data-[state=active]:bg-background
 * data-[state=active]:text-foreground data-[state=active]:shadow-sm`.
 *
 * `py-1.5` (6px) has no matching `t.space.*` step (same non-token literal
 * treatment as `Badge`'s `md` padding) — kept as a literal, not a missed
 * token. The active state's `shadow-sm` is reused from `nemoCardShadow`
 * (theme.tsx) — a framework-level convention, not a token, same as
 * `KanbanCard`'s elevation.
 */
export function TabsTrigger({ value, children, disabled, style }: TabsTriggerProps) {
  const t = useNemoTheme();
  const { value: activeValue, onValueChange } = useTabsContext("TabsTrigger");
  const selected = value === activeValue;

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => !disabled && onValueChange(value)}
      style={[
        styles.trigger,
        {
          borderRadius: t.radius.sm,
          paddingHorizontal: t.space["75"],
          paddingVertical: 6,
          backgroundColor: selected ? t.color.surface.neutral.primary : "transparent",
        },
        selected && nemoCardShadow,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={{
          fontSize: t.font.size["3"],
          fontWeight: String(t.font.weight.medium) as "500",
          color: selected ? t.color.text.neutral.primary : t.color.text.neutral.tertiary,
        }}
        numberOfLines={1}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** `mt-2` — only the panel matching the active value renders. */
export function TabsContent({ value, children, style }: TabsContentProps) {
  const t = useNemoTheme();
  const { value: activeValue } = useTabsContext("TabsContent");
  if (value !== activeValue) return null;

  return <View style={[{ marginTop: t.space["50"] }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  list: { flexDirection: "row", alignItems: "center", justifyContent: "center", alignSelf: "flex-start" },
  trigger: { alignItems: "center", justifyContent: "center" },
  disabled: { opacity: 0.5 },
});
