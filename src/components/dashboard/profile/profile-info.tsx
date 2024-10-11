import React from "react";

const ProfileInfo = () => {
  return (
    <div className="p-0 w-full">
      <div className="min-h-[240px] w-full bg-gradient-to-r from-pink-500 via-orange-300 to-cyan-400"></div>
      <div className="flex justify-between items-start w-full p-4">
        <div className="flex justify-center items-center gap-x-3">
          <div className="w-[160px]">
            <div className="size-[96px] lg:size-[140px] xl:size-[160px] bg-white rounded-full text-6xl font-semibold text-black flex justify-center items-center ">
              A
            </div>
          </div>
          <div className="space-y-1 text-white">
            <h1 className="text-[30px] font-semibold leading-[38px]">
              User One
            </h1>
            <p className="text-sm font-semibold">@handle</p>
            <div className="flex justify-center items-center gap-x-2">
              <p className="text-sm font-semibold">100K Subscribers</p>
              <div className="size-1 rounded-full bg-white" />
              <p className="text-sm font-semibold">100 Subscribed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
