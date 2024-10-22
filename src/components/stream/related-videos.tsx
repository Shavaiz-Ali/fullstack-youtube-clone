/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const RelatedVideos = () => {
  const [relatedVideos, setRelatedVideos] = React.useState<[] | undefined>([]);
  const params = useSearchParams().get("v1");
  console.log(params);
  const fetchRelatedVideos = async () => {
    const url = `https://yt-api.p.rapidapi.com/related?id=${params}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "c12f85e2f8msh5cca653a58d801fp15981ejsn9271b771e623",
        "x-rapidapi-host": "yt-api.p.rapidapi.com",
      },
    };

    const res = await fetch(url, options);

    console.log("relatdvideos", res);
  };

  useEffect(() => {
    fetchRelatedVideos();
  }, [params]);
  return <div className="flex flex-col gap-y-1"></div>;
};

export default RelatedVideos;
