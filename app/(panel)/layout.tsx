"use client";

import { PanelSidebar } from "@/components/panel/panel-sidebar";
import CompanyProvider from "@/components/provider/company-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <PanelSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CompanyProvider>
      <LayoutContent>{children}</LayoutContent>
    </CompanyProvider>
  );
}
