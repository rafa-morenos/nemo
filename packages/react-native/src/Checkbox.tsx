import * as React from "react";
import { Pressable, StyleSheet, type ViewStyle } from "react-native";
import { useNemoTheme } from "./theme";
import { CheckIcon } from "./icons";

/**
 * Nemo Checkbox — RN port of the web Checkbox
 * (`packages/web/src/components/checkbox.tsx`, Radix `CheckboxPrimitive` +
 * shadcn classes): unchecked border and checked background both come from
 * `border-primary`/`bg-primary` (`interactive.accent.primary.main`), the
 * check glyph is `text-primary-foreground`
 * (`interactive.accent.primary.inverted`), disabled mirrors web's
 * `disabled:opacity-50` literally (a flat 50% opacity on the whole control,
 * not a swap to the semantic `disabled` tokens Badge uses — that's what the
 * web source actually does here, no separate disabled palette).
 *
 * Controlled only, no Radix-style uncontrolled `defaultChecked` — same
 * pattern as every other Nemo RN component (Badge, KanbanCard, etc.):
 * the caller owns `checked` and reacts to `onCheckedChange`.
 *
 * Gotcha: web's `focus-visible:ring-1 ring-ring` has no RN equivalent — a
 * touch `Pressable` has no keyboard, so there's no reliable
 * `:focus-visible`-only signal to attach a ring to (a `pressed`-based style
 * would fire on every tap, not just external/keyboard focus, which means
 * something different). Dropped rather than faked.
 *
 * `rounded-sm` (2px) has no matching `t.radius` step — the closest real
 * token is `t.radius.sm` (4px), used here instead of a literal, same
 * "closest existing token, not a new literal" call Badge already made for
 * its own off-scale spacing.
 */
export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Checkbox({ checked = false, onCheckedChange, disabled = false, style }: CheckboxProps) {
  const t = useNemoTheme();
  const size = t.space["100"]; // h-4 w-4 (16px)

  return (
    <Pressable
      onPress={() => onCheckedChange?.(!checked)}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: t.radius.sm,
          borderWidth: t.borderWidth.sm,
          borderColor: t.color.interactive.accent.primary.main,
          backgroundColor: checked ? t.color.interactive.accent.primary.main : "transparent",
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {checked && <CheckIcon size={size} color={t.color.interactive.accent.primary.inverted} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: "center", justifyContent: "center" },
});
