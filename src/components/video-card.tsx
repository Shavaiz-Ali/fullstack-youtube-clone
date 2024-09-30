/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
// import Image from "next/image";

const VideoCard = (data) => {
  const item = data?.data || null;
  if (!item || item === null) return;
  console.log(item);

  const handleViewsCount = (views: number) => {
    if (!views) return;
    if (views >= 100000 && views <= 1000000) {
      return `${Math.floor(item.viewCount / 1000)}K`;
    } else if (views >= 1000000 && views <= 10000000) {
      return `${Math.floor(item.viewCount / 100000)}M`;
    } else if (views >= 10000000) {
      return `${Math.floor(item.viewCount / 10000000)}B`;
    } else {
      return new Intl.NumberFormat().format(views);
    }
  };
  return (
    <Card className="p-0 bg-transparent border-0 w-full h-full">
      <CardHeader className="relative p-0 w-full">
        {item?.thumbnail || item?.thumbnail?.length > 0 ? (
          <img
            className="rounded"
            src={`${item.thumbnail[1].url || item.thumbnail[1].url}`}
            alt=""
          />
        ) : null}
      </CardHeader>
      <CardContent className="p-0 mt-4">
        <div className="flex items-start gap-x-3">
          <div className="md:w-[50px] w-[60px] overflow-hidden relative">
            <img
              className="h-12 w-12 rounded-full object-cover border"
              src={`${
                item?.channelThumbnail?.length > 0 &&
                item?.channelThumbnail[0]?.url
              }`}
              alt=""
            />
          </div>
          <div className="flex flex-col items-start gap-y-0.5 text-white">
            <p className="text-white text-[16px] font-medium line-clamp-2 md:w-[200px] w-[90%]">
              {item?.title}
            </p>
            <div className="flex items-center gap-x-2 text-white text-sm font-normal">
              <p className="text-sm font-normal">
                {handleViewsCount(item?.viewCount)}
                Views
              </p>
              <span>.</span>
              <p>{item?.publishedTimeText}</p>
            </div>
            <p className="line-clamp-1">{item?.channelTitle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
