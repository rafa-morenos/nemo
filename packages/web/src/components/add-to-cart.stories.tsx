import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AddToCartButton, CartCountBadge, FavoriteButton } from "./add-to-cart";

const meta = {
  title: "Components/Add To Cart",
  component: AddToCartButton,
  tags: ["autodocs"],
} satisfies Meta<typeof AddToCartButton>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Todos os estados lado a lado (Default, Loading, quantidade 1 com lixeira, quantidade 2, disabled). */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <AddToCartButton quantity={0} />
      <AddToCartButton quantity={0} loading />
      <AddToCartButton quantity={1} />
      <AddToCartButton quantity={2} />
      <AddToCartButton quantity={0} disabled />
    </div>
  ),
};

/** Fluxo real: tocar "+" mostra o spinner por um instante antes de virar o stepper. */
export const Interactive: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const handleAdd = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setQuantity(1);
      }, 600);
    };

    return (
      <AddToCartButton
        quantity={quantity}
        loading={loading}
        onAdd={handleAdd}
        onIncrement={() => setQuantity((q) => q + 1)}
        onDecrement={() => setQuantity((q) => Math.max(0, q - 1))}
      />
    );
  },
};

export const Count: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <CartCountBadge count={1} />
      <CartCountBadge count={12} />
    </div>
  ),
};

export const Favorite: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    return <FavoriteButton active={active} onToggle={() => setActive((a) => !a)} />;
  },
};
