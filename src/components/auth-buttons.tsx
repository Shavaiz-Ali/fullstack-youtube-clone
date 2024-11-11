import { useAuthContext } from "@/context/authContext";
import Link from "next/link";
import React, { useState } from "react";
import UserDetailsDropdown from "./user-details-dropdown";
import CreateChannelPopUp from "./create-channel-pop-up";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const AuthButtons = () => {
  const { user, isAuthenticated } = useAuthContext();
  const [openUserDetailsDropdown, setOPenUserDetailsDropdown] = useState(false);
  const [openCreateChannelPopUp, setOpenCreateChannelPopUp] = useState(false);

  return (
    <>
      <div className="flex justify-center items-center gap-x-7">
        {isAuthenticated && user ? (
          <>
            <Link
              href={`/dashboard/${user?.channel?._id}/upload-video`}
              className="relative bg-main px-4 py-[8px] text-[16px] shadow-[6px_6px_0px_0px_rgba(56,51,63,1)] font-semibold leading-6 font-serif"
            >
              Upload Video
            </Link>
            <div
              className="relative h-9 w-9 rounded-full bg-main text-white text-md font-semibold flex justify-center items-center cursor-pointer"
              onClick={() =>
                setOPenUserDetailsDropdown(!openUserDetailsDropdown)
              }
            >
              <Avatar className="w-full h-full absolute top-0 left-0">
                <AvatarImage
                  className="w-full h-full object-cover"
                  src={`${
                    user?.channel && user?.channel?.avatar.trim() !== ""
                      ? user?.channel?.avatar
                      : "https://github.com/shadcn.png"
                  }`}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {openUserDetailsDropdown ? (
                <UserDetailsDropdown
                  openUserDetailsDropdown={openUserDetailsDropdown}
                  setOPenUserDetailsDropdown={setOPenUserDetailsDropdown}
                  // openCreateChannelPopUp={openCreateChannelPopUp}
                  setOpenCreateChannelPopUp={setOpenCreateChannelPopUp}
                  user={user}
                />
              ) : null}
            </div>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="text-white text-[16px] font-semibold leading-6 font-serif"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="relative bg-main px-4 py-[8px] text-[16px] shadow-[6px_6px_0px_0px_rgba(56,51,63,1)] font-semibold leading-6 font-serif"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
      {openCreateChannelPopUp && (
        <CreateChannelPopUp
          openCreateChannelPopUp={openCreateChannelPopUp}
          setOpenCreateChannelPopUp={setOpenCreateChannelPopUp}
        />
      )}
    </>
  );
};

export default AuthButtons;
