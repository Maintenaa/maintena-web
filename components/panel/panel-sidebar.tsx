"use client";

import { NavMain, NavMainGroup } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  HomeIcon,
  LocateIcon,
  UsersIcon,
  BadgeCheckIcon,
  FlagIcon,
} from "lucide-react";
import { CompanySwitcher } from "./company-switcher";
import { useCompany } from "@/modules/company/context/company-context";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

export function PanelSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname();
  const { currentCompany } = useCompany();

  const p = (path: string) => `/${currentCompany?.id}${path}`;

  function match(exp: string | RegExp) {
    const normalizedPath = path.replace(`/${currentCompany?.id}`, "") || "/";

    if (exp instanceof RegExp) {
      return exp.test(normalizedPath);
    } else {
      return exp.includes("*")
        ? normalizedPath.startsWith(exp.replace("*", ""))
        : normalizedPath === exp;
    }
  }

  const navs = useMemo<NavMainGroup[]>(() => {
    if (!currentCompany) return [];

    return [
      {
        label: "Main",
        items: [
          {
            title: "Dashboard",
            url: p("/"),
            icon: HomeIcon,
            isActive: match("/"),
          },
        ],
      },
      {
        label: "Master Data",
        items: [
          {
            title: "Locations",
            url: p("/locations"),
            icon: LocateIcon,
            isActive: match("/locations*"),
          },
          {
            title: "Assets",
            url: p("/assets"),
            icon: GalleryVerticalEndIcon,
            isActive: match("/assets*"),
          },
          {
            title: "Parts",
            url: p("/parts"),
            icon: AudioLinesIcon,
            isActive: match("/parts*"),
            items: [
              {
                url: p("/parts"),
                title: "List Parts",
                isActive: match("/parts"),
              },
              {
                url: p("/parts/supplier"),
                title: "Supplier Parts",
                isActive: match("/parts/supplier"),
              },
            ],
          },
        ],
      },
      {
        label: "Operations",
        items: [
          {
            title: "Preventive Maintenance",
            url: p("/preventive-maintenance"),
            icon: FlagIcon,
            isActive: match("/preventive-maintenance*"),
          },
          {
            title: "Work Order",
            url: p("/work-orders"),
            icon: TerminalIcon,
            isActive: match("/work-orders*"),
            items: [
              {
                title: "List Work Orders",
                url: p("/work-orders"),
                isActive: match("/work-orders"),
              },
              {
                title: "Create Work Order",
                url: p("/work-orders/create"),
                isActive: match("/work-orders/create"),
              },
            ],
          },
        ],
      },
      {
        label: "Access Control",
        items: [
          {
            title: "Employees",
            url: p("/employees"),
            icon: UsersIcon,
            isActive: match("/employees*"),
          },
          {
            title: "Positions",
            url: p("/positions"),
            isActive: match("/positions*"),
            icon: BadgeCheckIcon,
          },
        ],
      },
    ];
  }, [currentCompany, path]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanySwitcher />
      </SidebarHeader>
      <SidebarContent className="gap-0!">
        <NavMain navs={navs} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
