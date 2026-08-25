import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { KanbanTaskCard } from "./KanbanTaskCard";

const meta = {
  title: "Components/KanbanTaskCard",
  component: KanbanTaskCard,
  argTypes: {
    progress: { control: false },
    tasks: { control: false },
    assignees: { control: false },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, maxWidth: 420 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof KanbanTaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Fazer inventário da loja",
    description: "Todos os meses nós precisamos organizar e entender quais mercadorias ainda temos.",
    tasksLabel: "3 Tarefas",
    timeLeft: "3 horas restantes",
    progress: { done: 0, total: 3 },
    tasks: [
      { title: "Contar bebidas", description: "Corredor 3", status: "done", checked: true },
      { title: "Conferir hortifruti", description: "Câmara fria", status: "todo" },
      { title: "Repor limpeza", description: "Estoque", status: "canceled", disabled: true },
    ],
    assignees: ["Ulisses Camilo", "Gabriel Fuentes"],
    updatedLabel: "Atualizado há um dia",
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    title: "Fazer inventário da loja",
    description: "Todos os meses nós precisamos organizar e entender quais mercadorias ainda temos.",
  },
};
