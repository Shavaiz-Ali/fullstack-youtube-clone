import { IconType } from "react-icons/lib";

export interface MenuItemsType {
  name: string;
  icon: IconType; // IconType is a type from 'react-icons' to specify an icon component
  link: string;
}

export interface ApiResponseTypes {
  data: [];
  code: number;
  id: string;
}
