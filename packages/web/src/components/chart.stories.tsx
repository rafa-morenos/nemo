import type { Meta, StoryObj } from "@storybook/react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "./chart";

const meta = { title: "Components/Chart", component: ChartContainer, tags: ["autodocs"] } satisfies Meta<typeof ChartContainer>;
export default meta;
type Story = StoryObj<typeof meta>;

const data = [
  { dia: "Seg", pedidos: 220 },
  { dia: "Ter", pedidos: 280 },
  { dia: "Qua", pedidos: 250 },
  { dia: "Qui", pedidos: 310 },
  { dia: "Sex", pedidos: 420 },
  { dia: "Sáb", pedidos: 520 },
  { dia: "Dom", pedidos: 480 },
];

// Chart color pulled from a Nemo token.
const config = {
  pedidos: { label: "Pedidos", color: "var(--nemo-color-interactive-accent-primary-main)" },
} satisfies ChartConfig;

export const Bars: Story = {
  render: () => (
    <ChartContainer config={config} className="h-[260px] w-full max-w-xl">
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="dia" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="pedidos" fill="var(--color-pedidos)" radius={6} />
      </BarChart>
    </ChartContainer>
  ),
};
