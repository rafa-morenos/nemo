import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog";
import { Button } from "./button";
import { Input } from "./input";

const meta = { title: "Components/Dialog", component: Dialog, tags: ["autodocs"] } satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button>Editar endereço</Button></DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Endereço de entrega</DialogTitle>
          <DialogDescription>Atualize onde seu pedido deve chegar.</DialogDescription>
        </DialogHeader>
        <Input placeholder="Rua, número, complemento" />
        <DialogFooter>
          <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
