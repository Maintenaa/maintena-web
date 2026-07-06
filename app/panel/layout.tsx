import { PanelSidebar } from "@/components/panel/panel-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <PanelSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
