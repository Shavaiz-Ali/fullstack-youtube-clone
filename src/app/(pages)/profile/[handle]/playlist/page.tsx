/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Loader from "@/components/loader";
import Error from "@/components/error";

import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import { useHandleChannelId } from "@/hooks/useHandleChannelId";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
const Playlist = () => {
  const { isFetched, isFetching, fetchChannelDetails } = useYoutubeApiContext();
  const { channelId } = useHandleChannelId();
  const [playlistData, setPlaylistData] = useState<{
    data: {
      id: string;
      title: string;
      thumbnail: { url: string }[];
      description: string;
      videoCount: string;
      publishedTimeText: string;
    }[];
  } | null>(null);

  useEffect(() => {
    fetchChannelDetails({
      channelId: channelId as string,
      tab: "playlists",
    })
      .then((data) => setPlaylistData(data))
      .catch((err) => console.log(err));
  }, [channelId]);

  console.log(playlistData);
  return (
    <div className="p-4 w-full">
      {isFetching ? (
        <Loader />
      ) : (
        <>
          {isFetched && playlistData && playlistData?.data?.length > 0 ? (
            <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4">
              {playlistData?.data?.map((playlist) => (
                <Card
                  className="p-0 bg-transparent border-0  overflow-hidden rounded-none"
                  key={playlist.id}
                >
                  <CardContent className="p-0 space-y-3 w-full">
                    <div className="relative w-full h-full">
                      {/* <img
                        src={`${
                          playlist?.thumbnail && playlist?.thumbnail?.length > 0
                            ? playlist?.thumbnail[0].url
                            : null
                        }`}
                        alt="playlist image"
                        className="w-full h-full object-cover border border-gray-100/20"
                      /> */}
                      <Image
                        src={`${
                          playlist?.thumbnail && playlist?.thumbnail?.length > 0
                            ? playlist?.thumbnail[0].url
                            : null
                        }`}
                        alt=""
                        height={500}
                        width={500}
                        className="w-full h-full rounded-[8px]"
                      />

                      <div className="absolute top-0 left-0 w-full h-full bg-black/20 flex justify-center items-end">
                        <div className="flex justify-between items-start p-4 bg-slate-950/30 border-t border-t-white/50 h-[88px] w-full  text-white text-sm font-medium">
                          <div className="space-y-0.5">
                            <h3>Playlist</h3>
                            <p>{playlist?.publishedTimeText}</p>
                          </div>
                          <h3>
                            Videos <span>{playlist?.videoCount}</span>
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <CardTitle>
                        <span className="text-md sm:text-[1.3rem] font-medium text-white">
                          {playlist?.title}
                        </span>
                      </CardTitle>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Error />
          )}
        </>
      )}
    </div>
  );
};

export default Playlist;
