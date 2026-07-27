import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

const meta = { title: "Components/Accordion", component: Accordion, tags: ["autodocs"] } satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="a">
        <AccordionTrigger>Como funciona a entrega?</AccordionTrigger>
        <AccordionContent>Do dark store mais perto de você, em minutos.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Qual a taxa de entrega?</AccordionTrigger>
        <AccordionContent>Calculada no checkout conforme a distância.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Posso agendar?</AccordionTrigger>
        <AccordionContent>Sim, escolha a janela de horário no carrinho.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
