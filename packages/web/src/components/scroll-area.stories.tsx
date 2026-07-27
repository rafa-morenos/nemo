import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./scroll-area";

const meta = { title: "Components/Scroll Area", component: ScrollArea, tags: ["autodocs"] } satisfies Meta<typeof ScrollArea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-56 w-64 rounded-md border border-border p-4">
      <h4 className="mb-3 text-sm font-semibold text-foreground">Categorias</h4>
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} className="border-b border-border py-2 text-sm text-foreground">Categoria {i + 1}</div>
      ))}
    </ScrollArea>
  ),
};
