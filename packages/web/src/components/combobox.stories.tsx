import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Combobox } from "./combobox";

const meta = { title: "Components/Combobox", component: Combobox, tags: ["autodocs"] } satisfies Meta<typeof Combobox>;
export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: "ulisses", label: "Ulisses Camilo" },
  { value: "bruno", label: "Bruno Santos" },
  { value: "ana", label: "Ana Ribeiro" },
  { value: "leo", label: "Léo Teixeira" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>();
    return <Combobox options={options} value={value} onChange={setValue} placeholder="Atribuir rider…" emptyText="Nenhum rider." />;
  },
};
