import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";
import { Button } from "./button";

const meta = { title: "Components/Hover Card", component: HoverCard, tags: ["autodocs"] } satisfies Meta<typeof HoverCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild><Button variant="link">@ulisses</Button></HoverCardTrigger>
      <HoverCardContent className="w-64">
        <p className="text-sm font-semibold text-foreground">Ulisses Camilo</p>
        <p className="text-sm text-muted-foreground">Shopper · 4.9 ★ · 1.2k pedidos</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
