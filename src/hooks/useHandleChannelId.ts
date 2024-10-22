"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function useHandleChannelId() {
  const [channelId, setChannelId] = useState<string | null>(null);
  const pathname = usePathname();

  // Retrieve channelId from localStorage when the component using this hook mounts
  useEffect(() => {
    console.log("triggred with pathname", pathname);
    const storedChannelId = localStorage.getItem("channelId");
    if (storedChannelId) {
      setChannelId(storedChannelId);
    }
  }, [pathname]);

  // Function to set channelId and store it in localStorage
  const updateChannelId = (newChannelId: string) => {
    setChannelId(newChannelId);
    localStorage.setItem("channelId", newChannelId);
  };

  // Function to clear the channelId from state and localStorage
  const clearChannelId = () => {
    setChannelId(null);
    localStorage.removeItem("channelId");
  };

  // Return the current channelId and the update/clear functions
  return { clearChannelId, channelId, updateChannelId };
}
