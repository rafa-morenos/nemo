import type { Meta, StoryObj } from "@storybook/react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./drawer";
import { Button } from "./button";

const meta = { title: "Components/Drawer", component: Drawer, tags: ["autodocs"] } satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild><Button>Ver carrinho</Button></DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Seu carrinho</DrawerTitle>
            <DrawerDescription>3 itens · entrega em ~15 min</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Finalizar pedido</Button>
            <DrawerClose asChild><Button variant="outline">Continuar comprando</Button></DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};
