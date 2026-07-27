import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

const meta = { title: "Components/Avatar", component: Avatar, tags: ["autodocs"] } satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/64?img=13" alt="Ulisses" />
        <AvatarFallback>UC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>GP</AvatarFallback>
      </Avatar>
    </div>
  ),
};
