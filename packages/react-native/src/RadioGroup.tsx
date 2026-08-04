import * as React from "react";
import { Pressable, View, StyleSheet, type ViewStyle } from "react-native";
import { useNemoTheme } from "./theme";

/**
 * Nemo RadioGroup / RadioGroupItem — RN port of the web RadioGroup
 * (`packages/web/src/components/radio-group.tsx`, Radix
 * `RadioGroupPrimitive` + shadcn classes). No name collision to dodge here
 * (unlike Flutter's `NemoRadioGroup` — see `nemo_radio_group.dart`), so this
 * keeps the web's plain names.
 *
 * `RadioGroup` shares `value`/`onValueChange`/`disabled` down to its
 * `RadioGroupItem` children via context — the RN equivalent of Radix
 * propagating group state through its own context provider — and just
 * stacks them with web's `grid gap-2` (8px, `t.space["50"]`) vertical gap;
 * the row of dot+label per option is the story's own layout, not something
 * this component renders.
 *
 * `RadioGroupItem`'s unchecked border and the checked dot both use
 * `border-primary`/`text-primary` (`interactive.accent.primary.main`) — same
 * blue for both, no background fill (unlike Checkbox, which fills with that
 * color instead of just outlining it). `disabled:opacity-50` again mirrors
 * web literally, same call as Checkbox.
 *
 * Controlled only — no Radix-style uncontrolled `defaultValue`, per the
 * design system's RN/Flutter convention (Badge, KanbanCard, etc.).
 *
 * Gotcha: same as Checkbox — no RN equivalent for
 * `focus-visible:ring-2 ring-ring ring-offset-2` on a touch `Pressable`
 * (no keyboard-only focus signal to hang a ring on), so it was dropped
 * rather than approximated with a tap-driven style.
 */
export interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: ViewStyle;
}

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

export function RadioGroup({ value, onValueChange, disabled, children, style }: RadioGroupProps) {
  const t = useNemoTheme();
  const contextValue = React.useMemo(() => ({ value, onValueChange, disabled }), [value, onValueChange, disabled]);

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <View style={[styles.group, { gap: t.space["50"] }, style]}>{children}</View>
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps {
  value: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function RadioGroupItem({ value, disabled: itemDisabled, style }: RadioGroupItemProps) {
  const t = useNemoTheme();
  const ctx = React.useContext(RadioGroupContext);
  const checked = ctx.value === value;
  const disabled = itemDisabled ?? ctx.disabled ?? false;
  const size = t.space["100"]; // aspect-square h-4 w-4 (16px)
  const dotSize = 10; // h-2.5 w-2.5 — no matching t.space step, same as Badge's off-scale literals

  return (
    <Pressable
      onPress={() => ctx.onValueChange?.(value)}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ checked, disabled }}
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: t.borderWidth.sm,
          borderColor: t.color.interactive.accent.primary.main,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {checked && (
        <View
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: t.color.interactive.accent.primary.main,
          }}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  group: { flexDirection: "column" },
  base: { alignItems: "center", justifyContent: "center" },
});
