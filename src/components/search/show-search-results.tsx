/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import Loader from "../loader";
import SearchResultsCard from "./search-result-card";
import React from "react";
const ShowSearchResults = () => {
  const { data, isFetched, isFetching } = useYoutubeApiContext();
  return (
    <>
      {isFetching ? (
        <Loader />
      ) : isFetched && data && data.length > 0 ? (
        <div className="space-y-8">
          {data?.map((item:any) => (
            <SearchResultsCard item={item?.type  === "video" ? item : null} key={item?.videoId} />
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ShowSearchResults;
