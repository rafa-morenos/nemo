import type { Meta, StoryObj } from "@storybook/react";
import { Bold, Italic } from "lucide-react";
import { Toggle } from "./toggle";

const meta = { title: "Components/Toggle", component: Toggle, tags: ["autodocs"] } satisfies Meta<typeof Toggle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: "Favoritos", "aria-label": "Favoritos" } };
export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Negrito"><Bold /></Toggle>
      <Toggle aria-label="Itálico" variant="outline"><Italic /></Toggle>
    </div>
  ),
};
