"use client";

import { CiSearch } from "react-icons/ci";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
const SearchBox = () => {
  const router = useRouter()
  const [search, setSearch] = useState<string>("");
  const handleSearchQuery = () => {
    if (!search || search.trim() === "") return;
    router.push(`/results?search=${search}`)
  };
  return (
    <div className="hidden lg:flex items-center px-2 border border-white w-[400px] h-[44px]">
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
  );
};

export default SearchBox;
