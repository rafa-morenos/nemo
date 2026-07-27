import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Calendar } from "./calendar";

const meta = { title: "Components/Calendar", component: Calendar, tags: ["autodocs"] } satisfies Meta<typeof Calendar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-lg border border-border" />;
  },
};
