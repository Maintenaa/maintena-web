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

export function PanelSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { currentCompany } = useCompany();

  const navs = useMemo<NavMainGroup[]>(() => {
    if (!currentCompany) return [];

    const p = (path: string) => `/${currentCompany.id}${path}`;
    return [
      {
        label: "Main",
        items: [
          {
            title: "Dashboard",
            url: p("/dashboard"),
            icon: HomeIcon,
            isActive: true,
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
          },
          {
            title: "Assets",
            url: p("/assets"),
            icon: GalleryVerticalEndIcon,
          },
          {
            title: "Parts",
            url: p("/parts"),
            icon: AudioLinesIcon,
            items: [
              {
                url: p("/parts"),
                title: "List Parts",
              },
              {
                url: p("/parts/supplier"),
                title: "Supplier Parts",
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
          },
          {
            title: "Work Order",
            url: p("/work-orders"),
            icon: TerminalIcon,
            items: [
              {
                title: "List Work Orders",
                url: p("/work-orders"),
              },
              {
                title: "Create Work Order",
                url: p("/work-orders/create"),
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
          },
          {
            title: "Positions",
            url: p("/positions"),
            icon: BadgeCheckIcon,
          },
        ],
      },
    ];
  }, [currentCompany]);

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
