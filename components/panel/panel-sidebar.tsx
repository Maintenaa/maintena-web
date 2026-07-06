"use client";

import * as React from "react";

import { NavMain, NavMainGroup } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/panel/team-switcher";
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
  UserIcon,
  BellIcon,
  FlagIcon,
} from "lucide-react";

const teams = [
  {
    name: "Acme Inc",
    logo: <GalleryVerticalEndIcon />,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: <AudioLinesIcon />,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: <TerminalIcon />,
    plan: "Free",
  },
];

const p = (path: string) => `/panel${path}`;

const navs: NavMainGroup[] = [
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

export function PanelSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
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
