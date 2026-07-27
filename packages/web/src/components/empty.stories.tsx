import type { Meta, StoryObj } from "@storybook/react";
import { PackageOpen } from "lucide-react";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "./empty";
import { Button } from "./button";

const meta = { title: "Components/Empty", component: Empty, tags: ["autodocs"] } satisfies Meta<typeof Empty>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon"><PackageOpen /></EmptyMedia>
        <EmptyTitle>Nenhum pedido em rota</EmptyTitle>
        <EmptyDescription>Quando um pedido sair do dark store, ele aparece aqui.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Criar pedido</Button>
      </EmptyContent>
    </Empty>
  ),
};
