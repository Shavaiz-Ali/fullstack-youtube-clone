import ShortsPlayer from "@/components/shorts/shorts-player";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import React from "react";

const ShortsPage = () => {
  return (
    <div className="relative w-full h-[calc(100vh-90px)] flex justify-center p-4 overflow-x-hidden">
      <div className="absolute md:top-4 top-3 left-2 md:left-4 w-full flex items-center gap-x-2 self-start">
        <ArrowLeftIcon color="#ffffff" fontSize={25} />
        <span className="text-md font-medium text-white">Search</span>
      </div>
      <div className="sm:w-auto w-full md:h-full h-[96%] md:mt-0 mt-6">
        <ShortsPlayer />
      </div>
    </div>
  );
};

export default ShortsPage;
