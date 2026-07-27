import type { Meta, StoryObj } from "@storybook/react";
import { Bubble } from "./bubble";

const meta = { title: "Components/Bubble", component: Bubble, tags: ["autodocs"] } satisfies Meta<typeof Bubble>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Conversation: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-2">
      <Bubble role="assistant">Oi! Seu pedido saiu do dark store 🚴</Bubble>
      <Bubble role="user">Consigo mudar o endereço?</Bubble>
      <Bubble role="assistant">Claro — toque em “Editar endereço” no pedido.</Bubble>
    </div>
  ),
};
