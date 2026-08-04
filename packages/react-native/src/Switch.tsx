import * as React from "react";
import { Animated, Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { useNemoTheme, nemoCardShadow } from "./theme";

/**
 * Nemo Switch — RN port of the web `Switch` (`switch.tsx`, Radix
 * `SwitchPrimitives` + shadcn classes). 100% controlled, same as every other
 * component in this package — no internal state, no `defaultChecked`.
 *
 * On = `bg-primary` (`t.color.interactive.accent.primary.main`), off =
 * `bg-muted` (`t.color.surface.neutral.secondary`, same alias the Tailwind
 * preset's `muted.DEFAULT` resolves to). Thumb is `bg-background`
 * (`t.color.surface.neutral.primary`) with `shadow-sm` — reuses
 * `nemoCardShadow` from `theme.tsx`, the same "framework default, not a
 * token" shadow `KanbanCard`/`ProductCard` already use for that Tailwind
 * class.
 *
 * Track width (44) and thumb travel distance don't have a matching
 * `t.space.*` step for every value (same as `Badge`'s documented literals):
 * track height (`h-6`=24) matches `t.space["150"]`, thumb size (`h-5 w-5`=20)
 * and travel distance (`translate-x-5`=20) match `t.space["125"]`, but track
 * width (`w-11`=44) has no matching step and stays a literal.
 */
export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const TRACK_WIDTH = 44;

export function Switch({ checked = false, onCheckedChange, disabled, style, accessibilityLabel }: SwitchProps) {
  const t = useNemoTheme();
  const travel = t.space["125"]; // 20 — track width minus thumb minus 2×border
  const anim = React.useRef(new Animated.Value(checked ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: checked ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [checked, anim]);

  const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [0, travel] });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={() => onCheckedChange?.(!checked)}
      style={[
        styles.track,
        {
          width: TRACK_WIDTH,
          height: t.space["150"],
          borderRadius: t.radius.pill,
          borderWidth: t.borderWidth.md,
          backgroundColor: checked ? t.color.interactive.accent.primary.main : t.color.surface.neutral.secondary,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          nemoCardShadow,
          styles.thumb,
          {
            width: t.space["125"],
            height: t.space["125"],
            borderRadius: t.radius.circle,
            backgroundColor: t.color.surface.neutral.primary,
            transform: [{ translateX }],
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: { borderColor: "transparent", justifyContent: "center" },
  thumb: {},
});
