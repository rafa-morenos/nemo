import type { Meta, StoryObj } from "@storybook/react";
import { ChevronsUpDown } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible";
import { Button } from "./button";

const meta = { title: "Components/Collapsible", component: Collapsible, tags: ["autodocs"] } satisfies Meta<typeof Collapsible>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between gap-4 rounded-md border border-border px-4 py-2">
        <span className="text-sm font-semibold text-foreground">Itens do pedido</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon"><ChevronsUpDown className="h-4 w-4" /></Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border border-border px-4 py-2 text-sm">Leite integral · 1L</div>
        <div className="rounded-md border border-border px-4 py-2 text-sm">Pão de forma</div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
