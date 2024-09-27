"use client";

import { menuItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  if (
    pathname.startsWith("/auth") ||
    pathname.includes("/auth/login") ||
    pathname.includes("/auth/register")
  ) {
    return null;
  }
  return (
    <div className="min-w-[280px]">
      <div className="min-w-[280px] py-[32px] px-[16px] overflow-y-hidden flex-1 h-screen bg-black border-r border-white fixed left-0 top-[95px]">
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
      </div>
    </div>
  );
};

export default Sidebar;
