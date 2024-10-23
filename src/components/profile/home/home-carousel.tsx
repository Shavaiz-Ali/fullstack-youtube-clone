/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useHandleVideoViewsCountContext } from "@/context/handleViewsContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
const HomeCarousel = ({
  videoDetails,
  path,
}: {
  videoDetails: any;
  path: string;
}) => {
  const { handleViewsCount }: any = useHandleVideoViewsCountContext();
  console.log(videoDetails);
  return (
    <Carousel>
      <CarouselContent className="px-4 space-x-3">
        {videoDetails && videoDetails?.data?.length > 0
          ? videoDetails?.data?.map((video: any) => (
              <CarouselItem
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/6 p-0"
                key={video?.videoId}
              >
                <Link
                  href={{
                    pathname: `${
                      path === "/shorts"
                        ? `/shorts/${video?.videoId}`
                        : `/stream?v1=${video.videoId}`
                    }`,
                  }}
                >
                  <Card className="p-0 bg-transparent border-none overflow-hidden rounded-[8px]">
                    <CardContent className="relative flex flex-col aspect-auto gap-y-3 p-0">
                      <div className="relative">
                        <div className="absolute right-3 bottom-1 h-4 w-12 flex justify-center items-center bg-black text-white rounded-[0.5px]">
                          <span className="text-sm font-normal">
                            {video?.lengthText}
                          </span>
                        </div>
                        <img
                          src={`${
                            video?.thumbnail && video?.thumbnail?.length > 0
                              ? video?.thumbnail[0]?.url
                              : null
                          }`}
                          alt=""
                          className="w-full h-full object-cover rounded-[8px]"
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
                        <p className="text-gray-300 text-md font-medium">
                          Name
                        </p>
                        <div className="flex items-center gap-x-2">
                          <p className="text-sm text-gray-300 font-medium">
                            {handleViewsCount(Number(video?.viewCount))}
                          </p>
                          <div className="h-1 w-1 rounded-full bg-gray-300" />
                          <p className="text-sm text-gray-300 font-medium line-clamp-1">
                            {video?.publishedTimeText}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))
          : ""}
      </CarouselContent>
    </Carousel>
  );
};

export default HomeCarousel;
