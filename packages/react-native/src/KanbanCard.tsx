import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNemoTheme, nemoCardShadow, type NemoTheme } from "./theme";
import { PinIcon, ClockIcon } from "./icons";

export type KanbanUrgency = "default" | "waning" | "critical";
export type KanbanMode = "core" | "agendado" | "superdaki";
type Tone = "default" | "warning" | "danger" | "brand" | "success";

export interface KanbanTimer {
  label: string;
  dot?: boolean;
}
export interface KanbanAssignment {
  label: string;
  value: string;
  tone?: Tone;
}
export interface KanbanCardProps {
  variant?: "order" | "stacking";
  urgency?: KanbanUrgency;
  mode?: KanbanMode;
  orderId: string;
  timers?: KanbanTimer[];
  scheduled?: string;
  clientName: string;
  clientBadge?: string;
  address: string;
  neighborhood: string;
  shopper: KanbanAssignment;
  rider: KanbanAssignment;
  groupedLabel?: string;
  onGroupedPress?: () => void;
}

function accentFor(t: NemoTheme, urgency: KanbanUrgency, mode: KanbanMode) {
  if (urgency === "critical") return t.color.icon.semantic.critical;
  if (urgency === "waning") return t.color.icon.semantic.warning;
  if (mode === "superdaki") return t.color.interactive.accent.primary.main;
  return t.color.text.neutral.tertiary; // neutral/muted accent
}
function bgFor(t: NemoTheme, urgency: KanbanUrgency, mode: KanbanMode) {
  if (urgency === "critical") return t.color.surface.semantic.critical;
  if (urgency === "waning") return t.color.surface.semantic.warning;
  if (mode === "superdaki") return t.color.surface.accent.primary;
  return t.color.surface.neutral.primary;
}
function toneColor(t: NemoTheme, tone: Tone = "default") {
  return {
    default: t.color.text.neutral.primary,
    warning: t.color.icon.semantic.warning,
    danger: t.color.icon.semantic.critical,
    brand: t.color.interactive.accent.primary.main,
    success: t.color.icon.semantic.success,
  }[tone];
}

export function KanbanCard({
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
  onGroupedPress,
}: KanbanCardProps) {
  const t = useNemoTheme();
  const accent = accentFor(t, urgency, mode);
  const s = makeStyles(t);

  const Pill = ({ label, dot }: { label: string; dot?: boolean }) => (
    <View style={s.pill}>
      {dot && <View style={s.dot} />}
      <Text style={s.pillText}>{label}</Text>
    </View>
  );

  const Assignment = ({ label, value, tone }: KanbanAssignment) => (
    <View style={s.assignment}>
      <Text style={s.assignLabel} numberOfLines={1}>{label}</Text>
      <Text style={[s.assignValue, { color: toneColor(t, tone) }]} numberOfLines={1}>{value}</Text>
    </View>
  );

  return (
    <View
      style={[s.card, { borderLeftColor: accent, backgroundColor: bgFor(t, urgency, mode) }, nemoCardShadow]}
    >
      {scheduled ? (
        <View style={[s.pill, s.pillFull]}>
          <ClockIcon size={16} color={t.color.text.neutral.primary} />
          <Text style={s.pillText}>{scheduled}</Text>
        </View>
      ) : null}

      <View style={s.headerRow}>
        <Text style={s.orderId}>{orderId}</Text>
        <View style={s.timers}>
          {timers.map((tm, i) => (
            <Pill key={i} label={tm.label} dot={tm.dot} />
          ))}
        </View>
      </View>

      <View style={s.clientBlock}>
        <View style={s.clientRow}>
          <Text style={s.clientName} numberOfLines={1}>{clientName}</Text>
          {clientBadge ? <Pill label={clientBadge} /> : null}
        </View>
        <View>
          <Text style={s.address} numberOfLines={1}>{address}</Text>
          <Text style={s.neighborhood} numberOfLines={1}>{neighborhood}</Text>
        </View>
      </View>

      <View style={s.divider} />

      <View style={s.assignArea}>
        <Assignment {...shopper} />
        <Assignment {...rider} />
      </View>

      {variant === "stacking" ? (
        <>
          <View style={s.divider} />
          <Pressable style={[s.groupedBtn, { backgroundColor: accent }]} onPress={onGroupedPress}>
            <PinIcon size={24} color={t.color.text.neutral.inverted} />
            <Text style={s.groupedText}>{groupedLabel}</Text>
          </Pressable>
        </>
      ) : null}
    </View>
  );
}

function makeStyles(t: NemoTheme) {
  const spx = (v: string) => parseFloat(String(v));
  return StyleSheet.create({
    card: {
      width: "100%",
      borderLeftWidth: 4,
      borderRadius: 12,
      paddingLeft: 16,
      paddingRight: 8,
      paddingVertical: 8,
      gap: 8,
      overflow: "hidden",
    },
    pill: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      backgroundColor: t.color.surface.neutral.secondary,
      borderRadius: 500,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    pillFull: { alignSelf: "stretch" },
    pillText: { fontSize: 14, fontWeight: "600", color: t.color.text.neutral.primary },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: t.color.text.neutral.primary },
    headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    orderId: { fontSize: 16, fontWeight: "600", color: t.color.text.neutral.primary },
    timers: { flexDirection: "row", gap: 4 },
    clientBlock: { gap: 8 },
    clientRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    clientName: { flex: 1, fontSize: 16, fontWeight: "600", color: t.color.text.neutral.primary },
    address: { fontSize: 16, fontWeight: "500", color: t.color.text.neutral.primary },
    neighborhood: { fontSize: 16, fontWeight: "500", color: t.color.text.neutral.secondary },
    divider: { height: StyleSheet.hairlineWidth, backgroundColor: t.color.border.neutral.main },
    assignArea: { flexDirection: "row", gap: 16 },
    assignment: { flex: 1, gap: 4 },
    assignLabel: { fontSize: 16, color: t.color.text.neutral.primary },
    assignValue: { fontSize: 16, fontWeight: "600" },
    groupedBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderRadius: 60,
      padding: 4,
    },
    groupedText: { fontSize: 16, fontWeight: "600", color: t.color.text.neutral.inverted },
  });
}
