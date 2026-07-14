"use client";

import { NavMain, NavMainGroup } from "@/components/panel/nav-main";
import { NavUser } from "@/components/panel/nav-user";
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
  BotIcon,
} from "lucide-react";
import { CompanySwitcher } from "./company-switcher";
import { useCompany } from "@/components/provider/company-provider";
import { useMemo } from "react";
import { usePanelPath } from "@/lib/panels";
import { usePathname } from "next/navigation";

export function PanelSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { panelUrl, isPanelPathActive } = usePanelPath();
  const { currentCompany } = useCompany();
  const pathname = usePathname();

  const match = (exp: string) => isPanelPathActive(exp);

  const navs = useMemo<NavMainGroup[]>(() => {
    if (!currentCompany) return [];

    return [
      {
        label: "Main",
        items: [
          {
            title: "Dashboard",
            url: panelUrl("/"),
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
            url: panelUrl("/locations"),
            icon: LocateIcon,
            isActive: match("/locations*"),
          },
          {
            title: "Assets",
            url: panelUrl("/assets"),
            icon: GalleryVerticalEndIcon,
            isActive: match("/assets*"),
          },
          {
            title: "Parts",
            url: panelUrl("/parts"),
            icon: AudioLinesIcon,
            isActive: match("/parts*") || match("/part-suppliers*"),
            items: [
              {
                url: panelUrl("/parts"),
                title: "List Parts",
                isActive: match("/parts*"),
              },
              {
                url: panelUrl("/part-suppliers"),
                title: "Supplier Parts",
                isActive: match("/part-suppliers*"),
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
            url: panelUrl("/preventive-maintenance"),
            icon: FlagIcon,
            isActive: match("/preventive-maintenance*"),
          },
          {
            title: "Work Order",
            url: panelUrl("/work-orders"),
            icon: TerminalIcon,
            isActive: match("/work-orders*"),
            items: [
              {
                title: "List Work Orders",
                url: panelUrl("/work-orders"),
                isActive: match("/work-orders"),
              },
              {
                title: "Request Work Order",
                url: panelUrl("/work-orders/create"),
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
            url: panelUrl("/employees"),
            icon: UsersIcon,
            isActive: match("/employees*"),
          },
          {
            title: "Positions",
            url: panelUrl("/positions"),
            isActive: match("/positions*"),
            icon: BadgeCheckIcon,
          },
        ],
      },
      {
        label: "AI",
        items: [
          {
            title: "AI Assistant",
            url: panelUrl("/assistant"),
            icon: BotIcon,
            isActive: match("/assistant*"),
          },
        ],
      },
    ];
  }, [currentCompany, panelUrl, pathname]);

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
