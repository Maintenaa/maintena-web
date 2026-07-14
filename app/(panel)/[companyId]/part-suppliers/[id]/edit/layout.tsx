import DefaultPanelLayout from "../../layout";
import { getMetaTitle } from "@/lib/metas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getMetaTitle("Edit Part Supplier"),
};

export default DefaultPanelLayout;
