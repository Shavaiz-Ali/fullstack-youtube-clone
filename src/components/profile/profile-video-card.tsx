/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Card, CardContent } from "@/components/ui/card";
import { useHandleVideoViewsCountContext } from "@/context/handleViewsContext";
import Image from "next/image";

const ProfileVideoCard = ({ video }: any) => {
  const { handleViewsCount }: any = useHandleVideoViewsCountContext();

  return (
    <Card className="p-0 bg-transparent border-none overflow-hidden rounded-[8px]">
      <CardContent className="relative flex flex-col aspect-auto gap-y-3 p-0">
        <div className="relative">
          <div className="absolute right-3 bottom-1 h-5 px-3 flex justify-center items-center bg-black text-white rounded-[2px]">
            <span className="text-sm font-serif">{video?.lengthText}</span>
          </div>
          {/* <img
            src={`${
              video?.thumbnail && video?.thumbnail?.length > 0
                ? video?.thumbnail[3]?.url
                : null
            }`}
            alt=""
            className="w-full h-full object-cover rounded-[8px]"
          /> */}
          <Image
            src={`${
              video?.thumbnail && video?.thumbnail?.length > 0
                ? video?.thumbnail[3]?.url
                : null
            }`}
            alt=""
            className="w-full h-full object-cover rounded-[8px]"
            sizes="100%"
            height={300}
            width={500}
          />
        </div>
        <div className="flex justify-between gap-x-2 w-full">
          <p className="text-sm text-white font-medium line-clamp-2">
            {video?.title}
          </p>
          <span>
            <BsThreeDotsVertical
              color="#ffffff"
              size={16}
              className="cursor-pointer"
            />
          </span>
        </div>
        <div className="">
          <div className="flex items-center gap-x-2">
            <p className="text-sm text-gray-300 font-medium line-clamp-1">
              {handleViewsCount(Number(video?.viewCount))} <span>Views</span>
            </p>
            <div className="h-1 w-1 rounded-full bg-gray-300" />
            <p className="text-sm text-gray-300 font-medium line-clamp-1">
              {video?.publishedTimeText}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileVideoCard;
