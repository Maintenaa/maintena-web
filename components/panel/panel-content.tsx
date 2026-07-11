"use client";

import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import NavBreadcrumb, { BreadcrumbItem } from "../nav-breadcrumb";
import { ThemeToggler } from "../theme-toggler";
import { useCompany } from "@/modules/company/context/company-context";

interface Props {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function PanelContent({ children, breadcrumbs }: Props) {
  const { currentCompany } = useCompany();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] justify-between ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          {breadcrumbs && (
            <NavBreadcrumb
              breadcrumbs={breadcrumbs.map(([label, url]) => [
                label,
                url ? `/${currentCompany?.id}${url}` : undefined,
              ])}
              basePath={`/${currentCompany?.id}`}
            />
          )}
        </div>
        <div className="mr-2.5">
          <ThemeToggler />
        </div>
      </header>
      <div className="p-4 pt-0">{children}</div>
    </>
  );
}
