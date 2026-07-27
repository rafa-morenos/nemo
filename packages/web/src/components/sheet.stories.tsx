import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./sheet";
import { Button } from "./button";

const meta = { title: "Components/Sheet", component: Sheet, tags: ["autodocs"] } satisfies Meta<typeof Sheet>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Abrir carrinho</Button></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Seu carrinho</SheetTitle>
          <SheetDescription>3 itens · entrega em ~15 min</SheetDescription>
        </SheetHeader>
        <div className="py-4 text-sm text-muted-foreground">Leite, pão de forma, café…</div>
        <SheetFooter>
          <Button>Finalizar pedido</Button>
          <SheetClose asChild><Button variant="outline">Continuar comprando</Button></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
