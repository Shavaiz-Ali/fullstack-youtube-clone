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
}

const FetchYoutubeApiContext = createContext<YoutubeApiState | undefined>(
  undefined
);
const YoutubeApiContextProvider = ({ children }: { children: ReactNode }) => {
  const query = useSearchParams().get("search");
  console.log(query);
  const [data, setData] = useState<undefined[]>([]); // Fixed type
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const url = query
    ? `https://yt-api.p.rapidapi.com/search?query=${query}`
    : "https://yt-api.p.rapidapi.com/home";

  const fetchData = async () => {
    console.log("recalled with query")
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
      console.log(results);
      if (response.ok) {
        setIsFetching(false);
        setIsFetched(true);
        setData(results.data);
      }
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <FetchYoutubeApiContext.Provider value={{ data, isFetched, isFetching }}>
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
