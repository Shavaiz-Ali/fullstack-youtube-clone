/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { menuItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButtons from "./auth-buttons";
import { HiMiniXMark } from "react-icons/hi2";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { useHandleSidebar } from "@/hooks/useHandleSidebar";
// import { useState } from "react";

const Sidebar = () => {
  const { handleSideBarState, sidebarState } = useHandleSidebar();

  console.log(sidebarState);
  const pathname = usePathname();
  if (
    pathname.startsWith("/auth") ||
    pathname.includes("/auth/login") ||
    pathname.includes("/auth/register") ||
    pathname.startsWith("/dashboard") ||
    pathname.includes("/dashboard")
  ) {
    return null;
  }

  return (
    <div
      className={cn(
        "lg:min-w-[280px] min-w-full h-screen lg:static fixed top-0 -left-[200%]  lg:bg-transparent bg-black/[0.50] lg:z-0 z-[50] transition-all ease-in duration-300",
        {
          "-left-[0%]": sidebarState,
          "!min-w-[91px]": pathname.includes("/stream"),
        }
      )}
    >
      <div
        className={cn(
          "w-[280px] py-[32px] px-[16px] flex flex-col lg:h-[calc(100%-90px)] h-full bg-black border-r border-white lg:fixed left-[0%] top-[95px]",
          {
            "!min-w-[91px] w-auto": pathname.includes("/stream"),
          }
        )}
      >
        <div className="relative w-full h-[5%] lg:hidden block">
          <div className="absolute top-0 right-0 h-6 w-6 flex justify-center items-center border border-white cursor-pointer hover:bg-main/50">
            <HiMiniXMark color="white" size={30} />
          </div>
        </div>

        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex flex-col justify-center w-full gap-y-1">
            {menuItems.map((item, index) => (
              <div
                className={cn("py-2 px-3 border border-white", {
                  "w-[48px] h-[48px] rounded flex justify-center items-center":
                    pathname.includes("/stream"),
                })}
                key={index}
              >
                <Link
                  className={cn("flex items-center gap-x-3 text-white", {})}
                  href={`${item.link}`}
                >
                  <item.icon size={18} className="text-white" />
                  <span
                    className={cn("", {
                      hidden: pathname.includes("/stream"),
                    })}
                  >
                    {item.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="block lg:hidden">
              <AuthButtons />
            </div>
            <div
              className={cn(
                "flex items-center gap-x-3 py-2 px-3 border border-white mt-6",
                {
                  "w-[48px] h-[48px] rounded flex justify-center items-center":
                    pathname.includes("/stream"),
                }
              )}
            >
              {/* em.icon size={18} className="text-white" /> */}
              <Link
                className={cn("flex items-center gap-x-3 text-white", {})}
                href={`${"/"}`}
              >
                <FaRegCircleQuestion size={18} className="text-white" />
                <span
                  className={cn("", {
                    hidden: pathname.includes("/stream"),
                  })}
                >
                  Support
                </span>
              </Link>
            </div>
            <div
              className={cn("py-2 px-3 border border-white", {
                "w-[48px] h-[48px] rounded flex justify-center items-center":
                  pathname.includes("/stream"),
              })}
            >
              {/* em.icon size={18} className="text-white" />/ */}
              <Link
                className={cn("flex items-center gap-x-3 text-white", {})}
                href={`${"/"}`}
              >
                <IoSettingsOutline size={18} className="text-white" />
                <span
                  className={cn("", {
                    hidden: pathname.includes("/stream"),
                  })}
                >
                  Contact
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
