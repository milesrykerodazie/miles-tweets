"use client";
import React from "react";
import { BsTwitter } from "react-icons/bs";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Logout = () => {
  //router
  const router = useRouter();
  return (
    <div className="w-full p-5 space-y-5">
      <div className="rounded-full flex trans hover:bg-opacity-10 cursor-pointer p-4 items-center justify-center">
        <BsTwitter className="w-12 h-12 md:h-20 md:w-20 text-white" />
      </div>
      <div className="space-y-2">
        <p className="text-xl text-white font-bold">Log out of Miles Tweets?</p>
        <p className="text-gray-500">You can always log back in at any time.</p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-3">
        <button
          type="button"
          onClick={() => signOut()}
          className="bg-white w-full py-3 rounded-full font-semibold"
        >
          Log out
        </button>
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="bg-black text-white w-full py-3 rounded-full border border-gray-400 font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
