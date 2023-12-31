import { Notification } from "@/types";
import Link from "next/link";
import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

const MobileNavigation = ({ notification }: { notification: Notification }) => {
  return (
    <div className="border-t border-neutral-800 px-10 py-3 fixed w-full bottom-0 bg-black z-60 sm:hidden trans">
      <div className="flex flex-row items-center justify-between">
        <Link href={"/home"}>
          <BsHouseFill size={22} color="white" />
        </Link>
        <Link href={"/search"}>
          <FiSearch size={22} color="white" />
        </Link>
        <Link href={"/notification"}>
          <div className="relative">
            <BsBellFill size={22} color="white" />
            {notification?.hasNotification !== 0 && (
              <span className="absolute -top-1 right-0 w-4 h-4 rounded-full bg-sky-500 text-white flex justify-center items-center cursor-pointer text-xs">
                {notification?.hasNotification}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;
