import type { Meta, StoryObj } from "@storybook/react";
import { Puzzle } from "lucide-react";
import { ProductCardPill, ProductCardText, ProductCardWithBadges } from "./product-card";

const meta = {
  title: "Components/ProductCard",
  component: ProductCardWithBadges,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
} satisfies Meta<typeof ProductCardWithBadges>;

export default meta;
type Story = StoryObj<typeof meta>;

const genericTags = (
  <>
    <ProductCardPill className="text-xs" icon={<Puzzle />} dot>
      Tag label
    </ProductCardPill>
    <ProductCardPill className="text-xs" icon={<Puzzle />} dot>
      Tag label
    </ProductCardPill>
  </>
);

const genericImageBadge = (
  <ProductCardPill className="text-xs" icon={<Puzzle />} dot>
    Tag label
  </ProductCardPill>
);

export const Horizontal: Story = {
  render: () => (
    <ProductCardWithBadges
      variant="horizontal"
      topBadges={genericTags}
      imageBadge={genericImageBadge}
      title="Title"
      location="Badge label"
      content={<ProductCardText primary="Content" secondary="text-secondary" />}
      bottomBadges={genericTags}
      footer="Badge label"
    />
  ),
};

export const Vertical: Story = {
  render: () => (
    <ProductCardWithBadges
      variant="vertical"
      topBadges={genericTags}
      imageBadge={genericImageBadge}
      title="Title"
      location="Badge label"
      content={<ProductCardText primary="Content" secondary="text-secondary" />}
      bottomBadges={genericTags}
      footer="Badge label"
    />
  ),
};
