import Player from "@/components/stream/player";
import RelatedVideos from "@/components/stream/related-videos";
import React from "react";
const Watch = () => {
  return (
    <div className="bg-black min-h-screen xl:flex xl:justify-center items-start gap-x-4 p-4 w-full">
      <Player />
      <div className="flex-shrink-0">
        <RelatedVideos />
      </div>
    </div>
  );
};

export default Watch;
