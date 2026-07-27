import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta = { title: "Components/Textarea", component: Textarea, tags: ["autodocs"], args: { placeholder: "Alguma observação para a entrega?" } } satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <Textarea {...args} className="max-w-sm" /> };
export const Disabled: Story = { args: { disabled: true, value: "Indisponível" } };
