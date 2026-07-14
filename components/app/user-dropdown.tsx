import { BellIcon, LogOutIcon, SparklesIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "@/modules/user/dto/user";
import { useState } from "react";
import { AlertConfirmDialog } from "./confirm-dialog";

interface Props {
  user: User;
  trigger: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

export default function UserDropdown({ user, trigger, side = "right" }: Props) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-fit"
          side={side}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {user.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <SparklesIcon className="text-primary" />
              Upgrade to Pro
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserIcon />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowLogoutConfirm(true)}>
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertConfirmDialog
        open={showLogoutConfirm}
        onOpenChange={setShowLogoutConfirm}
        title="Logout"
        description="Are you sure to log out? Your session will be end."
        onConfirm={() => {}}
        confirmText="Logout"
        confirmVariant="destructive"
      />
    </>
  );
}
