import type { Meta, StoryObj } from "@storybook/react";
import { Heart } from "lucide-react";
import { Badge } from "./badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Tag label" },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const COLORS = ["default", "success", "warning", "critical", "info", "disabled", "inverted"] as const;
const TYPES = ["filled", "outline", "ghost", "solid"] as const;

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {COLORS.map((color) => (
        <div key={color} className="flex flex-wrap items-center gap-2">
          <span className="w-20 shrink-0 text-xs text-muted-foreground">{color}</span>
          {TYPES.map((type) => (
            <Badge key={type} color={color} type={type} icon={<Heart />} dot>
              Tag label
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="success">Entregue</Badge>
      <Badge color="warning">Atenção</Badge>
      <Badge color="critical">Atrasado</Badge>
      <Badge color="info">Novidade</Badge>
      <Badge color="disabled">Rascunho</Badge>
    </div>
  ),
};

/**
 * Migra `DiscountTag` (Daki Web/App) → `color="critical" type="solid"`.
 * "Grátis" (default/solid) já mostra o fundo forte de verdade — "-30%"
 * (critical/solid) hoje renderiza igual ao `filled`, porque falta a role
 * "On Critical" no alias do Figma (ver comentário no topo de badge.tsx).
 */
export const DiscountTag: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="critical" type="solid">-30%</Badge>
      <Badge color="default" type="solid">Grátis</Badge>
    </div>
  ),
};

/** Migra `counter-tag`/`PickingAmountTags` (HUBR) → `count` sem `children`. */
export const Counter: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge count={3} />
      <Badge count={12} color="info" />
      <Badge count={128} color="critical" />
      <span className="text-sm text-muted-foreground">itens no carrinho</span>
      <Badge color="default">Itens</Badge>
      <Badge color="default" count={12}>Itens</Badge>
    </div>
  ),
};

/** Chip de filtro compacto — `size="sm"` + `shape="square"`. */
export const FilterChip: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge size="sm" shape="square" type="outline">Entrega hoje</Badge>
      <Badge size="sm" shape="square" type="outline" color="info">
        Super Daki
      </Badge>
    </div>
  ),
};
