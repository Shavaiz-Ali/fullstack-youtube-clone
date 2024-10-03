import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LogoProps {
  height: number;
  width: number;
  className?: string;
  imgHeight?: number;
  imgWidth?: number;
}

const Logo = ({ height, width, className, imgHeight, imgWidth }: LogoProps) => {
  return (
    <Link href={"/"}>
      <div
        className={cn(
          "relative h-[54px] w-[54px] rounded-full border border-white",
          height && width
            ? `h-[${height}px] w-[${width}px]`
            : "h-[54px] w-[54px]",
          className
        )}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-1">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={imgWidth ? imgWidth : 40}
            height={imgHeight ? imgHeight : 40}
          />
        </div>
        <div className="absolute bottom-1/2 translate-y-1/2 left-[4px] top-[2px]">
          <span className="text-white text-[18px] font-bold">Play</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
