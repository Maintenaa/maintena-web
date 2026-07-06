"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon, LucideIcon } from "lucide-react";
import Link from "next/link";

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: { title: string; url: string; isActive?: boolean }[];
}

export interface NavMainGroup {
  label: string;
  items: NavMainItem[];
}

interface Props {
  navs: NavMainGroup[];
}

export function NavMain({ navs }: Props) {
  return (
    <>
      {navs.map((group, i) => (
        <SidebarGroup key={i}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item, i) =>
              (item.items?.length || 0) == 0 ? (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    asChild
                    isActive={item.isActive}
                  >
                    <Link href={item.url}>
                      {item.icon && <item.icon className="mr-2 size-4" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <Collapsible
                  key={i}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon className="mr-2 size-4" />}
                        <span>{item.title}</span>
                        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={subItem.isActive}
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ),
            )}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
