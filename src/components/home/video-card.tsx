/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useHandleVideoViewsCountContext } from "@/context/handleViewsContext";
import Link from "next/link";
// import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import { useHandleChannelId } from "@/hooks/useHandleChannelId";
// import Image from "next/image";

const VideoCard = (data: any) => {
  const { handleViewsCount }: any = useHandleVideoViewsCountContext();
  const { updateChannelId } = useHandleChannelId();
  const item = data?.data || null;
  if (!item || item === null) return;

  const handle =
    item?.channelHandle || !item?.channelHandle === undefined
      ? `/profile/${item?.channelHandle}`
      : "/not-found";

  return (
    <Card className="p-0 bg-transparent border-0 w-full h-full">
      <CardHeader className="relative p-0 w-full cursor-pointer">
        <Link href={`/stream?v1=${item?.videoId}`} scroll={true}>
          {item?.thumbnail || item?.thumbnail?.length > 0 ? (
            <img
              className="rounded"
              src={`${item?.thumbnail[1]?.url || item?.thumbnail[1]?.url}`}
              alt=""
            />
          ) : null}
        </Link>
      </CardHeader>
      <CardContent className="p-0 mt-4">
        <div className="flex items-start gap-x-3">
          <Link
            className="cursor-pointer"
            href={`${handle}`}
            onClick={() => updateChannelId(item?.channelId)}
            scroll={true}
          >
            <div className="h-12 w-12 overflow-hidden relative flex-shrink-0">
              <img
                className="h-full w-full rounded-full object-cover border"
                src={`${
                  item?.channelThumbnail?.length > 0 &&
                  item?.channelThumbnail[0]?.url
                }`}
                alt=""
              />
            </div>
          </Link>
          <div className="flex flex-col items-start gap-y-0.5 text-white">
            <p className="text-white text-[14px] font-medium line-clamp-2 w-[90%]">
              {item?.title}
            </p>
            <div className="flex items-center gap-x-2 text-white text-sm">
              <p className="text-sm">
                {handleViewsCount(item?.viewCount)}
                Views
              </p>
              <span>.</span>
              <p>{item?.publishedTimeText}</p>
            </div>
            <Link
              className="cursor-pointer"
              href={`${handle}`}
              onClick={() => updateChannelId(item?.channelId)}
              scroll={true}
            >
              <p className="text-sm line-clamp-1">{item?.channelTitle}</p>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
