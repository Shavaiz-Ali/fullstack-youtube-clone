"use client";

import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import Error from "../error";
import ReactPlayer from "react-player";



const ShortsPlayer: React.FC = () => {
  const { data, isFetched, isFetching } = useYoutubeApiContext();

  return (
    <>
      {isFetching && !isFetched ? (
        <div className="text-white">Loading</div>
      ) : isFetched && data ? (
        <div className="h-full w-full border border-gray-50/20 rounded-[8px]">
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
