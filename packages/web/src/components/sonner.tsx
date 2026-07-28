import { Toaster as Sonner, toast, type ToasterProps } from "sonner";

/**
 * Toaster — wraps `sonner`, themed with Nemo tokens. Reads light/dark from the
 * `.dark` class on <html> (no next-themes dependency). Render <Toaster /> once
 * at the app root, then call `toast(...)`.
 *
 * `success`/`error`/`warning`/`info`/`loading` (sonner's native `toast.<type>()`
 * variants) get the same "soft" tonal look `Badge`'s `type="filled"` uses — the
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
 * The `!` (important) prefix on every variant color utility below is load-
 * bearing: sonner puts the base `toast` classNames and the per-type
 * classNames (`success`/`error`/...) on the *same element*, both as
 * `group-[.toaster]:` utilities of equal specificity — so the winner is
 * whichever comes later in the generated stylesheet, which follows
 * `tailwind.preset.js`'s color-key order, not which `classNames` key you
 * wrote it in. `popover`/`border`/`foreground` are declared before the
 * semantic colors there, so without `!` the base `toast` style would win and
 * every toast would render as the generic gray card.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const theme =
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
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

export { Toaster, toast };
