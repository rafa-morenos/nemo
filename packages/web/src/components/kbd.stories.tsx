import type { Meta, StoryObj } from "@storybook/react";
import { Kbd, KbdGroup } from "./kbd";

const meta = { title: "Components/Kbd", component: Kbd, tags: ["autodocs"] } satisfies Meta<typeof Kbd>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-3 text-sm text-muted-foreground">
      <div>Buscar: <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup></div>
      <div>Novo pedido: <KbdGroup><Kbd>⌘</Kbd><Kbd>N</Kbd></KbdGroup></div>
      <div>Enviar: <Kbd>Enter</Kbd></div>
    </div>
  ),
};
