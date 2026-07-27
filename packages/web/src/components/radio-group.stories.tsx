import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";

const meta = { title: "Components/Radio Group", component: RadioGroup, tags: ["autodocs"] } satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="padrao">
      {[
        { v: "padrao", l: "Entrega padrão · grátis" },
        { v: "expressa", l: "Entrega expressa · R$ 4,99" },
        { v: "agendada", l: "Agendada" },
      ].map(({ v, l }) => (
        <div key={v} className="flex items-center gap-2">
          <RadioGroupItem value={v} id={v} />
          <Label htmlFor={v}>{l}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};
