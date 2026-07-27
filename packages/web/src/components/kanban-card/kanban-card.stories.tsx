import type { Meta, StoryObj } from "@storybook/react";
import { KanbanCard } from "./kanban-card";
import { KanbanTaskCard } from "./kanban-task-card";

const meta = {
  title: "Components/KanbanCard",
  component: KanbanCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
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
    timers: [
      { label: "2:57", dot: true },
      { label: "ETA 45 • 00:02" },
    ],
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

/* ---------------- Stacking (urgency) ---------------- */

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
  args: { ...baseStacking, urgency: "critical", rider: { label: "Rider: Auto", value: "Ofertando", tone: "danger" } },
};
export const StackingAgendado: Story = {
  args: { ...baseStacking, mode: "agendado", scheduled: "Agendado • 15:00 a 15:30" },
};
export const StackingSuperDaki: Story = {
  args: { ...baseStacking, mode: "superdaki", timers: [{ label: "SuperDaki", dot: true }, { label: "3:00" }] },
};
export const StackingStacked: Story = {
  args: { ...baseStacking, stacked: true },
  decorators: [(Story) => <div style={{ maxWidth: 400, paddingBottom: 12 }}><Story /></div>],
};

/* ---------------- Task ---------------- */

export const Task: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <KanbanTaskCard
        title="Fazer inventário da loja"
        description="Todos os meses nós precisamos organizar e entender quais mercadorias ainda temos."
        tasksLabel="3 Tarefas"
        timeLeft="3 horas restantes"
        progress={{ done: 0, total: 3 }}
        tasks={[
          { title: "Contar bebidas", description: "Corredor 3", status: "done", checked: true },
          { title: "Conferir hortifruti", description: "Câmara fria", status: "todo" },
          { title: "Repor limpeza", description: "Estoque", status: "canceled", disabled: true },
        ]}
        assignees={["Ulisses Camilo", "Gabriel Fuentes"]}
        updatedLabel="Atualizado há um dia"
      />
    </div>
  ),
};

export const TaskCollapsed: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <KanbanTaskCard
        collapsed
        title="Fazer inventário da loja"
        description="Todos os meses nós precisamos organizar e entender quais mercadorias ainda temos."
      />
    </div>
  ),
};

/* ---------------- Full board ---------------- */

export const Board: StoryObj = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ display: "flex", gap: 16, padding: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
      <div style={{ width: 340, display: "flex", flexDirection: "column", gap: 12 }}>
        <KanbanCard variant="stacking" urgency="default" {...baseStacking} orderId="8b812" />
        <KanbanCard variant="stacking" urgency="waning" {...baseStacking} orderId="9c344" rider={{ label: "Rider: Auto", value: "Ofertando", tone: "warning" }} />
      </div>
      <div style={{ width: 340, display: "flex", flexDirection: "column", gap: 12 }}>
        <KanbanCard variant="stacking" urgency="critical" {...baseStacking} orderId="7a109" rider={{ label: "Rider: Auto", value: "Atrasado", tone: "danger" }} />
        <KanbanCard variant="stacking" mode="superdaki" {...baseStacking} orderId="5f210" timers={[{ label: "SuperDaki", dot: true }, { label: "3:00" }]} />
      </div>
      <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 12 }}>
        <KanbanCard variant="order" timers={[{ label: "2:57", dot: true }, { label: "ETA 45 • 00:02" }]} {...baseOrder} />
      </div>
    </div>
  ),
};
