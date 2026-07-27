import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./slider";

const meta = { title: "Components/Slider", component: Slider, tags: ["autodocs"] } satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Slider defaultValue={[40]} max={100} step={1} className="w-80" />,
};

export const Range: Story = {
  render: () => <Slider defaultValue={[20, 70]} max={100} step={1} className="w-80" />,
};
