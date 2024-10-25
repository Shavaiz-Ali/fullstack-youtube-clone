/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import HomeCarousel from "./home-carousel";
import ProfileVideoCard from "../profile-video-card";
import Link from "next/link";

const HomePlaylist = ({ playlist }: any) => {
  // console.log(playlist);
  const path = `${playlist?.title === "Shorts" ? "/shorts" : "/stream"}`;
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
        <div className="hidden xs:block">
          <HomeCarousel videoDetails={playlist} path={`${path}`} />
        </div>
        <div className="block xs:hidden space-y-4">
          {playlist && playlist?.data?.length > 0
            ? playlist?.data?.map((video: any) => (
                <div className="" key={video?.videoId}>
                  <Link
                    href={`${
                      path === "/shorts"
                        ? `/shorts/${video?.videoId}`
                        : `/stream?v1=${video.videoId}`
                    }`}
                    className="mt-12"
                  >
                    <ProfileVideoCard video={video} />
                  </Link>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default HomePlaylist;
