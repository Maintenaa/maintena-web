import { getMetaTitle } from "@/lib/metas";
import { Metadata } from "next";
import DefaultPanelLayout from "../../layout";

export const metadata: Metadata = {
  title: getMetaTitle("Edit Part"),
};

export default DefaultPanelLayout;
