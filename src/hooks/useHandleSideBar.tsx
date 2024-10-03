"use client"

import {useState } from "react";

export const useHandleSidebar = () => {
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  return { openSideBar, setOpenSideBar};
};
