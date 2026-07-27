import type { Meta, StoryObj } from "@storybook/react";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta = { title: "Components/Toggle Group", component: ToggleGroup, tags: ["autodocs"] } satisfies Meta<typeof ToggleGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center" variant="outline">
      <ToggleGroupItem value="left" aria-label="Esquerda"><AlignLeft /></ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Centro"><AlignCenter /></ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Direita"><AlignRight /></ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={["hortifruti"]}>
      <ToggleGroupItem value="hortifruti">Hortifruti</ToggleGroupItem>
      <ToggleGroupItem value="bebidas">Bebidas</ToggleGroupItem>
      <ToggleGroupItem value="limpeza">Limpeza</ToggleGroupItem>
    </ToggleGroup>
  ),
};
