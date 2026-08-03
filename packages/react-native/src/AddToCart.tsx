import * as React from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useNemoTheme, type NemoTheme } from "./theme";
import { PlusIcon, MinusIcon } from "./icons";

/**
 * RN port of `packages/web/src/components/add-to-cart.tsx` — the "AddTo /
 * Basket" flow from Figma (node 3872:52310). Reuses the same `PlusIcon`/
 * `MinusIcon` already ported for `ProductCard`'s stepper (`./icons.tsx`)
 * instead of re-deriving the Daki-specific plus/minus asset a second time.
 *
 * Two icons are new here (not part of the shared icon set, same scoping as
 * the web file's local `TrashIcon`/`LoadingSpinnerIcon`):
 * - `TrashIcon` — exact path data copied from the web component's local
 *   `TrashIcon` (it isn't part of the `icons-DakiApp` catalog there either).
 * - `HeartIcon` — RN has no `lucide-react` equivalent installed, so this
 *   ports the exact path from `lucide-react`'s `Heart` icon (v0.454.0, the
 *   version pinned in `packages/web/package.json`) instead of hand-drawing
 *   an approximation.
 */

function TrashIcon({ size = 16, color }: { size?: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M6.74628 2C6.40008 2 6.11942 2.26863 6.11942 2.6C6.11942 2.93137 6.40008 3.2 6.74628 3.2H9.25373C9.59993 3.2 9.88059 2.93137 9.88059 2.6C9.88059 2.26863 9.59993 2 9.25373 2H6.74628Z"
        fill={color}
      />
      <Path
        d="M6.50425 6.41542C6.84991 6.39679 7.1459 6.64988 7.16537 6.98073L7.38724 10.7511C7.40671 11.082 7.14228 11.3653 6.79662 11.3839C6.45096 11.4026 6.15497 11.1495 6.1355 10.8186L5.91363 7.04821C5.89416 6.71736 6.15859 6.43405 6.50425 6.41542Z"
        fill={color}
      />
      <Path
        d="M8.83672 6.98073C8.85619 6.64988 9.15219 6.39679 9.49784 6.41542C9.8435 6.43405 10.1079 6.71736 10.0885 7.04821L9.86659 10.8186C9.84712 11.1495 9.55113 11.4026 9.20547 11.3839C8.85981 11.3653 8.59538 11.082 8.61485 10.7511L8.83672 6.98073Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 4.4C2 4.06863 2.28066 3.8 2.62686 3.8H13.3731C13.7193 3.8 14 4.06863 14 4.4C14 4.73137 13.7193 5 13.3731 5H12.9553L12.1844 12.3791C12.0883 13.2993 11.2793 14 10.3131 14H5.68687C4.72072 14 3.91176 13.2993 3.81562 12.3791L3.04468 5H2.62686C2.28066 5 2 4.73137 2 4.4ZM4.30465 5H11.6954L10.9369 12.2597C10.9048 12.5664 10.6352 12.8 10.3131 12.8H5.68687C5.36482 12.8 5.09517 12.5664 5.06312 12.2597L4.30465 5Z"
        fill={color}
      />
    </Svg>
  );
}

function HeartIcon({ size = 20, color, filled }: { size?: number; color: string; filled: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : "none"}
      />
    </Svg>
  );
}

/**
 * Fixed brand-blue spinner glyph — path data copied 1:1 from the web
 * component. Intentionally a literal hex, not a token: same reasoning as the
 * web file (`fill="#1759FF"` there) — it's used over a neutral (`bg-card`)
 * surface, not the brand-blue `bg-primary` surface, so it doesn't need to
 * track the theme.
 */
function LoadingSpinnerIcon({ size = 16 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 13.2796 13.3333" fill="none">
      <Path
        d="M12.4313 6.66667C12.9295 6.66667 13.3396 7.07235 13.2724 7.56599C13.1245 8.65247 12.7101 9.69064 12.0601 10.5852C11.2326 11.7242 10.0657 12.572 8.72678 13.007C7.38782 13.4421 5.94551 13.4421 4.60655 13.007C3.2676 12.572 2.10074 11.7242 1.27322 10.5852C0.445699 9.44625 -1.23079e-07 8.07453 0 6.66667C1.23079e-07 5.2588 0.4457 3.88708 1.27322 2.7481C2.10074 1.60911 3.2676 0.761343 4.60655 0.32629C5.65821 -0.0154142 6.77363 -0.0887334 7.85265 0.106332C8.34289 0.194958 8.60198 0.710385 8.44803 1.18419V1.18419C8.29408 1.65799 7.78457 1.90818 7.2905 1.84428C6.57945 1.7523 5.85299 1.81824 5.16405 2.04209C4.18744 2.35941 3.33635 2.97776 2.73277 3.80852C2.12918 4.63928 1.8041 5.63979 1.8041 6.66667C1.8041 7.69354 2.12918 8.69405 2.73277 9.52481C3.33635 10.3556 4.18743 10.9739 5.16405 11.2912C6.14066 11.6086 7.19267 11.6086 8.16928 11.2912C9.1459 10.9739 9.99699 10.3556 10.6006 9.52481C11.0264 8.93876 11.3136 8.26824 11.4458 7.56357C11.5377 7.07393 11.9331 6.66667 12.4313 6.66667V6.66667Z"
        fill="#1759FF"
      />
    </Svg>
  );
}

