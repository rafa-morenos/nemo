import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots, useCarousel } from "./carousel";
import { Button } from "./button";
import { cn } from "../lib/utils";

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

/**
 * Promo banner carousel — matches the Figma "XlItem" component (Daki App ·
 * Components, node 32368:81580): only the photo scrolls (CarouselItem), each
 * with its own discount badge; the headline + CTA below crossfade to match
 * whichever photo is in view. Dots track the photo index.
 * (Photos are stock placeholders — swap for real imagery.)
 */
const PROMOS = [
  { image: "https://picsum.photos/seed/daki-breakfast/300/188", discount: "10%OFF", headline: "Café da manhã com até 25% OFF!", cta: "Comprar" },
  { image: "https://picsum.photos/seed/daki-produce/300/188", discount: "15%OFF", headline: "Hortifruti fresquinho toda semana", cta: "Ver ofertas" },
  { image: "https://picsum.photos/seed/daki-drinks/300/188", discount: "20%OFF", headline: "Bebidas geladas com frete grátis", cta: "Aproveitar" },
];

const FADE_MS = 150;

function PromoText({ promos }: { promos: typeof PROMOS }) {
  const { api } = useCarousel();
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex(api.selectedScrollSnap());
        setVisible(true);
      }, FADE_MS);
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const promo = promos[index];

  return (
    <div
      className={cn("flex w-full flex-col items-center gap-2 transition-opacity", visible ? "opacity-100" : "opacity-0")}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <p className="w-full text-center font-display text-lg font-black tracking-wide text-accent-foreground">
        {promo.headline}
      </p>
      <Button pill size="sm">{promo.cta}</Button>
    </div>
  );
}

export const PromoBanner: Story = {
  render: () => (
    <div className="mx-auto w-[302px]">
      <Carousel>
        {/* top section — big radius only on top corners, image scrolls inside */}
        <div className="flex justify-center rounded-t-[100px] bg-card px-2 pb-4 pt-2">
          <CarouselContent className="-ml-0">
            {PROMOS.map((promo) => (
              <CarouselItem key={promo.headline} className="pl-0">
                {/* extra padding around the pill+badge so their shadows have
                    room to render before the carousel's own overflow-hidden
                    viewport clips them. Note: the badge is absolutely
                    positioned against this box's outer edge (not its padded
                    content edge), so its inset must include the padding
                    itself plus the clearance its own shadow needs. */}
                <div className="relative h-[220px] w-full p-4">
                  <div className="size-full rounded-full shadow-md">
                    <div className="size-full overflow-hidden rounded-full">
                      <img src={promo.image} alt="" className="size-full object-cover" />
                    </div>
                  </div>
                  {/* discount badge — sits inside the image's own footprint,
                      reads as "popping out" past the pill's curved corner */}
                  <div className="absolute bottom-6 right-6 flex size-16 items-center justify-center rounded-full bg-background shadow-md">
                    <span className="text-sm font-bold text-accent-foreground">{promo.discount}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        {/* bottom section — modest radius only on bottom corners */}
        <div className="flex flex-col items-center gap-2 rounded-b-[32px] bg-card px-3 pb-4 pt-2">
          <CarouselDots />
          <PromoText promos={PROMOS} />
        </div>
      </Carousel>
    </div>
  ),
};
