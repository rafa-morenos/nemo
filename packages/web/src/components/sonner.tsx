import { Toaster as Sonner, toast, type ToasterProps } from "sonner";

/**
 * Toaster — wraps `sonner`, themed with Nemo tokens. Reads light/dark from the
 * `.dark` class on <html> (no next-themes dependency). Render <Toaster /> once
 * at the app root, then call `toast(...)`.
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
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
