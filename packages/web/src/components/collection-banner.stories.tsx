import type { Meta, StoryObj } from "@storybook/react";
import { CollectionBanner } from "./collection-banner";

import bauduccoLogo from "../assets/collection-banner/bauducco-logo.png";
import bauducco1 from "../assets/collection-banner/bauducco-1.png";
import bauducco2 from "../assets/collection-banner/bauducco-2.png";
import bauducco3 from "../assets/collection-banner/bauducco-3.png";
import bauducco4 from "../assets/collection-banner/bauducco-4.png";
import redbullLogo from "../assets/collection-banner/redbull-logo.png";
import redbull1 from "../assets/collection-banner/redbull-1.png";
import redbull2 from "../assets/collection-banner/redbull-2.png";
import redbull3 from "../assets/collection-banner/redbull-3.png";
import redbull4 from "../assets/collection-banner/redbull-4.png";
import vejaLogo from "../assets/collection-banner/veja-logo.png";
import veja1 from "../assets/collection-banner/veja-1.png";
import veja2 from "../assets/collection-banner/veja-2.png";
import veja3 from "../assets/collection-banner/veja-3.png";
import veja4 from "../assets/collection-banner/veja-4.png";
import placeholderLogo from "../assets/collection-banner/placeholder-logo.png";
import placeholder1 from "../assets/collection-banner/placeholder-1.png";

const meta = {
  title: "Components/Collection Banner",
  component: CollectionBanner,
  tags: ["autodocs"],
} satisfies Meta<typeof CollectionBanner>;
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Real brand + product assets pulled from the Figma "CollectionBanner"
 * component (Daki App · Components, node 41674:10448) and committed under
 * src/assets/collection-banner — the Figma MCP asset URLs only stay live for
 * ~7 days, so these are downloaded rather than linked.
 */
const bauducco = {
  brandName: "Bauducco",
  brandLogo: bauduccoLogo,
  products: [{ image: bauducco1 }, { image: bauducco2 }, { image: bauducco3 }, { image: bauducco4 }],
};

const redBull = {
  brandName: "Red Bull",
  brandLogo: redbullLogo,
  products: [
    { image: redbull1, fit: "contain" as const },
    { image: redbull2, fit: "contain" as const },
    { image: redbull3, fit: "contain" as const },
    { image: redbull4, fit: "contain" as const },
  ],
};

const veja = {
  brandName: "Veja",
  brandLogo: vejaLogo,
  products: [{ image: veja1 }, { image: veja2 }, { image: veja3 }, { image: veja4 }],
};

export const Default: Story = {
  args: bauducco,
};

/** Matches the Figma reference row: three brands + the empty-state placeholder. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <CollectionBanner {...bauducco} />
      <CollectionBanner {...redBull} />
      <CollectionBanner {...veja} />
      <CollectionBanner
        brandName="Marca"
        brandLogo={placeholderLogo}
        products={[{ image: placeholder1 }, { image: placeholder1 }, { image: placeholder1 }, { image: placeholder1 }]}
      />
    </div>
  ),
};

/** Real usage: a horizontally-scrollable "shop by brand" row. */
export const Row: Story = {
  render: () => (
    <div className="flex gap-3 overflow-x-auto pb-2">
      <CollectionBanner {...bauducco} />
      <CollectionBanner {...redBull} />
      <CollectionBanner {...veja} />
    </div>
  ),
};
