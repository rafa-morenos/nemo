import * as React from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNemoTheme, nemoCardShadow, type NemoTheme } from "./theme";

/**
 * Nemo Toast — React Native.
 *
 * NOT a port of `packages/web/src/components/sonner.tsx` (which wraps the
 * `sonner` npm package — there is no RN equivalent). This is a new
 * implementation, built only from RN core (`Animated`, `View`, `Pressable`)
 * plus the generated Nemo theme, that replicates sonner.tsx's *observable*
 * API and behavior one-for-one:
 *   - `TOAST_DURATION` levels (short/medium/long/persistent).
 *   - `toast.success/error/warning/info/loading/message(message, opts?)`.
 *   - string+type dedupe: two calls with the same message and no explicit
 *     `id` update the same toast in place instead of stacking a duplicate
 *     (same `${type}:${message}` key sonner.tsx derives).
 *   - max 3 toasts visible at once (`visibleToasts={3}` on web).
 *   - an always-visible manual close button.
 *   - "soft" semantic colors (surface.semantic.* bg + text.semantic.* fg +
 *     border.semantic.* border) for success/warning/critical/info — the
 *     exact same alias triplet `tailwind.preset.js` resolves for web's
 *     `success-soft`/`warning-soft`/`destructive-soft`/`info` roles, and the
 *     same pair `Badge`'s `type="filled"` already uses (see `Badge.tsx`
 *     `bgFor`/`fgFor`). `error` (sonner/web naming) maps to Nemo's
 *     `critical` token family, matching the rest of the design system.
 *
 * Position: top of screen, centered/full-width (RN's "top-center" analog of
 * web's `top-right`) — there is no meaningful "right side" on a narrow phone
 * viewport, so unlike web this doesn't need a left/right decision at all,
 * just a single top-anchored, full-width stack (mirrors how sonner.tsx
 * itself notes `top-right`/`top-center` already render identically below
 * its own 600px breakpoint).
 *
 * Out of scope for this pass (documented, not forgotten): swipe-to-dismiss.
 * Web gets it for free from sonner (`swipeDirections`); replicating a
 * PanResponder-based swipe-to-dismiss gesture here is a meaningfully bigger
 * chunk of work than the rest of this component and was deliberately left
 * for a follow-up — closing is manual (X button) or automatic (duration)
 * only.
 *
 * Usage: mount `<NemoToastHost />` once near the app root (same role as
 * web's `<Toaster />`), wrapped in `<NemoToastProvider>` (which itself must
 * be inside `<NemoThemeProvider>` since colors are read from the theme).
 * Call sites use `const { toast } = useToast()` and `toast.success(...)`.
 */

/** Same vocabulary/values as `packages/web/src/components/sonner.tsx`. */
export const TOAST_DURATION = {
  short: 3000,
  medium: 5000,
  long: 10000,
  persistent: Infinity,
} as const;

/** Max toasts rendered at once — matches web's `visibleToasts={3}`. */
const MAX_VISIBLE = 3;

type ToastVariant = "success" | "critical" | "warning" | "info" | "loading" | "message";

export interface ToastOptions {
  /** Explicit dedupe key. Omit to auto-derive `${type}:${message}` (sonner.tsx's own default). */
  id?: string | number;
  /** Defaults to `TOAST_DURATION.short`, same as web. */
  duration?: number;
}

interface ToastItem {
  id: string;
  type: ToastVariant;
  message: string;
  duration: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  show: (type: ToastVariant, message: string, opts?: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

/**
 * Holds the toast queue. Deliberately does NOT own any `setTimeout` —
 * auto-dismiss timing lives in `ToastCard` (see below) so the fade/slide-out
 * animation can run before the item actually leaves the array. This provider
 * only knows how to add/update/remove/cap the list.
 */
export function NemoToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = React.useCallback((type: ToastVariant, message: string, opts?: ToastOptions) => {
    const id = opts?.id != null ? String(opts.id) : `${type}:${message}`;
    const duration = opts?.duration ?? TOAST_DURATION.short;
    setToasts((prev) => {
      const idx = prev.findIndex((t) => t.id === id);
      if (idx !== -1) {
        // Dedupe hit — update in place (same position, timer resets via
        // ToastCard's effect deps), no restack.
        const next = prev.slice();
        next[idx] = { id, type, message, duration };
        return next;
      }
      const next = [...prev, { id, type, message, duration }];
      // Cap at MAX_VISIBLE: drop the oldest immediately. (No exit animation
      // for this overflow case specifically — it's the rare 4th-distinct-
      // toast edge case, not the common close path, so this stays simple.)
      return next.length > MAX_VISIBLE ? next.slice(next.length - MAX_VISIBLE) : next;
    });
    return id;
  }, []);

  const value = React.useMemo(() => ({ toasts, show, dismiss }), [toasts, show, dismiss]);
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

function useToastContext() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error(
      "useToast() / NemoToastHost must be rendered inside <NemoToastProvider>. Mount <NemoToastProvider><NemoToastHost />...</NemoToastProvider> once near the app root."
    );
  }
  return ctx;
}

/**
 * `const { toast } = useToast()` — same call shape as sonner's `toast`
 * object, restricted to the 6 variants sonner.tsx itself wraps with dedupe
 * (`custom`/`promise`/`getHistory` etc. have no RN equivalent needed here).
 */
