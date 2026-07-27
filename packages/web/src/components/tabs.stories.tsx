import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

const meta = { title: "Components/Tabs", component: Tabs, tags: ["autodocs"] } satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="rota" className="w-96">
      <TabsList>
        <TabsTrigger value="rota">Em rota</TabsTrigger>
        <TabsTrigger value="preparo">Em preparo</TabsTrigger>
        <TabsTrigger value="entregues">Entregues</TabsTrigger>
      </TabsList>
      <TabsContent value="rota" className="text-sm text-muted-foreground">3 pedidos a caminho.</TabsContent>
      <TabsContent value="preparo" className="text-sm text-muted-foreground">5 pedidos sendo separados.</TabsContent>
      <TabsContent value="entregues" className="text-sm text-muted-foreground">128 entregues hoje.</TabsContent>
    </Tabs>
  ),
};
