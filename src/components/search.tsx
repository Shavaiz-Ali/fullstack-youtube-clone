/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { CiSearch } from "react-icons/ci";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaArrowLeft } from "react-icons/fa";

interface searchBoxProps {
  openSearchBox: boolean;
  setOpenSearchBox: (openSearchBox: boolean) => void;
}
const SearchBox = ({ openSearchBox, setOpenSearchBox }: searchBoxProps) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const handleSearchQuery = () => {
    if (!search || search.trim() === "") return;
    router.push(`/results?search=${search}`);
    setOpenSearchBox(false)
  };
  return (
    <div
      className={cn(
        "sm:static fixed top-0 left-0 bg-black z-[9999999] sm:block hidden",
        {
          "block py-8 w-full min-h-screen":
            openSearchBox,
        }
      )}
    >
      <div className="sm:flex-none flex justify-center items-center gap-x-3 cursor-pointer">
        <div className="sm:hidden block">
          <FaArrowLeft
            className="cursor-pointer"
            size={22}
            color="#ffffff"
            onClick={() => setOpenSearchBox(false)}
          />
        </div>
        <div className="flex items-center px-2 sm:w-[400px] w-[85%] h-[44px] ring-2 ring-white focus-within:ring-main">
          <CiSearch
            color="#ffffff"
            className="text-white h-6 w-6 font-bold"
            onClick={() => handleSearchQuery()}
          />
          <Input
            name="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchQuery();
              }
            }}
            className="!bg-transparent border-none focus:!bg-transparent focus-visible:!bg-transparent text-white focus:ring-0 text-sm font-medium font-serif p-0 px-2 placeholder:text-white"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
