/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ApiResponseTypes } from "@/types";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

// Define initial state
interface YoutubeApiState {
  data: ApiResponseTypes[] | null;
  isFetched: boolean;
  isFetching: boolean;
  fetchChannelDetails: ({ channelId }: { channelId: string }) => Promise<any>; // Change this to return a Promise
  comments: null | undefined;
  setProfileId: (profileId: string) => void;
  profileId: string | undefined;
}

const FetchYoutubeApiContext = createContext<YoutubeApiState | undefined>(
  undefined
);
const YoutubeApiContextProvider = ({ children }: { children: ReactNode }) => {
  // querries
  const searchQuery = useSearchParams().get("search");
  const videoId = useSearchParams().get("v1");
  const pathname = usePathname().replaceAll("/", "").replace("shorts", "");
  // if (pathname.includes("/shorts")) {
  //   pathname = pathname.replaceAll("/", "").replace("shorts", "");
  // }

  console.log(searchQuery, pathname);

  // states
  const [data, setData] = useState<ApiResponseTypes[] | null>(null); // Changed type to undefined[]
  const [comments, setComments] = useState<undefined | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [profileId, setProfileId] = useState<string | undefined>("");

  const url = searchQuery
    ? `https://yt-api.p.rapidapi.com/search?query=${searchQuery}`
    : videoId || pathname
    ? `https://yt-api.p.rapidapi.com/dl?id=${videoId || pathname}`
    : "https://yt-api.p.rapidapi.com/home";

  // fetch video

  const fetchData = async () => {
    console.log("fetch triggred with ", videoId, pathname);
    setIsFetching(true);
    if (pathname && pathname.includes("/shorts")) {
      setIsFetching(false);
      return;
    }
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "c12f85e2f8msh5cca653a58d801fp15981ejsn9271b771e623",
          "x-rapidapi-host": "yt-api.p.rapidapi.com",
        },
      });

      if (!response.ok) {
        console.log(response);
      }

      const results = await response.json();
      const endResults = results?.data ? results?.data : results;
      console.log(endResults);
      setIsFetching(false);
      setIsFetched(true);
      setData(endResults);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  //fetching channel details
  const fetchChannelDetails = async ({
    channelId,
    tab,
  }: {
    channelId: string;
    tab?: string;
  }) => {
    console.log("channelID", channelId, tab);
    try {
      const url = `https://yt-api.p.rapidapi.com/channel/${
        tab ? tab : "about"
      }?id=${channelId}`;
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
  }, [searchQuery, videoId, pathname]);

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
        setProfileId,
        profileId,
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
