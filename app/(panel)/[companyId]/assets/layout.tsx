import PanelContent from "@/components/panel/panel-content";
import { getMetaTitle } from "@/lib/metas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getMetaTitle("Assets"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PanelContent breadcrumbs={[["Assets"]]}>{children}</PanelContent>;
}
