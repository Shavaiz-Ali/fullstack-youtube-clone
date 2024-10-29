/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Error from "@/components/error";
import Loader from "@/components/loader";
import { Card, CardContent } from "@/components/ui/card";
import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import { useHandleChannelId } from "@/hooks/useHandleChannelId";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

const ProfileShorts = () => {
  const { isFetched, isFetching, fetchChannelDetails } = useYoutubeApiContext();
  const { channelId } = useHandleChannelId();
  const [shorts, setShorts] = useState<{
    data: {
      videoId: string;
      thumbnail: { url: string }[];
      title: string;
      viewCount: string;
      viewCountText: string;
    }[];
  } | null>(null);

  useEffect(() => {
    fetchChannelDetails({
      channelId: channelId as string,
      tab: "shorts",
    })
      .then((data) => setShorts(data))
      .catch((error) => console.log(error));
  }, [channelId]);
  // console.log(shorts);
  return (
    <div className="w-full">
      {isFetching ? (
        <Loader />
      ) : (
        <>
          {isFetched && shorts && shorts?.data?.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {shorts?.data?.map((short) => (
                <Card
                  className="bg-transparent p-0 border-none"
                  key={short?.videoId}
                >
                  {/* <CardHeader className="p-0 w-full "></CardHeader> */}
                  <CardContent className="flex flex-col items-center gap-y-3 p-0">
                    <Link
                      className="cursor-pointer w-full h-full"
                      href={`/shorts/${short?.videoId}`}
                    >
                      <div className="relative min-h-[450px] xs:min-h-[300px] xl:min-h-[350px] lg:min-h-[250px] sm:min-h-[350px] xxl:min-h-[450px] w-full overflow-hidden rounded-[8px]">
                        {short?.thumbnail && short?.thumbnail?.length > 0 && (
                          <Image
                            src={`${
                              short?.thumbnail[0].url !== undefined
                                ? short?.thumbnail[0].url
                                : null
                            }`}
                            alt=""
                            fill
                            className="w-full h-full border border-gray-100/20 object-cover object-center"
                            style={{ height: "100%", width: "100%" }}
                          />
                        )}
                      </div>
                    </Link>
                    <div className="flex justify-between items-start gap-x-1">
                      <Link
                        className="cursor-pointer"
                        href={`/shorts/${short?.videoId}`}
                      >
                        <div className="space-y-1">
                          <h1 className="text-sm font-medium text-white line-clamp-2">
                            {short?.title}
                          </h1>
                          <span className="text-sm font-medium text-gray-300 line-clamp-2">
                            {short?.viewCountText}
                          </span>
                        </div>
                      </Link>
                      <span>
                        <HiDotsVertical
                          color="#ffffff"
                          size={16}
                          className="cursor-pointer"
                        />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Error message="Empty!" />
          )}
        </>
      )}
    </div>
  );
};

export default ProfileShorts;
