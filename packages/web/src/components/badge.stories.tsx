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

const COLORS = ["normal", "success", "warning", "critical", "info", "disabled", "inverted"] as const;
const VARIANTS = ["filled", "outline", "ghost", "solid"] as const;

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {COLORS.map((color) => (
        <div key={color} className="flex flex-wrap items-center gap-2">
          <span className="w-20 shrink-0 text-xs text-muted-foreground">{color}</span>
          {VARIANTS.map((variant) => (
            <Badge key={variant} color={color} variant={variant} icon={<Heart />} dot>
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

/** Migra `DiscountTag` (Daki Web/App) → `color="critical" variant="solid"`. */
export const DiscountTag: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="critical" variant="solid">-30%</Badge>
      <Badge color="normal" variant="solid">Grátis</Badge>
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
      <Badge color="normal">Itens</Badge>
      <Badge color="normal" count={12}>Itens</Badge>
    </div>
  ),
};

/** Chip de filtro compacto — `size="sm"` + `shape="square"`. */
export const FilterChip: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge size="sm" shape="square" variant="outline">Entrega hoje</Badge>
      <Badge size="sm" shape="square" variant="outline" color="info">
        Super Daki
      </Badge>
    </div>
  ),
};
