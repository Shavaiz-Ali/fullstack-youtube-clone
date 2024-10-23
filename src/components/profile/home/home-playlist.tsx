/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import HomeCarousel from "./home-carousel";

const HomePlaylist = ({ playlist }: any) => {
  console.log(playlist);
  return (
    <div className="py-6 border-b border-b-gray-100/20 w-full">
      <div className="space-y-1 text-white">
        <p className="text-sm sm:text-md md:text-lg font-semibold line-clamp-2">
          {playlist?.title}
        </p>
        <p className="text-sm md:text-md font-medium text-gray-300 line-clamp-2">
          {playlist?.subtitle}
        </p>
      </div>
      {/* playlist carousel */}
      <div className="my-2">
        <HomeCarousel
          videoDetails={playlist}
          path={`${playlist?.title === "Shorts" ? "/shorts" : "/stream"}`}
        />
      </div>
    </div>
  );
};

export default HomePlaylist;
