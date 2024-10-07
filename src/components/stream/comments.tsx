// import { useYoutubeApiContext } from "@/context/youtubeApiContext";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { IoSend } from "react-icons/io5";
import { cn } from "@/lib/utils";

const Comments = () => {
  const [comment, setComment] = useState<string>("");
  //   const { comments }: any = useYoutubeApiContext();
  return (
    <div className="w-full border border-white rounded-[16px] h-[px] p-[24px] text-white">
      <div className="space-y-4">
        <h1 className="text-[16px] font-semibold leading-[24px] text-white">
          5K Comments
        </h1>
        <div className="w-full flex justify-between items-center border border-white rounded-md py-1 px-3 overflow-hidden">
          <Input
            type="text"
            value={comment}
            placeholder="Add a comment"
            className="border-none focus-visible:border-none bg-transparent focus-visible:bg-transparent text-white placeholder:text-white text-sm font-medium p-0"
            onChange={(e) => setComment(e.target.value)}
          />
          <IoSend
            className={cn("text-main cursor-pointer", {
              "pointer-events-none text-gray-400": comment.trim() === "",
            })}
            size={22}
          />
        </div>
      </div>
      {/* show comments */}
      <div className="flex items-start gap-x-3 mt-6 border-t border-white pt-5">
        <div className="h-[48px] w-[48px] rounded-full bg-white flex justify-center items-center text-black">
          <h3>N</h3>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-y-1 text-white">
            <h1 className="flex justify-center items-center gap-x-1 text-sm font-[500] leading-[20px]">
              Hello Word
              <p className="text-[12px] font-[400] leading-[18px]">Just Now</p>
            </h1>
            <p className="text-sm font-[400] leading-[20px]">@handle</p>
          </div>
          <h3>Looks Good!</h3>
        </div>
      </div>
    </div>
  );
};

export default Comments;
