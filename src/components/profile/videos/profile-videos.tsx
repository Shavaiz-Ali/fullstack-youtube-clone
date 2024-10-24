/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import { useHandleChannelId } from "@/hooks/useHandleChannelId";
import React, { useEffect } from "react";

const ProfileVideos = () => {
  const [videos, setVideos] = React.useState<[] | null>(null);
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

  console.log(videos);

  return <div></div>;
};

export default ProfileVideos;
