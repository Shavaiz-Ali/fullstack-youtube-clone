"use client";

import Logo from "./logo";
import Link from "next/link";
import SearchBox from "./search";
import { usePathname } from "next/navigation";
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
      <div className="w-full border-b border-white bg-black fixed top-0 left-0">
        <div className="lg:max-w-[1371.43px] mx-auto p-5 lg:px-0  flex justify-between items-center w-full">
          <Logo height={54} width={54} imgHeight={40} imgWidth={40} />
          <SearchBox />
          {" "}
          <div className="flex justify-center items-center gap-x-7">
            <Link
              href="/auth/login"
              className="text-white text-[16px] font-semibold leading-6 font-serif"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="relative bg-main px-4 py-[8px] text-[16px] shadow-[6px_6px_0px_0px_rgba(56,51,63,1)] font-semibold leading-6 font-serif"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
