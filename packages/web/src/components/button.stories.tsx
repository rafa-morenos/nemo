import type { Meta, StoryObj } from "@storybook/react";
import { Heart, X } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["normal", "secondary", "outline", "ghost", "destructive", "link"],
    },
    size: { control: "select", options: ["sm", "md", "lg", "icon"] },
  },
  args: { children: "Fazer pedido", variant: "normal", size: "md" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: "secondary", children: "Ver carrinho" } };
export const Outline: Story = { args: { variant: "outline", children: "Detalhes" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Ajuda" } };
export const Destructive: Story = { args: { variant: "destructive", children: "Cancelar" } };
export const Link: Story = { args: { variant: "link", children: "Saiba mais" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Normal</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/** `icon` é um slot dedicado — não vai dentro de `children` (§4.3). */
export const WithIcon: Story = {
  render: () => (
    <Button icon={<Heart />} variant="outline">
      Favoritar
    </Button>
  ),
};

/** Botão só-ícone: sem `children`, com `aria-label` no lugar do texto visível. */
export const IconOnly: Story = {
  render: () => <Button icon={<X />} size="icon" variant="ghost" aria-label="Fechar" />,
};
