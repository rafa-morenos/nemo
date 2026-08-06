import type { Meta, StoryObj } from "@storybook/react-native";
import { View, Text } from "react-native";
import { Badge } from "./Badge";
import { useNemoTheme } from "./theme";

const COLORS = ["default", "success", "warning", "critical", "info", "disabled", "inverted"] as const;
const VARIANTS = ["filled", "outline", "ghost", "solid"] as const;

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "Rótulo", color: "default", variant: "filled", size: "md", shape: "pill" },
  argTypes: {
    color: { control: "select", options: COLORS },
    variant: { control: "select", options: VARIANTS },
    size: { control: "select", options: ["sm", "md"] },
    shape: { control: "select", options: ["pill", "square"] },
    icon: { control: false },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 12 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Matrix: Story = {
  render: () => {
    const t = useNemoTheme();
    return (
      <View style={{ gap: 12 }}>
        {COLORS.map((color) => (
          <View key={color} style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
            <Text style={{ width: 80, fontSize: 12, color: t.color.text.neutral.tertiary }}>{color}</Text>
            {VARIANTS.map((variant) => (
              <Badge key={variant} color={color} variant={variant} dot>
                Rótulo
              </Badge>
            ))}
          </View>
        ))}
      </View>
    );
  },
};

export const WithoutIcon: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Badge color="success">Entregue</Badge>
      <Badge color="warning">Atenção</Badge>
      <Badge color="critical">Atrasado</Badge>
      <Badge color="info">Novidade</Badge>
      <Badge color="disabled">Rascunho</Badge>
    </View>
  ),
};

/** Migra `DiscountTag` (Daki Web/App) → `color="critical" variant="solid"`. */
export const DiscountTag: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Badge color="critical" variant="solid">-30%</Badge>
      <Badge color="default" variant="solid">Grátis</Badge>
    </View>
  ),
};

/** Migra `counter-tag`/`PickingAmountTags` (HUBR) → `count` sem `children`. */
export const Counter: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
      <Badge count={3} />
      <Badge count={12} color="info" />
      <Badge count={128} color="critical" />
      <Badge color="default" count={12}>Itens</Badge>
    </View>
  ),
};

export const FilterChip: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Badge size="sm" shape="square" variant="outline">Entrega hoje</Badge>
      <Badge size="sm" shape="square" variant="outline" color="info">Super Daki</Badge>
    </View>
  ),
};
