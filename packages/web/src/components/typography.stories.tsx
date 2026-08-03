import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./typography";

const meta = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["display", "h1", "h2", "h3", "body", "bodySm", "label", "caption"],
    },
    tone: {
      control: "select",
      options: ["normal", "secondary", "muted", "brand", "decorative", "danger", "success", "onBrand"],
    },
  },
  args: { children: "Entrega em minutos", variant: "body", tone: "normal" },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const variants = ["display", "h1", "h2", "h3", "body", "bodySm", "label", "caption"] as const;

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {variants.map((v) => (
        <div key={v} className="flex items-baseline gap-4">
          <Text variant="caption" tone="muted" className="w-20 shrink-0">{v}</Text>
          <Text variant={v}>Entrega em minutos</Text>
        </div>
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text variant="h3" tone="normal">normal · texto primário</Text>
      <Text variant="h3" tone="secondary">secondary · texto de apoio</Text>
      <Text variant="h3" tone="brand">brand · mar azulão</Text>
      <Text variant="h3" tone="decorative">decorative · navy #001e6b</Text>
      <Text variant="h3" tone="danger">danger · erro</Text>
      <Text variant="h3" tone="success">success · sucesso</Text>
    </div>
  ),
};
