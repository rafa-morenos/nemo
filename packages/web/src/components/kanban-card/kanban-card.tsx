import * as React from "react";
import { cn } from "../../lib/utils";
import { ClockIcon, PinIcon } from "./icons";

/**
 * KanbanCard — Order & Stacking cards from the HUBR "Orders Card" set.
 * Order and Stacking share the same anatomy; Stacking adds the grouped-delivery
 * footer. Urgency (default/waning/critical) and mode (core/agendado/superdaki)
 * drive the accent color + tint, all mapped to Nemo tokens.
 */

export type KanbanUrgency = "default" | "waning" | "critical";
export type KanbanMode = "core" | "agendado" | "superdaki";

type Tone = "default" | "warning" | "danger" | "brand" | "success";

const toneVar: Record<Tone, string> = {
  default: "var(--nemo-color-text-neutral-primary)",
  warning: "var(--nemo-color-icon-semantic-warning)",
  danger: "var(--nemo-color-icon-semantic-critical)",
  brand: "var(--nemo-color-interactive-accent-primary-main)",
  success: "var(--nemo-color-icon-semantic-success)",
};

const urgencyStyle: Record<KanbanUrgency, { accent: string; bg: string }> = {
  default: { accent: "var(--nemo-color-text-neutral-tertiary)", bg: "var(--nemo-color-surface-neutral-primary)" },
  waning: { accent: "var(--nemo-color-icon-semantic-warning)", bg: "var(--nemo-color-surface-semantic-warning)" },
  critical: { accent: "var(--nemo-color-icon-semantic-critical)", bg: "var(--nemo-color-surface-semantic-critical)" },
};

export interface KanbanTimer {
  label: string;
  dot?: boolean;
}

export interface KanbanAssignment {
  label: string;
  value: string;
  tone?: Tone;
}

export interface KanbanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "order" (no footer) or "stacking" (grouped-delivery footer). */
  variant?: "order" | "stacking";
  urgency?: KanbanUrgency;
  mode?: KanbanMode;
  orderId: string;
  timers?: KanbanTimer[];
  /** Top scheduled badge text, e.g. "Agendado • 15:00 a 15:30". */
  scheduled?: string;
  clientName: string;
  clientBadge?: string;
  address: string;
  neighborhood: string;
  shopper: KanbanAssignment;
  rider: KanbanAssignment;
  /** Grouped-delivery footer (stacking). */
  groupedLabel?: string;
  onGroupedClick?: () => void;
  /** Stacking=On — render peeking sheets behind the card (grouped orders). */
  stacked?: boolean;
}

function Pill({
  children,
  dot,
  className,
}: {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-sm font-semibold text-foreground",
        className
      )}
    >
      {dot && <span className="size-2 shrink-0 rounded-full bg-foreground" />}
      {children}
    </span>
  );
}

function Divider() {
  return <div className="h-px w-full shrink-0 bg-border" />;
}

function Assignment({ label, value, tone = "default" }: KanbanAssignment) {
  return (
    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
      <p className="truncate text-md font-regular leading-6 text-foreground">{label}</p>
      <p
        className="truncate text-md font-semibold leading-6"
        style={{ color: toneVar[tone] }}
      >
        {value}
      </p>
    </div>
  );
}

const KanbanCard = React.forwardRef<HTMLDivElement, KanbanCardProps>(
  (
    {
      className,
      variant = "order",
      urgency = "default",
      mode = "core",
      orderId,
      timers = [],
      scheduled,
      clientName,
      clientBadge,
      address,
      neighborhood,
      shopper,
      rider,
      groupedLabel = "Entrega agrupada",
      onGroupedClick,
      stacked = false,
      ...props
    },
    ref
  ) => {
    const isStacking = variant === "stacking";
    // Accent: urgency wins; else superdaki→brand; else neutral.
    const accent =
      urgency !== "default"
        ? urgencyStyle[urgency].accent
        : mode === "superdaki"
          ? "var(--nemo-color-interactive-accent-primary-main)"
          : urgencyStyle.default.accent;
    const bg =
      urgency !== "default"
        ? urgencyStyle[urgency].bg
        : mode === "superdaki"
          ? "var(--nemo-color-surface-accent-primary)"
          : "var(--nemo-color-surface-neutral-primary)";

    const card = (
      <div
        ref={ref}
        style={{ borderLeftColor: accent, background: bg }}
        className={cn(
          "relative z-[2] flex w-full flex-col gap-2 overflow-clip rounded-lg border-l-4 py-2 pl-4 pr-2 shadow-sm",
          className
        )}
        {...props}
      >
        {/* Scheduled top badge (agendado mode) */}
        {scheduled && (
          <Pill className="w-full">
            <ClockIcon className="size-4 shrink-0" />
            {scheduled}
          </Pill>
        )}

        {/* Header: order id + timers */}
        <div className="flex w-full flex-wrap items-center justify-between gap-y-1">
          <p className="text-md font-semibold leading-6 text-foreground">{orderId}</p>
          {timers.length > 0 && (
            <div className="flex shrink-0 items-center gap-1">
              {timers.map((t, i) => (
                <Pill key={i} dot={t.dot}>
                  {t.label}
                </Pill>
              ))}
            </div>
          )}
        </div>

        {/* Client */}
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center gap-2">
            <p className="min-w-0 flex-1 truncate text-md font-semibold leading-6 text-foreground">
              {clientName}
            </p>
            {clientBadge && <Pill>{clientBadge}</Pill>}
          </div>
          <div className="flex w-full flex-col gap-1">
            <p className="truncate text-md font-medium leading-6 text-foreground">{address}</p>
            <p className="truncate text-md font-medium leading-6 text-muted-foreground">
              {neighborhood}
            </p>
          </div>
        </div>

        <Divider />

        {/* Assign area */}
        <div className="flex w-full items-center gap-4">
          <Assignment {...shopper} />
          <Assignment {...rider} />
        </div>

        {/* Grouped-delivery footer (stacking) */}
        {isStacking && (
          <>
            <Divider />
            <button
              type="button"
              onClick={onGroupedClick}
              style={{ background: accent }}
              className="flex w-full items-center justify-center gap-2 rounded-full p-1 text-md font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <PinIcon className="size-6 shrink-0" />
              {groupedLabel}
            </button>
          </>
        )}
      </div>
    );

    if (!stacked) return card;

    // Stacking=On — peeking sheets behind, suggesting grouped orders.
    return (
      <div className="relative w-full">
        <div
          aria-hidden
          style={{ borderLeftColor: accent }}
          className="absolute inset-x-2 -bottom-2 top-2 z-0 rounded-lg border-l-4 bg-card opacity-60 shadow-sm"
        />
        <div
          aria-hidden
          style={{ borderLeftColor: accent }}
          className="absolute inset-x-1 -bottom-1 top-1 z-[1] rounded-lg border-l-4 bg-card opacity-80 shadow-sm"
        />
        {card}
      </div>
    );
  }
);
KanbanCard.displayName = "KanbanCard";

export { KanbanCard };
