import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./form";
import { Input } from "./input";
import { Button } from "./button";

const meta = { title: "Components/Form", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj;

/** Form built on react-hook-form — label/control/description/message wired for a11y. */
export const Default: Story = {
  render: () => {
    const form = useForm<{ email: string }>({ defaultValues: { email: "" }, mode: "onTouched" });
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="max-w-sm space-y-6">
          <FormField
            control={form.control}
            name="email"
            rules={{ required: "Informe seu e-mail", pattern: { value: /.+@.+\..+/, message: "E-mail inválido" } }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl><Input placeholder="voce@exemplo.com" {...field} /></FormControl>
                <FormDescription>Enviaremos a confirmação do pedido aqui.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    );
  },
};
