import type { Meta, StoryObj } from "@storybook/react";
import { ListChecks, Bell, CreditCard, MessagesSquare, FileCheck2, ShieldCheck, Timer, SquarePen } from "lucide-react";
import { MenuList, MenuSection, MenuItem } from "./menu-item";
import { Badge } from "./badge";

const meta = { title: "Components/Menu Item", component: MenuItem, tags: ["autodocs"] } satisfies Meta<typeof MenuItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <div className="max-w-md">
      <MenuItem icon={<CreditCard />} label="Gerenciar formas de pagamento" />
    </div>
  ),
};

export const WithBadgeAndDot: Story = {
  render: () => (
    <div className="max-w-md">
      <MenuItem icon={<ListChecks />} label="Suas listas" badge={<Badge>Novo</Badge>} />
      <MenuItem icon={<MessagesSquare />} label="Suporte" dot />
    </div>
  ),
};

/** Recreates the Daki app menu — sections + rows. */
export const MenuSections: Story = {
  render: () => (
    <MenuList className="max-w-md">
      <MenuSection>
        <MenuItem icon={<ListChecks />} label="Suas listas" badge={<Badge>Novo</Badge>} />
        <MenuItem icon={<Bell />} label="Central de Promoções" />
      </MenuSection>

      <MenuSection label="Pagamentos">
        <MenuItem icon={<CreditCard />} label="Gerenciar formas de pagamento" />
      </MenuSection>

      <MenuSection label="Informações">
        <MenuItem icon={<MessagesSquare />} label="Suporte" dot />
        <MenuItem icon={<FileCheck2 />} label="Termos de uso" />
        <MenuItem icon={<ShieldCheck />} label="Política de privacidade" />
        <MenuItem icon={<Timer />} label="Horário de funcionamento" />
        <MenuItem icon={<SquarePen />} label="Idioma do aplicativo" />
      </MenuSection>
    </MenuList>
  ),
};

export const AsLink: Story = {
  render: () => (
    <div className="max-w-md">
      <MenuItem asChild icon={<Bell />} label="Central de Promoções">
        <a href="#promocoes" />
      </MenuItem>
    </div>
  ),
};
