import type { Meta, StoryObj } from "@storybook/react";
import * as General from "../icons/general";
import * as Tabbar from "../icons/tabbar";
import * as Delivery from "../icons/delivery";
import * as DeliveryStatuses from "../icons/delivery-statuses";
import * as ToastMessage from "../icons/toast-message";
import * as Address from "../icons/address";
import * as Points from "../icons/points";
import * as Profile from "../icons/profile";
import * as Order from "../icons/order";
import * as CouponWallet from "../icons/coupon-wallet";
import * as Payments from "../icons/payments";

/**
 * Daki `icons-DakiApp` — real assets exported from the Figma file "Daki App •
 * Components — Design in Progress" (node 33858:72174), not hand-drawn.
 */
const meta = { title: "Foundations/Icons" } satisfies Meta;
export default meta;
type Story = StoryObj;

type IconModule = Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>;

function Grid({ title, mod, large }: { title: string; mod: IconModule; large?: boolean }) {
  const entries = Object.entries(mod);
  return (
    <section className="mb-8">
      <h3 className="mb-3 font-heading text-lg font-medium text-foreground">
        {title} <span className="text-sm font-normal text-muted-foreground">({entries.length})</span>
      </h3>
      <div className="flex flex-wrap gap-4">
        {entries.map(([name, Icon]) => (
          <div key={name} className="flex w-28 flex-col items-center gap-2 rounded-lg border border-border p-3">
            <Icon className={large ? "h-8 w-auto max-w-16" : "size-6"} />
            <span className="line-clamp-2 text-center text-xs leading-tight text-muted-foreground">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export const All: Story = {
  render: () => (
    <div>
      <Grid title="General" mod={General as IconModule} />
      <Grid title="Tabbar" mod={Tabbar as IconModule} />
      <Grid title="Delivery" mod={Delivery as IconModule} />
      <Grid title="Delivery statuses" mod={DeliveryStatuses as IconModule} />
      <Grid title="Toast messages" mod={ToastMessage as IconModule} />
      <Grid title="Address" mod={Address as IconModule} />
      <Grid title="Points" mod={Points as IconModule} />
      <Grid title="Profile" mod={Profile as IconModule} />
      <Grid title="Order" mod={Order as IconModule} />
      <Grid title="Coupon wallet" mod={CouponWallet as IconModule} />
      <Grid title="Payments (brand logos — not theme-able, colors are fixed)" mod={Payments as IconModule} large />
    </div>
  ),
};
