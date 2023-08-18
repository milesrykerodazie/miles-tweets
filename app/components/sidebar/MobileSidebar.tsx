import { SessionInterface } from "@/types";
import React, { FC } from "react";
import Avatar from "../Avatar";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

interface MobileTypes {
  navMobile: boolean;
  setNavMobile: React.Dispatch<React.SetStateAction<boolean>>;
  session: SessionInterface;
}

const MobileSidebar: FC<MobileTypes> = ({
  navMobile,
  setNavMobile,
  session,
}) => {
  return (
    <div
      onClick={() => setNavMobile(false)}
      className={`${
        navMobile &&
        "sm:hidden fixed left-0 top-0 w-full h-screen bg-gray-700 bg-opacity-80 z-80 ease-in-out duration-700 transition"
      }`}
    >
      <div
        className={
          navMobile
            ? "fixed top-0 left-0 h-screen bg-main bg-primary shadow-md shadow-white w-[70%] ease-in duration-500 z-80 pt-5 px-4"
            : "fixed -left-[100%] top-0 ease-in duration-300 bg-primary/95 shadow-xl shadow-white w-[80%] md:w-[70%] h-screen z-80 pt-5 px-4"
        }
      >
        <div className="space-y-2">
          <div>
            <Avatar image={session?.user?.image} size="h-12 w-12" />
          </div>
          <div className="">
            <Link href="">
              <p className="text-white">{session?.user?.name}</p>
            </Link>
            <Link href="">
              <p className="text-gray-600">{session?.user?.username}</p>
            </Link>
          </div>
          <div className="flex flex-row items-center mt-4 gap-6">
            <div className="flex flex-row items-center gap-1">
              <p className="text-white">{session?.user?.Following.length}</p>
              <p className="text-neutral-500">Following</p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <p className="text-white">{session?.user?.Followers.length}</p>
              <p className="text-neutral-500">
                {session?.user?.Followers.length === 1
                  ? "Follower"
                  : "Followers"}
              </p>
            </div>
          </div>
        </div>

        {/* others here  */}
        <div className="flex items-row gap-4 rounded-full cursor-pointer items-center mt-5">
          <FaUser size={20} color="white" />
          <p className=" text-white">Profile</p>
        </div>
        <hr className="my-5 border-neutral-800" />
        <Link
          href="/logout"
          onClick={() => setNavMobile(false)}
          className="flex justify-center"
        >
          <button className="flex items-center space-x-2 py-2">
            <AiOutlineLogout />
            <span>Logout</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MobileSidebar;
