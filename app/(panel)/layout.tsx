import { PanelSidebar } from "@/components/panel/panel-sidebar";
import CompanyProvider from "@/components/provider/company-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getMetaTitle } from "@/lib/metas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getMetaTitle("Dashboard"),
};

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