/** Loops a 0→360° rotation while `spinning`, no extra dependency (matches web's `animate-spin`). */
function useSpin(spinning: boolean) {
  const value = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (!spinning) return;
    value.setValue(0);
    const loop = Animated.loop(
      Animated.timing(value, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [spinning, value]);
  return value.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
}

export interface AddToCartButtonProps {
  /** 0 = not in the cart yet. */
  quantity: number;
  /** Shows the spinner in place of the "+" pill; no interaction. */
  loading?: boolean;
  disabled?: boolean;
  /** Pressed when quantity is 0. */
  onAdd?: () => void;
  /** Pressed "+" in the stepper. */
  onIncrement?: () => void;
  /** Pressed "−" (or the trash icon at quantity 1) in the stepper. */
  onDecrement?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * AddToCartButton — controlled: the caller owns `quantity` and reacts to the
 * callbacks, same contract as web. A "+" pill before anything's in the cart,
 * a spinner while adding, and a quantity stepper once `quantity > 0` (trash
 * instead of "−" at quantity 1, since decrementing further removes the item).
 *
 * `34×127` below (the pill/stepper's fixed box) mirrors the web component's
 * `h-[34px] w-[127px]` — an arbitrary Tailwind value there too, not on the
 * Nemo space scale, same precedent as `ProductCard`'s 160×160 media box.
 */
export function AddToCartButton({
  quantity,
  loading = false,
  disabled = false,
  onAdd,
  onIncrement,
  onDecrement,
  style,
}: AddToCartButtonProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  const rotate = useSpin(loading);

  if (loading) {
    return (
      <View
        style={[s.pill, { backgroundColor: t.color.surface.neutral.tertiary }, style]}
        accessibilityRole="button"
        accessibilityLabel="Adicionando ao carrinho"
        accessibilityState={{ disabled: true, busy: true }}
      >
        <Animated.View style={{ transform: [{ rotate }] }}>
          <LoadingSpinnerIcon size={16} />
        </Animated.View>
      </View>
    );
  }

  if (quantity <= 0) {
    return (
      <Pressable
        onPress={onAdd}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel="Adicionar ao carrinho"
        accessibilityState={{ disabled }}
        style={({ pressed }) => [
          s.pill,
          { backgroundColor: t.color.surface.neutral.tertiary },
          disabled && s.disabled,
          pressed && !disabled && s.pressed,
          style,
        ]}
      >
        <PlusIcon size={16} color={t.color.text.neutral.primary} />
      </Pressable>
    );
  }

  const foreground = t.color.interactive.accent.primary.inverted;

  return (
    <View style={[s.stepper, { backgroundColor: t.color.interactive.accent.primary.main }, style]}>
      <Pressable
        onPress={onDecrement}
        accessibilityRole="button"
        accessibilityLabel={quantity === 1 ? "Remover do carrinho" : "Diminuir quantidade"}
        style={s.stepperButton}
      >
        {quantity === 1 ? (
          <TrashIcon size={16} color={foreground} />
        ) : (
          <MinusIcon size={16} color={foreground} />
        )}
      </Pressable>
      <Text style={[s.stepperValue, { color: foreground }]}>{quantity}</Text>
      <Pressable
        onPress={onIncrement}
        accessibilityRole="button"
        accessibilityLabel="Aumentar quantidade"
        style={s.stepperButton}
      >
        <PlusIcon size={16} color={foreground} />
      </Pressable>
    </View>
  );
}

/** CartCountBadge — the read-only "State=Count" variant: a plain quantity label, no buttons. */
export interface CartCountBadgeProps {
  count: number;
  style?: StyleProp<ViewStyle>;
}

export function CartCountBadge({ count, style }: CartCountBadgeProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View style={[s.countBadge, { backgroundColor: t.color.surface.neutral.secondary }, style]}>
      <Text style={[s.countBadgeText, { color: t.color.interactive.accent.primary.main }]}>X {count}</Text>
    </View>
  );
}

/** FavoriteButton — the "AddTo / AddList" flow: a heart toggle (outline ↔ filled). */
export interface FavoriteButtonProps {
  active: boolean;
  onToggle?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function FavoriteButton({ active, onToggle, disabled, style }: FavoriteButtonProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  const foreground = active ? t.color.interactive.accent.primary.inverted : t.color.text.neutral.primary;
  return (
    <Pressable
      onPress={onToggle}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      accessibilityState={{ disabled, selected: active }}
      style={({ pressed }) => [
        s.pill,
        { backgroundColor: active ? t.color.interactive.accent.primary.main : t.color.surface.neutral.tertiary },
        disabled && s.disabled,
        pressed && !disabled && s.pressed,
        style,
      ]}
    >
      <HeartIcon size={20} color={foreground} filled={active} />
    </Pressable>
  );
}

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    pill: {
      height: 34,
      width: 127,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.md,
    },
    disabled: { opacity: 0.5 },
    pressed: { opacity: 0.8 },
    stepper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: t.space["75"],
      borderRadius: t.radius.md,
      padding: 10, // web: `p-2.5` (10px) — default Tailwind spacing, not on the Nemo space scale.
    },
    stepperButton: {
      width: t.space["100"],
      height: t.space["100"],
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.sm,
    },
    stepperValue: {
      minWidth: 14,
      textAlign: "center",
      fontSize: t.font.size["3"],
      fontWeight: String(t.font.weight["bold"]) as "700",
    },
    countBadge: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.md,
      paddingHorizontal: t.space["100"],
      paddingVertical: 10, // web: `py-2.5` (10px) — same arbitrary-value precedent as `stepper.padding` above.
    },
    countBadgeText: {
      fontSize: t.font.size["3"],
      fontWeight: String(t.font.weight["bold"]) as "700",
    },
  });
}
