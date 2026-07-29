import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNemoTheme, nemoCardShadow, type NemoTheme } from "./theme";
import { nemoFontFamily } from "./fonts";
import { CheckIcon, PersonIcon, ChevronUpIcon, ChevronDownIcon } from "./icons";

export type TaskStatus = "done" | "todo" | "canceled";
export interface TaskItem {
  title: string;
  description?: string;
  status: TaskStatus;
  checked?: boolean;
  disabled?: boolean;
}
export interface KanbanTaskCardProps {
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

export function KanbanTaskCard({
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
}: KanbanTaskCardProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);

  const statusBg: Record<TaskStatus, string> = {
    done: t.color.surface.accent.primary,
    todo: t.color.surface.semantic.warning,
    canceled: t.color.surface.neutral.secondary,
  };
  const statusLabel: Record<TaskStatus, string> = { done: "Realizada", todo: "A fazer", canceled: "Cancelada" };

  const segments = 10;
  const filled = progress && progress.total > 0 ? Math.round((progress.done / progress.total) * segments) : 0;

  return (
    <View style={[s.card, nemoCardShadow]}>
      <View style={s.titleArea}>
        <View style={s.topRow}>
          <Text style={s.created} numberOfLines={1}>{createdLabel}</Text>
          {collapsed ? <ChevronDownIcon size={16} color={t.color.text.neutral.secondary} /> : <ChevronUpIcon size={16} color={t.color.text.neutral.secondary} />}
        </View>
        <Text style={s.title}>{title}</Text>
        {description ? <Text style={s.description}>{description}</Text> : null}
      </View>

      {!collapsed && (
        <>
          <View style={s.divider} />

          {(tasksLabel || progress) && (
            <View style={{ gap: t.space["50"] }}>
              <View style={s.tasksRow}>
                <Text style={s.tasksLabel}>{tasksLabel}</Text>
                {timeLeft ? <Text style={s.timeLeft}>{timeLeft}</Text> : null}
              </View>
              {progress && (
                <View style={s.progressRow}>
                  <View style={s.progressTrack}>
                    {Array.from({ length: segments }).map((_, i) => (
                      <View
                        key={i}
                        style={[s.segment, { backgroundColor: i < filled ? t.color.interactive.accent.primary.main : t.color.surface.neutral.secondary }]}
                      />
                    ))}
                  </View>
                  <Text style={s.progressLabel}>{progress.done}/{progress.total}</Text>
                </View>
              )}
            </View>
          )}

          {tasks.map((item, i) => (
            <View key={i} style={[s.taskRow, item.disabled && { opacity: 0.4 }]}>
              <View style={s.taskLeft}>
                <View
                  style={[
                    s.checkbox,
                    item.disabled
                      ? { backgroundColor: t.color.surface.neutral.secondary, borderColor: "transparent" }
                      : item.checked
                        ? { backgroundColor: t.color.interactive.accent.primary.main, borderColor: "transparent" }
                        : { borderColor: t.color.border.neutral.main },
                  ]}
                >
                  {item.checked && !item.disabled ? <CheckIcon size={14} color={t.color.interactive.accent.primary.inverted} /> : null}
                </View>
                <Text style={s.taskTitle} numberOfLines={1}>{item.title}</Text>
                {item.description ? <Text style={s.taskDesc} numberOfLines={1}>{item.description}</Text> : null}
              </View>
              <View style={[s.statusPill, { backgroundColor: statusBg[item.status] }]}>
                <Text style={[s.statusText, item.status === "canceled" && { color: t.color.text.neutral.secondary }]}>
                  {statusLabel[item.status]}
                </Text>
              </View>
            </View>
          ))}

          {assignees.length > 0 && (
            <>
              <View style={s.divider} />
              {assignees.map((name, i) => (
                <View key={i} style={s.assignee}>
                  <PersonIcon size={16} color={t.color.text.neutral.primary} />
                  <Text style={s.assigneeName}>{name}</Text>
                </View>
              ))}
            </>
          )}

          {updatedLabel ? <Text style={s.updated}>{updatedLabel}</Text> : null}
        </>
      )}
    </View>
  );
}

// RN's `fontWeight` style prop takes a string; `t.font.weight.*` is numeric
// (shared with web/Flutter), so cast at the point of use.
const fw = (n: number) => String(n) as "400" | "500" | "600";

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    card: {
      width: "100%",
      borderLeftWidth: t.borderWidth.lg,
      borderLeftColor: t.color.interactive.accent.primary.main,
      borderRadius: t.radius.lg,
      backgroundColor: t.color.surface.neutral.tertiary,
      paddingLeft: t.space["100"],
      paddingRight: t.space["50"],
      paddingVertical: t.space["50"],
      gap: t.space["50"],
      overflow: "hidden",
    },
    titleArea: { gap: t.space["50"] },
    topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    created: { flex: 1, fontSize: t.font.size["3"], color: t.color.text.neutral.primary },
    // web's title is text-lg/font-medium (20/500) — was 18 with no weight set, drifted from web.
    title: { fontSize: t.font.size["6"], fontWeight: fw(t.font.weight.medium), fontFamily: nemoFontFamily.heading, color: t.color.text.neutral.primary },
    description: { fontSize: t.font.size["3"], fontWeight: fw(t.font.weight["semi-bold"]), color: t.color.text.neutral.primary },
    divider: { height: StyleSheet.hairlineWidth, backgroundColor: t.color.border.neutral.main },
    // web's tasksRow is `gap-4` (16) — was unset, timeLeft/label had no spacing on RN.
    tasksRow: { flexDirection: "row", alignItems: "center", gap: t.space["100"] },
    tasksLabel: { flex: 1, fontSize: t.font.size["3"], fontWeight: fw(t.font.weight["semi-bold"]), color: t.color.text.neutral.primary },
    timeLeft: { fontSize: t.font.size["3"], color: t.color.text.neutral.primary },
    progressRow: { flexDirection: "row", alignItems: "center", gap: t.space["50"] },
    // web's track is `rounded-full` — was 200, doesn't match any radius token.
    progressTrack: { flex: 1, flexDirection: "row", height: t.space["25"], borderRadius: t.radius.pill, overflow: "hidden" },
    segment: { flex: 1, height: t.space["25"] },
    progressLabel: { fontSize: t.font.size["2"], color: t.color.text.neutral.primary },
    taskRow: { flexDirection: "row", alignItems: "center", height: t.space["250"], gap: t.space["100"] },
    taskLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: t.space["50"] },
    // web's checkbox is `rounded-sm border-2` — radius was 6, doesn't match any radius token (sm=4).
    checkbox: { width: t.space["125"], height: t.space["125"], borderRadius: t.radius.sm, borderWidth: t.borderWidth.md, alignItems: "center", justifyContent: "center" },
    taskTitle: { fontSize: t.font.size["3"], color: t.color.text.neutral.primary },
    taskDesc: { flex: 1, fontSize: t.font.size["3"], color: t.color.text.neutral.primary },
    // web's status pill is `rounded-full` — was 40, doesn't match any radius token.
    statusPill: { borderRadius: t.radius.pill, paddingHorizontal: t.space["50"], paddingVertical: t.space["25"] },
    statusText: { fontSize: t.font.size["3"], color: t.color.text.neutral.primary },
    assignee: { flexDirection: "row", alignItems: "center", gap: t.space["25"] },
    assigneeName: { fontSize: t.font.size["3"], fontWeight: fw(t.font.weight["semi-bold"]), color: t.color.text.neutral.primary },
    updated: { textAlign: "right", fontSize: t.font.size["2"], color: t.color.text.neutral.primary },
  });
}
