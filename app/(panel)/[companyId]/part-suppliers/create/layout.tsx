import DefaultPanelLayout from "@/components/panel/panel-layout";
import { getMetaTitle } from "@/lib/metas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getMetaTitle("Create Part Supplier"),
};

export default DefaultPanelLayout;
