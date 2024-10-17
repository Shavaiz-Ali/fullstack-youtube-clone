"use client";

import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import Error from "../error";
import ReactPlayer from "react-player";

const ShortsPlayer: React.FC = () => {
  const { data, isFetched, isFetching } = useYoutubeApiContext();

  // Safely access the first element of the array
  const videoData = data && data.length > 0 ? data[0] : null;

  return (
    <>
      {isFetching && !isFetched ? (
        <div className="text-white">Loading</div>
      ) : isFetched && videoData && videoData.code !== 403 ? (
        <div className="h-full w-full border border-gray-50/20 rounded-[8px]">
          <ReactPlayer
            url={`https://www.youtube.com/shorts/${videoData.id}`}
            width="100%"
            height="100%"
            playing
            controls
            volume={1}
          />
        </div>
      ) : (
        <Error message="Video Not Found" />
      )}
    </>
  );
};

export default ShortsPlayer;
