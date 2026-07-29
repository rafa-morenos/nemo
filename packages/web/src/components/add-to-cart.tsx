import * as React from "react";
import { Heart } from "lucide-react";
import { cn } from "../lib/utils";
import { DakiMinusIcon, DakiPlusIcon } from "../icons";

/**
 * Icons scoped to this component only (not part of the shared `icons-DakiApp`
 * catalog): real assets from the Figma "AddTo" component (node 3872:52310 in
 * "Daki App • Components — Design in Progress"). Plus/minus reuse the shared
 * `DakiPlusIcon`/`DakiMinusIcon` instead — same underlying Figma vector.
 */
function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.74628 2C6.40008 2 6.11942 2.26863 6.11942 2.6C6.11942 2.93137 6.40008 3.2 6.74628 3.2H9.25373C9.59993 3.2 9.88059 2.93137 9.88059 2.6C9.88059 2.26863 9.59993 2 9.25373 2H6.74628Z" fill="currentColor" />
      <path d="M6.50425 6.41542C6.84991 6.39679 7.1459 6.64988 7.16537 6.98073L7.38724 10.7511C7.40671 11.082 7.14228 11.3653 6.79662 11.3839C6.45096 11.4026 6.15497 11.1495 6.1355 10.8186L5.91363 7.04821C5.89416 6.71736 6.15859 6.43405 6.50425 6.41542Z" fill="currentColor" />
      <path d="M8.83672 6.98073C8.85619 6.64988 9.15219 6.39679 9.49784 6.41542C9.8435 6.43405 10.1079 6.71736 10.0885 7.04821L9.86659 10.8186C9.84712 11.1495 9.55113 11.4026 9.20547 11.3839C8.85981 11.3653 8.59538 11.082 8.61485 10.7511L8.83672 6.98073Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 4.4C2 4.06863 2.28066 3.8 2.62686 3.8H13.3731C13.7193 3.8 14 4.06863 14 4.4C14 4.73137 13.7193 5 13.3731 5H12.9553L12.1844 12.3791C12.0883 13.2993 11.2793 14 10.3131 14H5.68687C4.72072 14 3.91176 13.2993 3.81562 12.3791L3.04468 5H2.62686C2.28066 5 2 4.73137 2 4.4ZM4.30465 5H11.6954L10.9369 12.2597C10.9048 12.5664 10.6352 12.8 10.3131 12.8H5.68687C5.36482 12.8 5.09517 12.5664 5.06312 12.2597L4.30465 5Z" fill="currentColor" />
    </svg>
  );
}

function LoadingSpinnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 13.2796 13.3333" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12.4313 6.66667C12.9295 6.66667 13.3396 7.07235 13.2724 7.56599C13.1245 8.65247 12.7101 9.69064 12.0601 10.5852C11.2326 11.7242 10.0657 12.572 8.72678 13.007C7.38782 13.4421 5.94551 13.4421 4.60655 13.007C3.2676 12.572 2.10074 11.7242 1.27322 10.5852C0.445699 9.44625 -1.23079e-07 8.07453 0 6.66667C1.23079e-07 5.2588 0.4457 3.88708 1.27322 2.7481C2.10074 1.60911 3.2676 0.761343 4.60655 0.32629C5.65821 -0.0154142 6.77363 -0.0887334 7.85265 0.106332C8.34289 0.194958 8.60198 0.710385 8.44803 1.18419V1.18419C8.29408 1.65799 7.78457 1.90818 7.2905 1.84428C6.57945 1.7523 5.85299 1.81824 5.16405 2.04209C4.18744 2.35941 3.33635 2.97776 2.73277 3.80852C2.12918 4.63928 1.8041 5.63979 1.8041 6.66667C1.8041 7.69354 2.12918 8.69405 2.73277 9.52481C3.33635 10.3556 4.18743 10.9739 5.16405 11.2912C6.14066 11.6086 7.19267 11.6086 8.16928 11.2912C9.1459 10.9739 9.99699 10.3556 10.6006 9.52481C11.0264 8.93876 11.3136 8.26824 11.4458 7.56357C11.5377 7.07393 11.9331 6.66667 12.4313 6.66667V6.66667Z" fill="#1759FF" />
    </svg>
  );
}

/**
 * AddToCartButton — the "AddTo / Basket" flow from Figma (node 3872:52310):
 * a "+" pill before anything's in the cart, a spinner while adding, and a
 * quantity stepper once `quantity > 0` (trash instead of "−" at quantity 1,
 * since decrementing further removes the item). Stateless/controlled: the
 * caller owns `quantity` and reacts to the callbacks.
 */
export interface AddToCartButtonProps {
  /** 0 = not in the cart yet. */
  quantity: number;
  /** Shows the spinner in place of the "+" pill; no interaction. */
  loading?: boolean;
  disabled?: boolean;
  /** Tapped when quantity is 0. */
  onAdd?: () => void;
  /** Tapped "+" in the stepper. */
  onIncrement?: () => void;
  /** Tapped "−" (or the trash icon at quantity 1) in the stepper. */
  onDecrement?: () => void;
  className?: string;
}

const iconButtonClass =
  "flex size-4 shrink-0 items-center justify-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function AddToCartButton({
  quantity,
  loading = false,
  disabled = false,
  onAdd,
  onIncrement,
  onDecrement,
  className,
}: AddToCartButtonProps) {
  if (loading) {
    return (
      <button
        type="button"
        disabled
        aria-label="Adicionando ao carrinho"
        className={cn("flex h-[34px] w-[127px] items-center justify-center rounded-md bg-card", className)}
      >
        <LoadingSpinnerIcon className="size-4 animate-spin" />
      </button>
    );
  }

  if (quantity <= 0) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onAdd}
        aria-label="Adicionar ao carrinho"
        className={cn(
          "flex h-[34px] w-[127px] items-center justify-center rounded-md bg-card text-foreground transition-opacity",
          "hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
      >
        <DakiPlusIcon className="size-4" />
      </button>
    );
  }

  return (
    <div className={cn("flex items-center gap-3 rounded-md bg-primary p-2.5 text-primary-foreground", className)}>
      <button
        type="button"
        onClick={onDecrement}
        aria-label={quantity === 1 ? "Remover do carrinho" : "Diminuir quantidade"}
        className={iconButtonClass}
      >
        {quantity === 1 ? <TrashIcon className="size-4" /> : <DakiMinusIcon className="size-4" />}
      </button>
      <span className="min-w-[1.5ch] text-center text-sm font-bold">{quantity}</span>
      <button type="button" onClick={onIncrement} aria-label="Aumentar quantidade" className={iconButtonClass}>
        <DakiPlusIcon className="size-4" />
      </button>
    </div>
  );
}

/** CartCountBadge — the read-only "State=Count" variant: a plain quantity label, no buttons. */
export interface CartCountBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count: number;
}

export function CartCountBadge({ count, className, ...props }: CartCountBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2.5 text-sm font-bold text-primary",
        className
      )}
      {...props}
    >
      X {count}
    </span>
  );
}

/** FavoriteButton — the "AddTo / AddList" flow: a heart toggle (outline ↔ filled). */
export interface FavoriteButtonProps {
  active: boolean;
  onToggle?: () => void;
  disabled?: boolean;
  className?: string;
}

export function FavoriteButton({ active, onToggle, disabled, className }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={active}
      aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={cn(
        "flex h-[34px] w-[127px] items-center justify-center rounded-md transition-opacity",
        active ? "bg-primary text-primary-foreground" : "bg-card text-foreground",
        "hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      <Heart className="size-5" fill={active ? "currentColor" : "none"} />
    </button>
  );
}
