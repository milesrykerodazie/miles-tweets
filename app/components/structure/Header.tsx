"use client";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderPropTypes {
  isHome?: boolean;
  title: string;
}

const Header: FC<HeaderPropTypes> = ({ isHome, title }) => {
  const router = useRouter();
  return (
    <div className="border-b-[1px] border-neutral-800 p-3 sticky top-0 bg-black z-20">
      <div className="flex flex-row items-center gap-2">
        {isHome !== true && (
          <BiArrowBack
            onClick={() => router.back()}
            color="white"
            size={20}
            className="
              cursor-pointer 
              hover:opacity-70 
              transition
          "
          />
        )}
        <h1 className="text-white lg:text-xl font-semibold">{title}</h1>
      </div>
    </div>
  );
};

export default Header;
