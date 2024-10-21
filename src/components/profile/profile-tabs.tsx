"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useMemo } from "react";

const ProfileTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const channelId = searchParams.get("channelId");

  const [activeTab, setActiveTab] = useState("Home");

  // Memoize tabs to prevent unnecessary recalculations
  const ProfileTabsData = useMemo(
    () => [
      { name: "Home", path: "" },
      { name: "Videos", path: "videos" },
      { name: "Playlist", path: "playlist" },
      { name: "Shorts", path: "shorts" },
      { name: "Following", path: "following" },
    ],
    []
  );

  // Set active tab based on the current path
  useEffect(() => {
    const currentTab = ProfileTabsData.find((tab) =>
      pathname.includes(tab.path)
    );
    if (currentTab) setActiveTab(currentTab.name);
  }, [pathname, ProfileTabsData]);

  // Handle tab changes without unnecessary re-renders
  const handleTabClick = (tab: string, path: string) => {
    setActiveTab(tab);
    const newPath = `/profile/${pathname.split("/")[2]}/${path}`;
    const newUrl = channelId ? `${newPath}?channelId=${channelId}` : newPath;

    router.replace(newUrl, undefined, { shallow: true }); // Prevent page reload or API call
  };

  return (
    <div className="w-full flex justify-center items-center px-4">
      {ProfileTabsData.map((tab) => (
        <button
          key={tab.name}
          onClick={() => handleTabClick(tab.name, tab.path)}
          className={cn("w-full py-3 text-center text-[#667085] border-b-2", {
            "text-main bg-white border-b-main": activeTab === tab.name,
            "border-b-gray-400": activeTab !== tab.name,
          })}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
