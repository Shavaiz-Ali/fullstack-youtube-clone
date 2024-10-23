/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
// import Videos from "@/app/(pages)/profile/[handle]/videos/page";

import HomeCarousel from "./home-carousel";

const HomeVideos = ({ videos }: any) => {
  return (
    <div className="space-y-2 py-6 border-b border-b-gray-100/20">
      <h3 className="text-sm sm:text-md md:text-lg font-semibold line-clamp-2">
        Videos
      </h3>
      {/* crouse */}
      <HomeCarousel videoDetails={videos} path="/stream" />
    </div>
  );
};

export default HomeVideos;
