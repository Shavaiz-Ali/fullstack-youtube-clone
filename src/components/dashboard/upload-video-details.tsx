import React from "react";
import { FaDownload } from "react-icons/fa6";
// import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
const UploadVideoDetails = () => {
  return (
    <div className="space-y-[30px] w-full py-[30px]">
      <div className="w-full h-[280px] xs:h-[388px] border-2 border-dashed border-white flex flex-col justify-center items-center xs:gap-y-3 gap-y-1">
        <div className="size-24 xs:size-32 rounded-full flex justify-center items-center bg-[#E4D3FF]">
          <FaDownload className="text-main size-14 sm:size-20" />
        </div>
        <div className="max-w-[90%] gap-y-1">
          <p className="text-white xs:text-[16px] text-[12px] font-semibold leading-[24px] text-center">
            Drag and drop video files to upload
          </p>
          <p className="text-[#FFFFFF] xs:text-[16px] text-[12px] font-[300] leading-[24px] text-center">
            Your videos will be private until you publish them.
          </p>
        </div>
        {/* upload button  */}
        <form action="" className="mt-3">
          <Label
            id="file"
            htmlFor="file"
            className="relative rounded-none text-black bg-main px-[32px] py-[16px] text-[16px] shadow-[6px_6px_0px_0px_rgba(56,51,63,1)] font-semibold leading-6 font-serif hover:bg-main"
          >
            Select Files
          </Label>
          <Input type="file" id="file" name="file" className="hidden" />
        </form>
      </div>
      <form action="" className="space-y-[32px]">
        <div className="">
          <Label
            htmlFor="thumbnail"
            className="text-white text-sm leading-[24px]"
          >
            Thumbnail <sup>*</sup>
          </Label>
          <div className="relative flex border border-white p-0.5 h-[44px] w-full curor-pointer">
            <div
              id="thumbnail"
              className="w-full h-full flex gap-x-1 justify-start items-center text-white text-sm font-semibold"
            >
              <div className="h-full w-[104px] flex justify-center items-center bg-main text-[12px] font-semibold text-black">
                <span>Choose File</span>
              </div>
              No file selected
            </div>
            <Input
              className="border-0 absolute z-[999999] left-0 top-0 opacity-0 w-full h-full cursor-pointer"
              type="file"
              id="thumbnail"
              name="thumbnail"
            />
          </div>
        </div>

        <div className="">
          <Label htmlFor="title" className="text-white text-sm leading-[24px]">
            Title <sup>*</sup>
          </Label>
          <div className="relative flex border border-white p-0.5 h-[44px] w-full curor-pointer">
            <Input
              className="border-0 w-full h-full text-white text-sm font-semibold"
              type="text"
              id="title"
              name="title"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="">
          <Label
            htmlFor="description"
            className="text-white text-sm leading-[24px]"
          >
            Description <sup>*</sup>
          </Label>
          <div className="relative flex border border-white p-0.5 h-[44px] w-full curor-pointer">
            <Input
              className="border-0 w-full h-full  text-white text-sm font-semibold"
              type="text"
              id="description"
              name="description"
              autoComplete="off"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadVideoDetails;
