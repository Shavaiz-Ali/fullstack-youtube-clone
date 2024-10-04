import Player from "@/components/stream/player";
import React from "react";
const Watch = () => {
  return (
    <div className="bg-black min-h-screen lg:flex xl:justify-center items-start gap-x-4 p-4 w-full">
      <Player />
      <div className="text-white flex-shrink-0">Side section</div>
    </div>
  );
};

export default Watch;
