import figma from "@figma/code-connect";
import { KanbanCard } from "./kanban-card";
import { KanbanTaskCard } from "./kanban-task-card";

/**
 * Code Connect — maps the HUBR "Orders Card" Figma component set to the Nemo
 * React components. In Figma Dev Mode, selecting a variant now shows the exact
 * Nemo snippet instead of raw CSS.
 *
 * File: MqJ2Kp2MG4YOlLrwi1XJUx. Variant properties on the set:
 *   Type = Order | Task | Stacking
 *   State = Expanded | Collapsed | Core | Agendado | SuperDaki
 *   Scheduled = Off | On | Default | Waning | Critical
 *   Countdown = On | Off
 *   Stacking = Off | On
 *
 * Publish with: `npx figma connect publish` (needs a Figma token; not run here).
 */

const FILE = "https://www.figma.com/design/MqJ2Kp2MG4YOlLrwi1XJUx";

/* -------- Order -------- */
figma.connect(KanbanCard, `${FILE}?node-id=1722-111684`, {
  variant: { Type: "Order" },
  props: {
    scheduled: figma.enum("Scheduled", { On: "Agendado • 15:00 a 15:30", Off: undefined }),
  },
  example: ({ scheduled }) => (
    <KanbanCard
      variant="order"
      orderId="8b81223456T"
      timers={[{ label: "2:57", dot: true }, { label: "ETA 45 • 00:02" }]}
      scheduled={scheduled}
      clientName="Georgia P. S."
      clientBadge="1º Pedido"
      address="Tv Canto das Duas Flores, 3 AP 02"
      neighborhood="Jardim Nova Vida"
      shopper={{ label: "Shopper", value: "Ulisses Camilo" }}
      rider={{ label: "Rider: Mode", value: "Ofertando" }}
    />
  ),
});

/* -------- Stacking -------- */
figma.connect(KanbanCard, `${FILE}?node-id=2965-110864`, {
  variant: { Type: "Stacking" },
  props: {
    // Scheduled encodes urgency for Stacking cards.
    urgency: figma.enum("Scheduled", {
      Default: "normal",
      Waning: "waning",
      Critical: "critical",
    }),
    mode: figma.enum("State", {
      Core: "core",
      Agendado: "agendado",
      SuperDaki: "superdaki",
    }),
    stacked: figma.enum("Stacking", { On: true, Off: false }),
  },
  example: ({ urgency, mode, stacked }) => (
    <KanbanCard
      variant="stacking"
      urgency={urgency}
      mode={mode}
      stacked={stacked}
      orderId="8b812"
      timers={[{ label: "Tag label", dot: true }, { label: "Tag label" }]}
      clientName="Client's abbreviated full name"
      clientBadge="Tag label"
      address="Address"
      neighborhood="Neighborhood"
      shopper={{ label: "Shopper", value: "Status" }}
      rider={{ label: "Rider: Auto", value: "Ofertando", tone: "warning" }}
    />
  ),
});

/* -------- Task -------- */
figma.connect(KanbanTaskCard, `${FILE}?node-id=486-14812`, {
  variant: { Type: "Task" },
  props: {
    collapsed: figma.enum("State", { Collapsed: true, Expanded: false }),
  },
  example: ({ collapsed }) => (
    <KanbanTaskCard
      collapsed={collapsed}
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
  ),
});
