import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "./dropdown-menu";
import { Button } from "./button";

const meta = { title: "Components/Dropdown Menu", component: DropdownMenu, tags: ["autodocs"] } satisfies Meta<typeof DropdownMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline">Ações</Button></DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Pedido</DropdownMenuLabel>
        <DropdownMenuItem>Ver detalhes <DropdownMenuShortcut>⌘O</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem>Reatribuir rider</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
