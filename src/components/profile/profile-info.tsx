/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import Error from "@/components/error";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import { useHandleChannelId } from "@/hooks/useHandleChannelId";
import { cn } from "@/lib/utils";
// import { useSearchParams } from "next/navigation";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";

const ProfileInfo = () => {
  const { channelId } = useHandleChannelId();
  const { isFetching, isFetched, fetchChannelDetails } = useYoutubeApiContext();
  console.log(channelId);

  const [data, setData] = useState<null | {
    avatar: { url: string }[];
    banner: { url: string }[];
    title: string;
    subscriberCountText: string;
    channelHandle: string;
    code: string;
  }>(null);

  useEffect(() => {
    fetchChannelDetails({
      channelId: channelId as string,
      tab: "about",
    })
      .then((res) => setData(res))
      .catch((error) => console.log(error));
  }, [channelId]);

  console.log(data);

  // useEffect(() => {
  //   if (data && data.banner && data.banner.length > 0) {
  //     const checkScreenWidth = () => {
  //       if (window.innerWidth >= 1024) {
  //         setBannerImage(data.banner[5]?.url);
  //       } else if (window.innerWidth >= 768) {
  //         setBannerImage(data.banner[4]?.url);
  //       } else if (window.innerWidth >= 640) {
  //         setBannerImage(data.banner[3]?.url);
  //       } else if (window.innerWidth >= 480) {
  //         setBannerImage(data.banner[2]?.url);
  //       } else {
  //         setBannerImage(data.banner[1]?.url);
  //       }
  //     };

  //     checkScreenWidth(); // Call initially to set the correct banner based on current width

  //     window.addEventListener("resize", checkScreenWidth);

  //     return () => {
  //       window.removeEventListener("resize", checkScreenWidth);
  //     };
  //   }
  // }, [data]);

  // console.log("banner image", bannerImage);

  return (
    <>
      {isFetching ? (
        <div className="p-4">
          <Loader />
        </div>
      ) : (
        <>
          {data && data.code !== "403" && isFetched ? (
            <div className="p-4 w-full">
              <div
                className={cn(
                  "min-h-[240px] w-full bg-cover bg-center object-cover overflow-hidden rounded-[20px] shrink-0",
                  {
                    "bg-gradient-to-r from-pink-500 via-orange-300 to-cyan-400":
                      !data?.banner || data?.banner?.length < 1,
                  }
                )}
                style={{
                  backgroundImage: `url(${
                    data?.banner && data.banner?.length > 0
                      ? data?.banner[5].url
                      : null
                  })`,
                }}
              />

              <div className="flex flex-col sm:flex-row sm:justify-center items-start sm:items-center gap-3 p-4">
                <div className="sm:w-[160px] sm:px-0">
                  <div className="size-[96px] sm:size-[140px] xl:size-[160px] bg-white rounded-full text-6xl font-semibold text-black flex justify-center items-center ">
                    {data?.avatar && data?.avatar?.length > 0 ? (
                      <img
                        className="h-full w-full rounded-full object-cover border"
                        src={`${data?.avatar[2]?.url}`}
                        alt=""
                      />
                    ) : (
                      "A"
                    )}
                  </div>
                </div>
                <div className="sm:flex justify-between items-start w-full">
                  <div className="space-y-1 text-white">
                    <h1 className="text-[30px] font-semibold leading-[38px]">
                      {data?.title}
                    </h1>
                    <p className="text-sm font-semibold">
                      {data?.channelHandle}
                    </p>
                    <div className="flex gap-x-2">
                      <p className="text-sm font-semibold">
                        <span>Subscribers </span>
                        {data?.subscriberCountText}
                      </p>
                    </div>
                  </div>
                  <Button className="flex justify-center items-center gap-x-1 w-[120px] h-[40px] bg-main rounded-none text-black text-sm font-semibold leading-[20px] hover:bg-main mt-2">
                    <FaUserPlus size={20} />
                    <span>Follow</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <Error message="Error fetching channel Details" />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProfileInfo;
