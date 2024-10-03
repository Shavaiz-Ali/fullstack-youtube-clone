import Player from "@/components/stream/player";
import React from "react";
const Watch = () => {
  return (
    <div className="bg-black min-h-screen lg:flex justify-center items-start gap-x-4 p-4">
      <div className="w-full flex flex-col gap-y-5">
        <Player />
      </div>
      <div className="text-white">Side section</div>
    </div>
  );
};

export default Watch;
