"use client";

import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import Error from "../error";
import ReactPlayer from "react-player";

const ShortsPlayer: React.FC = () => {
  const { data, isFetched, isFetching } = useYoutubeApiContext();

  // Safely access the first element of the array
  console.log(data)
  const videoData = data && data.length > 0 ? data[0] : null;
console.log(videoData)
  return (
    <>
      {isFetching && !isFetched ? (
        <div className="text-white">Loading</div>
      ) : isFetched && data && data.code !== 403 ? (
        <div className="h-full w-full sm:w-[450px] border border-gray-50/20 rounded-[8px]">
          <ReactPlayer
            url={`https://www.youtube.com/shorts/${data.id}`}
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
