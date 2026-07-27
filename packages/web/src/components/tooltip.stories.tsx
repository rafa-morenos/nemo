import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip";
import { Button } from "./button";

const meta = { title: "Components/Tooltip", component: Tooltip, tags: ["autodocs"] } satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild><Button variant="outline">Passe o mouse</Button></TooltipTrigger>
        <TooltipContent>Entrega em ~15 min</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
