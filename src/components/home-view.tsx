"use client";
import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import React from "react";
import Loader from "./loader";
import VideoCard from "./video-card";

const HomeView = () => {
  const { data, isFetched, isFetching } = useYoutubeApiContext();
  console.log(data);
  return (
    <>
      {/* <VideoCard /> */}

      {isFetching ? (
        <Loader />
      ) : isFetched && data && data?.length > 0 ? (
        <div className="grid xl:grid-col-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full">
          {data?.map((item, _) => (
            <VideoCard key={_} data={item?.type === "video" ? item : null} />
          ))}
        </div>
      ) : (
        <h1>Something went wrong!</h1>
      )}
    </>
  );
};

export default HomeView;