export function useToast() {
  const { show, dismiss } = useToastContext();
  return React.useMemo(
    () => ({
      toast: {
        success: (message: string, opts?: ToastOptions) => show("success", message, opts),
        // sonner/web calls this variant "error"; Nemo's token vocabulary
        // calls it "critical" everywhere else (Badge, Button) — same rename.
        error: (message: string, opts?: ToastOptions) => show("critical", message, opts),
        warning: (message: string, opts?: ToastOptions) => show("warning", message, opts),
        info: (message: string, opts?: ToastOptions) => show("info", message, opts),
        loading: (message: string, opts?: ToastOptions) => show("loading", message, opts),
        message: (message: string, opts?: ToastOptions) => show("message", message, opts),
      },
      dismiss,
    }),
    [show, dismiss]
  );
}

/** surface/text/border triplet per variant — see file header doc comment. */
function colorsFor(t: NemoTheme, type: ToastVariant) {
  switch (type) {
    case "success":
      return { bg: t.color.surface.semantic.success, fg: t.color.text.semantic.success, border: t.color.border.semantic.success };
    case "warning":
      return { bg: t.color.surface.semantic.warning, fg: t.color.text.semantic.warning, border: t.color.border.semantic.warning };
    case "critical":
      return { bg: t.color.surface.semantic.critical, fg: t.color.text.semantic.critical, border: t.color.border.semantic.critical };
    case "info":
      return { bg: t.color.surface.semantic.info, fg: t.color.text.semantic.info, border: t.color.border.semantic.info };
    case "loading":
      // Not a semantic color (mirrors web: `loading` reuses `muted`, not a
      // success/warning/critical/info tone). `muted` on web resolves to
      // surface.neutral.secondary / text.neutral.tertiary.
      return { bg: t.color.surface.neutral.secondary, fg: t.color.text.neutral.tertiary, border: t.color.border.neutral.main };
    case "message":
    default:
      // Plain/default toast — web reads this from --normal-bg/-border/-text,
      // itself set to surface.neutral.primary / border.neutral.main /
      // text.neutral.primary in styles.css.
      return { bg: t.color.surface.neutral.primary, fg: t.color.text.neutral.primary, border: t.color.border.neutral.main };
  }
}

function ToastCard({ item }: { item: ToastItem }) {
  const t = useNemoTheme();
  const { dismiss } = useToastContext();
  const { bg, fg, border } = colorsFor(t, item.type);
  const anim = React.useRef(new Animated.Value(0)).current;
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const animateOut = React.useCallback(
    (onDone: () => void) => {
      Animated.timing(anim, {
        toValue: 0,
        duration: 150,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start(onDone);
    },
    [anim]
  );

  const handleClose = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    animateOut(() => dismiss(item.id));
  }, [animateOut, dismiss, item.id]);

  // Entrance, once per mount.
  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-dismiss timer — re-armed whenever duration/id changes, which
  // covers the dedupe-update case (same id, new duration/message => timer
  // resets, matching sonner's own update-replaces-and-resets behavior).
  React.useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (item.duration === Infinity) return;
    timerRef.current = setTimeout(handleClose, item.duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id, item.duration, item.message]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [-16, 0] });

  return (
    <Animated.View
      style={[
        styles.card,
        nemoCardShadow,
        { backgroundColor: bg, borderColor: border },
        { opacity: anim, transform: [{ translateY }] },
      ]}
    >
      {/* Simple colored dot per variant (spec explicitly allows this instead
          of a Lucide-equivalent icon set) — reuses `fg` so it lines up with
          each variant's semantic text tone, same idea as `Badge`'s `dot`. */}
      <View style={[styles.dot, { backgroundColor: fg }]} />
      <Text style={[styles.message, { color: fg, fontSize: t.font.size["3"] }]} numberOfLines={3}>
        {item.message}
      </Text>
      <Pressable
        onPress={handleClose}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Fechar"
        style={[styles.closeButton, { backgroundColor: t.color.surface.neutral.primary, borderColor: t.color.border.neutral.main }]}
      >
        <Text style={[styles.closeGlyph, { color: t.color.text.neutral.primary }]}>×</Text>
      </Pressable>
    </Animated.View>
  );
}

export interface NemoToastHostProps {
  /**
   * Distance from the top of the screen. No `react-native-safe-area-context`
   * dependency here (repo rule: no new deps), so this is a plain numeric
   * default rather than a real safe-area inset — pass your own value (e.g.
   * from `useSafeAreaInsets().top` if the app already has that package) for
   * exact notch/status-bar alignment.
   */
  topOffset?: number;
}

/**
 * Renders the current toast queue, stacked at the top of the screen —
 * analogous to web's `<Toaster />`. Mount exactly once, near the app root,
 * inside `<NemoToastProvider>`.
 */
export function NemoToastHost({ topOffset }: NemoToastHostProps = {}) {
  const t = useNemoTheme();
  const { toasts } = useToastContext();
  const top =
    topOffset ?? (Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) + t.space["50"] : t.space["150"]);

  // Newest toast closest to the top edge (sonner's own stacking direction
  // for a top-anchored position).
  const ordered = [...toasts].reverse();

  return (
    <View
      pointerEvents="box-none"
      style={[styles.host, { top, paddingHorizontal: t.space["100"] }]}
    >
      {ordered.map((item) => (
        <ToastCard key={item.id} item={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
    flexShrink: 0,
  },
  message: {
    flex: 1,
    marginRight: 8,
  },
  closeButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  closeGlyph: {
    fontSize: 14,
    lineHeight: 16,
  },
});
