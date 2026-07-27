import type { Meta, StoryObj } from "@storybook/react";
import { Rocket, AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./alert";

const meta = { title: "Components/Alert", component: Alert, tags: ["autodocs"] } satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert className="max-w-md">
      <Rocket className="h-4 w-4" />
      <AlertTitle>Pedido a caminho</AlertTitle>
      <AlertDescription>Seu entregador saiu do dark store. Chega em ~15 min.</AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-md">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Pagamento recusado</AlertTitle>
      <AlertDescription>Verifique os dados do cartão e tente novamente.</AlertDescription>
    </Alert>
  ),
};
