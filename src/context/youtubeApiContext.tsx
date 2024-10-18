/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ApiResponseTypes } from "@/types";
// import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";

// Define initial state
interface YoutubeApiState {
  data: ApiResponseTypes[] | null;
  isFetched: boolean;
  isFetching: boolean;
  fetchChannelDetails: ({ channelId }: { channelId: string }) => Promise<any>;
  comments: null | undefined;
  setProfileId: (profileId: string) => void;
  profileId: string | undefined;
}

const FetchYoutubeApiContext = createContext<YoutubeApiState | undefined>(
  undefined
);

const YoutubeApiContextProvider = ({ children }: { children: ReactNode }) => {
  const searchQuery = useSearchParams().get("search");
  const videoId = useSearchParams().get("v1");
  const pathname = usePathname().replaceAll("/", "").replace("shorts", "");

  const [data, setData] = useState<ApiResponseTypes[] | null>(null);
  const [comments, setComments] = useState<undefined | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [profileId, setProfileId] = useState<string | undefined>("");
  const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY; 
  // console.log(API_KEY)

  const url = searchQuery
    ? `https://yt-api.p.rapidapi.com/search?query=${searchQuery}`
    : videoId || pathname
    ? `https://yt-api.p.rapidapi.com/dl?id=${videoId || pathname}`
    : "https://yt-api.p.rapidapi.com/home";

  const fetchData = async () => {
    setIsFetching(true);
    if (pathname && pathname.includes("/shorts")) {
      setIsFetching(false);
      return;
    }
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY as string,
          "x-rapidapi-host": "yt-api.p.rapidapi.com",
        },
      });

      const results = await response.json();
      const endResults = results?.data ? results?.data : results;
      setIsFetching(false);
      setIsFetched(true);
      setData(endResults);
    } catch (error) {
      setIsFetching(false);
      console.error(error);
    }
  };

  const fetchChannelDetails = async ({
    channelId,
    tab,
  }: {
    channelId: string;
    tab?: string;
  }) => {
    try {
      const response = await fetch(
        `https://yt-api.p.rapidapi.com/channel/${tab || "about"}?id=${channelId}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "c12f85e2f8msh5cca653a58d801fp15981ejsn9271b771e62",
            "x-rapidapi-host": "yt-api.p.rapidapi.com",
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching channel details:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, videoId, pathname]);

  const contextValue = useMemo(
    () => ({
      data,
      isFetched,
      isFetching,
      fetchChannelDetails,
      comments,
      setProfileId,
      profileId,
    }),
    [data, isFetched, isFetching, comments, profileId]
  );

  return (
    <FetchYoutubeApiContext.Provider value={contextValue}>
      {children}
    </FetchYoutubeApiContext.Provider>
  );
};

const useYoutubeApiContext = () => {
  const context = useContext(FetchYoutubeApiContext);
  if (!context) {
    throw new Error(
      "useYoutubeApiContext must be used within a YoutubeApiContextProvider"
    );
  }
  return context;
};

export { YoutubeApiContextProvider, useYoutubeApiContext };
