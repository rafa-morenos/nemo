import * as React from "react";
import { View, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";
import { Typography } from "./Typography";

/**
 * Bubble — RN port of the web `Bubble` (chat message bubble). Interpretation,
 * not a canonical shadcn component (see web's own comment). A user bubble
 * aligns right with brand colors; an assistant bubble aligns left with muted
 * colors. `asChild`/`className` don't exist in RN — content is always the
 * `children` prop, rendered inside a themed `Typography` unless it's already
 * a React element (so callers can pass custom content, same flexibility the
 * web version gets from `children: ReactNode`).
 */
export interface BubbleProps {
  role?: "user" | "assistant";
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Bubble({ role = "assistant", children, style }: BubbleProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  const isUser = role === "user";

  return (
    <View style={[s.row, isUser ? s.justifyEnd : s.justifyStart, style]}>
      <View style={[s.bubble, isUser ? s.userBubble : s.assistantBubble]}>
        {typeof children === "string" ? (
          <Typography
            variant="bodySm"
            tone={isUser ? "onBrand" : "default"}
          >
            {children}
          </Typography>
        ) : (
          children
        )}
      </View>
    </View>
  );
}

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    row: { width: "100%", flexDirection: "row" },
    justifyEnd: { justifyContent: "flex-end" },
    justifyStart: { justifyContent: "flex-start" },
    // max-w-[80%] px-4 py-2 — "80%" isn't a token (arbitrary Tailwind value on web too).
    // rounded-2xl: web's un-overridden Tailwind default (1rem/16px) happens to equal
    // t.radius.lg (16), so this uses the real token instead of a coincidental literal.
    bubble: {
      maxWidth: "80%",
      paddingHorizontal: t.space["100"],
      paddingVertical: t.space["50"],
      borderRadius: t.radius.lg,
    },
    userBubble: { backgroundColor: t.color.interactive.accent.primary.main },
    assistantBubble: { backgroundColor: t.color.surface.neutral.secondary },
  });
}
