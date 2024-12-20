/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import Loader from "../loader";
import SearchResultsCard from "./search-result-card";
import React from "react";
import Error from "../error";
const ShowSearchResults = () => {
  const { data, isFetched, isFetching } = useYoutubeApiContext();
  return (
    <>
      {isFetching ? (
        <Loader />
      ) : isFetched && data && data.length > 0 ? (
        <div className="space-y-8" key={Math.random()}>
          {data?.map((item: any) => (
            <SearchResultsCard item={item} key={item?.videoId} />
          ))}
        </div>
      ) : (
        <Error message="Error Fetching Results!" />
      )}
    </>
  );
};

export default ShowSearchResults;
