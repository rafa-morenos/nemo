import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Input } from "./input";

const meta = { title: "Components/Label", component: Label, tags: ["autodocs"] } satisfies Meta<typeof Label>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-2">
      <Label htmlFor="email">E-mail</Label>
      <Input id="email" type="email" placeholder="voce@exemplo.com" />
    </div>
  ),
};
