/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { useHandleVideoViewsCountContext } from "@/context/handleViewsContext";
// import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const HomeMainVideo = ({ player }: any) => {
  const { handleViewsCount }: any = useHandleVideoViewsCountContext();
  // const [mainVideoDetails, setMainVideoDetails] = useState<[] | null>(null);

  // const fetchMainVideo = async () => {
  //   try {
  //     const url = `https://yt-api.p.rapidapi.com/video/info?id=${player?.videoId}`;
  //     const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "x-rapidapi-key": API_KEY as string,
  //         "x-rapidapi-host": "yt-api.p.rapidapi.com",
  //       },
  //     };

  //     const response = await fetch(url, options);
  //     const results = await response.json();
  //     setMainVideoDetails(results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(mainVideoDetails);

  // useEffect(() => {
  //   fetchMainVideo();
  // }, [player?.videoId]);

  return (
    <div className="hidden sm:block w-full py-6 border-b border-b-white">
      <Card className="p-0 bg-transparent overflow-hidden border-0">
        <CardContent className="flex items-start gap-x-4 w-full p-0 h-full">
          <div className="rounded-[8px] overflow-hidden  h-[280px] xl:w-[500px] w-full border border-gray-100/20">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${player?.videoId}`}
              width="100%"
              height="100%"
              playing
              controls
              volume={1}
            />
          </div>
          <div className="space-y-3 text-white  w-full lg:w-[70%]">
            <p className="text-md font-medium line-clamp-2">{player?.title}</p>
            <div className="flex items-center gap-x-2">
              <p className="text-md text-gray-300 font-medium">
                {handleViewsCount(Number(player?.viewCount))} <span>Views</span>
              </p>
              <div className="h-1 w-1 rounded-full bg-gray-300" />
              <p className="text-md text-gray-300 font-medium line-clamp-1">
                {player?.publishedTimeText}
              </p>
            </div>
            <div className="w-full">
              <p className="text-md font-medium line-clamp-5">
                {player?.description}
              </p>
              <button className="cursor-pointer text-gray-400">
                Read More
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeMainVideo;
