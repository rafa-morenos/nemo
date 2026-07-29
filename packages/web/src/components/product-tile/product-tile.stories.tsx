import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ProductTile } from "./product-tile";
import iogurte from "../../assets/product-tile/iogurte.png";
import cocaCola from "../../assets/product-tile/coca-cola.png";

const meta = { title: "Components/Product Tile", component: ProductTile, tags: ["autodocs"] } satisfies Meta<typeof ProductTile>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Card de vitrine (`layout="vertical"`), lado a lado: disponível e indisponível. */
export const Vertical: Story = {
  render: () => {
    const [favorite, setFavorite] = React.useState(false);
    const [quantity, setQuantity] = React.useState(0);
    return (
      <div className="flex flex-wrap gap-4">
        <ProductTile
          className="w-[110px]"
          image={iogurte}
          name="Iogurte Pense Zero Morango"
          size="115g"
          originalPrice="R$ 14,99"
          price="R$ 17,09"
          favorite={favorite}
          onToggleFavorite={() => setFavorite((f) => !f)}
          quantity={quantity}
          onAdd={() => setQuantity(1)}
          onIncrement={() => setQuantity((q) => q + 1)}
          onDecrement={() => setQuantity((q) => Math.max(0, q - 1))}
        />
        <ProductTile
          className="w-[110px]"
          unavailable
          image={cocaCola}
          name="Coca-Cola Edição especial"
          size="350ml"
          price="R$ 3,09"
          favorite={false}
        />
      </div>
    );
  },
};

/** Linha de lista (`layout="horizontal"`) — disponível (com stepper) e indisponível. */
export const Horizontal: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState(1);
    return (
      <div className="flex max-w-md flex-col gap-3">
        <ProductTile
          layout="horizontal"
          image={iogurte}
          name="Iogurte Pense Zero Morango"
          size="115g"
          originalPrice="R$ 14,99"
          price="R$ 17,09"
          quantity={quantity}
          onIncrement={() => setQuantity((q) => q + 1)}
          onDecrement={() => setQuantity((q) => Math.max(0, q - 1))}
          onRemove={() => setQuantity(0)}
        />
        <ProductTile
          layout="horizontal"
          unavailable
          image={cocaCola}
          name="Coca-Cola Edição especial Rosalia"
          size="350ml"
          price="R$ 3,09"
          onRemove={() => {}}
        />
      </div>
    );
  },
};

/** Linha somente-leitura usada em detalhe de pedido/reembolso. */
export const OrderDetail: Story = {
  render: () => (
    <div className="max-w-md">
      <ProductTile
        layout="horizontal"
        type="orderDetail"
        image={iogurte}
        name="Iogurte Pense Zero Morango"
        size="115g"
        originalPrice="3x R$17,09"
        price="R$ 17,09"
        priceMultiplier="2x"
        refund={{ count: 1, unit: "un." }}
      />
    </div>
  ),
};
