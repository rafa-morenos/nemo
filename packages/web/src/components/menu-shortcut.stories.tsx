import type { Meta, StoryObj } from "@storybook/react";
import { ShoppingBag, Heart, MapPin, Ticket, Headset, PackageSearch } from "lucide-react";
import { MenuShortcutList, MenuShortcutItem } from "./menu-shortcut";

const meta = {
  title: "Components/Menu Shortcut",
  component: MenuShortcutItem,
  tags: ["autodocs"],
} satisfies Meta<typeof MenuShortcutItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => <MenuShortcutItem icon={<ShoppingBag />} label="Pedir novamente" />,
};

/** Vários atalhos lado a lado (tela inicial do app). */
export const List: Story = {
  render: () => (
    <MenuShortcutList className="max-w-md">
      <MenuShortcutItem icon={<ShoppingBag />} label="Pedir novamente" />
      <MenuShortcutItem icon={<Heart />} label="Favoritos" />
      <MenuShortcutItem icon={<PackageSearch />} label="Rastrear pedido" />
      <MenuShortcutItem icon={<Ticket />} label="Cupons" />
      <MenuShortcutItem icon={<MapPin />} label="Endereços" />
      <MenuShortcutItem icon={<Headset />} label="Suporte" />
    </MenuShortcutList>
  ),
};

export const AsLink: Story = {
  render: () => (
    <MenuShortcutItem asChild icon={<ShoppingBag />} label="Pedir novamente">
      <a href="#pedir-novamente" />
    </MenuShortcutItem>
  ),
};
