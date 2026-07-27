import type { Meta, StoryObj } from "@storybook/react";
import { Home, ShoppingBag, Search, ClipboardList, Bell, Settings } from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
} from "./sidebar";

const meta = { title: "Components/Sidebar", tags: ["autodocs"], parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj;

const nav = [
  { icon: Home, label: "Início", active: true },
  { icon: Search, label: "Busca" },
  { icon: ShoppingBag, label: "Categorias" },
  { icon: ClipboardList, label: "Pedidos", badge: "3" },
];

export const AppShell: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-1 py-1">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-lg">🐟</span>
            <span className="font-heading text-lg font-medium text-sidebar-foreground group-data-[collapsible=icon]:hidden">Nemo · Daki</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Operação</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((n) => (
                  <SidebarMenuItem key={n.label}>
                    <SidebarMenuButton isActive={n.active} tooltip={n.label}>
                      <n.icon />
                      <span>{n.label}</span>
                    </SidebarMenuButton>
                    {n.badge && <SidebarMenuBadge>{n.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Notificações"><Bell /><span>Notificações</span></SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Ajustes"><Settings /><span>Ajustes</span></SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <span className="text-sm font-semibold text-foreground">Painel de operação</span>
        </header>
        <div className="p-6 text-sm text-muted-foreground">Conteúdo principal. Use o botão pra recolher a sidebar (⌘/Ctrl+B).</div>
      </SidebarInset>
    </SidebarProvider>
  ),
};
