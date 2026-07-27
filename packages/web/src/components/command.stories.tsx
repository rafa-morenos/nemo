import type { Meta, StoryObj } from "@storybook/react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "./command";

const meta = { title: "Components/Command", component: Command, tags: ["autodocs"] } satisfies Meta<typeof Command>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Command className="max-w-md rounded-lg border border-border shadow-sm">
      <CommandInput placeholder="Buscar ação ou produto…" />
      <CommandList>
        <CommandEmpty>Nada encontrado.</CommandEmpty>
        <CommandGroup heading="Ações">
          <CommandItem>Novo pedido <CommandShortcut>⌘N</CommandShortcut></CommandItem>
          <CommandItem>Atribuir rider</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Produtos">
          <CommandItem>Leite integral</CommandItem>
          <CommandItem>Pão de forma</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
