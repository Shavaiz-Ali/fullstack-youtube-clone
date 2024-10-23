"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";
import { ReactNode } from "react";
interface initialState {
  handleViewsCount: (views: number) => void;
}

const handleViewsLengthContext = createContext<initialState | undefined>(
  undefined
);

const HandleVideoViewsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const handleViewsCount = (views: number) => {
    if (!views) return;
    if (views >= 100000 && views <= 1000000) {
      return `${Math.floor(views / 1000)}K`;
    } else if (views >= 1000000 && views <= 10000000) {
      return `${Math.floor(views / 100000)}M`;
    } else if (views >= 10000000) {
      return `${Math.floor(views / 10000000)}B`;
    } else {
      return new Intl.NumberFormat().format(views);
    }
  };

  return (
    <handleViewsLengthContext.Provider value={{ handleViewsCount }}>
      {children}
    </handleViewsLengthContext.Provider>
  );
};

const useHandleVideoViewsCountContext = () => {
  const context = useContext(handleViewsLengthContext);
  return context;
};

export { HandleVideoViewsContextProvider, useHandleVideoViewsCountContext };
