/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Error from "@/components/error";
import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import { useHandleChannelId } from "@/hooks/useHandleChannelId";
import Link from "next/link";
import React, { useEffect } from "react";
import ProfileVideoCard from "../profile-video-card";
import Loader from "@/components/loader";

const ProfileVideos = () => {
  const [videos, setVideos] = React.useState<
    | [
        {
          videoId: string;
          lengthText: string;
          thumbnail: { url: string }[];
          title: string;
          viewCount: string;
          publishedTimeText: string;
        }
      ]
    | null
  >(null);
  const { channelId } = useHandleChannelId();
  const { isFetched, isFetching, fetchChannelDetails } = useYoutubeApiContext();

  useEffect(() => {
    fetchChannelDetails({
      channelId: channelId as string,
      tab: "videos",
    })
      .then((data) => setVideos(data?.data))
      .catch((err) => console.log(err));
  }, [channelId]);

  // console.log(videos);

  return (
    <>
      {isFetching ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <>
          {videos && isFetched && videos?.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
              {videos?.map((video: { videoId: string }) => (
                <div key={video?.videoId}>
                  <Link href={`/stream?v1=${video?.videoId}`}>
                    <ProfileVideoCard video={video} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <Error message="Error Fetching videos!" />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProfileVideos;
