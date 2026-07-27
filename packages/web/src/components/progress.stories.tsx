import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Progress } from "./progress";

const meta = { title: "Components/Progress", component: Progress, tags: ["autodocs"], args: { value: 64 } } satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <Progress {...args} className="w-80" /> };

export const Animated: Story = {
  render: () => {
    const [v, setV] = React.useState(12);
    React.useEffect(() => {
      const t = setInterval(() => setV((p) => (p >= 100 ? 12 : p + 8)), 700);
      return () => clearInterval(t);
    }, []);
    return <Progress value={v} className="w-80" />;
  },
};
