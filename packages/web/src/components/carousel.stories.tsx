import type { Meta, StoryObj } from "@storybook/react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./carousel";

const meta = { title: "Components/Carousel", component: Carousel, tags: ["autodocs"] } satisfies Meta<typeof Carousel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-xs">
      <Carousel>
        <CarouselContent>
          {["Hortifruti", "Bebidas", "Limpeza", "Padaria", "Frios"].map((c) => (
            <CarouselItem key={c}>
              <div className="flex h-40 items-center justify-center rounded-lg border border-border bg-card text-lg font-semibold text-card-foreground">
                {c}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
