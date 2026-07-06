"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/modules/auth/context/auth-context";
import { ChevronsUpDownIcon } from "lucide-react";
import UserDropdown from "./user-dropdown";

export function NavUser() {
  const { user } = useAuth();
  const { isMobile } = useSidebar();

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserDropdown
          user={user}
          side={isMobile ? "bottom" : "right"}
          trigger={
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {user.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          }
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
