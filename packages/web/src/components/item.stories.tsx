import type { Meta, StoryObj } from "@storybook/react";
import { Bike, ChevronRight } from "lucide-react";
import { Item, ItemGroup, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "./item";
import { Button } from "./button";

const meta = { title: "Components/Item", component: Item, tags: ["autodocs"] } satisfies Meta<typeof Item>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ItemGroup className="max-w-md">
      {["Ulisses Camilo", "Bruno Santos", "Ana Ribeiro"].map((name) => (
        <Item key={name} variant="outline">
          <ItemMedia><Bike className="h-4 w-4" /></ItemMedia>
          <ItemContent>
            <ItemTitle>{name}</ItemTitle>
            <ItemDescription>Rider · disponível</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon" icon={<ChevronRight className="h-4 w-4" />} aria-label="Ver detalhes" />
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  ),
};
