/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useHandleVideoViewsCountContext } from "@/context/handleViewsContext";
import Link from "next/link";
import { Carousel, CarouselContent } from "../ui/carousel";
import ShortsListing from "./shorts-listing";
import Image from "next/image";

import { BsThreeDotsVertical } from "react-icons/bs";
import { useHandleChannelId } from "@/hooks/useHandleChannelId";

const SearchResultsCard = (item: any) => {
  const { handleViewsCount }: any = useHandleVideoViewsCountContext();
  const { updateChannelId } = useHandleChannelId();
  if (!item || item.length < 1) return;
  const data = item?.item;
  if (data === null) return;

  // console.log(data);

  const handle =
    data?.channelHandle || !data?.channelHandle === undefined
      ? `/profile/${data?.channelHandle}`
      : "/not-found";
  return (
    <>
      {data?.type === "video" ? (
        <Card className="p-0 sm:flex items-start md:gap-3 bg-transparent rounded-none border-none">
          <CardHeader className="relative p-0 md:w-[600px] cursor-pointer">
            <Link href={`/stream?v1=${data?.videoId}`} scroll={true}>
              {data?.thumbnail || data?.thumbnail?.length > 0 ? (
                <img
                  className="rounded-md border border-gray-50/20"
                  src={`${data?.thumbnail[1]?.url || data?.thumbnail[0]?.url}`}
                  alt=""
                />
              ) : null}
            </Link>
            {data?.lengthText === "LIVE" ? null : (
              <div className="absolute bottom-3 right-3 bg-black w-10 h-4 flex justify-center items-center text-[10px] text-white rounded-[1px]">
                <span>{data?.lengthText}</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-0 w-full md:mt-0 mt-4">
            <div className="flex flex-col items-start gap-y-4">
              <div className="xl:w-[522px] sm:w-[422px] cursor-pointer">
                <Link href={`/stream?v1=${data?.videoId}`}>
                  <p className="line-clamp-2 w-full text-white text-[18px] font-semibold">
                    {data?.title}
                  </p>
                </Link>
              </div>
              <div className="flex justify-center items-center gap-x-3 lg:mt-1">
                {data?.lengthText === "LIVE" ? (
                  <div className="h-6 w-16 flex justify-center items-center bg-red-600 text-white text-sm font-medium">
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
                {data?.badges?.includes("New") && (
                  <div className="h-[25px] w-10 flex justify-center items-center text-sm text-white font-medium bg-gray-500/50">
                    {data.badges.find((badge: any) => badge === "New")}
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center  gap-x-3">
                <div className="md:w-[60px] w-[60px] overflow-hidden relative cursor-pointer">
                  <Link
                    href={handle}
                    scroll={true}
                    onClick={() => updateChannelId(data?.channelId)}
                  >
                    <img
                      className="h-14 w-14 rounded-full object-cover border"
                      src={`${
                        data?.channelThumbnail?.length > 0 &&
                        data?.channelThumbnail[0]?.url
                      }`}
                      alt=""
                    />
                  </Link>
                </div>
                <Link
                  href={handle}
                  scroll={true}
                  onClick={() => updateChannelId(data?.channelId)}
                >
                  <p className="text-white text-md font-medium">
                    {data?.channelTitle}
                  </p>
                </Link>
              </div>
              <div className="md:block hidden w-full ">
                <span className="line-clamp-1 text-sm font-medium text-white">
                  {data?.description}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {data?.type === "shorts_listing" && data?.data?.length > 0 ? (
            <div className="border-t border-b py-6 w-full">
              <div className="flex justify-between items-center w-full mb-6">
                <div className="flex justify-center items-center gap-x-1">
                  <Image
                    src={"/images/logo.png"}
                    alt="logo"
                    height={40}
                    width={40}
                  />
                  <p className="text-md font-medium text-white">Shorts</p>
                </div>
                <BsThreeDotsVertical />
              </div>
              <Carousel className="w-full">
                <CarouselContent className="px-4 space-x-4">
                  {data?.type === "shorts_listing" && data?.data?.length > 0
                    ? data?.data.map((short: any) => (
                        <ShortsListing shorts={short} key={short?.videoId} />
                      ))
                    : null}
                </CarouselContent>
              </Carousel>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default SearchResultsCard;
