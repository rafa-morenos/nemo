import * as React from "react";
import { cn } from "../../lib/utils";
import {
  BellIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DotsIcon,
  EyeIcon,
  PersonIcon,
  PlusIcon,
} from "./icons";

/**
 * KanbanTaskCard — the "Task" card from the HUBR "Orders Card" set.
 * Expanded shows title + progress stepper + checklist + assignees; collapsed
 * shows just the title block. Accent border uses the Nemo brand token.
 */

export type TaskStatus = "done" | "todo" | "canceled";

export interface TaskItem {
  title: string;
  description?: string;
  status: TaskStatus;
  checked?: boolean;
  disabled?: boolean;
}

export interface KanbanTaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
  createdLabel?: string;
  title: string;
  description?: string;
  collapsed?: boolean;
  tasksLabel?: string;
  timeLeft?: string;
  progress?: { done: number; total: number };
  tasks?: TaskItem[];
  assignees?: string[];
  updatedLabel?: string;
}

const statusStyle: Record<TaskStatus, { bg: string; label: string; muted?: boolean }> = {
  done: { bg: "var(--nemo-color-surface-accent-primary)", label: "Realizada" },
  todo: { bg: "var(--nemo-color-surface-semantic-warning)", label: "A fazer" },
  canceled: { bg: "var(--nemo-color-surface-neutral-secondary)", label: "Cancelada", muted: true },
};

function ActionIcons() {
  return (
    <div className="flex shrink-0 items-center gap-2 text-muted-foreground">
      <DotsIcon className="size-4" />
      <EyeIcon className="size-4" />
      <PlusIcon className="size-4" />
      <PersonIcon className="size-4" />
      <BellIcon className="size-4" />
    </div>
  );
}

function Checkbox({ checked, disabled }: { checked?: boolean; disabled?: boolean }) {
  return (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-sm border-2",
        disabled
          ? "border-transparent bg-secondary"
          : checked
            ? "border-transparent bg-primary text-primary-foreground"
            : "border-border"
      )}
    >
      {checked && !disabled && <CheckIcon className="size-3.5" />}
    </span>
  );
}

function ProgressStepper({ done, total }: { done: number; total: number }) {
  const segments = 10;
  const filled = total > 0 ? Math.round((done / total) * segments) : 0;
  return (
    <div className="flex w-full items-center gap-2">
      <div className="flex h-1 min-w-0 flex-1 overflow-clip rounded-full">
        {Array.from({ length: segments }).map((_, i) => (
          <span
            key={i}
            className={cn("h-1 flex-1", i < filled ? "bg-primary" : "bg-secondary")}
          />
        ))}
      </div>
      <span className="shrink-0 text-xs leading-4 text-foreground">
        {done}/{total}
      </span>
    </div>
  );
}

function ChecklistRow({ item }: { item: TaskItem }) {
  const st = statusStyle[item.status];
  return (
    <div className={cn("flex h-10 items-center gap-4", item.disabled && "opacity-40")}>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Checkbox checked={item.checked} disabled={item.disabled} />
        <span className="shrink-0 truncate text-sm text-foreground">{item.title}</span>
        {item.description && (
          <span className="min-w-0 flex-1 truncate text-sm text-foreground">{item.description}</span>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <ActionIcons />
        <span
          className={cn(
            "flex items-center rounded-full px-2 py-1 text-sm",
            st.muted ? "text-muted-foreground" : "text-foreground"
          )}
          style={{ background: st.bg }}
        >
          {st.label}
        </span>
      </div>
    </div>
  );
}

const KanbanTaskCard = React.forwardRef<HTMLDivElement, KanbanTaskCardProps>(
  (
    {
      className,
      createdLabel = "Criado há dois dias",
      title,
      description,
      collapsed = false,
      tasksLabel,
      timeLeft,
      progress,
      tasks = [],
      assignees = [],
      updatedLabel,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{ borderLeftColor: "var(--nemo-color-brand-default)" }}
        className={cn(
          "flex w-full flex-col gap-2 overflow-clip rounded-lg border-l-4 bg-card py-2 pl-4 pr-2 shadow-sm",
          className
        )}
        {...props}
      >
        {/* Title area */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <p className="min-w-0 flex-1 text-sm leading-5 text-foreground">{createdLabel}</p>
            <div className="flex shrink-0 items-center gap-2 text-muted-foreground">
              <DotsIcon className="size-4" />
              <EyeIcon className="size-4" />
              <PlusIcon className="size-4" />
              <PersonIcon className="size-4" />
              <BellIcon className="size-4" />
              {collapsed ? <ChevronDownIcon className="size-4" /> : <ChevronUpIcon className="size-4" />}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {/* Owners Text (Nemo heading family) */}
            <p className="font-heading text-lg font-medium leading-tight text-foreground">{title}</p>
            {description && (
              <p className="text-sm font-semibold leading-5 text-foreground">{description}</p>
            )}
          </div>
        </div>

        {!collapsed && (
          <>
            <div className="h-px w-full bg-border" />

            {/* Tasks + progress */}
            {(tasksLabel || progress) && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <p className="min-w-0 flex-1 text-sm font-semibold leading-5 text-foreground">
                    {tasksLabel}
                  </p>
                  {timeLeft && (
                    <p className="shrink-0 text-right text-sm leading-5 text-foreground">{timeLeft}</p>
                  )}
                  <ActionIcons />
                </div>
                {progress && <ProgressStepper {...progress} />}
              </div>
            )}

            {/* Checklist */}
            {tasks.length > 0 && (
              <div className="flex flex-col">
                {tasks.map((t, i) => (
                  <ChecklistRow key={i} item={t} />
                ))}
              </div>
            )}

            {/* Assignees */}
            {assignees.length > 0 && (
              <>
                <div className="h-px w-full bg-border" />
                <div className="flex flex-col gap-2">
                  {assignees.map((name, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <PersonIcon className="size-4 text-foreground" />
                      <span className="text-sm font-semibold leading-5 text-foreground">{name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Bottom */}
            {updatedLabel && (
              <p className="w-full text-right text-xs leading-4 text-foreground">{updatedLabel}</p>
            )}
          </>
        )}
      </div>
    );
  }
);
KanbanTaskCard.displayName = "KanbanTaskCard";

export { KanbanTaskCard };
