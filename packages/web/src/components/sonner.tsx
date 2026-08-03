import { Toaster as Sonner, toast as sonnerToast, type ToasterProps, type ExternalToast } from "sonner";

/**
 * Named duration levels — same vocabulary the Jake (Raio App/Flutter) toast
 * already uses (short/medium/long/persistent), adopted as the Nemo-wide
 * standard instead of loose ms values per call-site: one place to retune a
 * level later, and the call-site reads as intent ("this is important, stays
 * longer") instead of a magic number. `persistent` maps to sonner's own
 * `Infinity` duration (never auto-dismisses).
 */
const TOAST_DURATION = {
  short: 3000,
  medium: 5000,
  long: 10000,
  persistent: Infinity,
} as const;

type ToastMessage = Parameters<typeof sonnerToast>[0];
type ToastData = ExternalToast | undefined;

/**
 * Wraps a sonner toast function so repeated calls with the *same text*
 * (per variant) update the existing toast instead of stacking a duplicate —
 * mirrors the Jake toast's text+type dedupe, and matches what
 * toast-design-guide-cenarios.html itself recommends ("adotar dedupe como
 * padrão evita spam de toasts iguais"). Built on sonner's own id-based
 * replace (calling toast(msg, { id }) updates the toast with that id if one
 * already exists, instead of adding a new one) — no dedupe logic invented,
 * just this existing mechanism used with a derived key. Only applies when
 * the message is a plain string: JSX/function titles have no safe stable key
 * to derive, so those pass through unchanged. Callers can still pass their
 * own `id` to opt out or pick a different dedupe key.
 */
function withDedupe(fn: (message: ToastMessage, data?: ToastData) => string | number, type: string) {
  return (message: ToastMessage, data?: ToastData) => {
    if (data?.id !== undefined || typeof message !== "string") return fn(message, data);
    return fn(message, { ...data, id: `${type}:${message}` });
  };
}

/**
 * Same API as sonner's `toast`, but `success`/`error`/`warning`/`info`/
 * `loading`/`message` (and the default call) auto-dedupe — see
 * `withDedupe` above. `custom`/`promise`/`dismiss`/`getHistory`/`getToasts`
 * pass through unchanged: they don't take a plain message, so there's no
 * safe key to dedupe on.
 */
const toast = Object.assign(withDedupe(sonnerToast, "default"), {
  success: withDedupe(sonnerToast.success, "success"),
  error: withDedupe(sonnerToast.error, "error"),
  warning: withDedupe(sonnerToast.warning, "warning"),
  info: withDedupe(sonnerToast.info, "info"),
  loading: withDedupe(sonnerToast.loading, "loading"),
  message: withDedupe(sonnerToast.message, "message"),
  custom: sonnerToast.custom,
  promise: sonnerToast.promise,
  dismiss: sonnerToast.dismiss,
  getHistory: sonnerToast.getHistory,
  getToasts: sonnerToast.getToasts,
});

