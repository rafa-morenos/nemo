import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DatePicker } from "./date-picker";

const meta = { title: "Components/Date Picker", component: DatePicker, tags: ["autodocs"] } satisfies Meta<typeof DatePicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>();
    return <DatePicker value={date} onChange={setDate} placeholder="Agendar entrega" />;
  },
};
