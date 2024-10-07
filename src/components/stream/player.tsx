"use client";

import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import React from "react";
import { useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import PlayVideo from "./play-video";
import VideoDetails from "./video-details";
import Comments from "./comments";

const Player = () => {
  const { isFetched, isFetching, data } = useYoutubeApiContext();
  const [play, setPlay] = useState<boolean>(false);
  console.log(isFetched, isFetching);
  console.log(data);

  return (
    <div className="xl:w-[70%] lg:w-[60%] flex flex-col gap-y-5">
      <div className="w-full sm:h-[480px] h-[280px]">
        {play ? (
          <PlayVideo item={data?.adaptiveFormats} />
        ) : (
          <div
            className="w-full h-full bg-contain md:bg-cover bg-center bg-no-repeat flex justify-center items-center rounded-[8px] overflow-hidden border border-gray-50/20"
            style={{
              backgroundImage: `url(${
                data?.thumbnail ? data?.thumbnail[4]?.url : "/images/stream.jpg"
              })`,
            }}
          >
            <div
              className="size-[70px] sm:size-[100px] flex justify-center items-center bg-[#ffffff]/30 rounded-full hover:scale-110 duration-300 cursor-pointer"
              onClick={() => setPlay(true)}
            >
              <CiPlay1
                className="ml-1 size-[30px] sm:size-[40px]"
                color="#ffffff"
              />
            </div>
          </div>
        )}
      </div>
      <VideoDetails data={data} />
      <Comments />
    </div>
  );
};

export default Player;
