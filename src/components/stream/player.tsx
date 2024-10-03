"use client"

import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import { CiPlay1 } from "react-icons/ci";

const Player = () => {
    const {isFetched, isFetching, data} = useYoutubeApiContext()
    console.log(isFetched, isFetching)
    console.log(data)
  return (
    <div className="w-full h-[380px] bg-[url('/images/stream.jpg')] bg-cover bg-center flex justify-center items-center rounded-[8px] overflow-hidden">
      <div className="w-[100px] h-[100px] flex justify-center items-center bg-[#ffffff]/30 rounded-full hover:scale-110 duration-300 cursor-pointer">
        <CiPlay1 className="ml-1" size={40} color="#ffffff" />
      </div>
    </div>
  );
};

export default Player;
