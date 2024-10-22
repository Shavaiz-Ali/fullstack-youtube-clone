import { useState } from "react";

export function useHandleSidebar() {
  const [sidebarState, setSidebarState] = useState<boolean>(false);

  const handleSideBarState = (state: boolean) => {
    console.log(state);
    if (state) {
      setSidebarState(state);
    }

    return;
  };

  return {
    handleSideBarState,
    sidebarState,
  };
}
