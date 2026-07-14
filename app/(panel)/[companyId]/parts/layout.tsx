import { getMetaTitle } from "@/lib/metas";
import { Metadata } from "next";
import DefaultPanelLayout from "../assets/layout";

export const metadata: Metadata = {
  title: getMetaTitle("Parts"),
};

export default DefaultPanelLayout;
