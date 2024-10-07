/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import React from "react";
import Loader from "../loader";
import VideoCard from "./video-card";
import Error from "../error";

const HomeView = () => {
  const { data, isFetched, isFetching } = useYoutubeApiContext();
  console.log(isFetching);
  console.log(data);
  return (
    <>
      {/* <VideoCard /> */}

      {isFetching ? (
        <Loader />
      ) : isFetched && data && data?.length > 0 ? (
        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full">
          {data?.map((item: any) => (
            <VideoCard
              key={item?.videoId}
              data={item?.type === "video" ? item : null}
            />
          ))}
        </div>
      ) : (
        <Error message="Error fetching videos!" />
      )}
    </>
  );
};

export default HomeView;
