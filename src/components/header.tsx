"use client";

import Logo from "./logo";
import SearchBox from "./search";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import AuthButtons from "./auth-buttons";
const Header = () => {
  const pathname = usePathname();

  if (
    pathname.startsWith("/auth") ||
    pathname.includes("/auth/login") ||
    pathname.includes("/auth/register")
  ) {
    return null;
  }
  return (
    <div className="min-h-[90px]">
      <div className="w-full border-b border-white bg-black fixed top-0 left-0 z-[999999]">
        <div className="lg:max-w-[1400.43px] mx-auto p-5 lg:px-4  flex justify-between items-center w-full">
          <Logo height={54} width={54} imgHeight={40} imgWidth={40} />
          <SearchBox />
          <div className="hidden lg:block">
            <AuthButtons />
          </div>
          <div className="lg:hidden flex justify-center items-center gap-x-4">
            <CiSearch color="#ffffff" size={24} />
            <FaBars color="#ffffff" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
