import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Text } from "./typography";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "voce@exemplo.com" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <Input {...args} className="max-w-xs" /> };

export const WithLabel: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-2">
      <Text asChild variant="label"><label htmlFor="email">E-mail</label></Text>
      <Input id="email" type="email" placeholder="voce@exemplo.com" />
      <Text variant="caption" tone="muted">Enviaremos a confirmação do pedido aqui.</Text>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true, value: "indisponível" } };
