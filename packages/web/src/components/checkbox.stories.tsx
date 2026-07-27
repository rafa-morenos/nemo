import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";

const meta = { title: "Components/Checkbox", component: Checkbox, tags: ["autodocs"] } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultChecked: true } };
export const WithLabel: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm text-foreground">
      <Checkbox defaultChecked /> Aceito os termos de entrega
    </label>
  ),
};
export const Disabled: Story = { args: { disabled: true } };
