import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./button-group";
import { Button } from "./button";

const meta = { title: "Components/Button Group", component: ButtonGroup, tags: ["autodocs"] } satisfies Meta<typeof ButtonGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Dia</Button>
      <Button variant="outline">Semana</Button>
      <Button variant="outline">Mês</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Editar</Button>
      <Button variant="outline">Duplicar</Button>
      <Button variant="outline">Arquivar</Button>
    </ButtonGroup>
  ),
};
