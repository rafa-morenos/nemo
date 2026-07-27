import type { Meta, StoryObj } from "@storybook/react";
import { Search, Percent } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText } from "./input-group";

const meta = { title: "Components/Input Group", component: InputGroup, tags: ["autodocs"] } satisfies Meta<typeof InputGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-3">
      <InputGroup>
        <InputGroupAddon align="inline-start"><Search className="h-4 w-4" /></InputGroupAddon>
        <InputGroupInput placeholder="Buscar produto…" />
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Cupom" />
        <InputGroupAddon align="inline-end"><InputGroupText>%</InputGroupText><Percent className="h-4 w-4" /></InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
