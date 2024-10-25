/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useHandleChannelId } from "@/hooks/useHandleChannelId";
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
  // data: ApiResponseTypes[] | null;
  data: any | null;
  isFetched: boolean;
  isFetching: boolean;
  fetchChannelDetails: ({
    channelId,
    tab,
  }: {
    channelId: string;
    tab?: string;
  }) => Promise<any>;
  comments: null | undefined;
}

const FetchYoutubeApiContext = createContext<YoutubeApiState | undefined>(
  undefined
);

const YoutubeApiContextProvider = ({ children }: { children: ReactNode }) => {
  const searchQuery = useSearchParams().get("search");
  const videoId = useSearchParams().get("v1");
  const pathname = usePathname();
  const shortsPath = pathname.replaceAll("/", "").replace("shorts", "");

  const [data, setData] = useState<ApiResponseTypes[] | null>(null);
  const [comments, setComments] = useState<undefined | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  // const [chann]
  const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
  // console.log(API_KEY)

  const url = searchQuery
    ? `https://yt-api.p.rapidapi.com/search?query=${searchQuery}`
    : videoId || shortsPath
    ? `https://yt-api.p.rapidapi.com/video/info?id=${videoId || shortsPath}`
    : "https://yt-api.p.rapidapi.com/home";

  const fetchData = async () => {
    setIsFetching(true);
    if (shortsPath && shortsPath.includes("/shorts")) {
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
      // console.log(results);
      const endResults = results?.data ? results?.data : results;
      setIsFetching(false);
      setIsFetched(true);
      setData(endResults);
    } catch (error) {
      setIsFetching(false);
      console.error(error);
    }
  };

  // fetching channel details
  const fetchChannelDetails = async ({
    channelId,
    tab = "about",
  }: {
    tab?: string;
    channelId: string;
  }) => {
    // console.log(channelId, tab, "is trigred again");
    if (!channelId) return;
    setIsFetching(true);
    try {
      const response = await fetch(
        `https://yt-api.p.rapidapi.com/channel/${tab}?id=${channelId}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": API_KEY as string,
            "x-rapidapi-host": "yt-api.p.rapidapi.com",
          },
        }
      );
      setIsFetching(false);
      setIsFetched(true);
      return await response.json();
    } catch (error) {
      setIsFetching(false);
      console.error("Error fetching channel details:", error);
      return null;
    }
  };

  // calling fucntion fetchdata to fetchData from api
  useEffect(() => {
    fetchData();
  }, [searchQuery, videoId, shortsPath]);

  //removing channelid from localstorage issue fixed
  const { clearChannelId } = useHandleChannelId();
  useEffect(() => {
    const channelId = localStorage.getItem("channelId");
    // console.log(pathname);
    if (channelId) {
      if (
        channelId &&
        (pathname.startsWith("/profile") || pathname.includes("/profile"))
      )
        return;

      clearChannelId();
    }
    return;
  }, [pathname]);

  const contextValue = useMemo(
    () => ({
      data,
      isFetched,
      isFetching,
      fetchChannelDetails,
      comments,
    }),
    [data, isFetched, isFetching, comments]
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
