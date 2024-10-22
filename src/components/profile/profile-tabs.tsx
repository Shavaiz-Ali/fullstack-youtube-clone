"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useMemo } from "react";

const ProfileTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const channelId = useMemo(
    () => searchParams.get("channelId"),
    [searchParams]
  );

  console.log(pathname);
  const activePath = useMemo(() => pathname.split("/")[3], [pathname]);
  console.log(activePath);

  const [activeTab, setActiveTab] = useState(activePath || "Home");

  const ProfileTabsData = useMemo(
    () => [
      { name: "home", path: "" },
      { name: "videos", path: "videos" },
      { name: "playlist", path: "playlist" },
      { name: "shorts", path: "shorts" },
      { name: "following", path: "following" },
    ],
    []
  );

  useEffect(() => {
    if (!activePath) {
      setActiveTab("home"); // Default to "Home" tab if the path is empty
    } else {
      setActiveTab(activePath.toLowerCase()); // Set the active tab based on the path
    }
  }, [activePath]);

  const handleTabClick = (tab: string, path: string) => {
    setActiveTab(tab);
    const newPath = `/profile/${pathname.split("/")[2]}/${path}`;
    const newUrl = channelId ? `${newPath}?channelId=${channelId}` : newPath;

    console.log("Navigating to:", newUrl);

    // Correct usage of shallow routing in Next.js
    router.replace(newUrl);
  };

  return (
    <div className="w-full flex justify-center items-center px-4">
      {ProfileTabsData.map((tab) => (
        <>
          {console.log(activeTab === tab.name.toLowerCase())}
          <button
            key={tab.name}
            onClick={() => handleTabClick(tab.name, tab.path)}
            className={cn(
              "w-full text-sm font-medium sm:text-md sm:font-bold py-3 text-center text-[#667085] border-b-2 capitalize ",
              {
                "text-main bg-white border-b-main":
                  activeTab !== undefined
                    ? activeTab === tab.name
                    : "Home" === tab.name,
                "border-b-gray-400": activeTab !== tab.name.toLowerCase(),
              }
            )}
          >
            {tab.name}
          </button>
        </>
      ))}
    </div>
  );
};

export default ProfileTabs;
