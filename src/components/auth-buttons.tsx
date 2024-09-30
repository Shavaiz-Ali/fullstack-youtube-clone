import Link from "next/link";
import React from "react";

const AuthButtons = () => {
  return (
    <div className="flex justify-center items-center gap-x-7">
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
    </div>
  );
};

export default AuthButtons;
