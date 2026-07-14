import { getMetaTitle } from "@/lib/metas";
import { Metadata } from "next";
import DefaultPanelLayout from "./create/layout";

export const metadata: Metadata = {
  title: getMetaTitle("Assets"),
};

export default DefaultPanelLayout;
