import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Badge } from "./badge";

type Order = { id: string; cliente: string; status: "no-prazo" | "atencao" | "atrasado"; eta: string };

const data: Order[] = [
  { id: "8b812", cliente: "Georgia P. S.", status: "no-prazo", eta: "12 min" },
  { id: "9c344", cliente: "Marina L.", status: "atencao", eta: "3 min" },
  { id: "7a109", cliente: "Rafael M.", status: "atrasado", eta: "-1 min" },
  { id: "5f210", cliente: "Diego P.", status: "no-prazo", eta: "18 min" },
];

const columns: ColumnDef<Order>[] = [
  { accessorKey: "id", header: "Pedido" },
  { accessorKey: "cliente", header: "Cliente" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = row.original.status;
      const color = s === "atrasado" ? "critical" : s === "atencao" ? "warning" : "success";
      const label = s === "atrasado" ? "Atrasado" : s === "atencao" ? "Atenção" : "No prazo";
      return <Badge color={color}>{label}</Badge>;
    },
  },
  { accessorKey: "eta", header: () => <div className="text-right">ETA</div>, cell: ({ row }) => <div className="text-right">{row.original.eta}</div> },
];

const meta = { title: "Components/Data Table", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl">
      <DataTable columns={columns} data={data} />
    </div>
  ),
};
