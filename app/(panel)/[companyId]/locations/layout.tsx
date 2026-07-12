import PanelContent from "@/components/panel/panel-content";
import { getMetaTitle } from "@/lib/metas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getMetaTitle("Locations"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PanelContent breadcrumbs={[["Locations"]]}>{children}</PanelContent>;
}
