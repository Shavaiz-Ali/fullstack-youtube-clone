"use client";

import { menuItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButtons from "./auth-buttons";
import { HiMiniXMark } from "react-icons/hi2";
import { useHandleSidebar } from "@/hooks/useHandleSideBar";
import { cn } from "@/lib/utils";
// import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const { openSideBar } = useHandleSidebar();
  console.log("sidebar console",openSideBar);
  if (
    pathname.startsWith("/auth") ||
    pathname.includes("/auth/login") ||
    pathname.includes("/auth/register")
  ) {
    return null;
  }

  return (
    <div
      className={cn(
        "lg:min-w-[280px] min-w-full h-screen lg:static fixed top-0 left-[0%]  lg:bg-transparent bg-black/[0.50] z-[999999] transition-all ease-in duration-300",
        {
          "-left-[200%]": !openSideBar,
        }
      )}
    >
      <div className="w-[280px] py-[32px] px-[16px] flex flex-col justify-between lg:h-[calc(100%-90px)] h-full bg-black border-r border-white lg:fixed left-[0%] top-[95px]">
        <div className="absolute top-0 -right-6 lg:hidden h-6 w-6 flex justify-center items-center border border-white cursor-pointer hover:bg-main/50">
          ``
          <HiMiniXMark color="white" size={30} />
        </div>
        <div className="flex flex-col justify-center w-full gap-y-1">
          {menuItems.map((item, index) => (
            <div
              className="flex items-center gap-x-3 py-2 px-3 border border-white"
              key={index}
            >
              <item.icon size={18} className="text-white" />
              <Link className="text-white" href={`${item.link}`}>
                {item.name}
              </Link>
            </div>
          ))}
        </div>
        <div className="block lg:hidden">
          <AuthButtons />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
