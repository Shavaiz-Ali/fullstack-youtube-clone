/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import { useHandleChannelId } from "@/hooks/useHandleChannelId";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { channelId } = useHandleChannelId();
  const { fetchChannelDetails } = useYoutubeApiContext();
  const [homeContent, setHomeContent] = useState({});
  console.log(homeContent);
  useEffect(() => {
    if (channelId) {
      fetchChannelDetails({
        channelId: `${channelId}`,
        tab: "home" as string,
      })
        .then((data) => setHomeContent(data?.data))
        .catch((err) => console.log(err));
    }
  }, [channelId]);

  return <div className="px-4">Home</div>;
};

export default ProfilePage;
