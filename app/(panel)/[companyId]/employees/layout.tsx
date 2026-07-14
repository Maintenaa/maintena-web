import { getMetaTitle } from "@/lib/metas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getMetaTitle("Employees"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
