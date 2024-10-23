/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Error from "@/components/error";
import Loader from "@/components/loader";
import HomePlaylist from "@/components/profile/home/home-playlist";
// import HomeMainVideo from "@/components/profile/home/home-main-video";
import HomeVideos from "@/components/profile/home/home-videos";
import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import { useHandleChannelId } from "@/hooks/useHandleChannelId";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { channelId } = useHandleChannelId();
  const { fetchChannelDetails } = useYoutubeApiContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [homeContent, setHomeContent] = useState<
    | [
        {
          type: string;
          title: string;
        }
      ]
    | null
  >(null);
  console.log(homeContent);
  useEffect(() => {
    if (channelId) {
      fetchChannelDetails({
        channelId: `${channelId}`,
        tab: "home" as string,
      })
        .then((data) => {
          setLoading(false);
          setHomeContent(data?.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [channelId]);

  return (
    <div className="p-4 w-full text-white">
      {loading ? (
        <Loader />
      ) : (
        <>
          {homeContent && homeContent?.length > 0 ? (
            homeContent?.map((item: any) => (
              <div className="space-y-4" key={Math.random()}>
                {item?.type === "video_listing" && item?.title === "Videos" ? (
                  <HomeVideos videos={item} path="/stream" />
                ) : null}

                {/* playlist lising */}
                {item?.type === "video_listing" && item?.title !== "Videos" ? (
                  <HomePlaylist playlist={item} />
                ) : null}
              </div>
            ))
          ) : (
            <Error message="Error fetching data!" />
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
