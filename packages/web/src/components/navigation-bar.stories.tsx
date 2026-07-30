import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { NavigationBar, NavigationBarItem, NavigationBarBagItem } from "./navigation-bar";
import {
  DakiTabbarHomeIcon,
  DakiTabbarCategoriesIcon,
  DakiTabbarSearchIcon,
  DakiTabbarOrdersIcon,
  DakiTabbarMenuIcon,
} from "../icons/tabbar";

const meta = {
  title: "Components/Navigation Bar",
  component: NavigationBar,
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationBar>;
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Réplica exata do frame do Figma: "Pedidos" ativo (com o dot de novidade) e
 * "Sacola" com 98 itens. O 5º item ("Início") está assim no Figma mesmo —
 * o ícone é o de perfil (`Tabbar / User`), mas o texto ainda não foi trocado
 * pra "Perfil"/"Conta"; reproduzido fiel ao arquivo, vale confirmar com o time.
 */
export const Default: Story = {
  render: () => (
    <div className="max-w-md p-4">
      <NavigationBar>
        <NavigationBarItem icon={<DakiTabbarHomeIcon />} label="Início" />
        <NavigationBarItem icon={<DakiTabbarCategoriesIcon />} label="Categorias" />
        <NavigationBarItem icon={<DakiTabbarSearchIcon />} label="Busca" />
        <NavigationBarItem icon={<DakiTabbarOrdersIcon />} label="Pedidos" active dot />
        <NavigationBarItem icon={<DakiTabbarMenuIcon />} label="Início" />
        <NavigationBarBagItem label="Sacola" count={98} />
      </NavigationBar>
    </div>
  ),
};

/**
 * Sacola vazia: sem `count`, não é só o badge que some — o item inteiro
 * perde o fundo escuro fixo e passa a se comportar como um `NavigationBarItem`
 * comum (mesmo `bg-primary`, ícone/label brancos). O destaque escuro é sinal
 * de "tem algo aqui dentro"; sem conteúdo, não tem porque chamar atenção.
 * Pra mostrar "0" de propósito (em vez de vazio de verdade), passe `count={0}`.
 */
export const EmptyBag: Story = {
  render: () => (
    <div className="max-w-md p-4">
      <NavigationBar>
        <NavigationBarItem icon={<DakiTabbarHomeIcon />} label="Início" active />
        <NavigationBarItem icon={<DakiTabbarCategoriesIcon />} label="Categorias" />
        <NavigationBarItem icon={<DakiTabbarSearchIcon />} label="Busca" />
        <NavigationBarItem icon={<DakiTabbarOrdersIcon />} label="Pedidos" />
        <NavigationBarItem icon={<DakiTabbarMenuIcon />} label="Perfil" />
        <NavigationBarBagItem label="Sacola" />
      </NavigationBar>
    </div>
  ),
};

/**
 * A sacola também pode ser a tela atual — sem token/frame do Figma confirmando
 * esse estado ainda, mas sem ele o usuário nunca sabe se "está" na sacola ou
 * só está vendo o slot de CTA sempre-escuro. `brightness-90` escurece o
 * `#001e6b` fixo mais um passo; o "sublinhado" reaproveita o mesmo indicador
 * dos outros tabs.
 */
export const BagActive: Story = {
  render: () => (
    <div className="max-w-md p-4">
      <NavigationBar>
        <NavigationBarItem icon={<DakiTabbarHomeIcon />} label="Início" />
        <NavigationBarItem icon={<DakiTabbarCategoriesIcon />} label="Categorias" />
        <NavigationBarItem icon={<DakiTabbarSearchIcon />} label="Busca" />
        <NavigationBarItem icon={<DakiTabbarOrdersIcon />} label="Pedidos" />
        <NavigationBarItem icon={<DakiTabbarMenuIcon />} label="Perfil" />
        <NavigationBarBagItem label="Sacola" count={3} active />
      </NavigationBar>
    </div>
  ),
};

/**
 * Não logado: o item "Pedidos" não aparece (não tem pedido pra mostrar sem
 * login). `NavigationBar` não sabe nada sobre sessão/login — é a tela que
 * decide quais `NavigationBarItem`s passar como children; aqui é só omitir
 * o item, o `flex-1` de cada item redistribui a largura entre os 5 que
 * restam sozinho, sem precisar de nenhuma prop nova no componente.
 */
export const LoggedOut: Story = {
  render: () => (
    <div className="max-w-md p-4">
      <NavigationBar>
        <NavigationBarItem icon={<DakiTabbarHomeIcon />} label="Início" active />
        <NavigationBarItem icon={<DakiTabbarCategoriesIcon />} label="Categorias" />
        <NavigationBarItem icon={<DakiTabbarSearchIcon />} label="Busca" />
        <NavigationBarItem icon={<DakiTabbarMenuIcon />} label="Perfil" />
        <NavigationBarBagItem label="Sacola" />
      </NavigationBar>
    </div>
  ),
};

/** Troca de aba real, sacola incluída — cada item é controlado (active/onSelect), sem estado próprio. */
export const Interactive: Story = {
  render: () => {
    const [active, setActive] = React.useState("inicio");
    const items = [
      { key: "inicio", label: "Início", icon: <DakiTabbarHomeIcon /> },
      { key: "categorias", label: "Categorias", icon: <DakiTabbarCategoriesIcon /> },
      { key: "busca", label: "Busca", icon: <DakiTabbarSearchIcon /> },
      { key: "pedidos", label: "Pedidos", icon: <DakiTabbarOrdersIcon /> },
      { key: "perfil", label: "Perfil", icon: <DakiTabbarMenuIcon /> },
    ];
    return (
      <div className="max-w-md p-4">
        <NavigationBar>
          {items.map((item) => (
            <NavigationBarItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              active={active === item.key}
              onClick={() => setActive(item.key)}
            />
          ))}
          <NavigationBarBagItem
            label="Sacola"
            count={3}
            active={active === "sacola"}
            onClick={() => setActive("sacola")}
          />
        </NavigationBar>
      </div>
    );
  },
};
