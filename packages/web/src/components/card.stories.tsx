import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";
import { Button } from "./button";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Entrega em 15 min</CardTitle>
        <CardDescription>Seu pedido saiu do dark store mais perto de você.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Acompanhe o entregador em tempo real e receba atualizações a cada etapa.
        </p>
      </CardContent>
      <CardFooter className="gap-3">
        <Button>Acompanhar</Button>
        <Button variant="outline">Ajuda</Button>
      </CardFooter>
    </Card>
  ),
};
