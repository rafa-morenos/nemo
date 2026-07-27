import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "./table";

const meta = { title: "Components/Table", component: Table, tags: ["autodocs"] } satisfies Meta<typeof Table>;
export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  { id: "8b812", cliente: "Georgia P. S.", status: "No prazo", eta: "12 min" },
  { id: "9c344", cliente: "Marina L.", status: "Atenção", eta: "3 min" },
  { id: "7a109", cliente: "Rafael M.", status: "Atrasado", eta: "-1 min" },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Pedidos em rota</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Pedido</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">ETA</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id}>
            <TableCell className="font-medium">{r.id}</TableCell>
            <TableCell>{r.cliente}</TableCell>
            <TableCell>{r.status}</TableCell>
            <TableCell className="text-right">{r.eta}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
