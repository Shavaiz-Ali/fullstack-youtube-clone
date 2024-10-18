/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { CarouselItem } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

import { HiDotsVertical } from "react-icons/hi";
import Link from "next/link";
// import { useRouter } from "next/router";

const ShortsListing = ({ shorts }: any) => {
  // const router = useRouter()
  return (
    <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-0 sm:max-h-[600px] cursor-pointer">
      <Link href={`/shorts/${shorts?.videoId}`}>
        <Card className="p-0 bg-transparent border-0 overflow-hidden h-full flex flex-col gap-y-2">
          <CardContent className="p-0 aspect-auto flex items-start gap-y-2 w-full rounded-[8px]  border border-gray-50/20 h-[300px] lg:h-[550px] md:h-[400px] sm:[350px]">
            <img
              className="object-cover object-center rounded-[8px] w-full h-full"
              src={`${shorts?.thumbnail[0].url}`}
              alt=""
            />
          </CardContent>
          <div className="space-y-1">
            <div className="flex justify-between items-start gap-x-1">
              <p className="text-sm font-medium text-white line-clamp-2">
                {shorts?.title}
              </p>
              <span>
                <HiDotsVertical color="#ffffff" size={16} className="cursor-pointer"/>
              </span>
            </div>
            <span className="text-sm font-medium text-white">
              {shorts?.viewCountText}
            </span>
          </div>
        </Card>
      </Link>
    </CarouselItem>
  );
};

export default ShortsListing;