/**
 * Toaster — wraps `sonner`, themed with Nemo tokens. Reads light/dark from the
 * `.dark` class on <html> (no next-themes dependency). Render <Toaster /> once
 * at the app root, then call `toast(...)`.
 *
 * `position="top-right"` and `duration={TOAST_DURATION.short}` are explicit,
 * deliberate choices (sonner's own defaults are `bottom-right` / `4000`) —
 * not sonner's defaults left untouched. `top-right` and `top-center` render
 * identically below sonner's own 600px mobile breakpoint (the toast becomes
 * a full-width bar there regardless of x-position, only the y-side —
 * top/bottom — matters), so one static value covers both desktop and mobile
 * without a media-query hook.
 *
 * `closeButton` is on for every toast (sonner defaults it OFF) — none of the
 * 5 products agree on this today (Daki Web disables it entirely, others are
 * inconsistent per screen), so this makes it a single deliberate answer
 * instead of inherited inconsistency. `swipeDirections={["top","right"]}`
 * makes explicit what sonner would already infer silently from `position`
 * (so it stays correct and documented if `position` ever changes) — swipe-
 * to-dismiss itself needs no extra code, sonner enables it by default.
 * `toastOptions.closeButtonAriaLabel` localizes the close button's
 * announced label to "Fechar" — sonner 1.x hardcoded it to "Close toast"
 * with no override; this needed bumping to sonner 2.x (`ToastClassnames`
 * and the `toast` API are unchanged between the two, confirmed against the
 * published type definitions before upgrading, so this was a real fix, not
 * a workaround). Bonus from the same upgrade: sonner 2.x auto-hides the
 * close button on `loading`-type toasts, which we hadn't set up ourselves.
 *
 * `visibleToasts={3}` is explicit even though it's also sonner's own
 * default — max 3 stacked at once was a deliberate decision (matches the
 * Daki App DS precedent; HUBR allows 5, Jake queues 1-at-a-time with
 * dedupe instead of stacking), not an untouched default left to chance. If
 * sonner ever changes that default, this keeps the decision pinned.
 *
 * `success`/`error`/`warning`/`info`/`loading` (sonner's native `toast.<type>()`
 * variants) get the same "soft" tonal look `Badge`'s `variant="filled"` uses — the
 * `*-soft`/`*-soft-foreground` pair plus the semantic border, not the DEFAULT
 * icon-semantic tone (that one tonal-flips for icons/borders, not a background)
 * and not the `-fixed` pins (those are for a solid bg, which these toasts
 * aren't). `error` maps to Tailwind's `destructive` role (sonner's naming;
 * Nemo calls it `critical` — see badge.tsx). `info` has no `-soft` suffix
 * because the preset's `info.DEFAULT`/`info.foreground` are already the tonal
 * surface/text pair (reused as-is, same as Badge's info). `loading` isn't a
 * semantic color per the toast analysis docs, so it reuses `muted` rather than
 * inventing one. Sonner's built-in per-type icons use `fill="currentColor"`,
 * so they pick up each variant's text color automatically.
 *
 * The `!` (important) prefix on every color/weight utility below is load-
 * bearing: sonner 2.x removed every `:where()` wrapper its own stylesheet
 * used to have (confirmed directly in `dist/styles.css` — zero matches now,
 * versus the 1.x version this component originally shipped against).
 * `[data-title]`/`[data-description]`/`[data-button]`/`[data-close-button]`/
 * the base toast rule are now plain selectors with real specificity, so
 * without `!` sonner's own font-weight/color wins outright — this silently
 * broke `title`'s font-weight and `description`'s color when upgrading from
 * 1.7 to 2.0, caught by re-checking computed styles in Storybook rather than
 * trusting the diff alone.
 *
 * Notably, `classNames.toast` below does NOT set background/text/border —
 * that's deliberately left to sonner's own base rule (which reads
 * `--normal-bg`/`--normal-border`/`--normal-text`), with those three custom
 * properties redefined to real Nemo tokens in `styles.css` instead. Reason:
 * a typed toast (success/error/...) gets *both* `classNames.toast` and
 * `classNames[type]` on the same element — if `toast` also carried
 * `!bg-popover` etc., two of our own `!important` Tailwind classes would tie
 * on the same property, and Tailwind resolves same-specificity `!important`
 * ties by JIT class-discovery order, not by anything under our control (this
 * broke `info`/`error` while `success`/`warning` happened to still work, from
 * one single change — verified via `document.styleSheets` before settling on
 * the CSS custom-property route instead of chasing utility order). Overriding the custom properties directly means there's no
 * competing class at all for the untyped case, and the type-specific classes
 * below only ever need to beat sonner's own (non-`!important`) rule, which
 * `!important` does unconditionally regardless of source order.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const theme =
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-right"
      duration={TOAST_DURATION.short}
      visibleToasts={3}
      closeButton
      swipeDirections={["top", "right"]}
      className="toaster group"
      toastOptions={{
        closeButtonAriaLabel: "Fechar",
        classNames: {
          // No background/text/border here on purpose — see the doc comment
          // above. That comes from sonner's own --normal-bg/--normal-border/
          // --normal-text, redefined to real Nemo tokens in styles.css.
          toast: "group toast group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
          // Same title/description split as alert.tsx: title heavier than
          // description, both on the same text-sm from Nemo's type scale
          // (sonner's own default is an unstyled hardcoded 13px). Weight uses
          // the real generated --nemo-font-weight-semi-bold var via an
          // arbitrary-value class, not Tailwind's font-semibold utility:
          // tailwind.preset.js has no fontWeight mapping yet (repo-wide gap,
          // every component today uses the raw Tailwind utility instead of a
          // token) — this keeps Toast itself tied to a real token without
          // taking on the larger, separate fix of wiring fontWeight into the
          // shared preset.
          title: "group-[.toast]:text-sm group-[.toast]:![font-weight:var(--nemo-font-weight-semi-bold)]",
          description: "group-[.toast]:text-sm group-[.toast]:!text-muted-foreground",
          actionButton: "group-[.toast]:!bg-primary group-[.toast]:!text-primary-foreground",
          cancelButton: "group-[.toast]:!bg-muted group-[.toast]:!text-muted-foreground",
          // Neutral on every variant, not tinted per type — matches the Jake
          // toast's own close icon (a fixed neutral gray in the dev spec,
          // regardless of success/warning/error). Needs `!` for the same
          // specificity-tie reason as the variant colors above: sonner's own
          // stylesheet styles `[data-close-button]` with a plain attribute
          // selector (same specificity as this class), so the load order
          // between that stylesheet and Tailwind's decides the winner
          // without it.
          closeButton:
            "group-[.toaster]:!bg-popover group-[.toaster]:!text-popover-foreground group-[.toaster]:!border-border",
          success:
            "group-[.toaster]:!bg-success-soft group-[.toaster]:!text-success-soft-foreground group-[.toaster]:!border-success-border",
          error:
            "group-[.toaster]:!bg-destructive-soft group-[.toaster]:!text-destructive-soft-foreground group-[.toaster]:!border-destructive-border",
          warning:
            "group-[.toaster]:!bg-warning-soft group-[.toaster]:!text-warning-soft-foreground group-[.toaster]:!border-warning-border",
          info: "group-[.toaster]:!bg-info group-[.toaster]:!text-info-foreground group-[.toaster]:!border-info-border",
          loading:
            "group-[.toaster]:!bg-muted group-[.toaster]:!text-muted-foreground group-[.toaster]:!border-border",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast, TOAST_DURATION };
