import type { Meta, StoryObj } from "@storybook/react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarCheckboxItem,
} from "./menubar";

const meta = { title: "Components/Menubar", component: Menubar, tags: ["autodocs"] } satisfies Meta<typeof Menubar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Pedido</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Novo <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
          <MenubarItem>Duplicar</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Imprimir <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Exibir</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Mostrar entregues</MenubarCheckboxItem>
          <MenubarCheckboxItem>Modo compacto</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Ajuda</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Suporte</MenubarItem>
          <MenubarItem>Atalhos</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
