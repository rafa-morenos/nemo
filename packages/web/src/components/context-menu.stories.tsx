import type { Meta, StoryObj } from "@storybook/react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from "./context-menu";

const meta = { title: "Components/Context Menu", component: ContextMenu, tags: ["autodocs"] } satisfies Meta<typeof ContextMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
        Clique com o botão direito
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Ver pedido <ContextMenuShortcut>⌘O</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuItem>Reatribuir rider</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">Cancelar</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
