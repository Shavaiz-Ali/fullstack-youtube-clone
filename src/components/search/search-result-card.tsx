/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useHandleVideoViewsCountContext } from "@/context/handleViewsContext";

const SearchResultsCard = (item: any) => {
  const { handleViewsCount }: any = useHandleVideoViewsCountContext();
  if (!item || item.length < 1) return;
  const data = item?.item;
  if (data === null) return;
  console.log(data)
  return (
    <Card className="p-0 md:flex items-start md:gap-3 bg-transparent rounded-none border-none">
      <CardHeader className="p-0 md:w-[600px]">
        {data?.thumbnail || data?.thumbnail?.length > 0 ? (
          <img
            className="rounded-md"
            src={`${data?.thumbnail[1]?.url || data?.thumbnail[0]?.url}`}
            alt=""
          />
        ) : null}
      </CardHeader>
      <CardContent className="p-0 w-full md:mt-0 mt-4">
        <div className="flex flex-col items-start gap-y-4">
          <div className="xl:w-[522px] sm:w-[422px]">
            <p className="line-clamp-2 w-full text-white text-[18px] font-semibold">
              {data?.title}
            </p>
          </div>
          <div className="flex justify-center items-center gap-x-3 lg:mt-1">
            {data?.lengthText === "LIVE" ? (
              <div className="h-6 w-16 bg-red flex justify-center items-center bg-red-600 text-white text-sm font-medium">
                <span>{data?.lengthText}</span>
              </div>
            ) : (
              <div className="flex items-center gap-x-2 text-white text-sm font-normal">
                <p className="text-sm font-normal">
                  {handleViewsCount(data?.viewCount)}
                  Views
                </p>
                <span>.</span>
                <p>{data?.publishedTimeText}</p>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center  gap-x-3">
            <div className="md:w-[60px] w-[60px] overflow-hidden relative">
              <img
                className="h-14 w-14 rounded-full object-cover border"
                src={`${
                  data?.channelThumbnail?.length > 0 &&
                  data?.channelThumbnail[0]?.url
                }`}
                alt=""
              />
            </div>
            <p className="text-white text-md font-medium">
              {data?.channelTitle}
            </p>
          </div>
          <div className="md:block hidden w-full ">
            <span className="line-clamp-1 text-sm font-medium text-white">{data?.description}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResultsCard;
