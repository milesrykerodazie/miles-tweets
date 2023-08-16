"use client";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Notification, SessionInterface } from "@/types";
import Link from "next/link";

interface SessionProp {
  currentUser: SessionInterface;
  notification: Notification;
}

const SidebarItem = ({ currentUser, notification }: SessionProp) => {
  return (
    <div>
      <div>
        {/* home */}
        <Link href={"/home"}>
          <div className="flex flex-row items-center">
            <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
              <BsHouseFill size={28} color="white" />
            </div>
            <div className="relative hidden lg:flex items-row gap-4 p-4 rounded-fullhover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
              <BsHouseFill size={28} color="white" />
              <p className="hidden lg:block text-white text-xl">Home</p>
            </div>
          </div>
        </Link>
        {/* notifications */}
        <Link href={"/notification"} >
          <div className="flex flex-row items-center">
            <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
              <BsBellFill size={28} color="white" />
              {notification?.hasNotification !== 0 && (
                <span className="absolute top-3 left-7 w-5 h-5 rounded-full bg-sky-500 text-white flex justify-center items-center cursor-pointer text-xs">
                  {notification?.hasNotification}
                </span>
              )}
            </div>
            <div className="relative hidden lg:flex items-row gap-4 p-4 rounded-fullhover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
              <BsBellFill size={28} color="white" />
              {notification?.hasNotification !== 0 && (
                <span className="absolute top-3 left-7 w-5 h-5 rounded-full bg-sky-500 text-white flex justify-center items-center cursor-pointer text-xs">
                  {notification?.hasNotification}
                </span>
              )}

              <p className="hidden lg:block text-white text-xl">Notification</p>
            </div>
          </div>
        </Link>
        {/* profile */}
        <Link href={`/profile/${currentUser?.user?.id}`}>
          <div className="flex flex-row items-center">
            <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
              <FaUser size={28} color="white" />
            </div>
            <div className="relative hidden lg:flex items-row gap-4 p-4 rounded-fullhover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
              <FaUser size={28} color="white" />
              <p className="hidden lg:block text-white text-xl">Profile</p>
            </div>
          </div>
        </Link>
      </div>
      {currentUser ? (
        <div className="flex flex-row items-center">
          <div
            className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden"
            onClick={() => signOut()}
          >
            <BiLogOut size={28} color="white" />
          </div>
          <div
            className="relative hidden lg:flex items-row gap-4 p-4 rounded-fullhover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center"
            onClick={() => signOut()}
          >
            <BiLogOut size={28} color="white" />
            <p className="hidden lg:block text-white text-xl">Logout</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center">
          <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
            <BiLogOut size={28} color="white" />
          </div>
          z
          <div className="relative hidden lg:flex items-row gap-4 p-4 rounded-fullhover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
            <BiLogOut size={28} color="white" />
            <p className="hidden lg:block text-white text-xl">Login</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
