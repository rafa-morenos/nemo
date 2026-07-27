import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";
import { Button } from "./button";

const meta = { title: "Components/Spinner", component: Spinner, tags: ["autodocs"] } satisfies Meta<typeof Spinner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6 text-primary">
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <Button disabled>
      <Spinner className="size-4 text-primary-foreground" />
      Processando…
    </Button>
  ),
};
