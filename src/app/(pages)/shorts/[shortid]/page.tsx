import ShortsPlayer from "@/components/shorts/shorts-player";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import React from "react";

const ShortsPage = () => {
  return (
    <div className="w-full h-full flex justify-between items-start p-4">
      <div className="w-full flex items-center gap-x-2 self-start">
        <ArrowLeftIcon color="#ffffff" fontSize={25} />
        <span className="text-md font-medium text-white">Search</span>
      </div>
      <div className="w-full h-[calc(100%-90px)]">
        <ShortsPlayer />
      </div>
      <div className="w-full text-white self-center flex flex-col items-center justify-end">
        hey
      </div>
    </div>
  );
};

export default ShortsPage;
