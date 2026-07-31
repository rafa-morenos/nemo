import * as React from "react";
import { View, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";

/**
 * ButtonGroup — RN port of the web `ButtonGroup`. Web achieves the "only
 * round the outer corners" look via CSS `[&>*]:first:rounded-*`/`last:rounded-*`
 * selectors, which don't exist in RN. This clones each child and injects a
 * `style` override with the right corner radii for its position — it assumes
 * children accept a `style` prop that gets merged onto their outermost View
 * (true for RN Pressable/View-based buttons; a plain custom component that
 * ignores `style` won't get rounded corners, same as it wouldn't respond to
 * an arbitrary className override on web either).
 */
export interface ButtonGroupProps {
  orientation?: "horizontal" | "vertical";
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function ButtonGroup({ orientation = "horizontal", children, style }: ButtonGroupProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  const items = React.Children.toArray(children);
  const isHorizontal = orientation === "horizontal";

  return (
    <View
      style={[s.group, isHorizontal ? s.row : s.column, style]}
      accessibilityRole="none"
    >
      {items.map((child, i) => {
        if (!React.isValidElement(child)) return child;
        const isFirst = i === 0;
        const isLast = i === items.length - 1;
        const corner = isHorizontal
          ? {
              borderTopLeftRadius: isFirst ? t.radius.md : 0,
              borderBottomLeftRadius: isFirst ? t.radius.md : 0,
              borderTopRightRadius: isLast ? t.radius.md : 0,
              borderBottomRightRadius: isLast ? t.radius.md : 0,
            }
          : {
              borderTopLeftRadius: isFirst ? t.radius.md : 0,
              borderTopRightRadius: isFirst ? t.radius.md : 0,
              borderBottomLeftRadius: isLast ? t.radius.md : 0,
              borderBottomRightRadius: isLast ? t.radius.md : 0,
            };
        const childProps = child.props as { style?: StyleProp<ViewStyle> };
        return React.cloneElement(child as React.ReactElement<{ style?: StyleProp<ViewStyle> }>, {
          style: [childProps.style, corner],
        });
      })}
    </View>
  );
}

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    group: { display: "flex" },
    row: { flexDirection: "row", gap: t.space["25"] },
    column: { flexDirection: "column", gap: t.space["25"] },
  });
}
