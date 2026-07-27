import type { Meta, StoryObj } from "@storybook/react";
import { Field, FieldLabel, FieldDescription, FieldError, FieldGroup } from "./field";
import { Input } from "./input";

const meta = { title: "Components/Field", component: Field, tags: ["autodocs"] } satisfies Meta<typeof Field>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="email">E-mail</FieldLabel>
        <Input id="email" type="email" placeholder="voce@exemplo.com" />
        <FieldDescription>Enviaremos a confirmação do pedido aqui.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="cep">CEP</FieldLabel>
        <Input id="cep" placeholder="00000-000" aria-invalid />
        <FieldError>CEP fora da área de entrega.</FieldError>
      </Field>
    </FieldGroup>
  ),
};
