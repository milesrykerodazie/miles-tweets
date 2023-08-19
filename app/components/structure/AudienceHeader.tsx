"use client";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { FC } from "react";
import { BiArrowBack } from "react-icons/bi";

interface AudienceHeaderPropTypes {
  name: string;
  username: string;
}

const AudienceHeader: FC<AudienceHeaderPropTypes> = ({ name, username }) => {
  const router = useRouter();
  const { userr } = useParams();
  const path = usePathname();

  const followers = `/audience/${userr}/followers`;
  const following = `/audience/${userr}/following`;

  return (
    <div
      className={`border-b-[1px] border-neutral-800 sticky top-0 bg-black z-40 `}
    >
      <div className="flex flex-row items-center gap-3 p-3">
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
        <div className="flex flex-col">
          <h1 className="text-white lg:text-xl font-semibold">{name}</h1>
          <h2 className="text-gray-600 text-sm font-semibold">{username}</h2>
        </div>
      </div>
      <div className="flex items-center text-white">
        <Link
          href={`/audience/${username}/followers`}
          className={`w-full  pt-5 text-center ${
            path === followers ? "bg-[#e7e9ea]/10" : ""
          }`}
        >
          Followers
          {path === followers && (
            <div className="flex items-center justify-center mt-1 trans">
              <div className="w-20 bg-blue-500 h-1" />
            </div>
          )}
        </Link>
        <Link
          href={`/audience/${username}/following`}
          className={`w-full  pt-5 text-center ${
            path === following ? "bg-[#e7e9ea]/10" : ""
          }`}
        >
          Following
          {path === following && (
            <div className="flex items-center justify-center mt-1 trans">
              <div className="w-20 bg-blue-500 h-1" />
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default AudienceHeader;
