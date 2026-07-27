import type { Meta, StoryObj } from "@storybook/react";
import { Attachment } from "./attachment";

const meta = { title: "Components/Attachment", component: Attachment, tags: ["autodocs"] } satisfies Meta<typeof Attachment>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-2">
      <Attachment name="comprovante-entrega.pdf" size="248 KB" onRemove={() => {}} />
      <Attachment name="nota-fiscal.xml" size="12 KB" onRemove={() => {}} />
    </div>
  ),
};
