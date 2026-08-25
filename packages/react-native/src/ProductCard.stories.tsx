import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { ProductCardPill, ProductCardText, ProductCardWithBadges } from "./ProductCard";
import { PackageIcon } from "./icons";
import { useNemoTheme } from "./theme";

const meta = {
  title: "Components/ProductCard",
  component: ProductCardWithBadges,
  argTypes: {
    variant: { control: "select", options: ["horizontal", "vertical"] },
    topBadges: { control: false },
    imageBadge: { control: false },
    media: { control: false },
    location: { control: false },
    content: { control: false },
    bottomBadges: { control: false },
    footer: { control: false },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, maxWidth: 320 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ProductCardWithBadges>;

export default meta;
type Story = StoryObj<typeof meta>;

function GenericTags() {
  const t = useNemoTheme();
  const icon = <PackageIcon size={12} color={t.color.text.neutral.tertiary} />;
  return (
    <>
      <ProductCardPill icon={icon} dot>Tag label</ProductCardPill>
      <ProductCardPill icon={icon} dot>Tag label</ProductCardPill>
    </>
  );
}

function GenericImageBadge() {
  const t = useNemoTheme();
  return (
    <ProductCardPill icon={<PackageIcon size={12} color={t.color.text.neutral.tertiary} />} dot>
      Tag label
    </ProductCardPill>
  );
}

export const Horizontal: Story = {
  args: { variant: "horizontal" },
  render: (args) => (
    <ProductCardWithBadges
      variant={args.variant}
      topBadges={<GenericTags />}
      imageBadge={<GenericImageBadge />}
      title="Title"
      location="Badge label"
      content={<ProductCardText primary="Content" secondary="text-secondary" />}
      bottomBadges={<GenericTags />}
      footer="Badge label"
    />
  ),
};

export const Vertical: Story = {
  args: { variant: "vertical" },
  render: (args) => (
    <ProductCardWithBadges
      variant={args.variant}
      topBadges={<GenericTags />}
      imageBadge={<GenericImageBadge />}
      title="Title"
      location="Badge label"
      content={<ProductCardText primary="Content" secondary="text-secondary" />}
      bottomBadges={<GenericTags />}
      footer="Badge label"
    />
  ),
};
