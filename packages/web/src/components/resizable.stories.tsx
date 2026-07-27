import type { Meta, StoryObj } from "@storybook/react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./resizable";

const meta = { title: "Components/Resizable", component: ResizablePanelGroup, tags: ["autodocs"] } satisfies Meta<typeof ResizablePanelGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-full items-center justify-center p-4 text-sm font-medium text-foreground">{children}</div>
);

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="h-52 max-w-xl rounded-lg border border-border">
      <ResizablePanel defaultSize={35}><Cell>Filtros</Cell></ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65}><Cell>Lista de pedidos</Cell></ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup direction="vertical" className="h-64 max-w-xl rounded-lg border border-border">
      <ResizablePanel defaultSize={40}><Cell>Mapa</Cell></ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}><Cell>Detalhes da rota</Cell></ResizablePanel>
    </ResizablePanelGroup>
  ),
};
