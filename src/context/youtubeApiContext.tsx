/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

// Define initial state
interface YoutubeApiState {
  data: undefined[];
  isFetched: boolean;
  isFetching: boolean;
  fetchChannelDetails: ({ channelId }: { channelId: string }) => Promise<any>; // Change this to return a Promise
  comments: null | undefined;
}

const FetchYoutubeApiContext = createContext<YoutubeApiState | undefined>(
  undefined
);
const YoutubeApiContextProvider = ({ children }: { children: ReactNode }) => {
  // querries
  const searchQuery = useSearchParams().get("search");
  const videoId = useSearchParams().get("v1");

  console.log(searchQuery, videoId)

  // states
  const [data, setData] = useState<undefined[]>([]); // Changed type to undefined[]
  const [comments, setComments] = useState<undefined | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const url = searchQuery
    ? `https://yt-api.p.rapidapi.com/search?query=${searchQuery}`
    : videoId
    ? `https://yt-api.p.rapidapi.com/dl?id=${videoId}`
    : "https://yt-api.p.rapidapi.com/home";

  const fetchData = async () => {
    console.log("fetch triggred with ", videoId, url);
    setIsFetching(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "c12f85e2f8msh5cca653a58d801fp15981ejsn9271b771e623",
          "x-rapidapi-host": "yt-api.p.rapidapi.com",
        },
      });
      const results = await response.json();
      const endResults = results?.data ? results?.data : results;
      setIsFetching(false);
      if (response.ok) {
        setIsFetched(true);
        setData(endResults);
      }
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  //fetching channel details
  const fetchChannelDetails = async ({ channelId }: { channelId: string }) => {
    try {
      const url = `https://yt-api.p.rapidapi.com/channel/about?id=${channelId}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "c12f85e2f8msh5cca653a58d801fp15981ejsn9271b771e623",
          "x-rapidapi-host": "yt-api.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const results = await response.json();
      return results;
    } catch (error) {
      console.log("error fetching channel details", error);
      return null; // Return null in case of an error for better handling
    }
  };

  //fetching video comments
  const fetchVideoComments = async () => {
    console.log("videoID", videoId);
    try {
      const url = `https://yt-api.p.rapidapi.com/comments?id=${videoId}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "c12f85e2f8msh5cca653a58d801fp15981ejsn9271b771e623",
          "x-rapidapi-host": "yt-api.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const results = await response.json();
      setComments(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, videoId]);


  // useEffect(() => {
  //   fetchVideoComments()
  // }, [videoId])

  return (
    <FetchYoutubeApiContext.Provider
      value={{
        data,
        isFetched,
        isFetching,
        fetchChannelDetails,
        comments,
      }}
    >
      {children}
    </FetchYoutubeApiContext.Provider>
  );
};

// Custom hook to use the context
const useYoutubeApiContext = () => {
  const context = useContext(FetchYoutubeApiContext); // Correct way to use context
  if (!context) {
    throw new Error(
      "useYoutubeApiContext must be used within a YoutubeApiContextProvider"
    );
  }
  return context;
};

export { YoutubeApiContextProvider, useYoutubeApiContext };
