import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "./select";

const meta = { title: "Components/Select", component: Select, tags: ["autodocs"] } satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Escolha a janela de entrega" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Hoje</SelectLabel>
          <SelectItem value="agora">Agora · ~15 min</SelectItem>
          <SelectItem value="15-16">15:00 – 16:00</SelectItem>
          <SelectItem value="16-17">16:00 – 17:00</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Amanhã</SelectLabel>
          <SelectItem value="08-09">08:00 – 09:00</SelectItem>
          <SelectItem value="09-10">09:00 – 10:00</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
