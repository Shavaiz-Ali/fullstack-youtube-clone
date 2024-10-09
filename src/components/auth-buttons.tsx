import { useAuthContext } from "@/context/authContext";
import Link from "next/link";
import React from "react";

const AuthButtons = () => {
  const { user, isAuthenticated } = useAuthContext();

  return (
    <div className="flex justify-center items-center gap-x-7">
      {isAuthenticated && user ? (
        <>
          <Link
            href="/auth/login"
            className="text-white text-[16px] font-semibold leading-6 font-serif"
          >
            Logout
          </Link>
          <div className="h-9 w-9 rounded-full bg-main text-white text-md font-semibold flex justify-center items-center">
            <span>{user.username.slice(0, 1).toUpperCase()}</span>
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
  );
};

export default AuthButtons;
