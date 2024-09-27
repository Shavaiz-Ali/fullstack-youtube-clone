import { MenuItemsType } from "@/types";
import {
  AiFillHome,
  AiFillLike,
  AiOutlineHistory,
  AiFillVideoCamera,
  AiFillFolder,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";

export const menuItems: MenuItemsType[] = [
  { name: "Home", icon: AiFillHome, link: "/" },
  { name: "Liked Videos", icon: AiFillLike, link: "/liked-videos" },
  { name: "History", icon: AiOutlineHistory, link: "/history" },
  { name: "My Content", icon: AiFillVideoCamera, link: "/my-content" },
  { name: "Collection", icon: AiFillFolder, link: "/collection" },
  { name: "Subscribers", icon: AiOutlineUsergroupAdd, link: "/subscribers" },
];
