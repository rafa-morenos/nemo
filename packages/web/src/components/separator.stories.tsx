import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta = { title: "Components/Separator", component: Separator, tags: ["autodocs"] } satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-sm">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-foreground">Nemo Design System</h4>
        <p className="text-sm text-muted-foreground">Tokens da Daki, multiplataforma.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm text-foreground">
        <span>Web</span>
        <Separator orientation="vertical" />
        <span>React Native</span>
        <Separator orientation="vertical" />
        <span>Flutter</span>
      </div>
    </div>
  ),
};
