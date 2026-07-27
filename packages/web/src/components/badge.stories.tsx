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
const TYPES = ["filled", "outline", "ghost"] as const;

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
