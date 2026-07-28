import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, toast } from "./sonner";
import { Button } from "./button";

const meta = { title: "Components/Sonner (Toast)", component: Toaster, tags: ["autodocs"] } satisfies Meta<typeof Toaster>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast("Pedido confirmado", { description: "Chega em ~15 min." })}>Toast</Button>
        <Button variant="outline" onClick={() => toast.success("Pagamento aprovado")}>Success</Button>
        <Button variant="outline" onClick={() => toast.error("Pagamento recusado")}>Error</Button>
        <Button variant="outline" onClick={() => toast.warning("Estoque baixo")}>Warning</Button>
        <Button variant="outline" onClick={() => toast.info("Novo horário de entrega")}>Info</Button>
        <Button variant="outline" onClick={() => toast.loading("Confirmando pedido...")}>Loading</Button>
        <Button
          variant="outline"
          onClick={() => toast("Pedido a caminho", { action: { label: "Ver", onClick: () => {} } })}
        >
          Com ação
        </Button>
      </div>
      <Toaster />
    </div>
  ),
};
