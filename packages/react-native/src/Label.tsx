import * as React from "react";
import { Text, Pressable, type TextStyle } from "react-native";
import { useNemoTheme } from "./theme";

/**
 * Nemo Label — RN port of the web Label (`@radix-ui/react-label`). Web's
 * Radix Label associates with a form control via `htmlFor` and reacts to a
 * sibling's `:disabled` state via the `peer-disabled` Tailwind variant; RN
 * has neither `htmlFor` nor CSS peer selectors, so `disabled` is an explicit
 * prop (caller passes the same boolean it gives the associated field) and
 * `onPress` is offered so the label can imperatively focus/toggle its field
 * instead of the automatic DOM association.
 */
export interface LabelProps {
  children?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  style?: TextStyle;
}

export function Label({ children, disabled, onPress, style }: LabelProps) {
  const t = useNemoTheme();
  const text = (
    <Text
      style={[
        {
          fontSize: t.font.size["3"],
          fontWeight: String(t.font.weight.medium) as "500",
          lineHeight: t.font.size["3"],
          color: t.color.text.neutral.primary,
          opacity: disabled ? 0.7 : 1,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
  return onPress ? (
    <Pressable onPress={onPress} disabled={disabled}>
      {text}
    </Pressable>
  ) : (
    text
  );
}
