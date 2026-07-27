import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";
import { Text } from "./typography";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultChecked: true } };
export const Off: Story = { args: { defaultChecked: false } };

export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-3">
        <Switch defaultChecked />
        <Text variant="bodySm">Notificações push</Text>
      </label>
      <label className="flex items-center gap-3">
        <Switch />
        <Text variant="bodySm">Modo econômico</Text>
      </label>
    </div>
  ),
};
