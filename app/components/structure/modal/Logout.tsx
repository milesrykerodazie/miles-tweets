"use client";
import React, { FC, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Avatar from "../../Avatar";
import { SessionInterface } from "@/types";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface SessionTypes {
  currentUser: SessionInterface;
}

const Logout: FC<SessionTypes> = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`text-white pb-5 md:w-full relative ${open && "w-full"}`}>
      <div className="flex flex-row gap-2 p-3">
        <div onClick={() => setOpen((current) => !current)}>
          <Avatar image={currentUser?.user?.image} size="h-10 w-10" />
        </div>
        {/* other attributes */}
        <div className="hidden md:flex md:items-center  md:justify-between md:flex-1">
          <div className="text-xs lg:text-base trans">
            <p className="text-white truncate">{currentUser?.user?.name}</p>
            <p className="text-gray-600">{currentUser?.user?.username}</p>
          </div>
          <div onClick={() => setOpen((current) => !current)}>
            <BsThreeDots className="text-gray-600" />
          </div>
        </div>
      </div>
      {/* logout modal */}
      {open && (
        <div className="bg-black shadow-md shadow-white absolute text-white -top-14 left-3 w-full pl-3 py-4 rounded-lg z-20 text-sm lg:text-base">
          <Link
            href="/logout"
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Log out {currentUser?.user?.username}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Logout;
