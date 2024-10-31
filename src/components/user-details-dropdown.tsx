/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LogOut, Settings, User } from "lucide-react";
import { MdOutlineDashboard } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import CreateChannelPopUp from "./create-channel-pop-up";

const UserDetailsDropdown = ({
  openUserDetailsDropdown,
  setOPenUserDetailsDropdown,
  setOpenCreateChannelPopUp,
  // openCreateChannelPopUp,
  user,
}: {
  openUserDetailsDropdown: boolean;
  setOPenUserDetailsDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCreateChannelPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  // openCreateChannelPopUp: boolean;
  user: any;
}) => {
  console.log(user);
  return (
    <>
      <DropdownMenu
        open={openUserDetailsDropdown}
        onOpenChange={setOPenUserDetailsDropdown}
      >
        <DropdownMenuTrigger asChild>
          <Button
            className="border-none bg-transparent p-0"
            variant="outline"
          ></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-black text-white border border-gray-100/20"
          align="end"
        >
          <DropdownMenuLabel>
            <div className="flex items-start gap-x-2">
              <div className="h-8 w-8 rounded-full bg-white flex justify-center items-center text-black">
                <span>{user.fullName.trim().slice(0, 1).toUpperCase()}</span>
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium">{user.fullName}</p>
                <p className="text-xs">@{user.username}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setOpenCreateChannelPopUp(true)}
            >
              <User />
              <span>Create channel</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MdOutlineDashboard />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BiHelpCircle />
              <span>Help</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserDetailsDropdown;
