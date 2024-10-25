/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import ProfileVideoCard from "../profile-video-card";
const HomeCarousel = ({
  videoDetails,
  path,
}: {
  videoDetails: any;
  path: string;
}) => {
  // console.log(videoDetails);
  return (
    <>
      <Carousel>
        <CarouselContent className="px-4 space-x-3">
          {videoDetails && videoDetails?.data?.length > 0
            ? videoDetails?.data?.map((video: any) => (
                <CarouselItem
                  className="basis-1/2 md:basis-1/3 xl:basis-1/4 p-0"
                  key={video?.videoId}
                >
                  <Link
                    href={`${
                      path === "/shorts"
                        ? `/shorts/${video?.videoId}`
                        : `/stream?v1=${video.videoId}`
                    }`}
                  >
                    <ProfileVideoCard video={video} />
                  </Link>
                </CarouselItem>
              ))
            : ""}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default HomeCarousel;
