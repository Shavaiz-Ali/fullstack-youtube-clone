/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { CarouselItem } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
// import { useRouter } from "next/router";

const ShortsListing = ({ shorts }: any) => {
  // const router = useRouter()
  return (
    <CarouselItem className="sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis1/6 p-0 max-h-[600px] cursor-pointer">
      <Link href={`/shorts/${shorts?.videoId}`}>
        <Card className="p-0 bg-transparen border border-gray-50/20 rounded-[8px] overflow-hidden h-full flex">
          <CardContent className="p-0 aspect-auto flex flex-col items-start gap-y-2 w-full">
            <img
              className="object-cover object-center rounded-[8px] w-full h-full"
              src={`${shorts?.thumbnail[0].url}`}
              alt=""
            />
          </CardContent>
        </Card>
      </Link>
    </CarouselItem>
  );
};

export default ShortsListing;
