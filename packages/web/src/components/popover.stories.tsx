import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Button } from "./button";

const meta = { title: "Components/Popover", component: Popover, tags: ["autodocs"] } satisfies Meta<typeof Popover>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild><Button variant="outline">Filtros</Button></PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Filtrar pedidos</p>
          <p className="text-sm text-muted-foreground">Por urgência, rider e janela de entrega.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
