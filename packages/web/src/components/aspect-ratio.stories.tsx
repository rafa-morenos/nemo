import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./aspect-ratio";

const meta = { title: "Components/Aspect Ratio", component: AspectRatio, tags: ["autodocs"] } satisfies Meta<typeof AspectRatio>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[360px]">
      <AspectRatio ratio={16 / 9} className="rounded-lg bg-primary/10">
        <div className="flex h-full items-center justify-center text-sm text-primary">16 / 9</div>
      </AspectRatio>
    </div>
  ),
};
