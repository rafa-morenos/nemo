import { Toaster as Sonner, toast, type ToasterProps } from "sonner";

/**
 * Toaster — wraps `sonner`, themed with Nemo tokens. Reads light/dark from the
 * `.dark` class on <html> (no next-themes dependency). Render <Toaster /> once
 * at the app root, then call `toast(...)`.
 *
 * `success`/`error`/`warning`/`info`/`loading` (sonner's native `toast.<type>()`
 * variants) get the same "soft" tonal look `Badge`'s `type="filled"` uses —
 * the surface-semantic-* and text-semantic-* pair, plus semantic border, NOT
 * the icon-semantic-* tokens (those invert tonally in dark mode and aren't
 * meant for a solid background — see CLAUDE.md "Como os tokens funcionam") and
 * NOT the `-fixed` pins (those are for a strong/solid bg, which these toasts
 * aren't). `error` maps to the `destructive` role (sonner's naming; Nemo's
 * alias calls it `critical`/`destructive` — see badge.tsx). `info` has no
 * `-soft` suffix because the preset's `info.DEFAULT` is already the tonal
 * surface (reused as-is, same as Badge's info). `loading` isn't a semantic
 * color in the source analysis (`toast-design-guide-cenarios.html` renders it
 * neutral/grey), so it reuses `muted` rather than inventing a color. Sonner's
 * built-in per-type icons use `fill="currentColor"`, so they pick up each
 * variant's text color automatically — no icon overrides needed.
 *
 * The `!` (important) prefix on every variant color utility below is load-
 * bearing, not decoration: sonner renders each toast's per-type classNames
 * (`success`/`error`/...) on the *same element* as the base `toast` classNames,
 * both as plain `group-[.toaster]:` utilities of equal specificity — so the
 * winner is decided by Tailwind's generated stylesheet order, which follows
 * color-key order in `tailwind.preset.js`, not by which `classNames` key you
 * wrote it in. `popover`/`border`/`foreground` are declared after
 * `success`/`warning`/`info`/`destructive` there, so without `!` the base
 * `toast` style (`bg-popover`/`border-border`/`text-popover-foreground`)
 * silently wins and every toast renders as the generic gray card — confirmed
 * visually in Storybook before adding this.
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
