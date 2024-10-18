/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaFolderPlus,
  FaThumbsDown,
  FaThumbsUp,
  FaUserPlus,
} from "react-icons/fa";

const VideoDetails = ({ data }: any) => {
  const [expandDescription, setExpanDescription] = useState(false);
  const [channelDetails, setChannelDetails] = useState<{
    avatar: { url: string }[];
    url: string;
    title: string;
    subscriberCountText: string;
  } | null>(null);
  // console.log(data);

  const { fetchChannelDetails } = useYoutubeApiContext();
  useEffect(() => {
    if (data?.channelId) {
      fetchChannelDetails({ channelId: data.channelId })
        .then((details) => setChannelDetails(details))
        .catch((error) =>
          console.error("Error fetching channel details:", error)
        );
    }
  }, [data?.channelId, fetchChannelDetails]);

  console.log(channelDetails)

  return (
    <div className="w-full border border-white rounded-[16px] h-[px] p-[24px]">
      <div className="flex flex-col">
        <div className="md:flex justify-between w-full md:space-y-0 space-y-4 ">
          <div className="flex flex-col gap-y-2">
            <p className="sm:text-[18px] text-[16px] font-semibold leading-[28px] text-white md:w-[75%]">
              {data?.title}
            </p>
            <div className="flex justify-start items-center gap-x-2 text-white text-sm font-medium">
              <p>100K</p>
              <div className="h-1 w-1 rounded-full bg-white" />
              <p>1 year ago</p>
            </div>
          </div>
          <div className="flex items-start md:justify-normal justify-between gap-x-3">
            <div className="flex justify-between items-center h-[40px] w-[139px] border border-white text-white rounded-[8px] px-3 py-1">
              <div className="flex justify-center items-center gap-x-1">
                <FaThumbsUp className="cursor-pointer" />
                <span>10</span>
              </div>
              <div className="flex justify-center items-center gap-x-1">
                <FaThumbsDown className="cursor-pointer" />
                <span>10</span>
              </div>
            </div>
            <div className="flex justify-center items-center gap-x-1 h-[40px] w-[93px] px-3 py-1 rounded-[8px] bg-white text-md font-medium cursor-pointer">
              <FaFolderPlus size={16} />
              <span>Save</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full mt-3">
          <div className="flex justify-center items-center gap-x-1">
            <div className="size-[42px]  rounded-full overflow-hidden flex justify-center items-center bg-white">
              {channelDetails?.avatar ? (
                <img
                  className="w-full object-cover rounded-full"
                  src={`${
                    channelDetails?.avatar
                      ? channelDetails?.avatar[2]?.url
                      : "/images/stream.jpg"
                  }`}
                  alt=""
                />
              ) : (
                <h1 className="text-xl font-medium">N</h1>
              )}
            </div>
            <div className="space-y-0.5 text-white">
              <h1 className="text-sm font-semibold leading-[20px]">
                {channelDetails?.title}
              </h1>
              <p className="text-[12px] font-normal leading-[18px]">
                {channelDetails?.subscriberCountText}
              </p>
            </div>
          </div>
          <button className="flex justify-center items-center gap-x-1 w-[140px] h-[40px] bg-main text-white text-sm font-semibold leading-[20px]">
            <FaUserPlus size={20} />
            <span>Follow</span>
          </button>
        </div>
        <hr className="my-6" />
        <div
          className="flex items-start w-full text-white cursor-pointer"
          onClick={() => setExpanDescription(!expandDescription)}
        >
          <div className="w-full">
            <p
              className={cn("line-clamp-1", {
                "line-clamp-none": expandDescription,
              })}
            >
              {data?.description}
            </p>
          </div>
          <div className="">
            <FaAngleDown className="text-white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
