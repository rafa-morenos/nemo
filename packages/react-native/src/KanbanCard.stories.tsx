import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { KanbanCard } from "./KanbanCard";

const meta = {
  title: "Components/KanbanCard",
  component: KanbanCard,
  args: { variant: "order", urgency: "default", mode: "core" },
  argTypes: {
    variant: { control: "select", options: ["order", "stacking"] },
    urgency: { control: "select", options: ["default", "waning", "critical"] },
    mode: { control: "select", options: ["core", "agendado", "superdaki"] },
    shopper: { control: false },
    rider: { control: false },
    timers: { control: false },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, maxWidth: 400 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof KanbanCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseOrder = {
  orderId: "8b81223456T",
  clientName: "Georgia P. S.",
  clientBadge: "1º Pedido",
  address: "Tv Canto das Duas Flores, 3 AP 02",
  neighborhood: "Jardim Nova Vida",
  shopper: { label: "Shopper", value: "Ulisses Camilo" },
  rider: { label: "Rider: Mode", value: "Ofertando" },
} as const;

/* ---------------- Order ---------------- */

export const Order: Story = {
  args: {
    variant: "order",
    timers: [{ label: "2:57", dot: true }, { label: "ETA 45 • 00:02" }],
    ...baseOrder,
  },
};

export const OrderNoCountdown: Story = {
  args: { variant: "order", timers: [{ label: "ETA 45 • 00:02" }], ...baseOrder },
};

export const OrderScheduled: Story = {
  args: {
    variant: "order",
    scheduled: "Agendado • 15:00 a 15:30",
    timers: [{ label: "2:57", dot: true }],
    ...baseOrder,
  },
};

/* ---------------- Stacking (urgência) ---------------- */

const baseStacking = {
  variant: "stacking",
  orderId: "8b812",
  timers: [{ label: "Tag label", dot: true }, { label: "Tag label" }],
  clientName: "Client's abbreviated full name",
  clientBadge: "Tag label",
  address: "Address",
  neighborhood: "Neighborhood",
  shopper: { label: "Shopper", value: "Status" },
  rider: { label: "Rider: Auto", value: "Ofertando", tone: "warning" },
} as const;

export const StackingCore: Story = { args: { ...baseStacking, urgency: "default" } };

export const StackingWaning: Story = {
  args: { ...baseStacking, urgency: "waning", rider: { label: "Rider: Auto", value: "Ofertando", tone: "warning" } },
};

export const StackingCritical: Story = {
  args: { ...baseStacking, urgency: "critical", rider: { label: "Rider: Auto", value: "Atrasado", tone: "danger" } },
};

export const StackingAgendado: Story = {
  args: { ...baseStacking, mode: "agendado", scheduled: "Agendado • 15:00 a 15:30" },
};

export const StackingSuperDaki: Story = {
  args: { ...baseStacking, mode: "superdaki", timers: [{ label: "SuperDaki", dot: true }, { label: "3:00" }] },
};
