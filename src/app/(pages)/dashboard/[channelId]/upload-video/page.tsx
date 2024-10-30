import UploadVideoDetails from "@/components/dashboard/upload-video-details";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

const UploadVideo = () => {
  return (
    <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full z-[999999] bg-black !py-12">
      <div className="max-w-[95%] sm:max-w-[90%] lg:max-w-[70%] h-auto mx-auto border border-white w-full bg-black ">
        <div className="flex justify-between items-center p-6">
          <p className="text-md sm:text-lg font-semibold text-white">
            Upload Videos
          </p>
          <Button className="relative rounded-none text-black bg-main px-4 py-[8px] text-[16px] shadow-[6px_6px_0px_0px_rgba(56,51,63,1)] font-semibold leading-6 font-serif hover:bg-main">
            Save
          </Button>
        </div>
        <Separator />
        <div className="lg:max-w-[70%] sm:max-w-[90%] w-full h-full sm:p-0 p-4 mx-auto flex justify-center items-center">
          <UploadVideoDetails />
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
