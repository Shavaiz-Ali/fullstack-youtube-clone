import React from "react";
import { FaPlay } from "react-icons/fa6";

const PageNotFound = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-2 justify-center items-center">
      <div className="h-14 w-14 rounded-full flex justify-center items-center bg-[#E4D3FF]">
        <FaPlay className="text-main" size={16} />
      </div>
      <h1 className="text-white text-md font-semibold text-center">
        <span className="block text-2xl font-bold">404</span>
        <span>Page not fouud!</span>
      </h1>
    </div>
  );
};

export default PageNotFound;
