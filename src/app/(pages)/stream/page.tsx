import Player from "@/components/stream/player";
import React from "react";
const Watch = () => {
  return (
    <div className="bg-black min-h-screen lg:flex xl:justify-center items-start gap-x-4 p-4 w-full">
      <div className="lg:w-[857.33px] md:w-[757px] flex flex-col gap-y-5">
        <Player />
      </div>
      <div className="text-white">Side section</div>
    </div>
  );S
};

export default Watch;
